import { Request, Response } from "express";
import * as AuthService from "../services/authService";

type AuthResponse = {
  status: number;
  message: string;
  token?: string;
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
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

export const getToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await fetch('https://dev-6jktmbydkkywgiti.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        "client_id": process.env.AUTH0_CLIENT_ID,
        "client_secret": process.env.AUTH0_CLIENT_SECRET,
        "audience": "https://dev-6jktmbydkkywgiti.us.auth0.com/api/v2/",
        "grant_type": "client_credentials"
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    
    res.status(200).json({
      success: true,
      message: "Token fetched successfully",
      data: data
    });
  } catch (error) {
    console.error('Error fetching token:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch token",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
