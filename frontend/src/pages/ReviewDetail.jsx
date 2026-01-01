import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Code2, Shield, Zap, AlertTriangle, CheckCircle, TrendingUp, FileCode, AlertCircle } from 'lucide-react';

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

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-xl text-red-400">{error}</p>
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

  const metrics = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Readability Score',
      value: feedback.readability_score || 'N/A',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      label: 'Syntax Issues',
      value: feedback.syntax_issues?.length || 0,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/10 to-orange-500/10'
    },
    {
      icon: <Code2 className="w-5 h-5" />,
      label: 'Code Smells',
      value: feedback.code_smells?.length || 0,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Performance Issues',
      value: feedback.performance_issues?.length || 0,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-500/10 to-blue-500/10'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: 'Security Risks',
      value: feedback.security_risks?.length || 0,
      color: 'from-red-500 to-rose-500',
      bgColor: 'from-red-500/10 to-rose-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 animate-[fadeInUp_0.6s_ease-out]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center">
              <FileCode className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Review Details
            </h1>
          </div>
          <div className="flex items-center gap-3 text-zinc-400 ml-15">
            <span className="text-emerald-400 font-medium">{review.language}</span>
            <span>•</span>
            <span>{new Date(review.createdAt).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}</span>
          </div>
        </div>

        {/* Code Block */}
        <div 
          className="mb-8 animate-[fadeInUp_0.8s_ease-out_0.2s_both]"
        >
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-zinc-500 ml-2">code.{review.language === 'javascript' ? 'js' : review.language === 'python' ? 'py' : review.language}</span>
              </div>
              <div className="text-xs text-zinc-500">Submitted Code</div>
            </div>
            <pre className="p-6 overflow-x-auto text-sm font-mono text-emerald-400 bg-zinc-950/50">
              {review.code}
            </pre>
          </div>
        </div>

        {/* Metrics Grid */}
        <div 
          className="mb-8 animate-[fadeInUp_0.8s_ease-out_0.4s_both]"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            Analysis Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${metric.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`bg-gradient-to-br ${metric.color} bg-clip-text text-transparent`}>
                      {metric.icon}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 mb-1">{metric.label}</p>
                <p className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Details Sections */}
        {feedback.syntax_issues && feedback.syntax_issues.length > 0 && (
          <div 
            className="mb-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300 animate-[fadeInUp_0.8s_ease-out_0.6s_both]"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-400">
              <AlertTriangle className="w-5 h-5" />
              Syntax Issues
            </h3>
            <ul className="space-y-2">
              {feedback.syntax_issues.map((issue, idx) => (
                <li key={idx} className="flex items-start gap-2 text-zinc-300">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {feedback.code_smells && feedback.code_smells.length > 0 && (
          <div 
            className="mb-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300 animate-[fadeInUp_0.8s_ease-out_0.7s_both]"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-400">
              <Code2 className="w-5 h-5" />
              Code Smells
            </h3>
            <ul className="space-y-2">
              {feedback.code_smells.map((smell, idx) => (
                <li key={idx} className="flex items-start gap-2 text-zinc-300">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>{smell}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {feedback.performance_issues && feedback.performance_issues.length > 0 && (
          <div 
            className="mb-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300 animate-[fadeInUp_0.8s_ease-out_0.8s_both]"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-cyan-400">
              <Zap className="w-5 h-5" />
              Performance Issues
            </h3>
            <ul className="space-y-2">
              {feedback.performance_issues.map((issue, idx) => (
                <li key={idx} className="flex items-start gap-2 text-zinc-300">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {feedback.security_risks && feedback.security_risks.length > 0 && (
          <div 
            className="mb-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300 animate-[fadeInUp_0.8s_ease-out_0.9s_both]"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-400">
              <Shield className="w-5 h-5" />
              Security Risks
            </h3>
            <ul className="space-y-2">
              {feedback.security_risks.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2 text-zinc-300">
                  <span className="text-red-400 mt-1">•</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
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
      `}</style>
    </div>
  );
}