import { Request, Response } from "express";
import * as AuthService from "../services/authService";

type AuthResponse = {
  status: number;
  message: string;
  token?: string;
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result: AuthResponse = await AuthService.register(req.body);
    res.status(result.status).json({ message: result.message });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during registration.";
    res.status(400).json({ error: errorMessage });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: AuthResponse = await AuthService.login(req.body);
    if (result.token) {
      res
        .status(result.status)
        .json({ message: result.message, token: result.token });
    } else {
      console.log("result", result);
      res.status(result.status).json({ message: result.message });
    }
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred during login.";
    res.status(401).json({ error: errorMessage });
  }
};

export const validateToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const result = await AuthService.validateToken(token);
    
    if (result.valid) {
      res.status(200).json({ 
        message: "Token is valid", 
        user: result.user 
      });
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during token validation.";
    res.status(401).json({ error: errorMessage });
  }
};
