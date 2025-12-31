import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold">
        CodeReview AI
      </Link>
      {!isLoggedIn ? (
        <div className="space-x-4 text-sm">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div className="space-x-4 text-sm">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/submit">Submit Code</Link>
          <Link to="/reviews">Reviews</Link>
          <button onClick={logout} className="text-red-600 ml-4">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
