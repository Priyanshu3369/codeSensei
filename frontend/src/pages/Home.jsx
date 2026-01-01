import { useState, useEffect } from 'react';
import { Code2, Shield, Zap, CheckCircle, ArrowRight, Terminal, Sparkles } from 'lucide-react';
import {Link} from "react-router-dom";
export default function Home() {
  const isLoggedIn = !!localStorage.getItem('token');
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Code Quality Analysis",
      description: "Deep analysis of code structure, readability, and maintainability"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Scanning",
      description: "Identify vulnerabilities and security risks in your codebase"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Insights",
      description: "Optimize your code for better performance and efficiency"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Best Practices",
      description: "Get recommendations aligned with industry standards"
    }
  ];

  const stats = [
    { value: "10K+", label: "Code Reviews" },
    { value: "99.9%", label: "Accuracy" },
    { value: "< 30s", label: "Avg. Review Time" },
    { value: "4+", label: "Languages" }
  ];

  const codeLines = [
    { num: 1, text: 'function', highlight: 'calculateTotal', rest: '(items) {' },
    { num: 2, text: '  return items.', highlight: 'reduce', rest: '(' },
    { num: 3, text: '    (sum, item) ', highlight: '=>', rest: ' sum + item.price,' },
    { num: 4, text: '    ', highlight: '0', rest: '' },
    { num: 5, text: '  );', highlight: '', rest: '' },
    { num: 6, text: '}', highlight: '', rest: '' }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] animate-[pulse_8s_ease-in-out_infinite]"></div>
        </div>
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-[float_20s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-[float_25s_ease-in-out_infinite_reverse]"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center space-y-8">
            {/* Badge with animation */}
            <div 
              className={`inline-flex items-center gap-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full px-4 py-2 text-sm transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-zinc-400">Powered by Gemini AI</span>
            </div>

            {/* Main Heading with staggered animation */}
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]">
                  AI-Powered Code Review
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  In Seconds
                </span>
              </h1>
            </div>

            <p className={`text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Submit your code and receive instant, comprehensive feedback on quality, security, 
              performance, and best practices. Built by developers, for developers.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {isLoggedIn ? (
                <>
                  <Link to="/submit"
                    className="group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-emerald-900/50 hover:shadow-emerald-900/70 hover:scale-105"
                  >
                    <Terminal className="w-5 h-5" />
                    Submit Code
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/dashboard"
                    className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 border border-zinc-800 px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  >
                    Go to Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register"
                    className="group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-emerald-900/50 hover:shadow-emerald-900/70 hover:scale-105"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/login"
                    className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 border border-zinc-800 px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Code Preview with typing animation */}
            <div className={`pt-12 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500 hover:scale-[1.02]">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-950/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-100"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-200"></div>
                  </div>
                  <span className="text-xs text-zinc-500 ml-2">example.js</span>
                </div>
                <div className="p-6 font-mono text-sm text-left">
                  <div className="space-y-2">
                    {codeLines.map((line, idx) => (
                      <div 
                        key={idx}
                        className="text-zinc-500 transition-all duration-500 hover:text-zinc-300"
                        style={{ 
                          animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`
                        }}
                      >
                        {line.num}  <span className="text-purple-400">{line.text}</span>{' '}
                        <span className="text-emerald-400">{line.highlight}</span>
                        <span className="text-zinc-300">{line.rest}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-zinc-900 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group hover:scale-110 transition-transform duration-300"
                  style={{ 
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2 group-hover:from-emerald-300 group-hover:to-teal-300 transition-all">
                    {stat.value}
                  </div>
                  <div className="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Comprehensive Code Analysis
            </h2>
            <p className="text-zinc-400 text-lg">Everything you need to write better code</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-emerald-900/20 ${
                  activeFeature === index ? 'border-emerald-500/50 shadow-lg shadow-emerald-900/20' : ''
                }`}
                style={{ 
                  animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`
                }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${
                  activeFeature === index ? 'scale-110 rotate-6' : ''
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="relative bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-sm rounded-2xl p-12 text-center border border-emerald-500/20 overflow-hidden group hover:border-emerald-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">Ready to improve your code?</h2>
                <p className="text-zinc-300 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of developers who trust our AI-powered code review platform
                </p>
                {!isLoggedIn && (
                  <Link to="/register"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-900/50"
                  >
                    Start Reviewing Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(20px); }
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
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