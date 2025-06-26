import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import dotenv from "dotenv";
import { createUser, findByEmail } from "../repositories/userRepository";

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

const register = async ({ name, email, password }: RegisterCredentials) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hashedPassword });

    return { status: 201, data: { user } };
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Check if it's a duplicate email error
      if (error.message.includes("already exists")) {
        return { status: 409, data: { message: error.message } };
      }
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

export { register, login };
