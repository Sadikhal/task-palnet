import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';

import { connect } from './lib/db.js';

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: [process.env.ORIGIN || 'http://localhost:5173'],
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use("/api/posts", postRoutes);

app.use((err, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({ success: false, status, message });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  connect();
  console.log(`Backend server is running on port ${PORT}!`);
});
