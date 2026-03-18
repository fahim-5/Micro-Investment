import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useInvestments } from '../../context/InvestmentContext';
import InvestmentCard from '../../components/common/InvestmentCard';
import LoadingSpinner, { CardSkeleton } from '../../components/common/LoadingSpinner';
import {
  FiFilter,
  FiSearch,
  FiDownload,
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiPieChart,
  FiDollarSign,
  FiClock,
  FiRefreshCw,
  FiChevronDown,
  FiBarChart2,
  FiAlertCircle
} from 'react-icons/fi';
import { MdOutlineSavings, MdOutlineShowChart } from 'react-icons/md';

const MyInvestments = () => {
  const { user } = useAuth();
  const { 
    userInvestments, 
    totalInvested, 
    totalReturns, 
    averageROI,
    fetchUserInvestments,
    loading,
    withdrawInvestment
  } = useInvestments();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showWithdrawModal, setShowWithdrawModal] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  // Filter investments based on active tab
  const filteredInvestments = userInvestments.filter(investment => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return investment.status === 'active';
    if (activeTab === 'matured') return investment.status === 'matured';
    if (activeTab === 'sip') return investment.type === 'sip';
    return true;
  });

  // Search filter
  const searchedInvestments = filteredInvestments.filter(investment =>
    investment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    investment.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort investments
  const sortedInvestments = [...searchedInvestments].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.investmentDate) - new Date(a.investmentDate);
      case 'returns':
        return b.roi - a.roi;
      case 'amount':
        return b.investedAmount - a.investedAmount;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleRefresh = () => {
    fetchUserInvestments();
  };

  const handleWithdraw = async (investmentId) => {
    try {
      await withdrawInvestment(investmentId);
      setShowWithdrawModal(null);
      alert('Withdrawal request submitted successfully!');
    } catch (error) {
      alert('Withdrawal failed. Please try again.');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate stats
  const activeInvestments = userInvestments.filter(inv => inv.status === 'active').length;
  const totalCurrentValue = userInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalProfit = totalReturns;

  // Mock SIP investments
  const sipInvestments = [
    { id: 'sip1', name: 'Monthly Tech SIP', amount: 5000, day: 5, status: 'active' },
    { id: 'sip2', name: 'Gold Savings SIP', amount: 3000, day: 10, status: 'active' },
    { id: 'sip3', name: 'Index Fund SIP', amount: 7000, day: 15, status: 'paused' },
  ];

  if (loading.userInvestments) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1a1f38] p-4">
        <div className="max-w-7xl mx-auto">
          <CardSkeleton count={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1a1f38]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00a8cc]/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                My <span className="text-[#00d4ff]">Investments</span>
              </h1>
              <p className="text-gray-300">
                Track, manage, and grow your investment portfolio in one place
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={loading.userInvestments}
                className="px-4 py-2 bg-[#1e293b] text-gray-300 rounded-lg hover:bg-[#2d3748] transition-colors flex items-center"
              >
                <FiRefreshCw className={`mr-2 ${loading.userInvestments ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-lg font-bold hover:opacity-90 transition-opacity">
                + New Investment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center mr-3">
                <FiDollarSign className="text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Invested</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalInvested)}</p>
              </div>
            </div>
            <div className="text-green-400 text-sm flex items-center">
              <FiTrendingUp className="mr-1" />
              +12.4% this month
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center mr-3">
                <MdOutlineShowChart className="text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Current Value</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalCurrentValue)}</p>
              </div>
            </div>
            <div className="text-green-400 text-sm flex items-center">
              <FiTrendingUp className="mr-1" />
              +{formatCurrency(totalProfit)} profit
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center mr-3">
                <FiPieChart className="text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Average ROI</p>
                <p className="text-2xl font-bold text-green-400">{averageROI.toFixed(1)}%</p>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              {activeInvestments} active investments
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20 flex items-center justify-center mr-3">
                <FiClock className="text-yellow-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Dividends Earned</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(12500)}</p>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              Next payout: 15 Jan 2024
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Investments List */}
          <div className="lg:col-span-2">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex space-x-2">
                {['all', 'active', 'matured', 'sip'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-[#00d4ff] text-white'
                        : 'bg-[#1e293b] text-gray-300 hover:bg-[#2d3748]'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search investments..."
                    className="pl-10 pr-4 py-2 bg-[#1e293b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]"
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff] pr-8"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="returns">Highest Returns</option>
                    <option value="amount">Investment Amount</option>
                    <option value="name">Alphabetical</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Investments List */}
            {sortedInvestments.length > 0 ? (
              <div className="space-y-4">
                {sortedInvestments.map((investment) => (
                  <div
                    key={investment.id}
                    className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-6 border border-gray-800 hover:border-[#00d4ff]/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Investment Info */}
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#00a8cc]/20 flex items-center justify-center">
                          <span className="text-xl">📈</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-bold text-white">{investment.name}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              investment.status === 'active' ? 'bg-green-400/10 text-green-400' :
                              investment.status === 'matured' ? 'bg-blue-400/10 text-blue-400' :
                              'bg-gray-400/10 text-gray-400'
                            }`}>
                              {investment.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm">
                            <div className="flex items-center text-gray-400">
                              <FiCalendar className="mr-1" />
                              Invested: {formatDate(investment.investmentDate)}
                            </div>
                            <div className="flex items-center text-gray-400">
                              <FiDollarSign className="mr-1" />
                              Amount: {formatCurrency(investment.investedAmount)}
                            </div>
                            <div className="flex items-center text-gray-400">
                              <MdOutlineSavings className="mr-1" />
                              Current: {formatCurrency(investment.currentValue)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Returns & Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Returns */}
                        <div className="text-right">
                          <div className={`text-xl font-bold ${investment.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {investment.roi >= 0 ? '+' : ''}{investment.roi}%
                          </div>
                          <div className="text-sm text-gray-400">
                            {formatCurrency(investment.currentValue - investment.investedAmount)}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <Link
                            to={`/investments/${investment.investmentId}`}
                            className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            View
                          </Link>
                          {investment.status === 'active' && (
                            <button
                              onClick={() => setShowWithdrawModal(investment.id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
                            >
                              Withdraw
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Investment Progress</span>
                        <span className="text-gray-300">
                          {((investment.currentValue / investment.investedAmount) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            investment.roi >= 0 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                              : 'bg-gradient-to-r from-red-500 to-pink-500'
                          }`}
                          style={{ 
                            width: `${Math.min(100, (investment.currentValue / investment.investedAmount) * 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="h-24 w-24 mx-auto mb-6 text-gray-600 text-6xl">💼</div>
                <h3 className="text-2xl font-bold text-white mb-3">No investments found</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  {activeTab === 'all' 
                    ? "You haven't made any investments yet. Start your investment journey today!"
                    : `No ${activeTab} investments found. Try a different filter.`
                  }
                </p>
                <Link
                  to="/investments"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  Explore Investments
                </Link>
              </div>
            )}
          </div>

          {/* Right Column - Portfolio Summary */}
          <div className="space-y-6">
            {/* Portfolio Allocation */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Portfolio Allocation</h2>
                <Link to="/portfolio" className="text-[#00d4ff] text-sm hover:underline">
                  Details
                </Link>
              </div>
              
              {/* Allocation Chart */}
              <div className="space-y-4">
                {[
                  { category: 'Stocks', amount: 125000, color: 'from-blue-500 to-cyan-500', percentage: 40 },
                  { category: 'Mutual Funds', amount: 93750, color: 'from-green-500 to-emerald-500', percentage: 30 },
                  { category: 'Gold', amount: 46875, color: 'from-yellow-500 to-amber-500', percentage: 15 },
                  { category: 'Real Estate', amount: 31250, color: 'from-purple-500 to-pink-500', percentage: 10 },
                  { category: 'Crypto', amount: 15625, color: 'from-orange-500 to-red-500', percentage: 5 },
                ].map((asset, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full mr-2 bg-gradient-to-r ${asset.color}`}></div>
                        <span className="text-white">{asset.category}</span>
                      </div>
                      <div className="text-gray-300">{formatCurrency(asset.amount)}</div>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${asset.color}`}
                        style={{ width: `${asset.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{asset.percentage}%</span>
                      <span>{formatCurrency(asset.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SIP Investments */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Active SIPs</h2>
                <button className="text-[#00d4ff] text-sm hover:underline">
                  + New SIP
                </button>
              </div>
              
              <div className="space-y-4">
                {sipInvestments.map((sip) => (
                  <div key={sip.id} className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                    <div>
                      <p className="font-medium text-white">{sip.name}</p>
                      <p className="text-gray-400 text-sm">
                        ₹{sip.amount} • Day {sip.day}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        sip.status === 'active' 
                          ? 'bg-green-400/10 text-green-400' 
                          : 'bg-yellow-400/10 text-yellow-400'
                      }`}>
                        {sip.status}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-white">
                        ⚙️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Monthly SIP Amount</span>
                  <span className="text-white font-bold">₹15,000</span>
                </div>
              </div>
            </div>

            {/* Upcoming Actions */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-6">Upcoming Actions</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center mr-3">
                      <FiCalendar className="text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">SIP Investment</p>
                      <p className="text-gray-400 text-sm">5 Jan 2024</p>
                    </div>
                  </div>
                  <span className="text-white font-bold">₹5,000</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center mr-3">
                      <FiDollarSign className="text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Dividend Payout</p>
                      <p className="text-gray-400 text-sm">15 Jan 2024</p>
                    </div>
                  </div>
                  <span className="text-green-400 font-bold">₹1,250</span>
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
                View Calendar
              </button>
            </div>

            {/* Export Data */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Export Data</h2>
              <p className="text-gray-400 text-sm mb-6">
                Download your investment statements for tax filing or record keeping.
              </p>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-[#0f172a] rounded-lg hover:bg-[#1a2438]">
                  <span className="text-white">Investment Statement</span>
                  <FiDownload className="text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-[#0f172a] rounded-lg hover:bg-[#1a2438]">
                  <span className="text-white">Tax Report (FY 2023-24)</span>
                  <FiDownload className="text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-[#0f172a] rounded-lg hover:bg-[#1a2438]">
                  <span className="text-white">Transaction History</span>
                  <FiDownload className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 max-w-md w-full border border-gray-700">
            <div className="text-center mb-6">
              <div className="h-16 w-16 mx-auto mb-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Withdraw Investment</h3>
              <p className="text-gray-300">
                Are you sure you want to withdraw from this investment? 
                Partial withdrawals may be subject to exit loads.
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">Withdrawal Amount (₹)</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]"
                  placeholder="Enter amount"
                />
              </div>
              
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start">
                  <FiAlertCircle className="text-yellow-400 mt-0.5 mr-2" />
                  <p className="text-yellow-400 text-sm">
                    An exit load of 1% will be applied for withdrawals before 1 year.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => handleWithdraw(showWithdrawModal)}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Confirm Withdrawal
              </button>
              <button
                onClick={() => setShowWithdrawModal(null)}
                className="w-full py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-xs">
                Funds will be credited to your registered bank account within 3-5 working days.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyInvestments;