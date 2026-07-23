import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import studentRoutes from './routes/studentRoutes.js'; // Added import

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error.message));

// Routes
app.use('/api/students', studentRoutes); // Added route middleware

// Basic test route
app.get('/', (req, res) => {
  res.send('Auspify Student Management API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});