import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import dbTestRoute from './routes/dbTest.route.js';
import authRoutes from './routes/auth.route.js';
import protectedRoute from './routes/protected.route.js';
import reviewRoute from './routes/review.route.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
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
