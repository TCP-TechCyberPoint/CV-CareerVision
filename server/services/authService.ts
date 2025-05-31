import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import * as userRepository from "../repositories/userRepository";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const EXPIRES_IN = process.env.EXPIRES_IN || "7d";

interface RegisterCredentials {
  name: IUser["name"];
  email: IUser["email"];
  password: IUser["password"];
}

interface LoginCredentials {
  email: IUser["email"];
  password: IUser["password"];
}

const register = async (credentials: RegisterCredentials) => {
  try {
    const { name, email, password } = credentials;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return {
        status: 400,
        message: "User already exists.",
      };
    }
    await userRepository.createUser({ name, email, password: hashedPassword });
    return {
      status: 201,
      message: "User created successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Failed to register.",
    };
  }
};

const login = async (credentials: LoginCredentials) => {
  try {
    const { email, password } = credentials;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return {
        status: 404,
        message: "Email not found.",
      };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        message: "Invalid email or password.",
      };
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    return {
      status: 200,
      message: "Login successful",
      token,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Login failed",
    };
  }
};

const validateToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await userRepository.findById(decoded.userId);
    
    if (!user) {
      return {
        valid: false,
        message: "User not found",
      };
    }

    return {
      valid: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    return {
      valid: false,
      message: "Invalid token",
    };
  }
};

export { register, login, validateToken };
