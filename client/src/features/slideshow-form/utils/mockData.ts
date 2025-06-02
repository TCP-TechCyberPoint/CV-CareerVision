// Mock data for dashboard cards - replace with real data from your store/API

export const vitalsData = {
  name: "John Doe",
  dateOfBirth: new Date(1990, 4, 15), // May 15, 1990
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  country: "United States",
  city: "San Francisco",
  street: "123 Tech Street, Apt 4B",
  completion: 75,
};

export const hardSkillsData = {
  totalSkills: 8,
  categories: ["Frontend", "Backend", "Database"],
  topSkills: ["React", "Node.js", "Python", "PostgreSQL"],
  completion: 60,
};

export const softSkillsData = {
  topSkills: [
    { name: "Communication", level: 90 },
    { name: "Leadership", level: 85 },
    { name: "Teamwork", level: 95 },
  ],
  totalSkills: 12,
  categories: ["Communication", "Leadership", "Problem Solving"],
  completion: 70,
};

export const educationData = {
  latestDegree: "Bachelor of Computer Science",
  institution: "Stanford University",
  graduationYear: "2019",
  totalDegrees: 2,
  certifications: ["AWS Certified", "React Developer", "Scrum Master"],
  gpa: "3.8",
  completion: 90,
};

export const experienceData = {
  currentRole: "Senior Software Engineer",
  currentCompany: "Tech Solutions Inc.",
  totalExperience: "5+ years",
  totalJobs: 3,
  recentCompanies: ["Tech Solutions Inc.", "StartupCorp", "DevAgency"],
  completion: 80,
};

export const projectsData = {
  totalProjects: 8,
  featuredProjects: ["E-commerce Platform", "Task Manager App"],
  technologies: ["React", "Node.js", "MongoDB", "TypeScript"],
  githubRepos: 15,
  liveProjects: 5,
  completion: 45,
};

export const preferencesData = {
  preferredRole: "Senior Frontend Developer",
  workType: "Remote",
  location: "Anywhere",
  salaryRange: "$80k - $120k",
  jobType: "Full-time",
  industries: ["Tech", "Fintech", "Healthcare"],
  completion: 30,
};

// Overall profile completion calculation
export const calculateOverallCompletion = () => {
  const sections = [
    vitalsData.completion,
    hardSkillsData.completion,
    softSkillsData.completion,
    educationData.completion,
    experienceData.completion,
    projectsData.completion,
    preferencesData.completion,
  ];
  
  const totalCompletion = sections.reduce((sum, completion) => sum + completion, 0);
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
export const mockData = {
  vitals: vitalsData,
  hardSkills: hardSkillsData,
  softSkills: softSkillsData,
  education: educationData,
  experience: experienceData,
  projects: projectsData,
  preferences: preferencesData,
}; 