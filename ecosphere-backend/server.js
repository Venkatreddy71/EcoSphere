import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './src/config/db.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`[SERVER] EcoSphere Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`[SERVER_ERROR] Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
