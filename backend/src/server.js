// ⚠️ LOAD DOTENV FIRST
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";

import dbTestRoute from "./routes/dbTest.route.js";
import authRoutes from "./routes/auth.route.js";
import protectedRoute from "./routes/protected.route.js";
import reviewRoute from "./routes/review.route.js";

console.log("🔑 GEMINI_API_KEY loaded:", !!process.env.GEMINI_API_KEY);
console.log("📦 MONGODB_URI loaded:", !!process.env.MONGO_URI);

connectDB();

const app = express();

// ✅ FIXED: Apply CORS globally instead of using app.options
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://code-sensei-ten.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

app.use(dbTestRoute);
app.use("/auth", authRoutes);
app.use(protectedRoute);
app.use(reviewRoute);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// ✅ 404 handler - must be last
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});