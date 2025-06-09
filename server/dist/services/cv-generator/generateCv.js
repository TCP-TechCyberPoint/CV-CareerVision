"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCvDocx = void 0;
const axios_1 = __importDefault(require("axios"));
const docx_1 = require("docx");
const promptBuilder_1 = require("./promptBuilder");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cloudconvert_1 = __importDefault(require("cloudconvert"));
dotenv_1.default.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const CLOUDCONVERT_API_KEY = process.env.CLOUDCONVERT_API_KEY;
const cloudConvert = new cloudconvert_1.default(CLOUDCONVERT_API_KEY);
function calculateYearsOfExperience(experiences) {
    let totalMonths = 0;
    for (const exp of experiences || []) {
        const start = new Date(exp.startDate);
        const end = exp.isCurrentJob ? new Date() : new Date(exp.endDate);
        const months = (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());
        totalMonths += months > 0 ? months : 0;
    }
    const years = totalMonths / 12;
    return `${Math.ceil(years)}`;
}
const generateCvDocx = async (req, res) => {
    try {
        const formData = req.body;
        const experiences = formData.experiences || [];
        const prompt = (0, promptBuilder_1.buildGeminiPrompt)(formData);
        const geminiRes = await axios_1.default.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, { contents: [{ parts: [{ text: prompt }] }] }, { headers: { "Content-Type": "application/json" } });
        let text = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (!text)
            throw new Error("Gemini response is empty");
        text = text.replace(/^```json/, "").replace(/```$/, "").trim();
        const content = JSON.parse(text);
        const sectionChildren = [];
        const addHeading = (label) => sectionChildren.push(new docx_1.Paragraph({
            text: label.toUpperCase(),
            heading: docx_1.HeadingLevel.HEADING_2,
            spacing: { after: 200 },
        }));
        const addLine = () => sectionChildren.push(new docx_1.Paragraph({
            border: {
                bottom: { style: docx_1.BorderStyle.SINGLE, size: 6, color: "auto" },
            },
            spacing: { after: 100 },
        }));
        const spacedParagraph = (text, isBullet = false) => new docx_1.Paragraph({
            text,
            spacing: { after: 120, line: 276 },
            ...(isBullet ? { bullet: { level: 0 } } : {}),
        });
        const name = formData.vitals?.name || "Full Name";
        const role = formData.preferences?.professionalPreference || "Job Title";
        const email = formData.vitals?.email || "";
        const expYears = calculateYearsOfExperience(experiences);
        sectionChildren.push(new docx_1.Paragraph({
            children: [new docx_1.TextRun({ text: `${name} – ${role} – ${expYears} Years Experience`, bold: true, size: 36 })],
            alignment: docx_1.AlignmentType.CENTER,
            spacing: { after: 150 },
        }), new docx_1.Paragraph({
            children: [new docx_1.TextRun({ text: email, size: 22 })],
            alignment: docx_1.AlignmentType.CENTER,
            spacing: { after: 200 },
        }));
        addLine();
        addHeading("Objective");
        sectionChildren.push(spacedParagraph(content.summary || "Motivated professional."));
        addLine();
        addHeading("Experience");
        let experienceCount = 0;
        for (const exp of content.experience || []) {
            sectionChildren.push(spacedParagraph(`${exp.company} | ${exp.title} (${exp.startYear} – ${exp.endYear})`));
            experienceCount++;
            for (const bullet of exp.bullets || []) {
                sectionChildren.push(spacedParagraph(bullet, true));
                experienceCount++;
            }
            if (experienceCount < 12) {
                sectionChildren.push(spacedParagraph("• Participated in Agile ceremonies", true), spacedParagraph("• Wrote technical documentation and test cases", true), spacedParagraph("• Collaborated with QA teams to ensure quality delivery", true));
                experienceCount += 3;
            }
        }
        addLine();
        addHeading("Education");
        for (const edu of content.education || []) {
            sectionChildren.push(spacedParagraph(`${edu.institution} | ${edu.degree} in ${edu.field} (${edu.year})`));
        }
        addLine();
        addHeading("Projects");
        let projectCount = 0;
        for (const proj of content.projects || []) {
            sectionChildren.push(spacedParagraph(proj.name), spacedParagraph(`• ${proj.description}`, true), spacedParagraph(`• Technologies: ${proj.technologies.join(", ")}`, true));
            projectCount += 3;
        }
        addLine();
        addHeading("Skills");
        sectionChildren.push(spacedParagraph((content.skills || []).join(" • ")));
        sectionChildren.push(new docx_1.Paragraph({ spacing: { before: 100 } }));
        // 🧱 Cap total content to 1 page
        if (sectionChildren.length > 35) {
            sectionChildren.splice(35);
        }
        const doc = new docx_1.Document({ sections: [{ children: sectionChildren }] });
        const buffer = await docx_1.Packer.toBuffer(doc);
        const tempDir = path_1.default.join(__dirname, "../../temp");
        if (!fs_1.default.existsSync(tempDir))
            fs_1.default.mkdirSync(tempDir);
        const docxPath = path_1.default.join(tempDir, "cv.docx");
        fs_1.default.writeFileSync(docxPath, buffer);
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
        const uploadTask = job.tasks.find((task) => task.name === "upload");
        if (!uploadTask)
            throw new Error("Upload task not found");
        await cloudConvert.tasks.upload(uploadTask, fs_1.default.createReadStream(docxPath));
        const completedJob = await cloudConvert.jobs.wait(job.id);
        const exportTask = completedJob.tasks.find((t) => t.name === "export");
        if (!exportTask?.result?.files?.[0]?.url) {
            throw new Error("CloudConvert PDF URL not found");
        }
        const fileUrl = exportTask.result.files[0].url;
        const pdfBuffer = await axios_1.default.get(fileUrl, { responseType: "arraybuffer" });
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=cv.pdf");
        res.send(pdfBuffer.data);
        fs_1.default.unlinkSync(docxPath);
    }
    catch (err) {
        console.error("🔥 Internal error:", err.message);
        res.status(500).json({ error: err.message || "Failed to generate PDF" });
    }
};
exports.generateCvDocx = generateCvDocx;
