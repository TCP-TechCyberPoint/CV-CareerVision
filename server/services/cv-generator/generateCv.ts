import axios from 'axios';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { buildGeminiPrompt } from './promptBuilder';
import dotenv from 'dotenv';

dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const generateCvPdf = async (formData: any): Promise<Buffer> => {
  const prompt = buildGeminiPrompt(formData);

  const geminiRes = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    { contents: [{ parts: [{ text: prompt }] }] },
    { headers: { 'Content-Type': 'application/json' } }
  );

  const text = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini response is empty or invalid");

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontSize = 10;
  const headerFontSize = 12;
  const lineSpacing = 4;

  const { width, height } = page.getSize();
  const margin = 50;
  const maxLineWidth = width - margin * 2;
  let y = height - margin;

  const wrapText = (text: string, fontToUse: any, fontSize: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = fontToUse.widthOfTextAtSize(testLine, fontSize);
      if (testWidth < maxLineWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) lines.push(currentLine);
    return lines;
  };

  const drawText = (line: string, fontToUse: any, fontSizeToUse: number) => {
    const wrappedLines = wrapText(line, fontToUse, fontSizeToUse);
    for (const subLine of wrappedLines) {
      if (y < margin + fontSizeToUse) break;
      page.drawText(subLine, { x: margin, y, size: fontSizeToUse, font: fontToUse });
      y -= fontSizeToUse + lineSpacing;
    }
  };

  const lines = text.split('\n');
  let skillBuffer: string[] = [];
  let isInSkillsSection = false;

  for (let rawLine of lines) {
    let line = rawLine.trim();
    if (!line) {
      if (skillBuffer.length) {
        drawText(skillBuffer.join('    '), font, fontSize);
        skillBuffer = [];
      }
      y -= fontSize + lineSpacing;
      continue;
    }

    const cleanedLine = line.replace(/^\*\*(.+?)\*\*$/, '$1');
    const isHeader = cleanedLine === cleanedLine.toUpperCase() && cleanedLine.length < 50;

    if (isHeader) {
      if (skillBuffer.length) {
        drawText(skillBuffer.join('    '), font, fontSize);
        skillBuffer = [];
      }
      isInSkillsSection = cleanedLine === 'SKILLS';
      drawText(cleanedLine, boldFont, headerFontSize);
      y -= 4;
      continue;
    }

    const isBullet = line.startsWith('*');

    if (isInSkillsSection && isBullet) {
      skillBuffer.push(line.replace(/^\*\s*/, '•'));
      continue;
    } else if (skillBuffer.length) {
      drawText(skillBuffer.join('    '), font, fontSize);
      skillBuffer = [];
    }

    drawText(line, font, fontSize);
  }

  if (skillBuffer.length) {
    drawText(skillBuffer.join('    '), font, fontSize);
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};
