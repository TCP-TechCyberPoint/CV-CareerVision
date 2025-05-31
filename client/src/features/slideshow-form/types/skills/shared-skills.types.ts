// Re-export all types from individual files

// Import types for creating unions and structures
import type { SoftSkillCategory, SoftSkill } from "./soft-skills.types";
import type { HardSkillCategory, HardSkill } from "./hard-skills.types";

// Color Types
export type SkillColor =
  | "cyan"
  | "teal"
  | "yellow"
  | "pink"
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "red"
  | "gray";

// Structure Types
export type SkillCategoryInfo = {
  skills: readonly string[];
  color: SkillColor;
};

// Union Types
export type SkillCategory = SoftSkillCategory | HardSkillCategory;
export type Skill = SoftSkill | HardSkill;

