import { Request, Response } from "express";
import { generateCvDocx } from "../services/cv-generator/generateCv";
import { updateUserCv } from "../repositories/userRepository";
import { ICv } from "../models/types";

export const generateCv = generateCvDocx;

export const saveCvData = async (req: Request, res: Response) => {
  try {
    const { email, ...cvData } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }
    const updatedUser = await updateUserCv(email, cvData as Partial<ICv>);

    if (!updatedUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      message: "CV data saved successfully",
      cv: updatedUser.cv,
    });
  } catch (error) {
    console.error("Error saving CV data:", error);
    res.status(500).json({
      error: "Failed to save CV data",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
