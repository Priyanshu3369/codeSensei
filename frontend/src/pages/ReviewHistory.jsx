import { useEffect, useState } from 'react';
import { fetchReviews } from '../services/review.service';
import { FileCode, TrendingUp, Calendar, ArrowRight, AlertCircle, Code2 } from 'lucide-react';

export default function ReviewHistory() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 animate-[fadeInUp_0.6s_ease-out]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center">
                <FileCode className="w-6 h-6 text-emerald-400" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                Your Code Reviews
              </h1>
            </div>
            <div className="hidden md:block text-zinc-400">
              {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
            </div>
          </div>
          <p className="text-zinc-400 ml-15">Browse through all your submitted code reviews</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-start gap-3 animate-[fadeIn_0.3s_ease-out]">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!error && reviews.length === 0 && (
          <div 
            className="text-center py-16 animate-[fadeInUp_0.8s_ease-out_0.2s_both]"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Code2 className="w-12 h-12 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No reviews yet</h2>
            <p className="text-zinc-400 mb-6">Start by submitting your code for review!</p>
            <a
              href="/submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-900/50"
            >
              Submit Code
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Reviews Grid */}
        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <a
                key={review._id}
                href={`/reviews/${review._id}`}
                className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-emerald-900/20"
                style={{ 
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Language Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Code2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="font-semibold text-lg text-white group-hover:text-emerald-400 transition-colors">
                      {review.language}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="text-zinc-700">•</span>
                  <span>
                    {new Date(review.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {/* Readability Score */}
                <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/50 group-hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Readability Score</span>
                    </div>
                    <div className={`text-2xl font-bold ${
                      review.feedback?.readability_score 
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent' 
                        : 'text-zinc-500'
                    }`}>
                      {review.feedback?.readability_score ?? 'N/A'}
                    </div>
                  </div>
                </div>

                {/* View Details Link */}
                <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400 font-medium group-hover:gap-3 transition-all">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}