import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ReviewDetail() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReview = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/reviews', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const found = res.data.find((r) => r._id === id);
        if (!found) {
          setError('Review not found');
        } else {
          setReview(found);
        }
      } catch {
        setError('Failed to load review');
      }
    };

    loadReview();
  }, [id]);

  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!review) return <p className="p-6">Loading...</p>;

  const feedback = review.feedback || {};

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Review Details</h1>

      <pre className="bg-black text-green-400 p-4 rounded mb-4 overflow-x-auto">
        {review.code}
      </pre>

      <div className="bg-white p-4 rounded shadow space-y-3">
        <p><strong>Readability:</strong> {feedback.readability_score}</p>
        <p><strong>Syntax Issues:</strong> {feedback.syntax_issues?.length}</p>
        <p><strong>Code Smells:</strong> {feedback.code_smells?.length}</p>
        <p><strong>Performance Issues:</strong> {feedback.performance_issues?.length}</p>
        <p><strong>Security Risks:</strong> {feedback.security_risks?.length}</p>
      </div>
    </div>
  );
}
