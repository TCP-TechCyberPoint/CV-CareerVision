import { Schema } from "mongoose";

export interface ICv {
  vitals?: {
    name: string;
    age: number;
    gender: string;
    email: string;
  };
  education?: {
    degree: string;
    fieldOfStudy: string;
    year: string;
    institution: string;
  };
  experiences?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
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

export const cvSchema = new Schema<ICv>({
  vitals: {
    name: { type: String, required: false },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    email: { type: String, required: false }
  },
  education: {
    degree: { type: String, required: false },
    fieldOfStudy: { type: String, required: false },
    year: { type: String, required: false },
    institution: { type: String, required: false }
  },
  experiences: [{
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: false },
    description: { type: String, required: true }
  }],
  projects: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    link: { type: String, required: false }
  }],
  hardSkills: {
    categories: [{
      name: { type: String, required: true },
      skills: [{ type: String, required: true }]
    }]
  },
  softSkills: {
    categories: [{
      name: { type: String, required: true },
      skills: [{ type: String, required: true }]
    }]
  },
  preferences: {
    cvStyle: { type: String, required: false },
    cvPurpose: { type: String, required: false },
    professionalPreference: { type: String, required: false },
    experienceLevel: { type: String, required: false },
    industryPreference: { type: String, required: false },
    targetSalaryRange: { type: String, required: false }
  }
}, { _id: false }); 