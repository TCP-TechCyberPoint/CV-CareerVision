export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
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

}
