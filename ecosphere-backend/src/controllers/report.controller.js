import { prisma } from '../config/db.js';
import reportGenerator from '../services/reportGenerator.service.js';

export const getReports = async (req, res, next) => {
  try {
    const reports = await prisma.report.findMany({ 
      where: { isDeleted: false },
      include: {
        user: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ status: 'success', data: reports });
  } catch (error) { next(error); }
};

export const generateReport = async (req, res, next) => {
  try {
    const { title, type, filters, content, format } = req.body;
    
    const reportData = {
      title,
      generatedBy: req.user.name,
      content
    };

    let fileUrl = '';
    
    if (format === 'pdf') {
      const filename = `report_${Date.now()}`;
      fileUrl = await reportGenerator.generatePDF(reportData, filename);
    } else if (format === 'csv') {
      const csv = reportGenerator.generateCSV(reportData);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="report_${Date.now()}.csv"`);
      return res.send(csv);
    }

    const report = await prisma.report.create({
      data: {
        title,
        type,
        filters: filters || {},
        generatedBy: req.user.id,
        content: content || {},
        fileUrl
      }
    });

    res.status(201).json({ status: 'success', data: report });
  } catch (error) { next(error); }
};
