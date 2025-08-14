// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import { initORM } from './shared/utils/db/connection';
import dotenv from 'dotenv';
import { indexRoute } from './api/v1';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from our frontend
app.use(express.json()); // To parse JSON request bodies
app.use('/api/v1',indexRoute);
// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

// Initialize Database and Start Server
const startServer = async () => {
  try {
    await initORM();
    console.log('✅ Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();