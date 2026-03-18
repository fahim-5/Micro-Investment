import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useInvestments } from '../../context/InvestmentContext';
import InvestmentCard from '../../components/common/InvestmentCard';
import LoadingSpinner, { CardSkeleton } from '../../components/common/LoadingSpinner';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiPieChart,
  FiDollarSign,
  FiCalendar,
  FiDownload,
  FiRefreshCw,
  FiFilter,
  FiChevronRight,
  FiBarChart2,
  FiClock,
  FiTarget,
  FiPercent,
  FiEye,
  FiEyeOff,
  FiShare2,
  FiAlertCircle
} from 'react-icons/fi';
import {
  MdShowChart,
  MdOutlineSavings,
  MdOutlineAccountBalanceWallet,
  MdOutlineAnalytics,
  MdOutlineLocalFireDepartment,
  MdOutlineSecurity
} from 'react-icons/md';
import { TbChartLine, TbChartAreaLine } from 'react-icons/tb';

const PortfolioOverview = () => {
  const { user } = useAuth();
  const {
    portfolio,
    userInvestments,
    totalInvested,
    totalReturns,
    averageROI,
    fetchPortfolio,
    loading
  } = useInvestments();
  const navigate = useNavigate();

  const [timeRange, setTimeRange] = useState('1y'); // 1d, 1w, 1m, 3m, 6m, 1y, all
  const [activeTab, setActiveTab] = useState('overview');
  const [showHiddenValues, setShowHiddenValues] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);

  // Mock portfolio data
  const mockPortfolio = {
    totalValue: 975000,
    investedAmount: 850000,
    totalReturns: 125000,
    dailyChange: 2.3,
    monthlyChange: 8.7,
    yearlyChange: 28.9,
    averageROI: 14.7,
    riskScore: 65, // 0-100, higher = riskier
    diversificationScore: 85, // 0-100, higher = more diversified
    allocation: [
      { category: 'Stocks', amount: 390000, percentage: 40, color: 'from-blue-500 to-cyan-500' },
      { category: 'Mutual Funds', amount: 292500, percentage: 30, color: 'from-green-500 to-emerald-500' },
      { category: 'Gold', amount: 146250, percentage: 15, color: 'from-yellow-500 to-amber-500' },
      { category: 'Real Estate', amount: 97500, percentage: 10, color: 'from-purple-500 to-pink-500' },
      { category: 'Crypto', amount: 48750, percentage: 5, color: 'from-orange-500 to-red-500' },
    ],
    topPerformers: [
      { name: 'Tech Growth Fund', returns: 28.5, invested: 150000, current: 192750 },
      { name: 'Digital Gold', returns: 18.2, invested: 75000, current: 88650 },
      { name: 'Real Estate REIT', returns: 15.8, invested: 100000, current: 115800 },
    ],
    underPerformers: [
      { name: 'Energy Sector Fund', returns: -2.3, invested: 50000, current: 48850 },
      { name: 'Government Bonds', returns: 5.2, invested: 100000, current: 105200 },
    ],
    sectors: [
      { name: 'Technology', allocation: 35, trend: 'up' },
      { name: 'Financial Services', allocation: 20, trend: 'up' },
      { name: 'Healthcare', allocation: 15, trend: 'neutral' },
      { name: 'Consumer Goods', allocation: 12, trend: 'up' },
      { name: 'Energy', allocation: 8, trend: 'down' },
      { name: 'Utilities', allocation: 5, trend: 'neutral' },
      { name: 'Other', allocation: 5, trend: 'up' },
    ],
    goals: [
      { name: 'Emergency Fund', target: 500000, current: 250000, progress: 50, priority: 'high' },
      { name: 'Retirement', target: 5000000, current: 975000, progress: 19.5, priority: 'medium' },
      { name: 'Home Down Payment', target: 2000000, current: 500000, progress: 25, priority: 'high' },
      { name: 'Education Fund', target: 1000000, current: 200000, progress: 20, priority: 'medium' },
    ]
  };

  // Mock performance chart data
  const performanceChartData = {
    '1d': [975000, 978000, 976500, 974000, 972000, 970500, 973000, 975000],
    '1w': [950000, 955000, 960000, 965000, 970000, 972000, 975000],
    '1m': [900000, 910000, 925000, 935000, 950000, 960000, 975000],
    '3m': [850000, 865000, 880000, 900000, 920000, 940000, 975000],
    '6m': [750000, 780000, 810000, 840000, 880000, 920000, 975000],
    '1y': [600000, 650000, 700000, 750000, 800000, 900000, 975000],
    'all': [500000, 550000, 600000, 650000, 720000, 800000, 900000, 975000]
  };

  // Time range options
  const timeRanges = [
    { id: '1d', label: '1D' },
    { id: '1w', label: '1W' },
    { id: '1m', label: '1M' },
    { id: '3m', label: '3M' },
    { id: '6m', label: '6M' },
    { id: '1y', label: '1Y', default: true },
    { id: 'all', label: 'ALL' },
  ];

  useEffect(() => {
    // Simulate API call for performance data
    const timer = setTimeout(() => {
      setPerformanceData(performanceChartData[timeRange]);
      setShowHiddenValues(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [timeRange]);

  const handleRefresh = () => {
    fetchPortfolio();
  };

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
    // In real app, show detailed modal or navigate to asset details
  };

  const formatCurrency = (amount) => {
    if (showHiddenValues && amount > 0) {
      return '••••••';
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getChangeColor = (value) => {
    return value >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getChangeBgColor = (value) => {
    return value >= 0 ? 'bg-green-400/10' : 'bg-red-400/10';
  };

  const getRiskColor = (score) => {
    if (score <= 30) return 'text-green-400';
    if (score <= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskLabel = (score) => {
    if (score <= 30) return 'Low Risk';
    if (score <= 70) return 'Moderate Risk';
    return 'High Risk';
  };

  const calculateProjectedValue = (years) => {
    const currentValue = mockPortfolio.totalValue;
    const annualReturn = mockPortfolio.averageROI / 100;
    return currentValue * Math.pow(1 + annualReturn, years);
  };

  const renderPerformanceChart = () => {
    if (!performanceData) return null;

    const maxValue = Math.max(...performanceData);
    const minValue = Math.min(...performanceData);
    const chartHeight = 200;

    return (
      <div className="h-64 relative">
        {/* Chart */}
        <svg className="w-full h-full" viewBox={`0 0 ${performanceData.length * 40} ${chartHeight + 40}`}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1="0"
              y1={chartHeight - (chartHeight * percent / 100)}
              x2={performanceData.length * 40}
              y2={chartHeight - (chartHeight * percent / 100)}
              stroke="#374151"
              strokeWidth="1"
              strokeDasharray="4"
            />
          ))}

          {/* Performance line */}
          <polyline
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={performanceData.map((value, index) => 
              `${index * 40 + 20},${chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight}`
            ).join(' ')}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#00a8cc" />
            </linearGradient>
          </defs>
        </svg>

        {/* Current value indicator */}
        <div className="absolute top-0 right-0 text-right">
          <p className="text-gray-400 text-sm">Current Value</p>
          <p className="text-2xl font-bold text-white">{formatCurrency(performanceData[performanceData.length - 1])}</p>
        </div>
      </div>
    );
  };

  const renderAllocationChart = () => {
    return (
      <div className="relative h-64">
        {/* Pie chart visualization (simplified) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-48 w-48">
            {/* Pie slices */}
            {mockPortfolio.allocation.reduce((prev, asset, index) => {
              const degrees = (asset.percentage / 100) * 360;
              return [
                ...prev,
                <div
                  key={asset.category}
                  className="absolute h-full w-full rounded-full"
                  style={{
                    clipPath: `conic-gradient(from ${prev.reduce((sum, a) => sum + (a.degrees || 0), 0)}deg, transparent ${degrees}deg, transparent)`,
                  }}
                >
                  <div className={`h-full w-full bg-gradient-to-r ${asset.color}`}></div>
                </div>
              ];
            }, [])}

            {/* Center circle */}
            <div className="absolute inset-8 bg-[#0f172a] rounded-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-xl font-bold text-white">{formatCurrency(mockPortfolio.totalValue)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading.portfolio) {
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
                My <span className="text-[#00d4ff]">Portfolio</span>
              </h1>
              <p className="text-gray-300">
                Track performance, analyze allocation, and optimize your investments
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowHiddenValues(!showHiddenValues)}
                className="px-4 py-2 bg-[#1e293b] text-gray-300 rounded-lg hover:bg-[#2d3748] transition-colors flex items-center"
              >
                {showHiddenValues ? <FiEyeOff className="mr-2" /> : <FiEye className="mr-2" />}
                {showHiddenValues ? 'Show Values' : 'Hide Values'}
              </button>
              <button
                onClick={handleRefresh}
                disabled={loading.portfolio}
                className="px-4 py-2 bg-[#1e293b] text-gray-300 rounded-lg hover:bg-[#2d3748] transition-colors flex items-center"
              >
                <FiRefreshCw className={`mr-2 ${loading.portfolio ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-lg font-bold hover:opacity-90 transition-opacity">
                + Add Funds
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Portfolio Value Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Portfolio Value</h2>
                <div className="flex items-baseline space-x-3">
                  <p className="text-4xl font-bold text-white">{formatCurrency(mockPortfolio.totalValue)}</p>
                  <div className={`flex items-center px-3 py-1 rounded-full ${getChangeBgColor(mockPortfolio.dailyChange)}`}>
                    {mockPortfolio.dailyChange >= 0 ? (
                      <FiTrendingUp className="mr-1" />
                    ) : (
                      <FiTrendingDown className="mr-1" />
                    )}
                    <span className={getChangeColor(mockPortfolio.dailyChange)}>
                      {formatPercentage(mockPortfolio.dailyChange)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 mt-2">
                  {mockPortfolio.dailyChange >= 0 ? 'Up' : 'Down'} {formatCurrency(Math.abs(mockPortfolio.totalValue - mockPortfolio.totalValue / (1 + mockPortfolio.dailyChange/100)))} today
                </p>
              </div>

              {/* Time Range Selector */}
              <div className="flex space-x-1 bg-[#0f172a] rounded-lg p-1">
                {timeRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      timeRange === range.id
                        ? 'bg-[#00d4ff] text-white'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            {renderPerformanceChart()}

            {/* Time Range Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 bg-[#0f172a] rounded-xl">
                <p className="text-gray-400 text-sm">1 Week</p>
                <p className={`text-lg font-bold ${getChangeColor(5.7)}`}>+5.7%</p>
              </div>
              <div className="text-center p-3 bg-[#0f172a] rounded-xl">
                <p className="text-gray-400 text-sm">1 Month</p>
                <p className={`text-lg font-bold ${getChangeColor(mockPortfolio.monthlyChange)}`}>
                  {formatPercentage(mockPortfolio.monthlyChange)}
                </p>
              </div>
              <div className="text-center p-3 bg-[#0f172a] rounded-xl">
                <p className="text-gray-400 text-sm">1 Year</p>
                <p className={`text-lg font-bold ${getChangeColor(mockPortfolio.yearlyChange)}`}>
                  {formatPercentage(mockPortfolio.yearlyChange)}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Portfolio Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-300">
                    <MdOutlineSavings className="mr-2" />
                    <span>Total Invested</span>
                  </div>
                  <span className="text-white font-bold">{formatCurrency(mockPortfolio.investedAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-300">
                    <FiTrendingUp className="mr-2" />
                    <span>Total Returns</span>
                  </div>
                  <span className="text-green-400 font-bold">{formatCurrency(mockPortfolio.totalReturns)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-300">
                    <FiPercent className="mr-2" />
                    <span>Average ROI</span>
                  </div>
                  <span className="text-green-400 font-bold">{mockPortfolio.averageROI}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-300">
                    <MdOutlineLocalFireDepartment className="mr-2" />
                    <span>Risk Score</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-bold ${getRiskColor(mockPortfolio.riskScore)}`}>
                      {getRiskLabel(mockPortfolio.riskScore)}
                    </span>
                    <div className="ml-2 w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          mockPortfolio.riskScore <= 30 ? 'bg-green-500' :
                          mockPortfolio.riskScore <= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${mockPortfolio.riskScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-300">
                    <FiPieChart className="mr-2" />
                    <span>Diversification</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white font-bold">{mockPortfolio.diversificationScore}/100</span>
                    <div className="ml-2 w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        style={{ width: `${mockPortfolio.diversificationScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
                View Detailed Report
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 border-b border-gray-800">
            {['overview', 'allocation', 'performance', 'goals'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab
                    ? 'text-[#00d4ff] border-b-2 border-[#00d4ff]'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-b-2xl rounded-tr-2xl border border-gray-800">
            {activeTab === 'overview' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Allocation Chart */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Asset Allocation</h3>
                      <Link to="/portfolio/allocation" className="text-[#00d4ff] text-sm hover:underline">
                        View Details
                      </Link>
                    </div>
                    {renderAllocationChart()}

                    {/* Allocation List */}
                    <div className="mt-6 space-y-3">
                      {mockPortfolio.allocation.map((asset) => (
                        <div
                          key={asset.category}
                          onClick={() => handleAssetClick(asset)}
                          className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg hover:bg-[#1a2438] cursor-pointer transition-colors"
                        >
                          <div className="flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-3 bg-gradient-to-r ${asset.color}`}></div>
                            <span className="text-white">{asset.category}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold">{formatCurrency(asset.amount)}</p>
                            <p className="text-gray-400 text-sm">{asset.percentage}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Highlights */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6">Performance Highlights</h3>
                    
                    {/* Top Performers */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">Top Performers</h4>
                        <span className="text-green-400 text-sm">↑ Highest Returns</span>
                      </div>
                      <div className="space-y-3">
                        {mockPortfolio.topPerformers.map((investment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                            <div>
                              <p className="font-medium text-white">{investment.name}</p>
                              <div className="flex items-center mt-1">
                                <span className="text-green-400 text-sm font-bold">+{investment.returns}%</span>
                                <span className="text-gray-400 text-sm mx-2">•</span>
                                <span className="text-gray-400 text-sm">Invested: {formatCurrency(investment.invested)}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-bold">{formatCurrency(investment.current)}</p>
                              <p className="text-green-400 text-sm">+{formatCurrency(investment.current - investment.invested)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Under Performers */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">Under Performers</h4>
                        <span className="text-red-400 text-sm">↓ Needs Review</span>
                      </div>
                      <div className="space-y-3">
                        {mockPortfolio.underPerformers.map((investment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                            <div>
                              <p className="font-medium text-white">{investment.name}</p>
                              <div className="flex items-center mt-1">
                                <span className={`text-sm font-bold ${investment.returns >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {investment.returns >= 0 ? '+' : ''}{investment.returns}%
                                </span>
                                <span className="text-gray-400 text-sm mx-2">•</span>
                                <span className="text-gray-400 text-sm">Invested: {formatCurrency(investment.invested)}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-bold">{formatCurrency(investment.current)}</p>
                              <p className={`text-sm ${investment.returns >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {investment.returns >= 0 ? '+' : ''}{formatCurrency(investment.current - investment.invested)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'allocation' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Allocation Details */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-white mb-6">Detailed Allocation</h3>
                    
                    {/* Asset Classes */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-white mb-4">By Asset Class</h4>
                      <div className="space-y-4">
                        {mockPortfolio.allocation.map((asset) => (
                          <div key={asset.category} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <div className="flex items-center">
                                <div className={`h-3 w-3 rounded-full mr-2 bg-gradient-to-r ${asset.color}`}></div>
                                <span className="text-white">{asset.category}</span>
                              </div>
                              <div className="text-gray-300">
                                {asset.percentage}% • {formatCurrency(asset.amount)}
                              </div>
                            </div>
                            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${asset.color}`}
                                style={{ width: `${asset.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sector Allocation */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">By Sector</h4>
                      <div className="space-y-4">
                        {mockPortfolio.sectors.map((sector) => (
                          <div key={sector.name} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <div className="flex items-center">
                                <div className={`h-3 w-3 rounded-full mr-2 ${
                                  sector.trend === 'up' ? 'bg-green-500' :
                                  sector.trend === 'down' ? 'bg-red-500' : 'bg-yellow-500'
                                }`}></div>
                                <span className="text-white">{sector.name}</span>
                                <span className="ml-2">
                                  {sector.trend === 'up' ? '📈' :
                                   sector.trend === 'down' ? '📉' : '➡️'}
                                </span>
                              </div>
                              <div className="text-gray-300">
                                {sector.allocation}%
                              </div>
                            </div>
                            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  sector.trend === 'up' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                  sector.trend === 'down' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                                  'bg-gradient-to-r from-yellow-500 to-amber-500'
                                }`}
                                style={{ width: `${sector.allocation}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Allocation Insights */}
                  <div className="space-y-6">
                    <div className="bg-[#0f172a] rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Allocation Insights</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Diversification Score</span>
                          <div className="flex items-center">
                            <span className="text-white font-bold">{mockPortfolio.diversificationScore}/100</span>
                            <div className="ml-2 w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                style={{ width: `${mockPortfolio.diversificationScore}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Rebalancing Needed</span>
                          <span className="text-green-400">No action needed</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Largest Holding</span>
                          <span className="text-white">Stocks (40%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Recommended Action</span>
                          <span className="text-yellow-400">Consider adding Gold</span>
                        </div>
                      </div>
                    </div>

                    {/* Rebalancing Suggestions */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Rebalancing Suggestions</h4>
                      <p className="text-gray-300 text-sm mb-4">
                        Your portfolio has drifted from its target allocation. Consider these adjustments:
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white">Reduce Stocks</span>
                          <span className="text-red-400">-5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">Add to Gold</span>
                          <span className="text-green-400">+5%</span>
                        </div>
                      </div>
                      <button className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-medium hover:opacity-90">
                        Rebalance Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Performance Metrics */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-white mb-6">Performance Analytics</h3>
                    
                    {/* Performance Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-[#0f172a] p-4 rounded-xl">
                        <p className="text-gray-400 text-sm">Alpha</p>
                        <p className="text-xl font-bold text-green-400">+2.4%</p>
                      </div>
                      <div className="bg-[#0f172a] p-4 rounded-xl">
                        <p className="text-gray-400 text-sm">Beta</p>
                        <p className="text-xl font-bold text-white">0.89</p>
                      </div>
                      <div className="bg-[#0f172a] p-4 rounded-xl">
                        <p className="text-gray-400 text-sm">Sharpe Ratio</p>
                        <p className="text-xl font-bold text-green-400">1.56</p>
                      </div>
                      <div className="bg-[#0f172a] p-4 rounded-xl">
                        <p className="text-gray-400 text-sm">Standard Deviation</p>
                        <p className="text-xl font-bold text-yellow-400">14.2%</p>
                      </div>
                    </div>

                    {/* Historical Performance */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Historical Returns</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="py-3 text-left text-gray-400">Period</th>
                              <th className="py-3 text-left text-gray-400">Portfolio Return</th>
                              <th className="py-3 text-left text-gray-400">Benchmark (NIFTY 50)</th>
                              <th className="py-3 text-left text-gray-400">Outperformance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { period: '1 Month', portfolio: 8.7, benchmark: 5.2, outperformance: 3.5 },
                              { period: '3 Months', portfolio: 15.4, benchmark: 12.1, outperformance: 3.3 },
                              { period: '6 Months', portfolio: 25.8, benchmark: 18.3, outperformance: 7.5 },
                              { period: '1 Year', portfolio: 42.3, benchmark: 28.9, outperformance: 13.4 },
                              { period: '3 Years', portfolio: 78.5, benchmark: 62.1, outperformance: 16.4 },
                            ].map((row, index) => (
                              <tr key={index} className="border-b border-gray-800 last:border-0">
                                <td className="py-4 text-white">{row.period}</td>
                                <td className={`py-4 font-bold ${row.portfolio >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {row.portfolio >= 0 ? '+' : ''}{row.portfolio}%
                                </td>
                                <td className="py-4 text-gray-300">{row.benchmark}%</td>
                                <td className={`py-4 font-bold ${row.outperformance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {row.outperformance >= 0 ? '+' : ''}{row.outperformance}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Performance Insights */}
                  <div className="space-y-6">
                    <div className="bg-[#0f172a] rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Performance Insights</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Vs. Benchmark</span>
                          <span className="text-green-400 font-bold">+13.4%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Best Month</span>
                          <span className="text-green-400">August 2023 (+12.3%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Worst Month</span>
                          <span className="text-red-400">March 2023 (-4.2%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Win Rate</span>
                          <span className="text-green-400">78%</span>
                        </div>
                      </div>
                    </div>

                    {/* Projected Growth */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Projected Growth</h4>
                      <p className="text-gray-300 text-sm mb-4">
                        Based on your current ROI of {mockPortfolio.averageROI}% per year:
                      </p>
                      <div className="space-y-3">
                        {[1, 3, 5, 10].map((years) => {
                          const projectedValue = calculateProjectedValue(years);
                          return (
                            <div key={years} className="flex items-center justify-between">
                              <span className="text-gray-300">In {years} {years === 1 ? 'year' : 'years'}</span>
                              <div className="text-right">
                                <p className="text-white font-bold">{formatCurrency(projectedValue)}</p>
                                <p className="text-green-400 text-sm">
                                  +{formatCurrency(projectedValue - mockPortfolio.totalValue)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Goals List */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Financial Goals</h3>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-lg font-medium hover:opacity-90">
                        + New Goal
                      </button>
                    </div>

                    <div className="space-y-6">
                      {mockPortfolio.goals.map((goal) => (
                        <div key={goal.name} className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-6 border border-gray-800">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold text-white">{goal.name}</h4>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  goal.priority === 'high' ? 'bg-red-400/10 text-red-400' :
                                  goal.priority === 'medium' ? 'bg-yellow-400/10 text-yellow-400' :
                                  'bg-blue-400/10 text-blue-400'
                                }`}>
                                  {goal.priority} priority
                                </span>
                                <span className="text-gray-400 text-sm">
                                  Target: {formatCurrency(goal.target)}
                                </span>
                              </div>
                            </div>
                            <span className="text-xl font-bold text-white">{goal.progress}%</span>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  goal.progress >= 75 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                  goal.progress >= 50 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
                                  'bg-gradient-to-r from-red-500 to-pink-500'
                                }`}
                                style={{ width: `${goal.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400 mt-1">
                              <span>{formatCurrency(goal.current)}</span>
                              <span>{formatCurrency(goal.target)}</span>
                            </div>
                          </div>

                          {/* Action Required */}
                          {goal.progress < 100 && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FiAlertCircle className="text-yellow-400 mr-2" />
                                <span className="text-yellow-400 text-sm">
                                  {goal.progress < 30 ? 'Need to invest more' :
                                   goal.progress < 60 ? 'On track, keep going' :
                                   'Almost there!'}
                                </span>
                              </div>
                              <button className="px-4 py-2 bg-[#0f172a] border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm">
                                Add Funds
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Goals Summary */}
                  <div className="space-y-6">
                    <div className="bg-[#0f172a] rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Goals Summary</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Total Goals Value</span>
                          <span className="text-white font-bold">{formatCurrency(8500000)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Current Allocation</span>
                          <span className="text-white font-bold">{formatCurrency(1925000)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Remaining</span>
                          <span className="text-yellow-400 font-bold">{formatCurrency(6575000)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Overall Progress</span>
                          <span className="text-green-400 font-bold">22.6%</span>
                        </div>
                      </div>
                    </div>

                    {/* Recommended SIP */}
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Recommended SIP</h4>
                      <p className="text-gray-300 text-sm mb-4">
                        To achieve your goals, consider starting a monthly SIP of:
                      </p>
                      <div className="text-center mb-4">
                        <p className="text-3xl font-bold text-white">{formatCurrency(25000)}</p>
                        <p className="text-gray-400 text-sm">per month</p>
                      </div>
                      <button className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:opacity-90">
                        Start SIP Now
                      </button>
                    </div>

                    {/* Goal Timeline */}
                    <div className="bg-[#0f172a] rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Goal Timeline</h4>
                      <div className="space-y-3">
                        {[
                          { goal: 'Emergency Fund', date: 'Jun 2024', status: 'on-track' },
                          { goal: 'Home Down Payment', date: 'Dec 2025', status: 'delayed' },
                          { goal: 'Education Fund', date: 'Mar 2026', status: 'on-track' },
                          { goal: 'Retirement', date: 'Jan 2040', status: 'on-track' },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-300">{item.goal}</span>
                            <div className="flex items-center">
                              <span className="text-gray-400 text-sm mr-2">{item.date}</span>
                              <span className={`h-2 w-2 rounded-full ${
                                item.status === 'on-track' ? 'bg-green-500' : 'bg-red-500'
                              }`}></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button className="p-4 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl border border-gray-800 hover:border-[#00d4ff]/30 transition-colors flex items-center justify-center">
            <FiDownload className="text-[#00d4ff] mr-2" />
            <span className="text-white">Export Report</span>
          </button>
          <button className="p-4 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl border border-gray-800 hover:border-[#00d4ff]/30 transition-colors flex items-center justify-center">
            <FiShare2 className="text-[#00d4ff] mr-2" />
            <span className="text-white">Share Portfolio</span>
          </button>
          <button 
            onClick={() => navigate('/portfolio/performance')}
            className="p-4 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl border border-gray-800 hover:border-[#00d4ff]/30 transition-colors flex items-center justify-center"
          >
            <TbChartLine className="text-[#00d4ff] mr-2" />
            <span className="text-white">Detailed Analysis</span>
          </button>
          <button className="p-4 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl border border-gray-800 hover:border-[#00d4ff]/30 transition-colors flex items-center justify-center">
            <FiTarget className="text-[#00d4ff] mr-2" />
            <span className="text-white">Set New Goal</span>
          </button>
        </div>

        {/* Portfolio Health */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-6">Portfolio Health Check</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                <MdOutlineSecurity className="text-green-400 text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Risk Assessment</h4>
              <p className="text-gray-300 text-sm mb-3">
                Your portfolio risk is well-balanced for your profile
              </p>
              <div className={`px-3 py-1 rounded-full inline-block ${getRiskBgColor(5)}`}>
                <span className={`text-sm font-medium ${getRiskColor(65)}`}>
                  {getRiskLabel(65)}
                </span>
              </div>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                <FiPieChart className="text-blue-400 text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Diversification</h4>
              <p className="text-gray-300 text-sm mb-3">
                Good diversification across 5 asset classes
              </p>
              <div className="px-3 py-1 bg-green-400/10 text-green-400 rounded-full inline-block">
                <span className="text-sm font-medium">Excellent</span>
              </div>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                <FiTrendingUp className="text-purple-400 text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Performance</h4>
              <p className="text-gray-300 text-sm mb-3">
                Outperforming benchmark by +13.4%
              </p>
              <div className="px-3 py-1 bg-green-400/10 text-green-400 rounded-full inline-block">
                <span className="text-sm font-medium">Strong</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;