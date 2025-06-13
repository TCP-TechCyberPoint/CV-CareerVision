// Export vitals types
export type { Vitals, Gender } from "./vitals.types";

// Export experience types
export type { Experience } from "./experience.types";

// Export education types
export type { Education, Degree, FieldOfStudy, Year } from "./education.types";

// Export project types
export type { Project } from "./projects.types";

// Export preferences types from schema (centralized)
export type {
  CvStyle,
  CvPurpose,
  ProfessionalPreference,
  ExperienceLevel,
  Industry,
  SalaryRange,
  PreferencesFormData as Preferences,
} from "../schemas/preferencesSchema";

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

// Export completion types
export type { CompletionPercentage } from "./completion.types";
