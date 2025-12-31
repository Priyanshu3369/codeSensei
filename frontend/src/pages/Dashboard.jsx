import { useEffect, useState } from 'react';
import { fetchReviews } from '../services/review.service';

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch {
        setReviews([]);
      }
    };
    loadData();
  }, []);

  const recentReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <p className="text-2xl font-bold">{reviews.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Avg Readability</p>
          <p className="text-2xl font-bold">
            {reviews.length
              ? Math.round(
                reviews.reduce(
                  (sum, r) => sum + (r.feedback?.readability_score || 0),
                  0
                ) / reviews.length
              )
              : 'N/A'}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Latest Language</p>
          <p className="text-2xl font-bold">
            {reviews[0]?.language || 'N/A'}
          </p>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Recent Reviews</h2>

        {recentReviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="space-y-2">
            {recentReviews.map((r) => (
              <li key={r._id} className="text-sm">
                {r.language} —{' '}
                {new Date(r.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Activity Timeline */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="text-lg font-semibold mb-3">Activity Timeline</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No activity yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {reviews.map((r) => (
              <li key={r._id}>
                Reviewed <strong>{r.language}</strong> code on{' '}
                {new Date(r.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
