import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log(`[SOCKET] Client connected: ${socket.id}`);

    // Allow clients to join rooms (e.g. 'department-xxx' or 'user-xxx')
    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`[SOCKET] Socket ${socket.id} joined room ${room}`);
    });

    socket.on('disconnect', () => {
      console.log(`[SOCKET] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io is not initialized!');
  }
  return io;
};
