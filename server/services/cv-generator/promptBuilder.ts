export const buildGeminiPrompt = (formData: any): string => {
  return `
You are a professional resume writer and English editor. Based on the user data below, generate a polished, professional, and concise CV in valid JSON format.

Requirements:
- Keep the CV brief enough to fit within a single A4 page when rendered (Word/PDF).
- Fix grammar, punctuation, and spelling errors.
- Use clear, professional, fluent English suitable for job applications.
- Summarize lengthy content where possible (e.g., max 2–3 bullet points per job, shorter project descriptions).
- Avoid repetition across sections.
- Return ONLY valid JSON (no markdown, no extra text, no comments).

JSON structure:
{
  "summary": "Brief professional summary (2-3 sentences max)",
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
      "description": "Brief 1-sentence project description",
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

User data:
${JSON.stringify(formData, null, 2)}
`.trim();
};
