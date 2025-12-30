import express from 'express';
const router = express.Router();

router.get('/db-test', (req, res) => {
  res.status(200).json({ message: 'Database connected successfully' });
});

export default router;
