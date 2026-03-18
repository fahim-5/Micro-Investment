import api from './api';

const investmentService = {
  // Get all available investments
  getAllInvestments: async (filters = {}) => {
    const params = {
      category: filters.category || 'all',
      riskLevel: filters.riskLevel || 'all',
      minAmount: filters.minAmount || 0,
      maxAmount: filters.maxAmount || 10000,
      sortBy: filters.sortBy || 'popularity',
      page: filters.page || 1,
      limit: filters.limit || 20,
      search: filters.search || '',
    };

    const response = await api.get('/investments', { params });
    return response;
  },

  // Get investment by ID
  getInvestmentById: async (investmentId) => {
    const response = await api.get(`/investments/${investmentId}`);
    return response;
  },

  // Get trending investments
  getTrendingInvestments: async (limit = 5) => {
    const response = await api.get('/investments/trending', { params: { limit } });
    return response;
  },

  // Get investment categories
  getCategories: async () => {
    const response = await api.get('/investments/categories');
    return response;
  },

  // Get user's investments
  getUserInvestments: async () => {
    const response = await api.get('/investments/my');
    return response;
  },

  // Make a new investment
  makeInvestment: async (investmentId, amount) => {
    const response = await api.post('/investments/invest', { investmentId, amount });
    return response;
  },

  // Withdraw from investment
  withdrawInvestment: async (userInvestmentId) => {
    const response = await api.post(`/investments/${userInvestmentId}/withdraw`);
    return response;
  },

  // Get investment performance history
  getPerformanceHistory: async (investmentId, period = '1y') => {
    const response = await api.get(`/investments/${investmentId}/performance`, {
      params: { period }
    });
    return response;
  },

  // Get portfolio summary
  getPortfolioSummary: async () => {
    const response = await api.get('/investments/portfolio');
    return response;
  },

  // Get portfolio performance
  getPortfolioPerformance: async (period = '1y') => {
    const response = await api.get('/investments/portfolio/performance', {
      params: { period }
    });
    return response;
  },

  // Get portfolio allocation
  getPortfolioAllocation: async () => {
    const response = await api.get('/investments/portfolio/allocation');
    return response;
  },

  // Get dividend history
  getDividendHistory: async (period = '1y') => {
    const response = await api.get('/investments/dividends', {
      params: { period }
    });
    return response;
  },

  // Add investment to watchlist
  addToWatchlist: async (investmentId) => {
    const response = await api.post(`/investments/${investmentId}/watchlist`);
    return response;
  },

  // Remove investment from watchlist
  removeFromWatchlist: async (investmentId) => {
    const response = await api.delete(`/investments/${investmentId}/watchlist`);
    return response;
  },

  // Get watchlist
  getWatchlist: async () => {
    const response = await api.get('/investments/watchlist');
    return response;
  },

  // Get investment statistics
  getInvestmentStats: async () => {
    const response = await api.get('/investments/stats');
    return response;
  },

  // Get recommended investments based on user profile
  getRecommendedInvestments: async () => {
    const response = await api.get('/investments/recommended');
    return response;
  },

  // Get similar investments
  getSimilarInvestments: async (investmentId, limit = 4) => {
    const response = await api.get(`/investments/${investmentId}/similar`, {
      params: { limit }
    });
    return response;
  },

  // Get investment transactions
  getInvestmentTransactions: async (investmentId) => {
    const response = await api.get(`/investments/${investmentId}/transactions`);
    return response;
  },

  // Calculate potential returns
  calculateReturns: async (investmentId, amount, period) => {
    const response = await api.post('/investments/calculate-returns', {
      investmentId,
      amount,
      period
    });
    return response;
  },

  // Get risk assessment
  getRiskAssessment: async () => {
    const response = await api.get('/investments/risk-assessment');
    return response;
  },

  // Update risk profile
  updateRiskProfile: async (riskProfile) => {
    const response = await api.put('/investments/risk-profile', riskProfile);
    return response;
  },

  // Get investment goals
  getInvestmentGoals: async () => {
    const response = await api.get('/investments/goals');
    return response;
  },

  // Create investment goal
  createInvestmentGoal: async (goalData) => {
    const response = await api.post('/investments/goals', goalData);
    return response;
  },

  // Update investment goal
  updateInvestmentGoal: async (goalId, goalData) => {
    const response = await api.put(`/investments/goals/${goalId}`, goalData);
    return response;
  },

  // Delete investment goal
  deleteInvestmentGoal: async (goalId) => {
    const response = await api.delete(`/investments/goals/${goalId}`);
    return response;
  },
};

export default investmentService;