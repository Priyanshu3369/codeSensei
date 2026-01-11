import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import {
  User, Mail, Lock, ArrowRight, AlertCircle, CheckCircle,
  Code2, Sparkles, Eye, EyeOff
} from 'lucide-react';


export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const res = await api.post('/auth/register', form);
      setSuccess(res.data.message);
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // 3D Rotating Cube Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;

    const cubes = [];
    const gridSize = 3;
    const spacing = 120;

    // Create multiple rotating cubes in a grid
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x !== 0 || y !== 0 || z !== 0) {
            cubes.push({
              x: x * spacing,
              y: y * spacing,
              z: z * spacing,
              size: 30,
              rotationSpeed: (Math.random() - 0.5) * 0.02
            });
          }
        }
      }
    }

    function rotateX(x, y, z, angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x,
        y: y * cos - z * sin,
        z: y * sin + z * cos
      };
    }

    function rotateY(x, y, z, angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x * cos + z * sin,
        y: y,
        z: -x * sin + z * cos
      };
    }

    function rotateZ(x, y, z, angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x * cos - y * sin,
        y: x * sin + y * cos,
        z: z
      };
    }

    function project(x, y, z) {
      const scale = 400 / (400 + z);
      return {
        x: x * scale + centerX,
        y: y * scale + centerY,
        scale: scale
      };
    }

    function drawCube(cube, globalAngle) {
      const size = cube.size;
      const vertices = [
        [-size, -size, -size],
        [size, -size, -size],
        [size, size, -size],
        [-size, size, -size],
        [-size, -size, size],
        [size, -size, size],
        [size, size, size],
        [-size, size, size]
      ];

      const rotatedVertices = vertices.map(v => {
        let point = { x: v[0] + cube.x, y: v[1] + cube.y, z: v[2] + cube.z };
        point = rotateX(point.x, point.y, point.z, globalAngle);
        point = rotateY(point.x, point.y, point.z, globalAngle * 1.3);
        point = rotateZ(point.x, point.y, point.z, globalAngle * 0.7);
        return project(point.x, point.y, point.z);
      });

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      edges.forEach(edge => {
        const v1 = rotatedVertices[edge[0]];
        const v2 = rotatedVertices[edge[1]];

        const opacity = Math.min(v1.scale, v2.scale);
        const gradient = ctx.createLinearGradient(v1.x, v1.y, v2.x, v2.y);
        gradient.addColorStop(0, `rgba(16, 185, 129, ${opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(20, 184, 166, ${opacity * 0.6})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 * Math.min(v1.scale, v2.scale);
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.stroke();
      });

      // Draw vertices
      rotatedVertices.forEach(v => {
        const size = 4 * v.scale;
        ctx.fillStyle = `rgba(16, 185, 129, ${v.scale})`;
        ctx.beginPath();
        ctx.arc(v.x, v.y, size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    let animationId;
    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      angleX += 0.005;
      angleY += 0.007;
      angleZ += 0.003;

      cubes.forEach(cube => {
        drawCube(cube, angleX);
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 animate-[fadeInUp_0.6s_ease-out]">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/50">
              <Code2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CodSenSei</h1>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Powered by Gemini</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 shadow-2xl animate-[fadeInUp_0.8s_ease-out_0.2s_both]"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-zinc-400 mb-8">Start your code review journey today</p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-start gap-3 animate-[fadeIn_0.3s_ease-out]">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-500/50 rounded-lg flex items-start gap-3 animate-[fadeIn_0.3s_ease-out]">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-emerald-300 text-sm">{success}</p>
              </div>
            )}

            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full bg-zinc-950/50 border border-zinc-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full bg-zinc-950/50 border border-zinc-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-zinc-950/50 border border-zinc-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                {/* Show / Hide Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-emerald-400 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-zinc-700 disabled:to-zinc-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/50 hover:shadow-emerald-900/70 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-zinc-500 mt-6">
              Already have an account?{' '}
              <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - 3D Animation */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center p-12 bg-gradient-to-br from-transparent via-black/20 to-black/40">
          <div className="text-center animate-[fadeInUp_1s_ease-out_0.4s_both]">
            <div className="mb-8 relative">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl mx-auto backdrop-blur-sm border border-emerald-500/30 flex items-center justify-center">
                <Code2 className="w-16 h-16 text-emerald-400" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl animate-pulse delay-700"></div>
            </div>
            <h3 className="text-4xl font-bold text-white mb-4">
              Join Thousands of Developers
            </h3>
            <p className="text-xl text-zinc-400 max-w-md mx-auto">
              Improve your code quality with AI-powered insights
            </p>
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
        @keyframes fadeIn {
          from {
            opacity: 0;
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