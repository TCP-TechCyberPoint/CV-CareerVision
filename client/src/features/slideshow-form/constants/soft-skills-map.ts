export const skillsHierarchy: Record<string, string[]> = {
  // === Top-Level Roles ===
  Fullstack: ["React.js", "Node.js", "MongoDB", "Express", "TypeScript"],
  Frontend: ["React", "Vue", "CSS", "HTML", "Tailwind", "Design Systems"],
  Backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Auth"],
  QA: ["Manual Testing", "Cypress", "Selenium", "Postman", "Test Planning"],
  DevOps: ["Docker", "CI/CD", "Kubernetes", "Monitoring", "AWS"],
  "Product Manager": [
    "Agile",
    "Scrum",
    "Roadmapping",
    "User Stories",
    "Prioritization",
  ],

  // === Frontend Deep ===
  React: ["Hooks", "Redux", "Next.js", "Testing Library"],
  Vue: ["Vuex", "Pinia", "Nuxt"],
  CSS: ["Flexbox", "Grid", "Animations"],
  "Design Systems": ["Storybook", "Chakra UI", "Material UI"],

  // === Backend Deep ===
  Nodejs: ["NestJS", "Socket.io", "TypeScript"],
  Express: ["Middlewares", "Validation", "Routing"],
  Auth: ["JWT", "OAuth", "Session Management"],

  // === QA Deep ===
  Cypress: ["Test Automation", "UI Testing", "Component Testing"],
  Selenium: ["WebDriver", "Cross-browser Testing"],
  Postman: ["API Testing", "Collections", "Environments"],

  // === DevOps Deep ===
  Docker: ["Docker Compose", "Dockerfile", "Image Optimization"],
  CI_CD: ["GitHub Actions", "GitLab CI", "Bitbucket Pipelines"],
  Kubernetes: ["Helm", "Services", "Clusters"],

  // === PM Deep ===
  Agile: ["Sprints", "Kanban", "Retrospectives"],
  Scrum: ["Scrum Master", "Daily Standups", "Backlog Grooming"],

  // === General Soft Skills ===
  Communication: ["Written", "Verbal", "Feedback"],
  Collaboration: ["Teamwork", "Pair Programming", "Knowledge Sharing"],
  Leadership: ["Decision Making", "Mentoring", "Vision Sharing"],
  Adaptability: ["Change Management", "Learning", "Resilience"],
  ProblemSolving: ["Root Cause Analysis", "Debugging", "Design Thinking"],
} as const;

export const skillsColorSchemes: Record<string, string> = {
  // === Top-Level Roles ===
  Fullstack: "purple",
  Frontend: "cyan",
  Backend: "green",
  QA: "orange",
  DevOps: "blue",
  "Product Manager": "yellow",

  // === Frontend Deep ===
  // React Family (Cyan)
  "React.js": "cyan",
  "React": "cyan",
  Hooks: "cyan",
  Redux: "cyan",
  "Next.js": "cyan",
  "Testing Library": "cyan",

  // Vue Family (Green)
  Vue: "green",
  Vuex: "green",
  Pinia: "green",
  Nuxt: "green",

  // CSS Family (Pink)
  CSS: "pink",
  Flexbox: "pink",
  Grid: "pink",
  Animations: "pink",

  // Design Systems Family (Purple)
  "Design Systems": "purple",
  Storybook: "purple",
  "Chakra UI": "purple",
  "Material UI": "purple",

  // === Backend Deep ===
  // Node.js Family (Green)
  "Node.js": "green",
  Nodejs: "green",
  NestJS: "green",
  Express: "green",
  Middlewares: "green",
  Validation: "green",
  Routing: "green",

  // Database Family (Blue)
  MongoDB: "blue",
  PostgreSQL: "blue",
  Redis: "blue",

  // Auth Family (Orange)
  Auth: "orange",
  JWT: "orange",
  OAuth: "orange",
  "Session Management": "orange",

  // === QA Deep ===
  // Cypress Family (Teal)
  Cypress: "teal",
  "Test Automation": "teal",
  "UI Testing": "teal",
  "Component Testing": "teal",

  // Selenium Family (Orange)
  Selenium: "orange",
  "WebDriver": "orange",
  "Cross-browser Testing": "orange",

  // Postman Family (Red)
  Postman: "red",
  "API Testing": "red",
  Collections: "red",
  Environments: "red",

  // === DevOps Deep ===
  // Docker Family (Blue)
  Docker: "blue",
  "Docker Compose": "blue",
  Dockerfile: "blue",
  "Image Optimization": "blue",

  // CI/CD Family (Orange)
  CI_CD: "orange",
  "CI/CD": "orange",
  "GitHub Actions": "orange",
  "GitLab CI": "orange",
  "Bitbucket Pipelines": "orange",

  // Kubernetes Family (Blue)
  Kubernetes: "blue",
  Helm: "blue",
  Services: "blue",
  Clusters: "blue",

  // === PM Deep ===
  // Agile Family (Yellow)
  Agile: "yellow",
  Sprints: "yellow",
  Kanban: "yellow",
  Retrospectives: "yellow",

  // Scrum Family (Purple)
  Scrum: "purple",
  "Scrum Master": "purple",
  "Daily Standups": "purple",
  "Backlog Grooming": "purple",

  // === Soft Skills ===
  // Communication Family (Cyan)
  Communication: "cyan",
  Written: "cyan",
  Verbal: "cyan",
  Feedback: "cyan",

  // Collaboration Family (Teal)
  Collaboration: "teal",
  Teamwork: "teal",
  "Pair Programming": "teal",
  "Knowledge Sharing": "teal",

  // Leadership Family (Red)
  Leadership: "red",
  "Decision Making": "red",
  Mentoring: "red",
  "Vision Sharing": "red",

  // Adaptability Family (Pink)
  Adaptability: "pink",
  "Change Management": "pink",
  Learning: "pink",
  Resilience: "pink",

  // Problem Solving Family (Blue)
  ProblemSolving: "blue",
  "Root Cause Analysis": "blue",
  Debugging: "blue",
  "Design Thinking": "blue",

  // Additional Technologies
  TypeScript: "blue",
  HTML: "orange",
  Tailwind: "cyan",
  AWS: "yellow",
  Monitoring: "red",
} as const;
