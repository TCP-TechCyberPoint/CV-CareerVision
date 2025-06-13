export type Gender = "Male" | "Female" | "Other";
export interface Vitals {
  name: string;
  dateOfBirth: Date;
  gender: Gender;
  email: string;
  country: string;
  city: string;
  street: string;
  phone: string;
  linkedin: string;
  github: string;
}
