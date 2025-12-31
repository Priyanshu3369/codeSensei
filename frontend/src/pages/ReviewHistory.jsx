import { useEffect, useState } from 'react';
import { fetchReviews } from '../services/review.service';

export default function ReviewHistory() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch (err) {
        setError('Failed to load reviews');
      }
    };

    loadReviews();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Your Code Reviews</h1>

      {error && <p className="text-red-500">{error}</p>}

      {reviews.length === 0 && (
        <p className="text-gray-600">No reviews found.</p>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-4 rounded shadow"
          >
            <p className="font-semibold">
              Language: {review.language}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleString()}
            </p>

            <p className="mt-2 text-sm">
              Readability Score:{' '}
              <strong>
                {review.feedback?.readability_score ?? 'N/A'}
              </strong>
            </p>

            <a
              href={`/reviews/${review._id}`}
              className="text-blue-600 text-sm mt-2 inline-block"
            >
              View Details →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
