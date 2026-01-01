import { useState } from 'react';
import api from '../services/api';
import { Code2, Send, FileCode, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

export default function SubmitCode() {
  const [form, setForm] = useState({
    code: '',
    language: 'javascript',
    description: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const res = await api.post('/review', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage(res.data.message);
      setForm({ code: '', language: 'javascript', description: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: '📜' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚡' }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 relative overflow-hidden">
      {/* Animated Code-Themed Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Binary Rain Effect - More Visible */}
        <div className="absolute inset-0 opacity-15">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-emerald-400 font-mono text-xs leading-relaxed"
              style={{
                left: `${(i * 3.33)}%`,
                animation: `fall ${5 + (i % 5)}s linear infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            >
              {Array(20).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('\n')}
            </div>
          ))}
        </div>

        {/* Gradient Orbs - Brighter */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute -bottom-20 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-emerald-500/18 to-emerald-500/5 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
        </div>
        
        {/* Code Brackets Pattern - More Visible */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-7xl text-emerald-500 font-mono animate-[float_15s_ease-in-out_infinite]">{'{ }'}</div>
          <div className="absolute top-1/3 right-20 text-7xl text-emerald-400 font-mono animate-[float_18s_ease-in-out_infinite_reverse]">{'[ ]'}</div>
          <div className="absolute bottom-20 left-1/3 text-7xl text-emerald-500 font-mono animate-[float_20s_ease-in-out_infinite]">{'< >'}</div>
          <div className="absolute top-2/3 right-1/3 text-6xl text-emerald-400 font-mono animate-[float_16s_ease-in-out_infinite_reverse]">{'( )'}</div>
        </div>

        {/* Vertical Lines - More Visible */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/60 to-transparent"></div>
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/60 to-transparent"></div>
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/50"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-[fadeInUp_0.6s_ease-out]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Submit Code for Review
            </h1>
          </div>
          <p className="text-zinc-400 ml-15">Get instant AI-powered feedback on your code quality, security, and performance</p>
        </div>

        <div
          className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 hover:border-zinc-700 transition-all duration-300"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}
        >
          {/* Success/Error Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-start gap-3 animate-[fadeIn_0.3s_ease-out]">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
          
          {message && (
            <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-500/50 rounded-lg flex items-start gap-3 animate-[fadeIn_0.3s_ease-out]">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-emerald-300 text-sm">{message}</p>
            </div>
          )}

          {/* Language Selector */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
              <FileCode className="w-4 h-4 text-emerald-400" />
              Programming Language
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  type="button"
                  onClick={() => setForm({ ...form, language: lang.value })}
                  className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                    form.language === lang.value
                      ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/50 shadow-lg shadow-emerald-900/20'
                      : 'bg-zinc-800/30 border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{lang.icon}</div>
                  <div className="text-sm font-medium">{lang.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Code Input */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
              <Code2 className="w-4 h-4 text-emerald-400" />
              Your Code
            </label>
            <div className="relative">
              <textarea
                name="code"
                placeholder="Paste your code here...

// Example:
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}"
                className="w-full h-64 bg-zinc-950/50 border border-zinc-700 rounded-lg p-4 font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none"
                value={form.code}
                onChange={handleChange}
                required
              />
              <div className="absolute bottom-3 right-3 text-xs text-zinc-600">
                {form.code.length} characters
              </div>
            </div>
          </div>

          {/* Description Input */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Description <span className="text-zinc-600 text-xs ml-1">(Optional)</span>
            </label>
            <textarea
              name="description"
              placeholder="Add any context or specific questions about your code..."
              className="w-full h-24 bg-zinc-950/50 border border-zinc-700 rounded-lg p-4 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !form.code.trim()}
            className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-zinc-700 disabled:to-zinc-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/50 hover:shadow-emerald-900/70 disabled:shadow-none"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing Code...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span>Submit for Review</span>
              </>
            )}
          </button>

          {/* Info Text */}
          <p className="text-xs text-zinc-500 text-center mt-4">
            Your code will be analyzed by our AI for quality, security, performance, and best practices
          </p>
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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.1);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );r
}