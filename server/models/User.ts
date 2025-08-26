import mongoose, { Document, Schema } from "mongoose";
import { ICv, cvSchema } from "./types";

export interface IUser extends Document {
  name?: string;
  email?: string;
  keycloakId: string;
  cv: ICv;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: false },
  email: { 
    type: String, 
    required: false, 
    unique: true,
    index: true,
    sparse: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email: string) {
        if (!email) return true; // Allow empty email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: 'Please provide a valid email address'
    }
  },
  keycloakId: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  cv: {
    type: cvSchema,
    required: false,
    default: () => ({})
  }
}, {
  timestamps: true
});

userSchema.index({ keycloakId: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true, sparse: true });

userSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.toLowerCase().trim();
  }
  next();
});

export default mongoose.model<IUser>("User", userSchema, "users");
