import { Request, Response } from "express";
import { generateCvDocx, generateCvBufferOnly, uploadBufferToCloudinary } from "../services/cv-generator/generateCv";
import { getUserCv, updateUserCv } from "../repositories/userRepository";
import { ICv } from "../models/types";

export const generateCv = generateCvDocx;

export const getCvData = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const cv = await getUserCv(email);
    if (!cv) return res.status(404).json({ error: "CV data not found" });

    res.status(200).json({ message: "CV data fetched successfully", cv });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch CV data" });
  }
};

export const saveCvData = async (req: Request, res: Response) => {
  try {
    const { email, ...cvData } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const updatedUser = await updateUserCv(email, cvData as Partial<ICv>);
    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "CV data saved successfully", cv: updatedUser.cv });
  } catch (error) {
    res.status(500).json({ error: "Failed to save CV data" });
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
