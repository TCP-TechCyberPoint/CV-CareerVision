export const buildGeminiPrompt = (formData: any): string => {
  return `
You are a professional resume writer and English editor. Based on the user data below, generate a clean, professional CV in valid JSON format.

### Requirements:
- The final CV **must fit on a single A4 page**.
- Use fluent, professional English. Correct all spelling, grammar, and formatting.
- Do **not** return Markdown, comments, or explanations — only valid JSON.
- **ALL SECTIONS must be included** in the response. Do not leave any section empty.
  - Especially ensure the **education section is filled** from the user data.
  - If a section is missing in the data, infer concise professional content instead of omitting it.
- The goal is to create a full, attractive, and concise resume based on the data.

### Rules per Section:

**Summary**
- 2–3 sentence professional overview focused on the target role: "${formData?.preferences?.professionalPreference || 'unspecified'}"

**Experience**
- Include the top 3 most relevant roles based on the target role.
- Each role: max 2 bullet points, focusing on measurable impact and responsibilities.

**Projects**
- Include the top 3 most relevant projects.
- Each project must contain:
  - \`name\`
  - \`description\` — as **2 professional bullet points**, clearly explaining the project purpose and value (NO technologies listed here).
  - \`technologies\` — a list of key tech/tools used (this is used for the skills section, not to be shown in the project bullets).

**Education**
- Include the user's highest degree and most relevant study.

**Skills**
- Include core professional and technical skills.
- You may infer additional skills from projects or experience.

### JSON Format:
{
  "summary": "2–3 sentence professional overview",
  "experience": [
    {
      "company": "...",
      "title": "...",
      "startYear": "...",
      "endYear": "...",
      "bullets": ["...", "..."]
    }
  ],
  "projects": [
    {
      "name": "...",
      "description": ["Professional bullet point 1", "Professional bullet point 2"],
      "technologies": ["React", "TypeScript"]
    }
  ],
  "education": [
    {
      "institution": "...",
      "degree": "...",
      "field": "...",
      "graduationYear": "..."
    }
  ],
  "skills": ["..."]
}

### User Data:
${JSON.stringify(formData, null, 2)}
`.trim();
};
