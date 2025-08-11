import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';
import connectDB from './db/db.js';
import redisClient from './services/redis.service.js';
import authRoutes from './routes/authRoutes.js';
// import bookingRoutes from './routes/bookingRoutes.js';
// import facilityRoutes from './routes/facilityRoutes.js';
// import courtRoutes from './routes/courtRoutes.js';
// import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();
const RedisStore = connectRedis(session);

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

app.use('/api/auth', authRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/facilities', facilityRoutes);
// app.use('/api/courts', courtRoutes);
// app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;