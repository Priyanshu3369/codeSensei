// ⚠️ LOAD DOTENV FIRST - BEFORE ANY OTHER IMPORTS
import dotenv from "dotenv";
dotenv.config();

// NOW import everything else
import express from "express";
import cors from "cors";
import connectDB from './utils/db.js';
import dbTestRoute from './routes/dbTest.route.js';
import authRoutes from './routes/auth.route.js';
import protectedRoute from './routes/protected.route.js';
import reviewRoute from './routes/review.route.js';

// Verify environment variables loaded
console.log('🔑 GEMINI_API_KEY loaded:', !!process.env.GEMINI_API_KEY);
console.log('📦 MONGODB_URI loaded:', !!process.env.MONGO_URI);

connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://code-sensei-jet.vercel.app/'
  ],
  credentials: true
}));
app.use(express.json());
app.use(dbTestRoute);
app.use(authRoutes);
app.use(protectedRoute);
app.use(reviewRoute);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});