import { Request, Response } from 'express';
import { generateCvDocx } from '../services/cv-generator/generateCv';
import User from '../models/User';

export const generateCv = generateCvDocx;

export const saveCvData = async (req: Request, res: Response) => {
  try {
    const { email, sectionData, sectionName } = req.body;

    if (!email || !sectionData || !sectionName) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, sectionData, sectionName' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Initialize cv array if it doesn't exist
    if (!user.cv) {
      user.cv = [];
    }

    // Find existing section or create new one
    const existingSectionIndex = user.cv.findIndex(
      (item: any) => item.sectionName === sectionName
    );

    if (existingSectionIndex !== -1) {
      // Update existing section
      user.cv[existingSectionIndex] = {
        sectionName,
        sectionData,
        updatedAt: new Date()
      };
    } else {
      // Add new section
      user.cv.push({
        sectionName,
        sectionData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await user.save();

    res.status(200).json({ 
      message: 'CV data saved successfully',
      sectionName,
      updatedAt: new Date()
    });

  } catch (error) {
    console.error('Error saving CV data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loadCvData = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return CV data
    res.status(200).json({ 
      cv: user.cv || [],
      message: 'CV data loaded successfully'
    });

  } catch (error) {
    console.error('Error loading CV data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
