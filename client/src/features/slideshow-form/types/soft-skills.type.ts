// Soft Skills Types
export type SoftSkillCategory = 
  | "Communication" 
  | "Collaboration" 
  | "Leadership" 
  | "Adaptability" 
  | "ProblemSolving";

export type CommunicationSkill = "Written" | "Verbal" | "Feedback";
export type CollaborationSkill = "Teamwork" | "Pair Programming" | "Knowledge Sharing";
export type LeadershipSkill = "Decision Making" | "Mentoring" | "Vision Sharing";
export type AdaptabilitySkill = "Change Management" | "Learning" | "Resilience";
export type ProblemSolvingSkill = "Root Cause Analysis" | "Debugging" | "Design Thinking";

export type SoftSkill = 
  | CommunicationSkill 
  | CollaborationSkill 
  | LeadershipSkill 
  | AdaptabilitySkill 
  | ProblemSolvingSkill;

// Selected Soft Skills Types (for form data)
export type SelectedSoftSkills = {
  [K in SoftSkillCategory]?: SoftSkill[];
}; 