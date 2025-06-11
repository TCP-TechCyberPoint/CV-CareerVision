// Mock data for dashboard cards - matching the actual output.json structure

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
  name: "Miriam Cohen",
  dateOfBirth: new Date(1990, 4, 15), // May 15, 1990 (for form compatibility)
  email: "careervision2026@gmail.com",
  country: "United States",
  city: "New York",
  street: "123 Main St",
  gender: "Male",
  phone: "0502334528",
  linkedin: "https://www.linkedin.com/in/john-doe",
  github: "https://github.com/TCP-TechCyberPoint/CV-CareerVision",
};

// Updated to match output.json structure - simple string arrays
export const hardSkillsData: HardSkill[] = [
  "React",
  "Node.js", 
  "MongoDB",
  "Express",
  "TypeScript"
];

export const softSkillsData: SoftSkill[] = [
  "Teamwork",
  "Decision Making",
  "Mentoring",
  "Resilience"
];

export const educationData: Education = {
  degree: "Master",
  fieldOfStudy: "Software Engineering",
  institution: " Ariel University",
  graduationYear: "2017",
  certifications: [], // Optional field for form compatibility
};

export const experienceData: Experience[] = [
  {
    id: "d3f15e3a-bd1f-4ad1-a0c3-92f99c6b162e",
    jobTitle: "Senior Software Engineer",
    company: "Google",
    startDate: "2021-06-01",
    endDate: "2024-01-01",
    isCurrentJob: false,
    description: "Led development of scalable microservices architecture, mentored junior developers, and improved system performance by 40%. Worked with cross-functional teams to deliver high-impact features used by millions of users."
  },
  {
    id: "54c1e7f5-25b4-4b0c-a86d-0b8ec2e1af36",
    jobTitle: "Software Engineer",
    company: "Microsoft",
    startDate: "2019-08-01",
    endDate: "2021-05-31",
    isCurrentJob: false,
    description: "Developed and maintained cloud-based applications using Azure services. Collaborated with product teams to implement new features and optimize existing systems. Reduced deployment time by 60% through automation."
  },
  {
    id: "9a63f5be-cc9f-4d83-9b8c-684ba4165df7",
    jobTitle: "Junior Developer",
    company: "Startup Inc",
    startDate: "2018-06-01",
    endDate: "2019-07-31",
    isCurrentJob: false,
    description: "Built responsive web applications using React and Node.js. Participated in agile development process and contributed to code reviews. Helped establish best practices for the development team."
  }
];

export const projectsData: Project[] = [
  {
    id: "e6e7c634-9b7c-43cc-9392-2f2649870871",
    projectName: "SmartTask  Manager",
    description: "A task mamangement web app with real-tim,e collaboration and progress tracking.",
    projectTech: [
      "React",
      "Socket.io"
    ],
    projectLink: "https://smarttask.example.com"
  },
  {
    id: "51e35956-f5e7-42ea-8b1e-6f9efdc11db0",
    projectName: "DevPortfolio AI",
    description: "An AI-powered resume builder that generates tailored CVs based on user input.",
    projectTech: [
      "Next.js",
      "Chakra UI",
      "TypeScript",
      "OpenAI API"
    ],
    projectLink: "https://devportfolio-ai.example.com"
  },
  {
    id: "f2406c29-4e8e-44ed-8948-47f3f16b0303",
    projectName: "Whatapp alike",
    description: "it's like an whats app message app",
    projectTech: [
      "Node.js",
      "React",
      "Sheker.io",
      "Bullshit.ts",
      "notexistpackage",
      "aaa"
    ],
    projectLink: "https://whatsapp-alike.ai"
  }
];

export const preferencesData: Preferences = {
  cvStyle: "minimal",
  cvPurpose: "freelance",
  professionalPreference: "fullstack developer",
  experienceLevel: "entry level (0-2 years)",
  industryPreference: "technology",
  targetSalaryRange: "$150,000 - $200,000",
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
