import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import * as connectRedisPkg from 'connect-redis';
import connectDB from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import courtRoutes from './routes/courtRoutes.js';
import facilityRoutes from './routes/facilityRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import timeSlotInitRoutes from './routes/timeSlotInitRoutes.js';
import timeSlotRoutes from './routes/timeSlotRoutes.js';
import userRoutes from './routes/userRoutes.js';
import redisClient from './services/redis.service.js';

dotenv.config();
connectDB();

const app = express();

// Derive __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files temporarily

// Session store (Redis)
try {
  const RedisStore = (connectRedisPkg.default || connectRedisPkg)(session);
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET || 'quickcourt_secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      },
    })
  );
} catch (e) {
  console.warn('Session store init failed, falling back to MemoryStore:', e?.message);
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/timeslots', timeSlotRoutes);
app.use('/api/timeslots', timeSlotInitRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courts', courtRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;