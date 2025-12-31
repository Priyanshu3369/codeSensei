import { Link } from 'react-router-dom';

export default function Home() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">
        AI Code Review Platform
      </h1>

      <p className="text-gray-600 max-w-xl mb-8">
        Submit your code and get instant AI-powered feedback on
        quality, security, performance, and best practices using Gemini.
      </p>

      {isLoggedIn ? (
        <div className="space-x-4">
          <Link
            to="/dashboard"
            className="bg-black text-white px-6 py-3 rounded"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/submit"
            className="border px-6 py-3 rounded"
          >
            Submit Code
          </Link>
        </div>
      ) : (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-black text-white px-6 py-3 rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border px-6 py-3 rounded"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}
