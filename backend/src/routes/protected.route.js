import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Access granted',
    userId: req.user.id
  });
});

export default router;
