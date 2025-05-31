// Export vitals types
export type { Vitals } from "./vitals.types";
export { Gender } from "./vitals.types";

// Export experience types
export type { Experience } from "./experience.types";

// Export education types
export type { Education, Degree, FieldOfStudy, Year } from "./education.types";

// Export project types
export type { Project } from "./projects.types";

// Export preferences types
export type { Preferences } from "./preferences.types";
export {
  CvStyle,
  CvPurpose,
  ProfessionalPreference,
  ExperienceLevel,
  Industry,
  SalaryRange,
} from "./preferences.types";

// Export form types
export type { SlideshowFormData } from "./form.types";

// Re-export all skills types from the skills folder
export type {
  // Soft Skills (flattened)
  SoftSkillCategory,
  SoftSkill,

  // Hard Skills (flattened)
  HardSkillCategory,
  HardSkill,

  // Shared Skills Types
  SkillColor,
  SkillCategoryInfo,
  SkillCategory,
  Skill,
} from "./skills";
