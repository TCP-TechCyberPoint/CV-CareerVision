import { Request, Response } from "express";
import axios from "axios";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from "docx";
import { buildGeminiPrompt } from "./promptBuilder";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import CloudConvert from "cloudconvert";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const CLOUDCONVERT_API_KEY = process.env.CLOUDCONVERT_API_KEY!;
const cloudConvert = new CloudConvert(CLOUDCONVERT_API_KEY);

function calculateYearsOfExperience(experience: any[]): string {
  let totalMonths = 0;
  for (const exp of experience || []) {
    const start = new Date(exp.startDate);
    const end = exp.isCurrentJob ? new Date() : new Date(exp.endDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    totalMonths += months > 0 ? months : 0;
  }
  const years = totalMonths / 12;
  return `${Math.ceil(years)}`;
}

export const generateCvDocx = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const experience = formData.experience || [];
    const prompt = buildGeminiPrompt(formData);

    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    let text =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) throw new Error("Gemini response is empty");
    text = text
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .trim();
    const content = JSON.parse(text);

    const sectionChildren: Paragraph[] = [];

    const addHeading = (label: string) =>
      sectionChildren.push(
        new Paragraph({
          text: label.toUpperCase(),
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
        })
      );

    const addLine = () =>
      sectionChildren.push(
        new Paragraph({
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 6, color: "auto" },
          },
          spacing: { after: 100 },
        })
      );

    const spacedParagraph = (text: string, isBullet = false) =>
      new Paragraph({
        text,
        spacing: { after: 120, line: 276 },
        ...(isBullet ? { bullet: { level: 0 } } : {}),
      });

    const name = formData.vitals?.name || "Full Name";
    const role = formData.preferences?.professionalPreference || "Job Title";
    const email = formData.vitals?.email || "";
    const expYears = calculateYearsOfExperience(experience);

    sectionChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${name} – ${role} – ${expYears} Years Experience`,
            bold: true,
            size: 36,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 150 },
      }),
      new Paragraph({
        children: [new TextRun({ text: email, size: 22 })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      })
    );
    addLine();

    addHeading("Objective");
    sectionChildren.push(
      spacedParagraph(content.summary || "Motivated professional.")
    );
    addLine();

    addHeading("Experience");
    let experienceCount = 0;
    for (const exp of content.experience || []) {
      sectionChildren.push(
        spacedParagraph(
          `${exp.company} | ${exp.title} (${exp.startYear} – ${exp.endYear})`
        )
      );
      experienceCount++;

      for (const bullet of exp.bullets || []) {
        sectionChildren.push(spacedParagraph(bullet, true));
        experienceCount++;
      }

      if (experienceCount < 12) {
        sectionChildren.push(
          spacedParagraph("• Participated in Agile ceremonies", true),
          spacedParagraph(
            "• Wrote technical documentation and test cases",
            true
          ),
          spacedParagraph(
            "• Collaborated with QA teams to ensure quality delivery",
            true
          )
        );
        experienceCount += 3;
      }
    }
    addLine();

    addHeading("Education");
    for (const edu of content.education || []) {
      sectionChildren.push(
        spacedParagraph(
          `${edu.institution} | ${edu.degree} in ${edu.field} (${edu.graduationYear})`
        )
      );
    }
    addLine();

    addHeading("Projects");
    let projectCount = 0;
    for (const proj of content.projects || []) {
      sectionChildren.push(
        spacedParagraph(proj.name),
        spacedParagraph(`• ${proj.description}`, true),
        spacedParagraph(`• Technologies: ${proj.technologies.join(", ")}`, true)
      );
      projectCount += 3;
    }

    addLine();
    addHeading("Skills");
    sectionChildren.push(spacedParagraph((content.skills || []).join(" • ")));

    sectionChildren.push(new Paragraph({ spacing: { before: 100 } }));

    // 🧱 Cap total content to 1 page
    if (sectionChildren.length > 35) {
      sectionChildren.splice(35);
    }

    const doc = new Document({ sections: [{ children: sectionChildren }] });
    const buffer = await Packer.toBuffer(doc);

    const tempDir = path.join(__dirname, "../../temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
    const docxPath = path.join(tempDir, "cv.docx");
    fs.writeFileSync(docxPath, buffer);

    const job = await cloudConvert.jobs.create({
      tasks: {
        upload: { operation: "import/upload" },
        convert: {
          operation: "convert",
          input: "upload",
          input_format: "docx",
          output_format: "pdf",
        },
        export: { operation: "export/url", input: "convert" },
      },
    });

    const uploadTask = job.tasks.find((task: any) => task.name === "upload");
    if (!uploadTask) throw new Error("Upload task not found");

    await cloudConvert.tasks.upload(uploadTask, fs.createReadStream(docxPath));

    const completedJob = await cloudConvert.jobs.wait(job.id);
    const exportTask = completedJob.tasks.find((t: any) => t.name === "export");

    if (!exportTask?.result?.files?.[0]?.url) {
      throw new Error("CloudConvert PDF URL not found");
    }

    const fileUrl = exportTask.result.files[0].url;
    const pdfBuffer = await axios.get(fileUrl, { responseType: "arraybuffer" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=cv.pdf");
    res.send(pdfBuffer.data);

    fs.unlinkSync(docxPath);
  } catch (err: any) {
    console.error("🔥 Internal error:", err.message);
    res.status(500).json({ error: err.message || "Failed to generate PDF" });
  }
};
