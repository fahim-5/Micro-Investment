import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';
import investmentService from '../services/investmentService';

// Create Context
export const InvestmentContext = createContext();

// Custom hook to use investment context
export const useInvestments = () => {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestments must be used within an InvestmentProvider');
  }
  return context;
};

export const InvestmentProvider = ({ children }) => {
  const { user } = useAuth();
  
  // State
  const [investments, setInvestments] = useState([]);
  const [userInvestments, setUserInvestments] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState({
    investments: false,
    userInvestments: false,
    portfolio: false
  });
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    riskLevel: 'all',
    minAmount: 0,
    maxAmount: 10000,
    sortBy: 'popularity'
  });

  // Fetch all available investments
  const fetchAllInvestments = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(prev => ({ ...prev, investments: true }));
      setError(null);
      
      const data = await investmentService.getAllInvestments(filters);
      setInvestments(data);
      
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch investments';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(prev => ({ ...prev, investments: false }));
    }
  }, [user, filters]);

  // Fetch user's investments
  const fetchUserInvestments = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(prev => ({ ...prev, userInvestments: true }));
      setError(null);
      
      const data = await investmentService.getUserInvestments();
      setUserInvestments(data);
      
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch your investments';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(prev => ({ ...prev, userInvestments: false }));
    }
  }, [user]);

  // Fetch portfolio summary
  const fetchPortfolio = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(prev => ({ ...prev, portfolio: true }));
      setError(null);
      
      const data = await investmentService.getPortfolioSummary();
      setPortfolio(data);
      
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch portfolio';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(prev => ({ ...prev, portfolio: false }));
    }
  }, [user]);

  // Make a new investment
  const makeInvestment = async (investmentId, amount) => {
    if (!user) throw new Error('User must be logged in');
    
    try {
      setError(null);
      
      const response = await investmentService.makeInvestment(investmentId, amount);
      
      // Update user investments and portfolio
      await Promise.all([
        fetchUserInvestments(),
        fetchPortfolio()
      ]);
      
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Investment failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Withdraw from investment
  const withdrawInvestment = async (userInvestmentId) => {
    if (!user) throw new Error('User must be logged in');
    
    try {
      setError(null);
      
      const response = await investmentService.withdrawInvestment(userInvestmentId);
      
      // Update user investments and portfolio
      await Promise.all([
        fetchUserInvestments(),
        fetchPortfolio()
      ]);
      
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Withdrawal failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Get investment by ID
  const getInvestmentById = (investmentId) => {
    return investments.find(inv => inv.id === investmentId) || 
           userInvestments.find(inv => inv.investmentId === investmentId);
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      category: 'all',
      riskLevel: 'all',
      minAmount: 0,
      maxAmount: 10000,
      sortBy: 'popularity'
    });
  };

  // Clear error
  const clearError = () => setError(null);

  // Fetch data when user logs in or filters change
  useEffect(() => {
    if (user) {
      fetchAllInvestments();
      fetchUserInvestments();
      fetchPortfolio();
    } else {
      // Reset state when user logs out
      setInvestments([]);
      setUserInvestments([]);
      setPortfolio(null);
    }
  }, [user, fetchAllInvestments, fetchUserInvestments, fetchPortfolio]);

  // Calculate total invested amount
  const totalInvested = userInvestments.reduce((sum, inv) => sum + inv.investedAmount, 0);

  // Calculate total returns
  const totalReturns = userInvestments.reduce((sum, inv) => sum + inv.currentValue - inv.investedAmount, 0);

  // Calculate average ROI
  const averageROI = userInvestments.length > 0 
    ? (userInvestments.reduce((sum, inv) => sum + inv.roi, 0) / userInvestments.length)
    : 0;

  // Context value
  const value = {
    // State
    investments,
    userInvestments,
    portfolio,
    loading,
    error,
    filters,
    
    // Calculations
    totalInvested,
    totalReturns,
    averageROI,
    
    // Actions
    fetchAllInvestments,
    fetchUserInvestments,
    fetchPortfolio,
    makeInvestment,
    withdrawInvestment,
    getInvestmentById,
    updateFilters,
    clearFilters,
    clearError,
    
    // Helper flags
    hasInvestments: userInvestments.length > 0,
    isLoading: loading.investments || loading.userInvestments || loading.portfolio
  };

  return (
    <InvestmentContext.Provider value={value}>
      {children}
    </InvestmentContext.Provider>
  );
};

export default InvestmentContext;