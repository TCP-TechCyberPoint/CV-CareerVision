import mongoose, { Document, Schema } from "mongoose";
import { ICv, cvSchema } from "./types";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  cv: ICv;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: 'Please provide a valid email address'
    }
  },
  password: { type: String, required: true },
  cv: {
    type: cvSchema,
    required: false,
    default: () => ({})
  }
}, {
  timestamps: true
});

userSchema.index({ email: 1 }, { unique: true });

userSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.toLowerCase().trim();
  }
  next();
});

export default mongoose.model<IUser>("User", userSchema, "users");
