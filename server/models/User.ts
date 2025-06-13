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
  email: { type: String, required: true },
  password: { type: String, required: true },
  cv: {
    type: cvSchema,
    required: false,
    default: () => ({})
  }
});

export default mongoose.model<IUser>("User", userSchema, "users");
