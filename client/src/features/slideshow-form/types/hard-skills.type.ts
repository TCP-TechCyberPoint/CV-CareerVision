// Hard Skills Types
export type HardSkillCategory = 
  | "Fullstack" 
  | "Frontend" 
  | "Backend" 
  | "QA" 
  | "DevOps" 
  | "Product Manager" 
  | "React JS" 
  | "Vue" 
  | "CSS" 
  | "Design Systems" 
  | "Nodejs" 
  | "Express" 
  | "Auth" 
  | "Cypress" 
  | "Selenium" 
  | "Postman" 
  | "Docker" 
  | "CI_CD" 
  | "Kubernetes" 
  | "Agile" 
  | "Scrum";

export type FullstackSkill = "React.js" | "Node.js" | "MongoDB" | "Express" | "TypeScript";
export type FrontendSkill = "React" | "Vue" | "CSS" | "HTML" | "Tailwind" | "Design Systems";
export type BackendSkill = "Node.js" | "Express" | "PostgreSQL" | "MongoDB" | "Redis" | "Auth";
export type QASkill = "Manual Testing" | "Cypress" | "Selenium" | "Postman" | "Test Planning";
export type DevOpsSkill = "Docker" | "CI/CD" | "Kubernetes" | "Monitoring" | "AWS";
export type ProductManagerSkill = "Agile" | "Scrum" | "Roadmapping" | "User Stories" | "Prioritization";
export type ReactJSSkill = "Hooks" | "Redux" | "Next.js" | "Testing Library";
export type VueSkill = "Vuex" | "Pinia" | "Nuxt";
export type CSSSkill = "Flexbox" | "Grid" | "Animations";
export type DesignSystemsSkill = "Storybook" | "Chakra UI" | "Material UI";
export type NodejsSkill = "NestJS" | "Socket.io" | "TypeScript";
export type ExpressSkill = "Middlewares" | "Validation" | "Routing";
export type AuthSkill = "JWT" | "OAuth" | "Session Management";
export type CypressSkill = "Test Automation" | "UI Testing" | "Component Testing";
export type SeleniumSkill = "WebDriver" | "Cross-browser Testing";
export type PostmanSkill = "API Testing" | "Collections" | "Environments";
export type DockerSkill = "Docker Compose" | "Dockerfile" | "Image Optimization";
export type CICDSkill = "GitHub Actions" | "GitLab CI" | "Bitbucket Pipelines";
export type KubernetesSkill = "Helm" | "Services" | "Clusters";
export type AgileSkill = "Sprints" | "Kanban" | "Retrospectives";
export type ScrumSkill = "Scrum Master" | "Daily Standups" | "Backlog Grooming";

export type HardSkill = 
  | FullstackSkill 
  | FrontendSkill 
  | BackendSkill 
  | QASkill 
  | DevOpsSkill 
  | ProductManagerSkill 
  | ReactJSSkill 
  | VueSkill 
  | CSSSkill 
  | DesignSystemsSkill 
  | NodejsSkill 
  | ExpressSkill 
  | AuthSkill 
  | CypressSkill 
  | SeleniumSkill 
  | PostmanSkill 
  | DockerSkill 
  | CICDSkill 
  | KubernetesSkill 
  | AgileSkill 
  | ScrumSkill;

// Selected Hard Skills Types (for form data)
export type SelectedHardSkills = {
  [K in HardSkillCategory]?: HardSkill[];
}; 