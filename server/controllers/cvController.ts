import { Request, Response } from 'express';
import { generateCvPdf } from '../services/cv-generator/generateCv';

export const generateCv = async (req: Request, res: Response) => {

  const formData = req.body;

    // ✅ Log the received data
    console.log("Received CV form data:", JSON.stringify(formData, null, 2));
  try {
    const pdfBuffer = await generateCvPdf(req.body);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');
    res.send(pdfBuffer);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to generate CV' });
  }
};
