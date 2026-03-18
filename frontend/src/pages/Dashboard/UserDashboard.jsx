import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useInvestments } from '../../context/InvestmentContext';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign, 
  FiPieChart,
  FiClock,
  FiCalendar,
  FiRefreshCw,
  FiDownload,
  FiBell,
  FiFilter,
  FiArrowUpRight,
  FiArrowDownRight
} from 'react-icons/fi';
import { 
  MdShowChart, 
  MdSecurity, 
  MdAccountBalanceWallet,
  MdSavings
} from 'react-icons/md';
import InvestmentCard from '../../components/common/InvestmentCard';
import LoadingSpinner, { CardSkeleton } from '../../components/common/LoadingSpinner';

const UserDashboard = () => {
  const { user } = useAuth();
  const { 
    portfolio, 
    userInvestments, 
    totalInvested, 
    totalReturns, 
    averageROI,
    fetchPortfolio,
    fetchUserInvestments,
    loading,
    isLoading
  } = useInvestments();

  const [timeRange, setTimeRange] = useState('1m');
  const [activeTab, setActiveTab] = useState('overview');
  const [showKYCModal, setShowKYCModal] = useState(!user?.kycVerified);

  // Fetch data on component mount
  useEffect(() => {
    fetchPortfolio();
    fetchUserInvestments();
  }, [fetchPortfolio, fetchUserInvestments]);

  // Mock data for charts and stats
  const performanceData = {
    '1d': { change: 2.3, amount: 12500 },
    '1w': { change: 5.7, amount: 31500 },
    '1m': { change: 12.4, amount: 84500 },
    '1y': { change: 28.9, amount: 215000 }
  };

  const recentTransactions = [
    { id: 1, type: 'investment', asset: 'Tech Growth Fund', amount: 5000, date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'deposit', asset: 'Wallet Top-up', amount: 10000, date: '2024-01-12', status: 'completed' },
    { id: 3, type: 'withdrawal', asset: 'Cash Out', amount: 3000, date: '2024-01-10', status: 'processing' },
    { id: 4, type: 'dividend', asset: 'Real Estate REIT', amount: 1250, date: '2024-01-08', status: 'completed' },
    { id: 5, type: 'investment', asset: 'Gold Savings Plan', amount: 2000, date: '2024-01-05', status: 'completed' },
  ];

  const quickActions = [
    { icon: <FiDollarSign />, label: 'Add Funds', color: 'from-green-500 to-emerald-600', path: '/wallet/deposit' },
    { icon: <MdShowChart />, label: 'Invest Now', color: 'from-blue-500 to-cyan-600', path: '/investments' },
    { icon: <FiPieChart />, label: 'Portfolio', color: 'from-purple-500 to-pink-600', path: '/portfolio' },
    { icon: <MdSavings />, label: 'SIP Plans', color: 'from-orange-500 to-red-600', path: '/investments?type=sip' },
  ];

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'processing': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-400/10';
      case 'processing': return 'bg-yellow-400/10';
      case 'failed': return 'bg-red-400/10';
      default: return 'bg-gray-400/10';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'investment': return '📈';
      case 'deposit': return '💳';
      case 'withdrawal': return '💰';
      case 'dividend': return '🎁';
      default: return '💼';
    }
  };

  const handleRefresh = () => {
    fetchPortfolio();
    fetchUserInvestments();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1a1f38] p-4">
        <div className="max-w-7xl mx-auto">
          <CardSkeleton count={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1a1f38] p-4">
      {/* KYC Modal */}
      {showKYCModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 max-w-md w-full border border-gray-700">
            <div className="text-center mb-6">
              <div className="h-16 w-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Complete Your KYC</h3>
              <p className="text-gray-300">
                To access all investment features, please complete your KYC verification.
                This is required for compliance with SEBI regulations.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowKYCModal(false);
                  window.location.href = '/kyc-verification';
                }}
                className="w-full py-3 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Complete KYC Now
              </button>
              <button
                onClick={() => setShowKYCModal(false)}
                className="w-full py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Do it later
              </button>
            </div>
            
            <div className="mt-6 p-3 bg-[#0f172a] rounded-lg">
              <p className="text-gray-400 text-sm text-center">
                ⚡ Complete KYC now and get ₹100 bonus credit!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, <span className="text-[#00d4ff]">{user?.name?.split(' ')[0] || 'Investor'}!</span>
            </h1>
            <p className="text-gray-400">
              Here's your investment overview for {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={handleRefresh}
              disabled={loading.portfolio}
              className="px-4 py-2 bg-[#1e293b] text-gray-300 rounded-lg hover:bg-[#2d3748] transition-colors flex items-center"
            >
              <FiRefreshCw className={`mr-2 ${loading.portfolio ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="relative p-2 bg-[#1e293b] rounded-lg hover:bg-[#2d3748]">
              <FiBell className="text-xl text-gray-300" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className={`bg-gradient-to-r ${action.color} p-4 rounded-xl flex items-center justify-between hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center text-white mr-3">
                  {action.icon}
                </div>
                <span className="text-white font-medium">{action.label}</span>
              </div>
              <FiArrowUpRight className="text-white text-xl" />
            </Link>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Portfolio Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Value Card */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Portfolio Value</h2>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(portfolio?.totalValue || totalInvested + totalReturns)}
                    </p>
                    <div className={`flex items-center px-2 py-1 rounded-full ${performanceData[timeRange].change >= 0 ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                      {performanceData[timeRange].change >= 0 ? (
                        <FiTrendingUp className="mr-1" />
                      ) : (
                        <FiTrendingDown className="mr-1" />
                      )}
                      <span>{performanceData[timeRange].change}%</span>
                    </div>
                  </div>
                  <p className="text-gray-400 mt-1">
                    {performanceData[timeRange].change >= 0 ? 'Up' : 'Down'} {formatCurrency(performanceData[timeRange].amount)} this {timeRange === '1d' ? 'day' : timeRange === '1w' ? 'week' : timeRange === '1m' ? 'month' : 'year'}
                  </p>
                </div>
                
                {/* Time Range Selector */}
                <div className="flex space-x-2">
                  {['1d', '1w', '1m', '1y'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        timeRange === range
                          ? 'bg-[#00d4ff] text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Portfolio Allocation */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Portfolio Allocation</h3>
                  <Link to="/portfolio" className="text-[#00d4ff] text-sm hover:underline">
                    View Details
                  </Link>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden flex">
                  {[
                    { label: 'Stocks', value: 40, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Mutual Funds', value: 30, color: 'from-green-500 to-emerald-500' },
                    { label: 'Gold', value: 15, color: 'from-yellow-500 to-amber-500' },
                    { label: 'Real Estate', value: 10, color: 'from-purple-500 to-pink-500' },
                    { label: 'Crypto', value: 5, color: 'from-orange-500 to-red-500' },
                  ].map((asset, index) => (
                    <div
                      key={index}
                      className={`h-full bg-gradient-to-r ${asset.color}`}
                      style={{ width: `${asset.value}%` }}
                      title={`${asset.label}: ${asset.value}%`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                  {[
                    { label: 'Stocks', value: 40, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
                    { label: 'Mutual Funds', value: 30, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
                    { label: 'Gold', value: 15, color: 'bg-gradient-to-r from-yellow-500 to-amber-500' },
                    { label: 'Real Estate', value: 10, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
                    { label: 'Crypto', value: 5, color: 'bg-gradient-to-r from-orange-500 to-red-500' },
                  ].map((asset, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-2 ${asset.color}`}></div>
                      <span className="text-gray-300 text-sm">{asset.label}: {asset.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#0f172a] p-4 rounded-xl">
                  <div className="flex items-center text-gray-400 mb-2">
                    <MdAccountBalanceWallet className="mr-2" />
                    <span className="text-sm">Invested</span>
                  </div>
                  <p className="text-xl font-bold text-white">{formatCurrency(totalInvested)}</p>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-xl">
                  <div className="flex items-center text-gray-400 mb-2">
                    <FiTrendingUp className="mr-2" />
                    <span className="text-sm">Returns</span>
                  </div>
                  <p className={`text-xl font-bold ${totalReturns >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCurrency(totalReturns)}
                  </p>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-xl">
                  <div className="flex items-center text-gray-400 mb-2">
                    <MdShowChart className="mr-2" />
                    <span className="text-sm">ROI</span>
                  </div>
                  <p className={`text-xl font-bold ${averageROI >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {averageROI.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-xl">
                  <div className="flex items-center text-gray-400 mb-2">
                    <FiPieChart className="mr-2" />
                    <span className="text-sm">Holdings</span>
                  </div>
                  <p className="text-xl font-bold text-white">{userInvestments.length}</p>
                </div>
              </div>
            </div>

            {/* Recent Investments */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Recent Investments</h2>
                <Link 
                  to="/my-investments" 
                  className="text-[#00d4ff] hover:text-[#00a8cc] transition-colors text-sm font-medium"
                >
                  View All →
                </Link>
              </div>
              
              {userInvestments.length > 0 ? (
                <div className="space-y-4">
                  {userInvestments.slice(0, 3).map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl hover:bg-[#1a2438] transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-r from-[#00d4ff]/20 to-[#00a8cc]/20 rounded-lg flex items-center justify-center">
                          <span className="text-lg">📈</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{investment.name}</h4>
                          <p className="text-sm text-gray-400">Invested: {formatCurrency(investment.investedAmount)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${investment.currentValue >= investment.investedAmount ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(investment.currentValue)}
                        </p>
                        <p className={`text-sm ${investment.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {investment.roi >= 0 ? '+' : ''}{investment.roi}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="h-16 w-16 mx-auto mb-4 text-gray-600">💼</div>
                  <h3 className="text-lg font-medium text-gray-400 mb-2">No investments yet</h3>
                  <p className="text-gray-500 mb-4">Start your investment journey today</p>
                  <Link
                    to="/investments"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Explore Investments
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Quick Actions & Transactions */}
          <div className="space-y-6">
            {/* Wallet Summary */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-6">Wallet Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mr-3">
                      <FiDollarSign className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Available Balance</p>
                      <p className="text-2xl font-bold text-white">{formatCurrency(user?.balance || 0)}</p>
                    </div>
                  </div>
                  <Link
                    to="/wallet/deposit"
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:opacity-90"
                  >
                    Add Funds
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0f172a] p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Invested</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(totalInvested)}</p>
                  </div>
                  <div className="bg-[#0f172a] p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Earnings</p>
                    <p className="text-lg font-bold text-green-400">{formatCurrency(totalReturns)}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-800">
                  <Link
                    to="/wallet"
                    className="w-full py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    <MdAccountBalanceWallet className="mr-2" />
                    Go to Wallet
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                <button className="text-gray-400 hover:text-white">
                  <FiFilter />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-[#0f172a] rounded-lg flex items-center justify-center text-xl">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{transaction.asset}</p>
                        <p className="text-sm text-gray-400">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${transaction.type === 'withdrawal' ? 'text-red-400' : 'text-green-400'}`}>
                        {transaction.type === 'withdrawal' ? '-' : '+'}{formatCurrency(transaction.amount)}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusBg(transaction.status)} ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-800">
                <Link
                  to="/wallet/transactions"
                  className="w-full py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  View All Transactions
                </Link>
              </div>
            </div>

            {/* Investment Goals */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Investment Goals</h2>
              
              <div className="space-y-4">
                {[
                  { goal: 'Emergency Fund', target: 500000, current: 250000, color: 'from-blue-500 to-cyan-500' },
                  { goal: 'Retirement', target: 5000000, current: 1250000, color: 'from-purple-500 to-pink-500' },
                  { goal: 'Home Down Payment', target: 2000000, current: 750000, color: 'from-green-500 to-emerald-500' },
                ].map((goal, index) => {
                  const progress = (goal.current / goal.target) * 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{goal.goal}</span>
                        <span className="text-gray-400">{progress.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${goal.color}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{formatCurrency(goal.current)}</span>
                        <span>{formatCurrency(goal.target)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button className="w-full mt-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                Set New Goal
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Market Insights */}
        <div className="mt-8 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Market Insights</h2>
            <span className="text-sm text-gray-400">Live Updates</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { index: 'NIFTY 50', value: '21,856.50', change: '+1.24%', trend: 'up' },
              { index: 'SENSEX', value: '72,427.30', change: '+0.98%', trend: 'up' },
              { index: 'BANK NIFTY', value: '46,328.75', change: '+0.65%', trend: 'up' },
              { index: 'GOLD', value: '62,450/10g', change: '-0.32%', trend: 'down' },
            ].map((market, index) => (
              <div key={index} className="bg-[#0f172a] p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-1">{market.index}</p>
                <div className="flex items-baseline justify-between">
                  <p className="text-xl font-bold text-white">{market.value}</p>
                  <div className={`flex items-center ${market.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {market.trend === 'up' ? <FiArrowUpRight /> : <FiArrowDownRight />}
                    <span className="text-sm">{market.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link
              to="/market"
              className="inline-flex items-center text-[#00d4ff] hover:text-[#00a8cc] transition-colors"
            >
              View Detailed Market Analysis →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;