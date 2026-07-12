import 'dotenv/config';
import { app } from './app.js';
import connectDB from './src/config/db.js';

import http from 'http';
import { initSocket } from './src/config/socket.js';

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

// Connect to Database and start server
const startServer = async () => {
  try {
    await connectDB();
    
    server.listen(PORT, () => {
      console.log(`[SERVER] EcoSphere Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`[SERVER_ERROR] Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
