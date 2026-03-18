import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useInvestments } from '../../context/InvestmentContext';
import InvestmentCard from '../../components/common/InvestmentCard';
import LoadingSpinner, { CardSkeleton } from '../../components/common/LoadingSpinner';
import {
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiTrendingUp,
  FiStar,
  FiClock,
  FiDollarSign,
  FiShield,
  FiCheck,
  FiX,
  FiBarChart2
} from 'react-icons/fi';
import { MdOutlineSort, MdOutlineCategory, MdOutlineLocalFireDepartment } from 'react-icons/md';

const AllInvestments = () => {
  const { isAuthenticated } = useAuth();
  const {
    investments,
    userInvestments,
    fetchAllInvestments,
    updateFilters,
    clearFilters,
    filters,
    loading
  } = useInvestments();
  const navigate = useNavigate();

  // Local state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('popularity');

  // Investment categories
  const categories = [
    { id: 'stocks', name: 'Stocks', icon: '📈', count: 24 },
    { id: 'mutual-funds', name: 'Mutual Funds', icon: '💰', count: 18 },
    { id: 'crypto', name: 'Crypto', icon: '₿', count: 12 },
    { id: 'real-estate', name: 'Real Estate', icon: '🏠', count: 8 },
    { id: 'gold', name: 'Gold & Metals', icon: '🥇', count: 6 },
    { id: 'bonds', name: 'Government Bonds', icon: '📋', count: 10 },
    { id: 'startups', name: 'Startups', icon: '🚀', count: 5 },
    { id: 'sip', name: 'SIP Plans', icon: '📅', count: 15 },
  ];

  // Risk levels
  const riskLevels = [
    { id: 'low', name: 'Low Risk', color: 'bg-green-500' },
    { id: 'medium', name: 'Medium Risk', color: 'bg-yellow-500' },
    { id: 'high', name: 'High Risk', color: 'bg-red-500' },
  ];

  // Sort options
  const sortOptions = [
    { id: 'popularity', name: 'Most Popular', icon: <MdOutlineLocalFireDepartment /> },
    { id: 'returns', name: 'Highest Returns', icon: <FiTrendingUp /> },
    { id: 'newest', name: 'Newest First', icon: <FiClock /> },
    { id: 'lowest-price', name: 'Lowest Price', icon: <FiDollarSign /> },
    { id: 'recommended', name: 'Recommended', icon: <FiStar /> },
  ];

  // Mock trending investments
  const trendingInvestments = [
    { id: 'trend-1', name: 'Tech Titans Fund', returns: '+24.5%', category: 'stocks' },
    { id: 'trend-2', name: 'Digital Gold Plan', returns: '+18.2%', category: 'crypto' },
    { id: 'trend-3', name: 'Green Energy Portfolio', returns: '+15.8%', category: 'mutual-funds' },
  ];

  // Filter functions
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleRiskToggle = (riskLevel) => {
    updateFilters({ riskLevel: filters.riskLevel === riskLevel ? 'all' : riskLevel });
  };

  const handleSortChange = (sortId) => {
    setSortBy(sortId);
    updateFilters({ sortBy: sortId });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    updateFilters({ search: e.target.value });
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setPriceRange([0, 100000]);
    setSortBy('popularity');
    clearFilters();
  };

  const handleInvestNow = (investmentId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/investments/${investmentId}` } });
      return;
    }
    navigate(`/investments/${investmentId}`);
  };

  const handleQuickInvest = (investmentId, amount) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/investments/${investmentId}` } });
      return;
    }
    // In a real app, this would trigger investment modal
    alert(`Quick investment of ₹${amount} would be processed for investment ${investmentId}`);
  };

  // Apply filters when they change
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({
        category: selectedCategories.length > 0 ? selectedCategories.join(',') : 'all',
        minAmount: priceRange[0],
        maxAmount: priceRange[1],
        sortBy: sortBy
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategories, priceRange, sortBy, updateFilters]);

  // Fetch investments on mount
  useEffect(() => {
    fetchAllInvestments();
  }, [fetchAllInvestments]);

  // Calculate active filter count
  const activeFilterCount = 
    (selectedCategories.length > 0 ? 1 : 0) +
    (filters.riskLevel !== 'all' ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 100000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Get invested investment IDs for highlighting
  const investedIds = userInvestments.map(inv => inv.investmentId);

  // Helper function to render list view
  const renderListView = (investment) => (
    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-6 border border-gray-800 hover:border-[#00d4ff]/30 transition-all duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Icon & Basic Info */}
        <div className="flex items-start space-x-4 flex-1">
          <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#00a8cc]/20 flex items-center justify-center">
            <span className="text-2xl">📈</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{investment.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{investment.category}</p>
            <div className="flex items-center space-x-4">
              <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                {investment.type}
              </span>
              <span className="text-sm text-gray-400">
                Min: ₹{investment.minInvestment?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Returns</p>
            <p className={`text-xl font-bold ${investment.expectedReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {investment.expectedReturn}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Risk</p>
            <div className={`px-2 py-1 rounded-full text-xs ${
              investment.riskLevel === 'low' ? 'bg-green-400/10 text-green-400' :
              investment.riskLevel === 'medium' ? 'bg-yellow-400/10 text-yellow-400' :
              'bg-red-400/10 text-red-400'
            }`}>
              {investment.riskLevel}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={() => handleInvestNow(investment.id)}
            className="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Details
          </button>
          <button
            onClick={() => handleQuickInvest(investment.id, investment.minInvestment)}
            className="px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Invest Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1a1f38]">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00a8cc]/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Discover <span className="text-[#00d4ff]">Investment</span> Opportunities
              </h1>
              <p className="text-gray-300 text-lg">
                Explore curated investment options across multiple asset classes. Start with as little as ₹100.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-gray-300 text-sm">Total Available</p>
                <p className="text-2xl font-bold text-white">{investments.length}+ Investments</p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] rounded-xl flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search investments..."
                    className="w-full pl-10 pr-4 py-3 bg-[#1e293b] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white flex items-center">
                  <FiFilter className="mr-2" />
                  Filters
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-[#00d4ff] hover:text-[#00a8cc] flex items-center"
                  >
                    <FiX className="mr-1" />
                    Clear ({activeFilterCount})
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-gray-300 font-medium mb-4 flex items-center">
                  <MdOutlineCategory className="mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                        selectedCategories.includes(category.id)
                          ? 'bg-gradient-to-r from-[#00d4ff]/20 to-[#00a8cc]/20 border border-[#00d4ff]/30'
                          : 'bg-[#1e293b] hover:bg-[#2d3748] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{category.icon}</span>
                        <span className="text-white">{category.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm mr-2">{category.count}</span>
                        {selectedCategories.includes(category.id) && (
                          <FiCheck className="text-[#00d4ff]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk Level */}
              <div className="mb-8">
                <h3 className="text-gray-300 font-medium mb-4">Risk Level</h3>
                <div className="flex flex-wrap gap-2">
                  {riskLevels.map((risk) => (
                    <button
                      key={risk.id}
                      onClick={() => handleRiskToggle(risk.id)}
                      className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                        filters.riskLevel === risk.id
                          ? `${risk.id === 'low' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : risk.id === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`
                          : 'bg-[#1e293b] text-gray-300 hover:bg-[#2d3748]'
                      }`}
                    >
                      <div className={`h-2 w-2 rounded-full mr-2 ${risk.color}`}></div>
                      {risk.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="text-gray-300 font-medium mb-4">Investment Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                  <div className="relative h-2">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="absolute w-full appearance-none h-2 bg-gray-800 rounded-lg [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00d4ff] [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="absolute w-full appearance-none h-2 bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00d4ff] [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-center">
                    <span className="px-4 py-2 bg-[#1e293b] rounded-lg text-gray-300">
                      ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* SEBI Verified Badge */}
              <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-center mb-2">
                  <FiShield className="text-green-400 mr-2" />
                  <span className="text-green-400 font-medium">SEBI Verified</span>
                </div>
                <p className="text-gray-300 text-sm">
                  All investments are through SEBI registered entities for your security.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center space-x-4">
                {/* View Toggle */}
                <div className="flex bg-[#1e293b] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#00d4ff] text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <FiGrid className="text-lg" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#00d4ff] text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <FiList className="text-lg" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#1e293b] rounded-lg text-gray-300 hover:bg-[#2d3748]">
                    <MdOutlineSort />
                    <span>Sort by: {sortOptions.find(s => s.id === sortBy)?.name}</span>
                    <FiChevronDown />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-[#1e293b] border border-gray-800 rounded-xl shadow-2xl py-2 z-10 hidden group-hover:block">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleSortChange(option.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-[#2d3748] ${
                          sortBy === option.id ? 'text-[#00d4ff]' : 'text-gray-300'
                        }`}
                      >
                        {option.icon}
                        <span>{option.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-gray-300">
                Showing <span className="text-white font-bold">{investments.length}</span> of 100+ investments
              </div>
            </div>

            {/* Trending Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <MdOutlineLocalFireDepartment className="mr-2 text-orange-400" />
                  Trending Now
                </h2>
                <span className="text-sm text-gray-400">Updated today</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trendingInvestments.map((trend) => (
                  <div
                    key={trend.id}
                    className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white">{trend.name}</h3>
                      <span className="text-green-400 text-sm font-bold">{trend.returns}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{categories.find(c => c.id === trend.category)?.name}</span>
                      <button
                        onClick={() => navigate(`/investments/${trend.id}`)}
                        className="text-orange-400 hover:text-orange-300 text-sm font-medium"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investments Grid/List */}
            {loading.investments ? (
              <CardSkeleton count={6} />
            ) : investments.length > 0 ? (
              <>
                {/* Investment Cards */}
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
                }>
                  {investments.map((investment) => (
                    <div key={investment.id} className="relative">
                      {/* Already Invested Badge */}
                      {investedIds.includes(investment.id) && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded-full font-medium">
                            ✓ Invested
                          </span>
                        </div>
                      )}
                      
                      {viewMode === 'list' ? (
                        renderListView(investment)
                      ) : (
                        <InvestmentCard 
                          investment={investment}
                          showActions={true}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                  <button className="px-8 py-3 border-2 border-[#00d4ff] text-[#00d4ff] rounded-xl font-bold hover:bg-[#00d4ff]/10 transition-colors">
                    Load More Investments
                  </button>
                </div>
              </>
            ) : (
              // No Results
              <div className="text-center py-16">
                <div className="h-24 w-24 mx-auto mb-6 text-gray-600 text-6xl">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-3">No investments found</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Try adjusting your filters or search criteria to find what you're looking for.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Investment Tips */}
            <div className="mt-12 p-6 bg-gradient-to-r from-[#00d4ff]/10 to-[#00a8cc]/10 rounded-2xl border border-gray-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Need help choosing?</h3>
                  <p className="text-gray-300">
                    Take our 2-minute risk assessment quiz to get personalized investment recommendations.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/risk-assessment')}
                  className="px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-xl font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Take Risk Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllInvestments;