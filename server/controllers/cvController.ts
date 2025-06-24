import { Request, Response } from "express";
import { getUserCv, updateUserCv, findByEmail } from "../repositories/userRepository";
import { generateCvDocx, generateCvBufferOnly, uploadBufferToCloudinary } from "../services/cv-generator/generateCv";

import { ICv } from "../models/types";

export const generateCv = generateCvDocx;

export const getCvData = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    
    if (!email) {
      return res.status(400).json({
        error: "Email not found in request",
        message: "User authentication failed"
      });
    }
    
    const cv = await getUserCv(email);
    if (!cv) {
      return res.status(404).json({
        error: "CV data not found",
        userEmail: email
      });
    }
    
    const user = await findByEmail(email);
    res.status(200).json({
      message: "CV data fetched successfully",
      cv,
      user: {
        email: user?.email,
        name: user?.name
      }
    });
  } catch (error) {
    console.error("Error fetching CV data:", error);
    res.status(500).json({
      error: "Failed to fetch CV data",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const saveCvData = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const cvData = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email not found in request",
        message: "User authentication failed"
      });
    }
    
    const updatedUser = await updateUserCv(email, cvData as Partial<ICv>);

    if (!updatedUser) {
      return res.status(404).json({
        error: "User not found in database",
        userEmail: email
      });
    }

    res.status(200).json({
      message: "CV data saved successfully",
      cv: updatedUser.cv,
      user: {
        email: updatedUser.email,
        name: updatedUser.name
      }
    });
  } catch (error) {
    console.error("Error saving CV data:", error);
    res.status(500).json({
      error: "Failed to save CV data",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const uploadCvOnly = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const email = formData?.vitals?.email;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const buffer = await generateCvBufferOnly(formData);
    const publicId = `cv_${email.replace(/[^a-zA-Z0-9]/g, "_")}`;
    const result = await uploadBufferToCloudinary(buffer, publicId);

    res.status(200).json({ message: "Uploaded to Cloudinary", url: result.secure_url });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to upload CV" });
  }
};