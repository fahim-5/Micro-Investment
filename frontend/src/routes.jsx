import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Register = React.lazy(() => import('./pages/Auth/Register'));
const UserDashboard = React.lazy(() => import('./pages/Dashboard/UserDashboard'));
const AllInvestments = React.lazy(() => import('./pages/Investments/AllInvestments'));
const InvestmentDetails = React.lazy(() => import('./pages/Investments/InvestmentDetails'));
const MyInvestments = React.lazy(() => import('./pages/Investments/MyInvestments'));
const MyWallet = React.lazy(() => import('./pages/Wallet/MyWallet'));
const Deposit = React.lazy(() => import('./pages/Wallet/Deposit'));
const PortfolioOverview = React.lazy(() => import('./pages/Portfolio/PortfolioOverview'));
const NotFound = React.lazy(() => import('./pages/Error/NotFound'));

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes - Only accessible when logged in */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <UserDashboard />
        </PrivateRoute>
      } />
      
      <Route path="/investments" element={
        <PrivateRoute>
          <AllInvestments />
        </PrivateRoute>
      } />
      
      <Route path="/investments/:id" element={
        <PrivateRoute>
          <InvestmentDetails />
        </PrivateRoute>
      } />
      
      <Route path="/my-investments" element={
        <PrivateRoute>
          <MyInvestments />
        </PrivateRoute>
      } />
      
      <Route path="/wallet" element={
        <PrivateRoute>
          <MyWallet />
        </PrivateRoute>
      } />
      
      <Route path="/wallet/deposit" element={
        <PrivateRoute>
          <Deposit />
        </PrivateRoute>
      } />
      
      <Route path="/portfolio" element={
        <PrivateRoute>
          <PortfolioOverview />
        </PrivateRoute>
      } />
      
      {/* Redirects */}
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/signin" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<Navigate to="/register" replace />} />
      
      {/* 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;