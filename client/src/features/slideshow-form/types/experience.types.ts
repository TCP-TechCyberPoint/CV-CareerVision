export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean | string;
  description?: string;
}
