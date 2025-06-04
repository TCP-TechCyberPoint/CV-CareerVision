// Re-export all types from individual files
export type {
  SoftSkillCategory,
  CommunicationSkill,
  CollaborationSkill,
  LeadershipSkill,
  AdaptabilitySkill,
  ProblemSolvingSkill,
  SoftSkill,
  SelectedSoftSkills,
} from "./soft-skills.type";

export type {
  HardSkillCategory,
  FullstackSkill,
  FrontendSkill,
  BackendSkill,
  QASkill,
  DevOpsSkill,
  ProductManagerSkill,
  ReactJSSkill,
  VueSkill,
  CSSSkill,
  DesignSystemsSkill,
  NodejsSkill,
  ExpressSkill,
  AuthSkill,
  CypressSkill,
  SeleniumSkill,
  PostmanSkill,
  DockerSkill,
  CICDSkill,
  KubernetesSkill,
  AgileSkill,
  ScrumSkill,
  HardSkill,
  SelectedHardSkills,
} from "./hard-skills.type";

// Import types for creating unions and structures
import type { SoftSkillCategory, SoftSkill, SelectedSoftSkills } from "./soft-skills.type";
import type { HardSkillCategory, HardSkill, SelectedHardSkills } from "./hard-skills.type";

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

export type SoftSkillsHierarchy = {
  readonly [K in SoftSkillCategory]: SkillCategoryInfo;
};

export type HardSkillsHierarchy = {
  readonly [K in HardSkillCategory]: SkillCategoryInfo;
};

// Union Types
export type SkillCategory = SoftSkillCategory | HardSkillCategory;
export type Skill = SoftSkill | HardSkill;

// Combined Selected Skills Type
export type SelectedSkills = {
  softSkills: SelectedSoftSkills;
  hardSkills: SelectedHardSkills;
}; 