export interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  description?: string;
  previousJobs?: PreviousJob[];
}

export interface PreviousJob {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
}
