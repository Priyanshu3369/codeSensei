import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createReview } from '../controllers/review.controller.js';
import { getUserReviews } from '../controllers/review.controller.js';


const router = express.Router();

router.post('/review', authMiddleware, createReview);
router.get('/reviews', authMiddleware, getUserReviews);

export default router;
