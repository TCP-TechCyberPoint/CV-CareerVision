export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: Date;
  endDate?: Date | null;
  isCurrentJob: boolean;
  description?: string;
}
