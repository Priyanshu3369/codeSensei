import dotenv from "dotenv";
dotenv.config();

// Imports
import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";

import dbTestRoute from "./routes/dbTest.route.js";
import authRoutes from "./routes/auth.route.js";
import protectedRoute from "./routes/protected.route.js";
import reviewRoute from "./routes/review.route.js";

// Verify envs
console.log("🔑 GEMINI_API_KEY loaded:", !!process.env.GEMINI_API_KEY);
console.log("📦 MONGODB_URI loaded:", !!process.env.MONGO_URI);

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://code-sensei-ten.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());

// Routes
app.use(dbTestRoute);
app.use(authRoutes);
app.use(protectedRoute);
app.use(reviewRoute);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;