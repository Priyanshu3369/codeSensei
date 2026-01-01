import { useEffect, useState } from 'react';
import { fetchReviews } from '../services/review.service';
import { FileCode, TrendingUp, Code2, Clock, Activity, ArrowRight, Send, CheckCircle, XCircle, AlertTriangle, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

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
  const avgReadability = reviews.length
    ? Math.round(reviews.reduce((sum, r) => sum + (r.feedback?.readability_score || 0), 0) / reviews.length)
    : 0;

  // Calculate issue statistics
  const totalIssues = reviews.reduce((sum, r) => {
    const feedback = r.feedback || {};
    return sum + 
      (feedback.syntax_issues?.length || 0) +
      (feedback.code_smells?.length || 0) +
      (feedback.performance_issues?.length || 0) +
      (feedback.security_risks?.length || 0);
  }, 0);

  const securityRisks = reviews.reduce((sum, r) => sum + (r.feedback?.security_risks?.length || 0), 0);
  const performanceIssues = reviews.reduce((sum, r) => sum + (r.feedback?.performance_issues?.length || 0), 0);

  // Language distribution
  const languageCount = reviews.reduce((acc, r) => {
    acc[r.language] = (acc[r.language] || 0) + 1;
    return acc;
  }, {});
  const topLanguages = Object.entries(languageCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const stats = [
    {
      icon: <FileCode className="w-6 h-6" />,
      label: 'Total Reviews',
      value: reviews.length,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Avg Readability',
      value: reviews.length ? `${avgReadability}%` : 'N/A',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10'
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      label: 'Total Issues',
      value: totalIssues,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/10 to-orange-500/10'
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: 'Code Quality',
      value: avgReadability >= 80 ? 'Excellent' : avgReadability >= 60 ? 'Good' : avgReadability > 0 ? 'Fair' : 'N/A',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-500/10 to-blue-500/10'
    }
  ];

  const quickActions = [
    {
      icon: <Send className="w-5 h-5" />,
      title: 'Submit New Code',
      description: 'Get instant AI feedback',
      link: '/submit',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <FileCode className="w-5 h-5" />,
      title: 'View All Reviews',
      description: 'Browse your history',
      link: '/reviews',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Large Gradient Orbs - Much Softer */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-gradient-to-br from-emerald-500/8 via-emerald-500/4 to-transparent rounded-full blur-3xl animate-[float_25s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/3 -right-40 w-[700px] h-[700px] bg-gradient-to-bl from-emerald-500/6 via-emerald-500/3 to-transparent rounded-full blur-3xl animate-[float_30s_ease-in-out_infinite_reverse]"></div>
          <div className="absolute -bottom-40 left-1/3 w-[750px] h-[750px] bg-gradient-to-tr from-emerald-500/7 via-emerald-500/3 to-transparent rounded-full blur-3xl animate-[float_28s_ease-in-out_infinite]"></div>
        </div>
        
        {/* Grid Pattern - Very Subtle */}
        <div className="absolute inset-0 opacity-8">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          ></div>
        </div>
        
        {/* Accent Lines - Very Faint */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
        </div>
        
        {/* Radial Gradient Overlay - Lighter */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-zinc-400">Welcome back! Here's your code review overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/20"
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.bgColor} rounded-lg flex items-center justify-center text-transparent bg-clip-text group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-gradient-to-br ${stat.color} bg-clip-text`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-500 mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Reviews - Takes 2 columns */}
          <div
            className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-semibold">Recent Reviews</h2>
              </div>
              <button
                onClick={() => navigate('/reviews')}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {recentReviews.length === 0 ? (
              <div className="text-center py-12">
                <FileCode className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500 mb-4">No reviews yet. Start by submitting your code!</p>
                <button
                  onClick={() => navigate('/submit')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  Submit Code
                </button>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentReviews.map((r, index) => (
                  <li
                    key={r._id}
                    onClick={() => navigate(`/reviews/${r._id}`)}
                    className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-all duration-200 group cursor-pointer"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${0.5 + index * 0.1}s both`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                        <Code2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                          {r.language}
                        </p>
                        <p className="text-sm text-zinc-500">
                          {new Date(r.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-zinc-500">Score: </span>
                        <span className={`font-semibold ${
                          (r.feedback?.readability_score || 0) >= 80 ? 'text-emerald-400' :
                          (r.feedback?.readability_score || 0) >= 60 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {r.feedback?.readability_score || 'N/A'}
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Actions */}
          <div
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.5s both' }}
          >
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.link)}
                  className="w-full group bg-zinc-800/30 hover:bg-zinc-800/50 border border-zinc-700 hover:border-emerald-500/50 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02] text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${action.color} bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <div className={`bg-gradient-to-br ${action.color} bg-clip-text text-transparent`}>
                        {action.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white group-hover:text-emerald-400 transition-colors mb-1">
                        {action.title}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>

            {/* Language Stats */}
            {topLanguages.length > 0 && (
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <h3 className="text-sm font-semibold text-zinc-400 mb-3">Top Languages</h3>
                <div className="space-y-2">
                  {topLanguages.map(([lang, count], index) => (
                    <div key={lang} className="flex items-center justify-between">
                      <span className="text-sm text-zinc-300">{lang}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${(count / reviews.length) * 100}%`,
                              animation: `slideIn 1s ease-out ${0.6 + index * 0.1}s both`
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-zinc-500 w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Issue Summary and Activity Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Issue Summary */}
          <div
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-semibold">Issue Summary</h2>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500">No issues tracked yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Security Risks</p>
                      <p className="text-2xl font-bold text-white">{securityRisks}</p>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${securityRisks > 0 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {securityRisks > 0 ? 'Needs Attention' : 'All Clear'}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Performance Issues</p>
                      <p className="text-2xl font-bold text-white">{performanceIssues}</p>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${performanceIssues > 0 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {performanceIssues > 0 ? 'Review Needed' : 'Optimized'}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Total Issues Found</p>
                      <p className="text-2xl font-bold text-white">{totalIssues}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.7s both' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500">No activity yet.</p>
              </div>
            ) : (
              <ul className="space-y-3 max-h-80 overflow-y-auto">
                {reviews.slice(0, 5).map((r, index) => (
                  <li
                    key={r._id}
                    className="flex items-start gap-4 p-3 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-all duration-200"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${0.7 + index * 0.05}s both`
                    }}
                  >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-zinc-300">
                        Reviewed <span className="font-semibold text-white">{r.language}</span> code
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {new Date(r.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
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
        @keyframes slideIn {
          from {
            width: 0;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -50px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 30px) rotate(-5deg);
          }
        }
        @keyframes scan {
          0%, 100% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}