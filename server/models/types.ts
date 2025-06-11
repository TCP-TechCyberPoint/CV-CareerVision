import { Schema } from "mongoose";

export interface ICv {
  vitals?: {
    name: string;
    age: number;
    gender: string;
    email: string;
    country: string;
    city: string;
    street: string;
    phone: string;
    linkedin: string;
    dateOfBirth: string;
    github: string;
  };
  education?: {
    degree: string;
    fieldOfStudy: string;
    graduationYear: string;
    institution: string;
  };
  experience?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
  }>;
  projects?: Array<{
    id: string;
    projectName: string;
    description: string;
    projectTech: string[];
    projectLink: string;
  }>;
  hardSkills?: {
    categories: Array<{
      name: string;
      skills: string[];
    }>;
  };
  softSkills?: {
    categories: Array<{
      name: string;
      skills: string[];
    }>;
  };
  preferences?: {
    cvStyle: string;
    cvPurpose: string;
    professionalPreference: string;
    experienceLevel: string;
    industryPreference: string;
    targetSalaryRange: string;
  };
}

export const cvSchema = new Schema<ICv>(
  {
    vitals: {
      name: { type: String, required: false },
      age: { type: Number, required: false },
      gender: { type: String, required: false },
      email: { type: String, required: false },
      country: { type: String, required: false },
      city: { type: String, required: false },
      street: { type: String, required: false },
      phone: { type: String, required: false },
      linkedin: { type: String, required: false },
      dateOfBirth: { type: String, required: false },
      github: { type: String, required: false },
    },
    education: {
      degree: { type: String, required: false },
      fieldOfStudy: { type: String, required: false },
      graduationYear: { type: String, required: false },
      institution: { type: String, required: false },
    },
    experience: [
      {
        id: { type: String, required: true },
        jobTitle: { type: String, required: true },
        company: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: false },
        isCurrentJob: { type: Boolean, required: true },
        description: { type: String, required: true },
      },
    ],
    projects: [
      {
        id: { type: String, required: true },
        projectName: { type: String, required: true },
        description: { type: String, required: true },
        projectTech: [{ type: String, required: true }],
        projectLink: { type: String, required: false },
      },
    ],
    hardSkills: [String],
    softSkills: [String],

    preferences: {
      cvStyle: { type: String, required: false },
      cvPurpose: { type: String, required: false },
      professionalPreference: { type: String, required: false },
      experienceLevel: { type: String, required: false },
      industryPreference: { type: String, required: false },
      targetSalaryRange: { type: String, required: false },
    },
  },
  { _id: false }
);
