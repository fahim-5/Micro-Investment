import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ children, requireKYC = false, adminOnly = false }) => {
  const { user, isAuthenticated, loading, isKYCVerified, hasRole } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Checking authentication..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check if KYC verification is required
  if (requireKYC && !isKYCVerified()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="bg-[#1e293b] rounded-xl p-8 max-w-md text-center">
          <div className="h-16 w-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">KYC Verification Required</h2>
          <p className="text-gray-300 mb-6">
            Please complete your KYC verification to access this feature. 
            This is required for investment compliance.
          </p>
          <button
            onClick={() => window.location.href = '/kyc-verification'}
            className="w-full bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Complete KYC Now
          </button>
          <button
            onClick={() => window.history.back()}
            className="w-full mt-3 border border-gray-700 text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Check if admin access is required
  if (adminOnly && !hasRole('admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="bg-[#1e293b] rounded-xl p-8 max-w-md text-center">
          <div className="h-16 w-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⛔</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-300 mb-6">
            You don't have permission to access this page. 
            This area is restricted to administrators only.
          </p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Check if user's email is verified
  if (!user?.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="bg-[#1e293b] rounded-xl p-8 max-w-md text-center">
          <div className="h-16 w-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📧</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Email Verification Required</h2>
          <p className="text-gray-300 mb-6">
            Please verify your email address to continue using the platform. 
            Check your inbox for the verification link.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/verify-email'}
              className="w-full bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Resend Verification Email
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full border border-gray-700 text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // All checks passed, render the children
  return children;
};

// Admin Route component
export const AdminRoute = ({ children }) => {
  return (
    <PrivateRoute adminOnly={true}>
      {children}
    </PrivateRoute>
  );
};

// KYC Required Route component
export const KYCRequiredRoute = ({ children }) => {
  return (
    <PrivateRoute requireKYC={true}>
      {children}
    </PrivateRoute>
  );
};

export default PrivateRoute;