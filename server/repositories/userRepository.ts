import User, { IUser } from "../models/User";
import { ICv } from "../models/types";

export const findByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

export const findById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

export const userExists = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ email }).select('_id');
  return !!user;
};

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const existingUser = await findByEmail(userData.email!);
  if (existingUser) {
    throw new Error(`User with email ${userData.email} already exists`);
  }

  try {
    const user = new User(userData);
    return await user.save();
  } catch (error: any) {
    // Handle MongoDB duplicate key error (in case the check above fails)
    if (error.code === 11000 && error.keyPattern?.email) {
      throw new Error(`User with email ${userData.email} already exists`);
    }
    throw error;
  }
};

export const getUserCv = async (email: string): Promise<ICv | null> => {
  const user = await User.findOne({ email });
  return user?.cv || null;
};

export const updateUserCv = async (
  email: string,
  cvData: Partial<ICv>
): Promise<IUser | null> => {
  const updateQuery = Object.entries(cvData).reduce((acc, [key, value]) => {
    if (key === "hardSkills" && typeof value === "object") {
      acc[`cv.${key}`] = new Map(Object.entries(value));
    } else {
      acc[`cv.${key}`] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $set: updateQuery },
    { new: true }
  );
  return updatedUser;
};
