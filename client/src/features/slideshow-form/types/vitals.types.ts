export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
export interface Vitals {
  name: string;
  age: number;
  gender: Gender;
  email: string;
}
