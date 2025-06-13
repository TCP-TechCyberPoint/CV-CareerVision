// Hard Skills Types
export type HardSkillCategory =
  | "Frontend"
  | "Backend"
  | "QA"
  | "DevOps"
  | "Product Manager"
  | "Blue Team"
  | "Red Team"
  | "Cloud Security"
  | "Scripting & Automation"
  | "Application Security";

// Flattened Hard Skills - direct union of all skill strings
export type HardSkill =
  // Frontend
  | "React" | "Vue" | "CSS" | "HTML" | "Tailwind" | "Design Systems" | "TypeScript"
  | "Redux" | "Next.js" | "Vuex" | "Pinia" | "Nuxt" | "Storybook" | "Chakra UI" | "Material UI"
  // Backend
  | "Node.js" | "Express" | "PostgreSQL" | "MongoDB" | "Redis" | "Auth"
  | "NestJS" | "Socket.io" | "JWT" | "OAuth"
  // QA
  | "Manual Testing" | "Cypress" | "Selenium" | "Postman" | "Test Planning"
  | "Test Automation" | "UI Testing" | "Component Testing" | "WebDriver"
  | "Cross-browser Testing" | "API Testing" | "Collections" | "Environments"
  // DevOps
  | "Docker" | "CI/CD" | "Kubernetes" | "Monitoring" | "AWS"
  | "Docker Compose" | "Dockerfile" | "Image Optimization"
  | "GitHub Actions" | "GitLab CI" | "Bitbucket Pipelines"
  | "Helm" | "Services" | "Clusters"
  // Product Manager
  | "Agile" | "Scrum" | "Roadmapping" | "User Stories" | "Prioritization"
  | "Sprints" | "Kanban" | "Retrospectives" | "Scrum Master"
  | "Daily Standups" | "Backlog Grooming"
  // Blue Team
  | "Splunk" | "QRadar" | "LogRhythm" | "CrowdStrike" | "SentinelOne"
  | "Microsoft Defender" | "Cortex XSOAR" | "Splunk SOAR" | "Palo Alto"
  | "FortiGate" | "Cisco ASA" | "Snort" | "Suricata" | "Cloudflare"
  | "AWS WAF" | "Wireshark" | "tcpdump" | "Active Directory" | "Okta"
  | "Duo" | "McAfee" | "Symantec" | "Nessus" | "Qualys" | "OpenVAS"
  // Red Team
  | "Burp Suite" | "OWASP ZAP" | "Metasploit" | "Nmap" | "Nikto"
  | "SQLmap" | "Kali Linux" | "Parrot OS" | "Hashcat" | "John the Ripper"
  | "Hack The Box" | "TryHackMe"
  // Cloud Security
  | "Azure" | "GCP" | "GuardDuty" | "Azure Sentinel" | "Prisma Cloud"
  | "Falco" | "Aqua Security" | "Terraform" | "Ansible" | "Jenkins"
  | "Vault" | "AWS Secrets Manager"
  // Scripting & Automation
  | "Python" | "Bash" | "PowerShell"
  // Application Security
  | "Snyk" | "SonarQube" | "Checkmarx" | "Git" | "GitHub";

export type SkillColor = "cyan" | "teal" | "yellow" | "pink" | "blue" | "purple" | "green" | "orange" | "red" | "gray";

// Type for the categorized hard skills structure
export interface CategorizedHardSkills {
  [key: string]: HardSkill[];
}

// Type for the skills hierarchy item
export interface SkillHierarchyItem {
  skills: readonly HardSkill[];
  color: SkillColor;
}

// Type for the skills hierarchy
export interface SkillsHierarchy {
  [key: string]: SkillHierarchyItem;
}

// Type for the form data structure
export interface SkillsFormData {
  hardSkills: {
    [K in HardSkillCategory]?: HardSkill[];
  };
  softSkills: string[];
}

// Constants for skill categories
export const BLUE_TEAM_SKILLS: HardSkill[] = [
  "Splunk", "QRadar", "LogRhythm",
  "CrowdStrike", "SentinelOne", "Microsoft Defender",
  "Cortex XSOAR", "Splunk SOAR",
  "Palo Alto", "FortiGate", "Cisco ASA",
  "Snort", "Suricata",
  "Cloudflare", "AWS WAF",
  "Wireshark", "tcpdump",
  "Active Directory", "Okta", "Duo",
  "McAfee", "Symantec",
  "Nessus", "Qualys", "OpenVAS"
];

export const RED_TEAM_SKILLS: HardSkill[] = [
  "Burp Suite", "OWASP ZAP", "Metasploit",
  "Nmap", "Nikto", "SQLmap",
  "Kali Linux", "Parrot OS",
  "Hashcat", "John the Ripper",
  "Hack The Box", "TryHackMe"
];

export const CLOUD_SECURITY_SKILLS: HardSkill[] = [
  "AWS", "Azure", "GCP",
  "GuardDuty", "Azure Sentinel", "Prisma Cloud",
  "Docker", "Kubernetes", "Falco", "Aqua Security",
  "Terraform", "Ansible",
  "Jenkins", "GitHub Actions",
  "Vault", "AWS Secrets Manager"
];

export const SCRIPTING_SKILLS: HardSkill[] = [
  "Python", "Bash", "PowerShell"
];

export const APP_SECURITY_SKILLS: HardSkill[] = [
  "Snyk", "SonarQube", "Checkmarx",
  "Postman",
  "Git", "GitHub"
];






  