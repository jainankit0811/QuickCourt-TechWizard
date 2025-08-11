
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import connectDB from './db/db.js';
import facilityRoutes from './routes/facility.routes.js';
import profileRoutes from './routes/profile.routes.js';
import userRoutes from './routes/user.routes.js';
connectDB(); // Connect to MongoDB


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/facilities', facilityRoutes);
app.use('/profile', profileRoutes);
// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Mount user routes at /api/auth
app.use('/api/auth', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;

