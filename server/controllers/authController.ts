import { Request, Response } from "express";
import * as AuthService from "../services/authService";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await AuthService.register(req.body);
    res.status(201).json({ message });
    console.log("message", message);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred during registration.";
    res.status(400).json({ error: errorMessage });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await AuthService.login(req.body);
    res.status(200).json({ token });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred during login.";
    res.status(401).json({ error: errorMessage });
  }
};