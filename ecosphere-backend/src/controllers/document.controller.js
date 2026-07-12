import { extractTextFromImage, extractTextFromPDF } from '../services/ocr.service.js';
import { prisma } from '../config/db.js';
import aiService from '../services/ai.service.js';
import fs from 'fs';

export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }

    const { path: filePath, originalname, mimetype } = req.file;
    let extractedText = '';

    // Extract text based on file type
    if (mimetype === 'application/pdf') {
      extractedText = await extractTextFromPDF(filePath);
    } else if (mimetype.startsWith('image/')) {
      extractedText = await extractTextFromImage(filePath);
    } else {
      // Remove unhandled file
      fs.unlinkSync(filePath);
      return res.status(400).json({ status: 'error', message: 'Unsupported file type' });
    }

    // Save document to DB
    const document = await prisma.document.create({
      data: {
        name: originalname,
        url: filePath,
        type: mimetype,
        uploadedBy: req.user.id,
        extractedData: { rawText: extractedText.substring(0, 1000) } // Limit raw text size in DB
      }
    });

    res.status(201).json({
      status: 'success',
      data: {
        document,
        message: 'Document uploaded and OCR processed successfully.'
      }
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};
