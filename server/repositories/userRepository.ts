import User, { IUser } from "../models/User";
import { ICv } from "../models/types";

export const findByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

export const findById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const user = new User(userData);
  return user.save();
};

export const updateUserCv = async (
  email: string,
  cvData: Partial<ICv>
): Promise<IUser | null> => {
  // Use $set with dot notation to update only the provided fields
  const updateQuery = Object.entries(cvData).reduce((acc, [key, value]) => {
    acc[`cv.${key}`] = value;
    return acc;
  }, {} as Record<string, any>);

  return User.findOneAndUpdate(
    { email },
    { $set: updateQuery },
    { new: true }
  );
};


