export interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  isCurrentJob: boolean;
  description?: string | null;
}
