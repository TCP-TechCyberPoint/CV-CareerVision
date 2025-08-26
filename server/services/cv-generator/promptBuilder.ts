export const buildGeminiPrompt = (formData: any): string => {
  return `
You are a professional resume writer and English editor. Based ONLY on the user data below, generate a clean, professional CV in valid JSON format.

### Requirements:
- The final CV *must fit on a single A4 page*.
- Use fluent, professional English. Correct all spelling, grammar, and formatting.
- Return only valid JSON — no Markdown or extra comments.
- ❗ Do *not invent* any content in experience, projects, skills, or education. Do *not include* details, roles, projects, skills, or education not explicitly provided in the user data.
- ❗ Do not exceed 3 entries in *Experience* and 2 in *Projects*, even if more are available.
- ❗ Include *only the 8 most relevant hard skills* — do not include all available skills.
- Do *not invent* military roles, titles, or service entries. Only use what is explicitly provided in the user data.

### Section Logic

*Summary*
- Write a concise *3 to 4 sentence* summary targeting the role: "${formData?.preferences?.professionalPreference || 'unspecified'}".
- ❗ Strictly limit the summary to a *maximum of 4 sentences and no more than 4 lines of text*.
- Do not add context or achievements not in user data.

*Experience*
- Use **exactly the 3 most recent entries** from \experience\ (ignore all others).
- Do not include more than 3 experiences, even if more are available.
- If fewer than 3 are available, include only those.


*Military Experience*
- Use only the entries explicitly listed in the \\military\\ field.
- Do *not fabricate* or extend roles (e.g., reserves, ranks, or units not mentioned).
- ❗ Do *not include* \\startYear\\, \\endYear\\, or any bullet points.
- Only list \\company\\ and \\title\\ exactly as given.

*Projects*
- Use up to 2 \\projects\\ from user data.
- If fewer than 2:
  - Add relevant projects from professional \\experience\\ (not military).
  - If a project has no name, generate a simple descriptive one (e.g., “Internal CRM System”), but do not add features or details not provided.
- Each project must include *exactly 3 bullet points* in the \\description\\ array — use only what is provided, rewritten professionally.

*Education*
- Include only the user's highest degree and field, with institution and graduation year.
- Do not add coursework, honors, or details not provided.

*Skills*
- Combine:
  - \\softSkills\\
  - \\hardSkills\\
  - \\projectTech\\ values from projects
  - Any tools/technologies clearly mentioned in experience
- ❗ Select only the 8 *most relevant hard skills* based on the target role.
- Do not add skills not explicitly present in the user data.

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
    }
  ],
  "militaryExperience": [
    {
      "company": "...",
      "title": "..."
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
