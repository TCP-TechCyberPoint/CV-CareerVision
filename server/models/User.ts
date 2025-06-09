import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  cv?: Array<Schema.Types.Mixed>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cv: {
    type: [Schema.Types.Mixed],
    required: false,
    default: []
  }
});

export default mongoose.model<IUser>("User", userSchema, "users");
