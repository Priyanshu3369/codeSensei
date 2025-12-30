import Review from '../models/Review.model.js';

export const createReview = async (req, res) => {
  try {
    const { code, language, description } = req.body;

    if (!code || code.length < 10) {
      return res.status(400).json({ message: 'Code is too short' });
    }

    const review = await Review.create({
      user: req.user.id,
      code,
      language,
      description
    });

    res.status(201).json({
      message: 'Code submitted successfully',
      reviewId: review._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit code' });
  }
};
