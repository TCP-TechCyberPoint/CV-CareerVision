// Mock data for dashboard cards - replace with real data from your store/API

import type {
  HardSkill,
  SlideshowFormData,
  Vitals,
  SoftSkill,
  Education,
  Project,
  Preferences,
  Experience,
} from "../types";

export const vitalsData: Vitals = {
  name: "John Doe",
  dateOfBirth: new Date(1990, 4, 15), // May 15, 1990
  email: "john.doe@example.com",
  country: "United States",
  city: "San Francisco",
  street: "123 Tech Street, Apt 4B",
  gender: "Male",
  phone: "0501234567",
  linkedin: "https://www.linkedin.com/in/john-doe",
};

export const hardSkillsData: HardSkill[] = ["React.js", "Node.js"];

export const softSkillsData: SoftSkill[] = [
  "Teamwork",
  "Mentoring",
  "Resilience",
];

export const educationData: Education = {
  degree: "Bachelor",
  fieldOfStudy: "Computer Science",
  institution: "Stanford University",
  graduationYear: "2019",
  certifications: ["AWS Certified Developer", "React Developer Certification"],
};

export const experienceData: Experience[] = [
  {
    id: crypto.randomUUID(),
    jobTitle: "Senior Software Engineer",
    company: "Microsoft",
    startDate: "2022-01-01",
    endDate: undefined, // Current job shouldn't have end date
    isCurrentJob: true,
    description:
      "Leading development of cloud-based applications using React and Azure services",
  },
  {
    id: crypto.randomUUID(),
    jobTitle: "Software Engineer",
    company: "Google",
    startDate: "2019-01-01",
    endDate: "2021-12-31", // Fixed: end date must be after start date
    isCurrentJob: false,
    description:
      "Developed and maintained scalable web applications using React and Node.js",
  },
];

export const projectsData: Project[] = [
  {
    id: "1",
    projectName: "E-commerce Platform",
    description: "An online store for selling products",
    projectTech: ["React", "Node.js", "MongoDB", "TypeScript"],
    projectLink: "https://github.com/john-doe/ecommerce-platform",
  },
  {
    id: "2",
    projectName: "Task Manager App",
    description: "A task manager app for managing tasks",
    projectTech: ["React", "Node.js", "MongoDB", "TypeScript"],
    projectLink: "https://github.com/john-doe/task-manager-app",
  },
];

export const preferencesData: Preferences = {
  cvStyle: "minimal",
  cvPurpose: "job hunt",
  professionalPreference: "fullstack developer",
  experienceLevel: "senior (7-10 years)",
  industryPreference: "technology",
  targetSalaryRange: "$100,000 - $150,000",
};

export const calculateOverallCompletion = (formData?: SlideshowFormData) => {
  if (!formData) {
    const sections = [21, 22, 23, 24, 25, 26, 27];
    const totalCompletion = sections.reduce(
      (sum, completion) => sum + completion,
      0
    );
    return Math.round(totalCompletion / sections.length);
  }

  const sections = [
    formData.vitals ? 100 : 0,
    formData.hardSkills?.length ? 100 : 0,
    formData.softSkills?.length ? 100 : 0,
    formData.education ? 100 : 0,
    formData.experience?.length ? 100 : 0,
    formData.projects?.length ? 100 : 0,
    formData.preferences ? 100 : 0,
  ];

  const totalCompletion = sections.reduce(
    (sum, completion) => sum + completion,
    0
  );
  return Math.round(totalCompletion / sections.length);
};

// Helper function to get completion color
export const getCompletionColor = (percentage: number) => {
  if (percentage >= 75) return "green";
  if (percentage >= 50) return "blue";
  if (percentage >= 25) return "orange";
  return "red";
};

// Export all data as a single object for convenience
export const mockData: SlideshowFormData = {
  vitals: vitalsData,
  hardSkills: hardSkillsData,
  softSkills: softSkillsData,
  education: educationData,
  experience: experienceData,
  projects: projectsData,
  preferences: preferencesData,
};
