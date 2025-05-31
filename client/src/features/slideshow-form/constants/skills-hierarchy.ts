import type { SoftSkillsHierarchy, HardSkillsHierarchy } from "../types/skills.type";

export const SOFT_SKILLS_HIERARCHY: SoftSkillsHierarchy = {
  Communication: {
    skills: ["Written", "Verbal", "Feedback"],
    color: "cyan",
  },
  Collaboration: {
    skills: ["Teamwork", "Pair Programming", "Knowledge Sharing"],
    color: "teal",
  },
  Leadership: {
    skills: ["Decision Making", "Mentoring", "Vision Sharing"],
    color: "yellow",
  },
  Adaptability: {
    skills: ["Change Management", "Learning", "Resilience"],
    color: "pink",
  },
  ProblemSolving: {
    skills: ["Root Cause Analysis", "Debugging", "Design Thinking"],
    color: "blue",
  },
} as const;

export const HARD_SKILLS_HIERARCHY: HardSkillsHierarchy = {
  Fullstack: {
    skills: ["React.js", "Node.js", "MongoDB", "Express", "TypeScript"],
    color: "purple",
  },
  Frontend: {
    skills: ["React", "Vue", "CSS", "HTML", "Tailwind", "Design Systems"],
    color: "cyan",
  },
  Backend: {
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Auth"],
    color: "green",
  },
  QA: {
    skills: [
      "Manual Testing",
      "Cypress",
      "Selenium",
      "Postman",
      "Test Planning",
    ],
    color: "orange",
  },
  DevOps: {
    skills: ["Docker", "CI/CD", "Kubernetes", "Monitoring", "AWS"],
    color: "blue",
  },
  "Product Manager": {
    skills: ["Agile", "Scrum", "Roadmapping", "User Stories", "Prioritization"],
    color: "yellow",
  },
  "React JS": {
    skills: ["Hooks", "Redux", "Next.js", "Testing Library"],
    color: "cyan",
  },
  Vue: {
    skills: ["Vuex", "Pinia", "Nuxt"],
    color: "green",
  },
  CSS: {
    skills: ["Flexbox", "Grid", "Animations"],
    color: "pink",
  },
  "Design Systems": {
    skills: ["Storybook", "Chakra UI", "Material UI"],
    color: "purple",
  },
  Nodejs: {
    skills: ["NestJS", "Socket.io", "TypeScript"],
    color: "green",
  },
  Express: {
    skills: ["Middlewares", "Validation", "Routing"],
    color: "green",
  },
  Auth: {
    skills: ["JWT", "OAuth", "Session Management"],
    color: "orange",
  },
  Cypress: {
    skills: ["Test Automation", "UI Testing", "Component Testing"],
    color: "teal",
  },
  Selenium: {
    skills: ["WebDriver", "Cross-browser Testing"],
    color: "orange",
  },
  Postman: {
    skills: ["API Testing", "Collections", "Environments"],
    color: "red",
  },
  Docker: {
    skills: ["Docker Compose", "Dockerfile", "Image Optimization"],
    color: "blue",
  },
  CI_CD: {
    skills: ["GitHub Actions", "GitLab CI", "Bitbucket Pipelines"],
    color: "orange",
  },
  Kubernetes: {
    skills: ["Helm", "Services", "Clusters"],
    color: "blue",
  },
  Agile: {
    skills: ["Sprints", "Kanban", "Retrospectives"],
    color: "yellow",
  },
  Scrum: {
    skills: ["Scrum Master", "Daily Standups", "Backlog Grooming"],
    color: "purple",
  },
} as const;
