import { Request, Response } from "express";
import * as AuthService from "../services/authService";

type AuthResponse = {
  status: number;
  message: string;
  token?: string;
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    const newUser = await AuthService.register({ email, password, name });
    if (newUser.status === 201) {
      const result = await AuthService.login({ email, password });
      res.status(result.status).json(result.data);
    } else res.status(400).json({ message: newUser.data.message });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const result = await AuthService.login({ email, password });
    res.status(result.status).json(result.data);
  } catch (error: unknown) {
    console.log("error", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
