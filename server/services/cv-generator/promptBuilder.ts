export const buildGeminiPrompt = (formData: any): string => {
  return `
You are a professional resume writer and English editor. Based on the user data below, generate a clean, professional CV in valid JSON format.

### Output Requirements:
- The CV **must fit on a single A4 page** when rendered as Word/PDF.
- Use professional, fluent, and concise English. Fix all grammar, punctuation, and spelling issues.
- Avoid repetition or filler content across all sections.
- **Experience:** Limit to a maximum of 2 bullet points per job. Focus on impact and responsibilities.
- **Projects:** Limit to 1–2 lines each. Make descriptions **clear, high-impact summaries** that convey the full value and purpose of the project in professional language.
- **Technologies:** Include only core technologies used per project.
- Return ONLY valid JSON — no markdown, no extra formatting, no comments.

### JSON Format:
{
  "summary": "Brief professional summary (max 2–3 sentences)",
  "experience": [
    {
      "company": "...",
      "title": "...",
      "startYear": "...",
      "endYear": "...",
      "bullets": ["Short bullet 1", "Short bullet 2"]
    }
  ],
  "projects": [
    {
      "name": "...",
      "description": "Professional 1-sentence summary of the project",
      "technologies": ["..."]
    }
  ],
  "education": [
    {
      "institution": "...",
      "degree": "...",
      "field": "...",
      "year": "..."
    }
  ],
  "skills": ["..."]
}

### User Data:
${JSON.stringify(formData, null, 2)}
`.trim();
};
