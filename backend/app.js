// import express from 'express';
// import dotenv from 'dotenv';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import cors from 'cors';
// import session from 'express-session';
// import cookieParser from 'cookie-parser';
// import connectRedis from 'connect-redis';
// import session from 'express-session';
// import connectDB from './db/db.js';
// import redisClient from './services/redis.service.js';
// import authRoutes from './routes/authRoutes.js';
// // import facilityRoutes from './routes/facilityRoutes.js';
// // import userRoutes from './routes/userRoutes.js';
// // import bookingRoutes from './routes/bookingRoutes.js';
// // import courtRoutes from './routes/courtRoutes.js';
// // import dashboardRoutes from './routes/dashboardRoutes.js'; // New dashboard route

// dotenv.config();
// connectDB();

// const app = express();

// app.use(helmet());
// app.use(morgan('dev'));
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     },
//   })
// );

// app.use('/api/auth', authRoutes);
// // app.use('/facilities', facilityRoutes);
// // app.use('/profile', userRoutes);
// // app.use('/bookings', bookingRoutes);
// // app.use('/courts', courtRoutes);
// // app.use('/dashboard', dashboardRoutes); // New


// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// export default app;

// import express from 'express';
// import dotenv from 'dotenv';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import cors from 'cors';
// import session from 'express-session';
// import cookieParser from 'cookie-parser';
// import { RedisStore } from 'connect-redis'; // Fixed import
// import connectDB from './db/db.js';
// import redisClient from './services/redis.service.js';
// import authRoutes from './routes/authRoutes.js';
// // import facilityRoutes from './routes/facilityRoutes.js';
// // import userRoutes from './routes/userRoutes.js';
// // import bookingRoutes from './routes/bookingRoutes.js';
// // import courtRoutes from './routes/courtRoutes.js';
// // import dashboardRoutes from './routes/dashboardRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();

// app.use(helmet());
// app.use(morgan('dev'));
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     },
//   })
// );

// app.get('/', (req, res) => {
//   res.send('Welcome to QuickCourt API');
// });

// app.use('/api/auth', authRoutes);
// // app.use('/facilities', facilityRoutes);
// // app.use('/profile', userRoutes);
// // app.use('/bookings', bookingRoutes);
// // app.use('/courts', courtRoutes);
// // app.use('/dashboard', dashboardRoutes);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });


// app.listen(process.env.PORT || 3001, () => {
//   console.log(`Server is running on port ${process.env.PORT || 3001}`);
// });

// export default app;

import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { RedisStore } from 'connect-redis';
import connectDB from './db/db.js';
import redisClient from './services/redis.service.js';
import authRoutes from './routes/authRoutes.js';
// import facilityRoutes from './routes/facilityRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import bookingRoutes from './routes/bookingRoutes.js';
// import courtRoutes from './routes/courtRoutes.js';
// import dashboardRoutes from './routes/dashboardRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files temporarily

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);

app.use('/api/auth', authRoutes);
// app.use('/facilities', facilityRoutes);
// app.use('/profile', userRoutes);
// app.use('/bookings', bookingRoutes);
// app.use('/courts', courtRoutes);
// app.use('/dashboard', dashboardRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
} );

export default app;