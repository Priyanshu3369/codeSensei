import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Code2, Shield, Zap, AlertTriangle, CheckCircle, TrendingUp, FileCode, AlertCircle, ArrowLeft, Download, Share2 } from 'lucide-react';

export default function ReviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-xl text-red-400 mb-4">{error}</p>
          <button
            onClick={() => navigate('/reviews')}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reviews
          </button>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading review...</p>
        </div>
      </div>
    );
  }

  const feedback = review.feedback || {};
  const readabilityScore = feedback.readability_score || 0;

  // Calculate overall score
  const totalIssues = 
    (feedback.syntax_issues?.length || 0) +
    (feedback.code_smells?.length || 0) +
    (feedback.performance_issues?.length || 0) +
    (feedback.security_risks?.length || 0);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 relative overflow-hidden">
      {/* Subtle Circuit Board Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-[15%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
          <div className="absolute top-[35%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
          <div className="absolute top-[55%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
          <div className="absolute top-[75%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
          <div className="absolute left-[20%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent"></div>
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent"></div>
          <div className="absolute left-[80%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent"></div>
        </div>
        <div className="absolute inset-0 opacity-12">
          {[
            { top: '15%', left: '20%' },
            { top: '15%', left: '50%' },
            { top: '35%', left: '80%' },
            { top: '55%', left: '20%' },
            { top: '75%', left: '50%' },
            { top: '75%', left: '80%' }
          ].map((pos, i) => (
            <div key={i} className="absolute w-3 h-3 bg-emerald-500 rounded-full" style={{ top: pos.top, left: pos.left }}>
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-500/6 rounded-full blur-3xl animate-[breathe_20s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl animate-[breathe_25s_ease-in-out_infinite_reverse]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Back Button & Header */}
        <div className="mb-8 animate-[fadeInUp_0.6s_ease-out]">
          <button
            onClick={() => navigate('/reviews')}
            className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Reviews
          </button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent mb-2">
                Code Review Analysis
              </h1>
              <div className="flex items-center gap-3 text-zinc-400">
                <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                  <Code2 className="w-4 h-4" />
                  {review.language}
                </span>
                <span>•</span>
                <span className="text-sm">{new Date(review.createdAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Score Overview Card */}
        <div className="mb-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/30 rounded-2xl p-8 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-2 text-zinc-400 text-sm font-medium">Overall Grade</div>
              <div className={`text-7xl font-bold ${getScoreColor(readabilityScore)}`}>
                {getScoreGrade(readabilityScore)}
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-zinc-400 text-sm font-medium">Readability Score</div>
              <div className={`text-7xl font-bold ${getScoreColor(readabilityScore)}`}>
                {readabilityScore}
              </div>
              <div className="text-zinc-500 text-sm">out of 100</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-zinc-400 text-sm font-medium">Total Issues</div>
              <div className={`text-7xl font-bold ${totalIssues === 0 ? 'text-emerald-400' : totalIssues < 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                {totalIssues}
              </div>
              <div className="text-zinc-500 text-sm">issues found</div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Code Block - 2 columns */}
          <div className="lg:col-span-2 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-emerald-400" />
              Submitted Code
            </h2>
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-zinc-500 ml-2">
                    code.{review.language === 'javascript' ? 'js' : review.language === 'python' ? 'py' : review.language === 'java' ? 'java' : 'cpp'}
                  </span>
                </div>
              </div>
              <pre className="p-6 overflow-x-auto text-sm font-mono text-emerald-400 bg-zinc-950/50 max-h-[500px]">{review.code}</pre>
            </div>
          </div>

          {/* Quick Summary - 1 column */}
          <div className="animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Quick Summary
            </h2>
            <div className="space-y-3">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-400">Syntax Issues</span>
                  <span className="text-2xl font-bold text-yellow-400">{feedback.syntax_issues?.length || 0}</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${Math.min((feedback.syntax_issues?.length || 0) * 20, 100)}%` }}></div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-400">Code Smells</span>
                  <span className="text-2xl font-bold text-purple-400">{feedback.code_smells?.length || 0}</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div className="bg-purple-400 h-2 rounded-full" style={{ width: `${Math.min((feedback.code_smells?.length || 0) * 20, 100)}%` }}></div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-400">Performance</span>
                  <span className="text-2xl font-bold text-cyan-400">{feedback.performance_issues?.length || 0}</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div className="bg-cyan-400 h-2 rounded-full" style={{ width: `${Math.min((feedback.performance_issues?.length || 0) * 20, 100)}%` }}></div>
                </div>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-400">Security Risks</span>
                  <span className="text-2xl font-bold text-red-400">{feedback.security_risks?.length || 0}</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: `${Math.min((feedback.security_risks?.length || 0) * 20, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Issues */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
            <AlertTriangle className="w-6 h-6 text-emerald-400" />
            Detailed Analysis
          </h2>

          {/* No Issues State */}
          {totalIssues === 0 && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-12 text-center animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-emerald-400 mb-2">Excellent Code!</h3>
              <p className="text-zinc-400">No issues found. Your code follows best practices.</p>
            </div>
          )}

          {/* Syntax Issues */}
          {feedback.syntax_issues && feedback.syntax_issues.length > 0 && (
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400">
                <AlertTriangle className="w-5 h-5" />
                Syntax Issues ({feedback.syntax_issues.length})
              </h3>
              <ul className="space-y-3">
                {feedback.syntax_issues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
                    <span className="text-yellow-400 mt-1 flex-shrink-0">#{idx + 1}</span>
                    <span className="text-zinc-300">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Code Smells */}
          {feedback.code_smells && feedback.code_smells.length > 0 && (
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 animate-[fadeInUp_0.8s_ease-out_0.7s_both]">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-400">
                <Code2 className="w-5 h-5" />
                Code Smells ({feedback.code_smells.length})
              </h3>
              <ul className="space-y-3">
                {feedback.code_smells.map((smell, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
                    <span className="text-purple-400 mt-1 flex-shrink-0">#{idx + 1}</span>
                    <span className="text-zinc-300">{smell}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Performance Issues */}
          {feedback.performance_issues && feedback.performance_issues.length > 0 && (
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-cyan-400">
                <Zap className="w-5 h-5" />
                Performance Issues ({feedback.performance_issues.length})
              </h3>
              <ul className="space-y-3">
                {feedback.performance_issues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">#{idx + 1}</span>
                    <span className="text-zinc-300">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Security Risks */}
          {feedback.security_risks && feedback.security_risks.length > 0 && (
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 animate-[fadeInUp_0.8s_ease-out_0.9s_both]">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-400">
                <Shield className="w-5 h-5" />
                Security Risks ({feedback.security_risks.length})
              </h3>
              <ul className="space-y-3">
                {feedback.security_risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
                    <span className="text-red-400 mt-1 flex-shrink-0">#{idx + 1}</span>
                    <span className="text-zinc-300">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
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
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.06;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.08;
          }
        }
      `}</style>
    </div>
  );
}