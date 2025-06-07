// Soft Skills Types
export type SoftSkillCategory = 
  | "Communication" 
  | "Collaboration" 
  | "Leadership" 
  | "Adaptability" 
  | "ProblemSolving";

// Flattened Soft Skills - direct union of all skill strings
export type SoftSkill = 
// Communication
  | "Written"
  | "Verbal"
  | "Feedback"
// Collaboration
  | "Teamwork"
  | "Pair Programming"
  | "Knowledge Sharing"
// Leadership
  | "Decision Making"
  | "Mentoring"
  | "Vision Sharing"
// Adaptability
  | "Change Management"
  | "Learning"
  | "Resilience"
// Problem Solving
  | "Root Cause Analysis"
  | "Debugging"
  | "Design Thinking";

