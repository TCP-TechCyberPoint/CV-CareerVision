export interface Project {
  id: string;
  projectName: string;
  description: string;
  projectTech: string[];
  projectLink: string;
}

export interface Projects {
  projects: Project[];
} 