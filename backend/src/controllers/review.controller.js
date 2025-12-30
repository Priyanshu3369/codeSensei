import Review from '../models/Review.model.js';
import { reviewCodeWithGemini } from '../services/gemini.service.js';

export const createReview = async (req, res) => {
  try {
    const { code, language, description } = req.body;

    if (!code || code.length < 10) {
      return res.status(400).json({ message: 'Code is too short' });
    }

    const aiFeedback = await reviewCodeWithGemini({ code, language });

    const review = await Review.create({
      user: req.user.id,
      code,
      language,
      description,
      feedback: aiFeedback
    });

    res.status(201).json({
      message: 'AI review generated successfully',
      reviewId: review._id,
      feedback: aiFeedback
    });
  } catch (error) {
    console.error('Gemini Error:', error.message);
    res.status(500).json({ message: 'AI review failed' });
  }
};
