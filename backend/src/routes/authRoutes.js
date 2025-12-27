import express from "express";
import { registerUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});
// @route POST /api/auth/register
router.post("/register", registerUser);

export default router;
