import type { SlideshowFormData } from "../types/form.types";

// Calculate completion percentage for vitals section
const calculateVitalsCompletion = (vitals: SlideshowFormData['vitals']): number => {
  if (!vitals) return 0;
  
  const requiredFields = [
    vitals.name,
    vitals.email,
    vitals.phone,
    vitals.country,
    vitals.city,
    vitals.street,
    vitals.linkedin,
    vitals.github,
  ];
  
  const filledFields = requiredFields.filter(field => 
    field && field.trim() !== ""
  ).length;
  
  return Math.round((filledFields / requiredFields.length) * 100);
};

// Calculate completion percentage for hard skills section
const calculateHardSkillsCompletion = (hardSkills: SlideshowFormData['hardSkills']): number => {
  if (!hardSkills) return 0;
  
  const allSkills = Object.values(hardSkills).flat();
  const skillCount = allSkills.length;
  
  if (skillCount === 0) return 0;
  if (skillCount >= 5) return 100;
  
  return skillCount * 20; // 1 skill = 20%, 2 skills = 40%, etc.
};

// Calculate completion percentage for soft skills section
const calculateSoftSkillsCompletion = (softSkills: SlideshowFormData['softSkills']): number => {
  if (!softSkills) return 0;
  
  const skillCount = softSkills.length;
  
  if (skillCount === 0) return 0;
  if (skillCount >= 5) return 100;
  
  return skillCount * 20; // 1 skill = 20%, 2 skills = 40%, etc.
};

// Calculate completion percentage for education section
const calculateEducationCompletion = (education: SlideshowFormData['education']): number => {
  if (!education) return 0;
  
  const requiredFields = [
    education.degree,
    education.fieldOfStudy,
    education.institution,
    education.graduationYear,
  ];
  
  const filledFields = requiredFields.filter(field => 
    field && field.trim() !== ""
  ).length;
  
  return Math.round((filledFields / requiredFields.length) * 100);
};

// Calculate completion percentage for experience section
const calculateExperienceCompletion = (experience: SlideshowFormData['experience']): number => {
  if (!experience || experience.length === 0) return 0;
  
  const validExperiences = experience.filter(exp => 
    exp.jobTitle && exp.jobTitle.trim() !== "" &&
    exp.company && exp.company.trim() !== "" &&
    exp.startDate && exp.startDate.trim() !== ""
  );
  
  const experienceCount = validExperiences.length;
  
  if (experienceCount === 0) return 0;
  if (experienceCount >= 2) return 100;
  
  return 50; // 1 experience = 50%
};

// Calculate completion percentage for projects section
const calculateProjectsCompletion = (projects: SlideshowFormData['projects']): number => {
  if (!projects || projects.length === 0) return 0;
  
  const validProjects = projects.filter(project => 
    project.projectName && project.projectName.trim() !== "" &&
    project.description && project.description.trim() !== ""
  );
  
  const projectCount = validProjects.length;
  
  if (projectCount === 0) return 0;
  if (projectCount >= 2) return 100;
  
  return 50; // 1 project = 50%
};

// Calculate completion percentage for preferences section
const calculatePreferencesCompletion = (preferences: SlideshowFormData['preferences']): number => {
  if (!preferences) return 0;
  
  const requiredFields = [
    preferences.cvStyle,
    preferences.cvPurpose,
    preferences.professionalPreference,
    preferences.experienceLevel,
    preferences.industryPreference,
    preferences.targetSalaryRange,
  ];
  
  const filledFields = requiredFields.filter(field => 
    field && field.trim() !== ""
  ).length;
  
  return Math.round((filledFields / requiredFields.length) * 100);
};

// Calculate overall completion percentage
const calculateOverallCompletion = (formData: SlideshowFormData): number => {
  const sections = [
    calculateVitalsCompletion(formData.vitals),
    calculateHardSkillsCompletion(formData.hardSkills),
    calculateSoftSkillsCompletion(formData.softSkills),
    calculateEducationCompletion(formData.education),
    calculateExperienceCompletion(formData.experience),
    calculateProjectsCompletion(formData.projects),
    calculatePreferencesCompletion(formData.preferences),
  ];
  
  const totalPercentage = sections.reduce((sum, percentage) => sum + percentage, 0);
  return Math.round(totalPercentage / sections.length);
};

export const useProgressCalculation = (formData: SlideshowFormData) => {
  const overallCompletion = calculateOverallCompletion(formData);
  
  const sectionCompletions = {
    vitals: calculateVitalsCompletion(formData.vitals),
    hardSkills: calculateHardSkillsCompletion(formData.hardSkills),
    softSkills: calculateSoftSkillsCompletion(formData.softSkills),
    education: calculateEducationCompletion(formData.education),
    experience: calculateExperienceCompletion(formData.experience),
    projects: calculateProjectsCompletion(formData.projects),
    preferences: calculatePreferencesCompletion(formData.preferences),
  };

  // Get status color based on completion
  const getStatusColor = (percentage: number) => {
    if (percentage < 25) return "red";
    if (percentage < 50) return "orange";
    if (percentage < 75) return "yellow";
    if (percentage < 100) return "blue";
    return "green";
  };

  // Get status text
  const getStatusText = (percentage: number) => {
    if (percentage === 0) return "Not Started";
    if (percentage < 25) return "Getting Started";
    if (percentage < 50) return "In Progress";
    if (percentage < 75) return "Well Underway";
    if (percentage < 100) return "Almost Done";
    return "Complete";
  };

  return {
    overallCompletion,
    sectionCompletions,
    getStatusColor,
    getStatusText,
  };
}; 