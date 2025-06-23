import { Request, Response } from "express";
import axios from "axios";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  ExternalHyperlink,
} from "docx";
import { buildGeminiPrompt } from "./promptBuilder";
import dotenv from "dotenv";
import cloudinary from "../../utils/cloudinary";
import streamifier from "streamifier";

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

export const uploadBufferToCloudinary = (buffer: Buffer, filename: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: filename,
        resource_type: "raw",
        overwrite: true,           
        unique_filename: false,    
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const generateCvDocx = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const buffer = await generateCvBufferOnly(formData);

    const email = formData?.vitals?.email || "unknown";
    const publicId = `cv_${email.replace(/[^a-zA-Z0-9]/g, "_")}`;

    await uploadBufferToCloudinary(buffer, publicId);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader("Content-Disposition", "attachment; filename=cv.docx");
    res.send(buffer);
  } catch (err: any) {
    console.error("🔥 Internal error generating CV:", err.message);
    res.status(500).json({ error: err.message || "Failed to generate CV" });
  }
};

export const generateCvBufferOnly = async (formData: any): Promise<Buffer> => {
  const prompt = buildGeminiPrompt(formData);

  let content: any;

  // Try OpenRouter
  try {
    const openrouterRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let text = openrouterRes.data?.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("Empty OpenRouter response");

    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1].trim() : text;
    content = JSON.parse(jsonString);
  } catch (err) {
    console.warn("⚠️ OpenRouter failed, falling back to Gemini");

    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    let text = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) throw new Error("Empty Gemini response");

    text = text.replace(/^```json/, "").replace(/```$/, "").trim();
    content = JSON.parse(text);
  }

  const sectionChildren: Paragraph[] = [];

  const centeredHeader = (text: string, size = 28) =>
    new Paragraph({
      children: [new TextRun({ text, bold: true, size })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 50 },
    });

  const addSectionHeading = (label: string) =>
    sectionChildren.push(
      new Paragraph({
        children: [new TextRun({ text: label.toUpperCase(), bold: true, size: 24 })],
        alignment: AlignmentType.LEFT,
        spacing: { after: 100 },
      })
    );

  const addLine = () =>
    sectionChildren.push(
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "auto" } },
        spacing: { after: 80 },
      })
    );

  const spacedParagraph = (text: string, isBullet = false) =>
    new Paragraph({
      text,
      spacing: { after: 80, line: 200 },
      ...(isBullet ? { bullet: { level: 0 } } : {}),
    });

  const vitals = formData.vitals || {};
  const preferences = formData.preferences || {};
  const name = vitals.name || "Full Name";
  const role = preferences.professionalPreference || "Job Title";

  let totalYears = 0;
  if (content.experience?.length) {
    totalYears = content.experience.reduce((acc: number, e: any) => {
      const start = parseInt(e.startYear);
      const end =
        e.endYear?.toLowerCase() === "present"
          ? new Date().getFullYear()
          : parseInt(e.endYear);
      if (!isNaN(start) && !isNaN(end) && end >= start) {
        return acc + (end - start);
      }
      return acc;
    }, 0);
  }

  const headerLine = `${name} | ${role}${
    totalYears > 0 ? ` | +${totalYears} Years Experience` : ""
  }`;

  const contactItems: (TextRun | ExternalHyperlink)[] = [];
  if (vitals.email) contactItems.push(new TextRun({ text: vitals.email }));
  if (vitals.phone) contactItems.push(new TextRun({ text: ` | ${vitals.phone}` }));
  if (vitals.linkedin) {
    contactItems.push(new TextRun({ text: " | " }));
    contactItems.push(
      new ExternalHyperlink({
        link: vitals.linkedin,
        children: [new TextRun({ text: "LinkedIn", underline: {} })],
      })
    );
  }
  if (vitals.github) {
    contactItems.push(new TextRun({ text: " | " }));
    contactItems.push(
      new ExternalHyperlink({
        link: vitals.github,
        children: [new TextRun({ text: "GitHub", underline: {} })],
      })
    );
  }

  sectionChildren.push(
    centeredHeader(headerLine),
    new Paragraph({
      children: contactItems,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  );

  addLine();

  addSectionHeading("SUMMARY");
  sectionChildren.push(spacedParagraph(content.summary));
  addLine();

  addSectionHeading("WORK EXPERIENCE");
  for (const exp of content.experience || []) {
    sectionChildren.push(
      spacedParagraph(`${exp.company} | ${exp.title} (${exp.startYear} – ${exp.endYear})`)
    );
    for (const bullet of exp.bullets || []) {
      sectionChildren.push(spacedParagraph(bullet, true));
    }
  }
  addLine();

  addSectionHeading("PROJECTS");
  const allProjectTechs = new Set<string>();

  for (const proj of content.projects || []) {
    sectionChildren.push(spacedParagraph(proj.name));
    for (const bullet of proj.description || []) {
      sectionChildren.push(spacedParagraph(bullet, true));
    }

    for (const tech of proj.technologies || []) {
      allProjectTechs.add(tech.toLowerCase());
    }
  }

  addLine();

  addSectionHeading("EDUCATION");
  for (const edu of content.education || []) {
    sectionChildren.push(
      spacedParagraph(
        `${edu.degree}, ${edu.field} | ${edu.institution} (${edu.graduationYear || edu.year})`
      )
    );
  }

  addLine();

  addSectionHeading("SKILLS");
  const baseSkills = content.skills || [];
  const listedSkills = new Set(baseSkills.map((s: string) => s.toLowerCase()));
  const additionalSkills = Array.from(allProjectTechs).filter(
    (skill) => !listedSkills.has(skill)
  );
  const allSkills = [...baseSkills, ...additionalSkills];
  const formattedSkills = allSkills.map(
    (s) => s.charAt(0).toUpperCase() + s.slice(1)
  );

  sectionChildren.push(spacedParagraph(formattedSkills.join(" • ")));

  const doc = new Document({ sections: [{ children: sectionChildren }] });
  return await Packer.toBuffer(doc);
};