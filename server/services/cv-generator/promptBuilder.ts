export const buildGeminiPrompt = (formData: any): string => {
  return `
You are a professional resume writer and English editor. Based on the user data below, generate a clean, professional CV in valid JSON format.
### Requirements:
- The final CV **must fit on a single A4 page**.
- Use fluent, professional English. Correct all spelling, grammar, and formatting.
- Return only valid JSON — no Markdown or extra comments.
- Do **not invent** experience or projects.
- Follow the fallback rules exactly as written.
- ❗ Do not exceed 3 entries in **Experience** and 3 in **Projects**, even if more are available.

### Section Logic

**Summary**
- Write a 2-3 sentence summary targeting the role: "${formData?.preferences?.professionalPreference || 'unspecified'}".

**Experience**
- Use up to 3 entries from \`experience\`.
- If fewer than 3 entries, supplement from the \`military\` field (military entries should **not include** startYear or endYear).
- ❗ Military entries must:
  - Always appear **after** professional experience.
  - Be clearly marked as military.
- Do not include education in this section.

**Projects**
- Use up to 2 \`projects\` from user data.
- If fewer than 2:
  - Add relevant projects from professional \`experience\` (not military).
  - If missing a name, generate a clear and realistic one (e.g., “Internal CRM System”).
- Each project must include **exactly 3 bullet points** in the \`description\` array.

**Education**
- Include only the user's highest degree and field, with institution and graduation year.

**Skills**
- Combine:
  - \`softSkills\`
  - \`hardSkills\`
  - \`projectTech\` values from projects
  - Any tools/technologies clearly mentioned in experience

### JSON Format:
{
  "summary": "...",
  "experience": [
    {
      "company": "...",
      "title": "...",
      "startYear": "...",
      "endYear": "...",
      "bullets": ["...", "..."]
    },
    {
      "company": "...",
      "title": "...",
      "bullets": ["...", "..."]
    }
  ],
  "projects": [
    {
      "name": "...",
      "description": ["...", "...", "..."],
      "technologies": ["..."]
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
