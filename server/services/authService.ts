import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import dotenv from "dotenv";
import { createUser, findByEmail } from "../repositories/userRepository";
import crypto from "crypto";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";
// const EXPIRES_IN = process.env.EXPIRES_IN || "7d";

interface RegisterCredentials {
  name: IUser["name"];
  email: IUser["email"];
  password: IUser["password"];
}

interface LoginCredentials {
  email: IUser["email"];
  password: IUser["password"];
}

interface LinkedInUserData {
  sub: string;
  email_verified: boolean;
  name: string;
  locale: { country: string; language: string };
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
}

const register = async ({ name, email, password }: RegisterCredentials) => {
  try {
    const existingUser = await findByEmail(email);
    if (existingUser) {
      return { status: 400, data: { message: "User already exists" } };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hashedPassword });

    return { status: 201, data: { user } };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { status: 400, data: { message: error.message } };
    }
    return { status: 400, data: { message: "An unknown error occurred" } };
  }
};

const login = async ({ email, password }: LoginCredentials) => {
  try {
    const user: Partial<IUser> | null = await findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password!))) {
      return { status: 401, data: { message: "Invalid email or password" } };
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    return { status: 200, data: { token, user: userWithoutPassword } };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { status: 500, data: { message: error.message } };
    }
    return { status: 500, data: { message: "An unknown error occurred" } };
  }
};

const linkedinAuth = async (userData: LinkedInUserData) => {
  try {
    const { email, name } = userData;
    
    const existingUser = await findByEmail(email);
    
    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      const userWithoutPassword = {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      };

      return { status: 200, data: { token, user: userWithoutPassword } };
    } else {
      // User doesn't exist, create new user with random password
      const randomPassword = crypto.randomBytes(32).toString('hex');
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      
      const newUser = await createUser({ 
        name, 
        email, 
        password: hashedPassword 
      });

      // Generate token for the new user
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      const userWithoutPassword = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      };

      return { status: 201, data: { token, user: userWithoutPassword } };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { status: 500, data: { message: error.message } };
    }
    return { status: 500, data: { message: "An unknown error occurred" } };
  }
};

export { register, login, linkedinAuth };
