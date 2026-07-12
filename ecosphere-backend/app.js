import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRouter from './src/routes/api.router.js';
import { errorHandler, notFoundHandler } from './src/middleware/error.middleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './src/config/swagger.js';

const app = express();

// Security and utility middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(compression());
app.use(morgan('dev'));

// Parsing middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static folder for uploads
app.use('/uploads', express.static('uploads'));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'EcoSphere API is running' });
});

// API Routes
app.use('/api', apiRouter);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
