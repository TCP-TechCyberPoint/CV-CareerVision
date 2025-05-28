import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import * as userRepository from "../repositories/userRepository";
import dotenv from "dotenv";

dotenv.config();

interface AuthCredentials {
  email: string;
  password: string;
}

// טוען את הסוד של JWT מה־env
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export const register = async ({ email, password }: AuthCredentials): Promise<string> => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("A user with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await userRepository.createUser({ email, password: hashedPassword });

  return "User registered successfully.";
};

export const login = async ({ email, password }: AuthCredentials): Promise<string> => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("User not found. Please register first.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
  return token;
};
