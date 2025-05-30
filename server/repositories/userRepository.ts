import User, { IUser } from "../models/User";

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
