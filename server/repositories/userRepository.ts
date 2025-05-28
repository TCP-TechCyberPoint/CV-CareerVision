import User, { IUser } from "../models/User";

export const findByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const user = new User(userData);
  return user.save();
};
