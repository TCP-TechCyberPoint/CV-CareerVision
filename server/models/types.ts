import { Schema } from "mongoose";
import { isValidUUID, type UUIDv4 } from "../utils/uuid";

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
    dateOfBirth: string;
    linkedin: string;
    github: string;
  };
  education?: {
    degree: string;
    fieldOfStudy: string;
    graduationYear: string;
    institution: string;
  };
  experience?: Array<{
    id: UUIDv4;          // Enforced UUID v4
    jobTitle: string;
    company: string;
    startDate: string;
    endDate?: string;
    isCurrentJob: boolean;
    description: string;
  }>;
  projects?: Array<{
    id: UUIDv4;          // Enforced UUID v4
    projectName: string;
    description: string;
    projectTech: string[];
    projectLink: string;
  }>;
  hardSkills?: string[];
  softSkills?: string[];
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
        id: { 
          type: String, 
          required: true,
          validate: {
            validator: isValidUUID,
            message: 'Experience ID must be a valid UUID v4'
          }
        },
        jobTitle: { type: String, required: true },
        company: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: false },
        isCurrentJob: { type: Boolean, required: true, default: false },
        description: { type: String, required: true },
      },
    ],
    projects: [
      {
        id: { 
          type: String, 
          required: true,
          validate: {
            validator: isValidUUID,
            message: 'Project ID must be a valid UUID v4'
          }
        },
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

// Pre-save middleware to handle endDate/isCurrentJob dependency
cvSchema.pre('save', function() {
  if (this.experience && Array.isArray(this.experience)) {
    this.experience.forEach((exp: any) => {
      // If endDate is falsy (null, undefined, empty string), set isCurrentJob to true
      if (!exp.endDate || exp.endDate.trim() === '') {
        exp.isCurrentJob = true;
        exp.endDate = null; // Ensure consistency
      } else {
        // If endDate has a value, set isCurrentJob to false
        exp.isCurrentJob = false;
      }
    });
  }
});

// Pre-update middleware to handle endDate/isCurrentJob dependency during updates
cvSchema.pre(['updateOne', 'findOneAndUpdate', 'updateMany'], function() {
  const update = this.getUpdate() as any;
  
  if (update && update.experience && Array.isArray(update.experience)) {
    update.experience.forEach((exp: any) => {
      // If endDate is falsy (null, undefined, empty string), set isCurrentJob to true
      if (!exp.endDate || exp.endDate.trim() === '') {
        exp.isCurrentJob = true;
        exp.endDate = null; // Ensure consistency
      } else {
        // If endDate has a value, set isCurrentJob to false
        exp.isCurrentJob = false;
      }
    });
  }
});
