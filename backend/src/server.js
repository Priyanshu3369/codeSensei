import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// connect to DB only if MONGO_URI exists
if (process.env.MONGO_URI) {
  connectDB();
}

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API running successfully 🚀" });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
