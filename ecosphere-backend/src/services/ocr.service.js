import Tesseract from 'tesseract.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import fs from 'fs';

export const extractTextFromImage = async (filePath) => {
  try {
    const result = await Tesseract.recognize(filePath, 'eng');
    return result.data.text;
  } catch (error) {
    console.error('[OCR_ERROR]', error);
    throw new Error('Failed to extract text from image');
  }
};

export const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('[PDF_ERROR]', error);
    throw new Error('Failed to extract text from PDF');
  }
};
