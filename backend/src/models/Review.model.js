import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    feedback: {
      type: Object,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
