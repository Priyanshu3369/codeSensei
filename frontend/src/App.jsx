import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from "./utils/ProtectedRoute";
import SubmitCode from './pages/SubmitCode';
import ReviewHistory from './pages/ReviewHistory';
import ReviewDetail from './pages/ReviewDetail';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit"
          element={
            <ProtectedRoute>
              <AppLayout>
                <SubmitCode />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ReviewHistory />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviews/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ReviewDetail />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}