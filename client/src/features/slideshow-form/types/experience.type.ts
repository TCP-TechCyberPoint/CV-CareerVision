export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string, optional for current job
  isCurrentJob: boolean;
  description?: string;
}

export type ExperienceFormData = {
  experiences: Experience[];
}; 