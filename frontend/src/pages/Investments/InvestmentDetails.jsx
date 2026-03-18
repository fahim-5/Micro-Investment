import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useInvestments } from '../../context/InvestmentContext';
import InvestmentCard from '../../components/common/InvestmentCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  FiArrowLeft,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiDollarSign,
  FiShield,
  FiClock,
  FiUsers,
  FiBarChart2,
  FiDownload,
  FiShare2,
  FiHeart,
  FiMessageCircle,
  FiChevronRight,
  FiCheck
} from 'react-icons/fi';
import { 
  MdShowChart, 
  MdSecurity, 
  MdOutlineAttachMoney,
  MdOutlineAnalytics,
  MdOutlineHistoryToggleOff
} from 'react-icons/md';
import { TbChartLine } from 'react-icons/tb';

const InvestmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { getInvestmentById, makeInvestment, userInvestments } = useInvestments();
  
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInvesting, setIsInvesting] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [activeTab, setActiveTab] = useState('overview');
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);

  // Mock investment data (in real app, fetch from API)
  const mockInvestment = {
    id: id,
    name: 'Tech Growth Fund',
    type: 'Mutual Funds',
    category: 'Technology',
    description: 'A technology-focused mutual fund that invests in leading tech companies with high growth potential. This fund provides exposure to the rapidly evolving technology sector with professional management and diversification.',
    currentValue: 5000000,
    minInvestment: 1000,
    expectedReturn: 18.5,
    riskLevel: 'Medium',
    duration: '3 years',
    popularity: 95,
    isTrending: true,
    isFeatured: true,
    tags: ['High Growth', 'Tech', 'Nifty 50', 'SIP Available'],
    status: 'active',
    fundManager: 'Quantum Asset Management',
    inceptionDate: '2020-01-15',
    totalInvestors: 12450,
    totalAssets: '₹1,250 Cr',
    expenseRatio: '0.65%',
    exitLoad: '1% for redemption before 1 year',
    rating: 4.7,
    reviews: 245,
    sectorAllocation: [
      { sector: 'Software & Services', allocation: 35 },
      { sector: 'Hardware', allocation: 25 },
      { sector: 'Semiconductors', allocation: 20 },
      { sector: 'Internet', allocation: 15 },
      { sector: 'Other', allocation: 5 },
    ],
    topHoldings: [
      { name: 'Infosys Ltd', weight: 12.5 },
      { name: 'TCS', weight: 10.8 },
      { name: 'HCL Technologies', weight: 9.2 },
      { name: 'Wipro', weight: 8.5 },
      { name: 'Tech Mahindra', weight: 7.8 },
    ],
    historicalReturns: {
      '1m': 2.5,
      '3m': 8.2,
      '6m': 15.7,
      '1y': 28.9,
      '3y': 78.5,
      '5y': 142.3,
    },
    documents: [
      { name: 'Scheme Information Document', type: 'PDF', size: '2.4 MB' },
      { name: 'Key Information Memorandum', type: 'PDF', size: '1.8 MB' },
      { name: 'Annual Report 2023', type: 'PDF', size: '4.2 MB' },
      { name: 'Fact Sheet - January 2024', type: 'PDF', size: '1.2 MB' },
    ]
  };

  // Mock similar investments
  const similarInvestments = [
    { id: 2, name: 'Digital India Fund', type: 'Mutual Funds', category: 'Technology', currentValue: 3200000, expectedReturn: 16.8, riskLevel: 'Medium', minInvestment: 500 },
    { id: 3, name: 'FinTech Growth Portfolio', type: 'Mutual Funds', category: 'Financial Services', currentValue: 2800000, expectedReturn: 15.2, riskLevel: 'Medium', minInvestment: 1000 },
    { id: 4, name: 'AI & Robotics Fund', type: 'Mutual Funds', category: 'Technology', currentValue: 1800000, expectedReturn: 22.5, riskLevel: 'High', minInvestment: 500 },
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setInvestment(mockInvestment);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleInvestNow = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/investments/${id}` } });
      return;
    }

    setIsInvesting(true);
    try {
      const result = await makeInvestment(id, investmentAmount);
      if (result.success) {
        setShowInvestmentModal(false);
        // Show success message
        alert(`Successfully invested ₹${investmentAmount} in ${investment.name}`);
      }
    } catch (error) {
      console.error('Investment failed:', error);
    } finally {
      setIsInvesting(false);
    }
  };

  const handleQuickAmount = (amount) => {
    setInvestmentAmount(amount);
  };

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    // In real app, call API to update watchlist
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'high': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1a1f38] flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading investment details..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1a1f38]">
      {/* Back Navigation */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/investments')}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Investments
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Investment Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Left Column - Investment Info */}
          <div className="lg:w-2/3">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#00a8cc]/20 flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">{investment.name}</h1>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-gray-400">{investment.type}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">{investment.category}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {investment.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className={`px-3 py-1 text-sm rounded-full ${getRiskColor(investment.riskLevel)}`}>
                    {investment.riskLevel} Risk
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleWatchlist}
                  className={`p-3 rounded-xl ${isInWatchlist ? 'bg-red-500/10 text-red-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >
                  <FiHeart className={isInWatchlist ? 'fill-current' : ''} />
                </button>
                <button className="p-3 bg-gray-800 rounded-xl text-gray-400 hover:bg-gray-700">
                  <FiShare2 />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#1e293b] p-4 rounded-xl">
                <div className="flex items-center text-gray-400 mb-2">
                  <MdOutlineAttachMoney className="mr-2" />
                  <span className="text-sm">Minimum Investment</span>
                </div>
                <p className="text-2xl font-bold text-white">{formatCurrency(investment.minInvestment)}</p>
              </div>
              <div className="bg-[#1e293b] p-4 rounded-xl">
                <div className="flex items-center text-gray-400 mb-2">
                  <FiTrendingUp className="mr-2" />
                  <span className="text-sm">Expected Return</span>
                </div>
                <p className="text-2xl font-bold text-green-400">{investment.expectedReturn}%</p>
              </div>
              <div className="bg-[#1e293b] p-4 rounded-xl">
                <div className="flex items-center text-gray-400 mb-2">
                  <FiCalendar className="mr-2" />
                  <span className="text-sm">Duration</span>
                </div>
                <p className="text-2xl font-bold text-white">{investment.duration}</p>
              </div>
              <div className="bg-[#1e293b] p-4 rounded-xl">
                <div className="flex items-center text-gray-400 mb-2">
                  <FiUsers className="mr-2" />
                  <span className="text-sm">Total Investors</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {investment.totalInvestors.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">About this Investment</h2>
              <p className="text-gray-300 leading-relaxed">{investment.description}</p>
            </div>
          </div>

          {/* Right Column - Investment Action Card */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
                {/* Current Value */}
                <div className="text-center mb-6">
                  <p className="text-gray-400 mb-1">Current Fund Value</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(investment.currentValue)}</p>
                  <div className="flex items-center justify-center mt-2">
                    <FiTrendingUp className="text-green-400 mr-1" />
                    <span className="text-green-400">+2.4% today</span>
                  </div>
                </div>

                {/* Investment Amount */}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-3 font-medium">
                    Investment Amount (₹)
                  </label>
                  <div className="relative mb-4">
                    <input
                      type="number"
                      min={investment.minInvestment}
                      max={1000000}
                      step={100}
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:border-[#00d4ff]"
                    />
                    <div className="absolute right-4 top-4 text-gray-400 text-lg">₹</div>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {[1000, 5000, 10000, 25000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleQuickAmount(amount)}
                        className={`py-2 rounded-lg text-sm ${
                          investmentAmount === amount
                            ? 'bg-[#00d4ff] text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        ₹{amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Expected Returns Preview */}
                <div className="bg-[#0f172a] p-4 rounded-xl mb-6">
                  <h4 className="text-gray-300 text-sm mb-3">Expected Returns</h4>
                  <div className="space-y-3">
                    {[1, 3, 5].map((years) => {
                      const returns = investmentAmount * Math.pow(1 + investment.expectedReturn/100, years);
                      const profit = returns - investmentAmount;
                      return (
                        <div key={years} className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-400 text-sm">{years} year{ years > 1 ? 's' : ''}</p>
                            <p className="text-white font-bold">{formatCurrency(returns)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-bold">+{profit.toLocaleString()}</p>
                            <p className="text-gray-400 text-sm">Profit</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setShowInvestmentModal(true)}
                    disabled={isInvesting}
                    className="w-full py-4 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isInvesting ? (
                      <span className="flex items-center justify-center">
                        <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        Processing...
                      </span>
                    ) : (
                      `Invest ₹${investmentAmount.toLocaleString()}`
                    )}
                  </button>
                  
                  {userInvestments.some(inv => inv.investmentId === id) ? (
                    <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <div className="flex items-center justify-center text-green-400">
                        <FiCheck className="mr-2" />
                        Already invested in this fund
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate('/sip-planner')}
                      className="w-full py-3 border-2 border-[#00d4ff] text-[#00d4ff] rounded-xl font-bold hover:bg-[#00d4ff]/10 transition-colors"
                    >
                      Start SIP Instead
                    </button>
                  )}
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                  <div className="flex items-center">
                    <FiShield className="text-green-400 mr-2" />
                    <span className="text-green-400 text-sm">SEBI Registered • Your money is secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 border-b border-gray-800">
            {['overview', 'performance', 'holdings', 'documents', 'reviews'].map((tab) => (
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
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-b-2xl rounded-tr-2xl border border-gray-800 p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Fund Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Fund Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fund Manager</span>
                        <span className="text-white">{investment.fundManager}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Inception Date</span>
                        <span className="text-white">{new Date(investment.inceptionDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Assets</span>
                        <span className="text-white">{investment.totalAssets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Expense Ratio</span>
                        <span className="text-white">{investment.expenseRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Exit Load</span>
                        <span className="text-white">{investment.exitLoad}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Historical Returns */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Historical Returns</h3>
                    <div className="space-y-3">
                      {Object.entries(investment.historicalReturns).map(([period, returnValue]) => (
                        <div key={period} className="flex justify-between items-center">
                          <span className="text-gray-400">{period.toUpperCase()}</span>
                          <div className="flex items-center">
                            <span className={`font-bold ${returnValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {returnValue >= 0 ? '+' : ''}{returnValue}%
                            </span>
                            {returnValue >= 0 ? (
                              <FiTrendingUp className="ml-2 text-green-400" />
                            ) : (
                              <FiTrendingDown className="ml-2 text-red-400" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6">
                <div className="h-64 bg-[#0f172a] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <TbChartLine className="text-4xl text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">Performance chart would appear here</p>
                    <p className="text-gray-500 text-sm mt-1">Showing historical returns over time</p>
                  </div>
                </div>
                
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              </div>
            )}

            {activeTab === 'holdings' && (
              <div className="space-y-8">
                {/* Sector Allocation */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Sector Allocation</h3>
                  <div className="space-y-3">
                    {investment.sectorAllocation.map((sector, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="h-3 w-3 rounded-full mr-3"
                            style={{
                              backgroundColor: 
                                index === 0 ? '#00d4ff' :
                                index === 1 ? '#00a8cc' :
                                index === 2 ? '#1e90ff' :
                                index === 3 ? '#4682b4' : '#708090'
                            }}
                          ></div>
                          <span className="text-gray-300">{sector.sector}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#00d4ff] to-[#00a8cc]"
                              style={{ width: `${sector.allocation}%` }}
                            ></div>
                          </div>
                          <span className="text-white font-medium w-12 text-right">{sector.allocation}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Holdings */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Top Holdings</h3>
                  <div className="space-y-3">
                    {investment.topHoldings.map((holding, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg hover:bg-[#1a2438]">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-[#00d4ff]/20 to-[#00a8cc]/20 flex items-center justify-center mr-3">
                            <span className="text-sm">🏢</span>
                          </div>
                          <span className="text-white">{holding.name}</span>
                        </div>
                        <span className="text-gray-400">{holding.weight}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-4">Fund Documents</h3>
                {investment.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl hover:bg-[#1a2438] transition-colors">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 flex items-center justify-center mr-3">
                        <span className="text-red-400">📄</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{doc.name}</p>
                        <p className="text-gray-400 text-sm">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                      <FiDownload className="text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Rating Summary */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-bold text-white">{investment.rating}</span>
                      <span className="text-gray-400 ml-2">/5.0</span>
                    </div>
                    <div className="flex items-center text-yellow-400 mb-2">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-gray-400">{investment.reviews} reviews</p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-lg font-medium hover:opacity-90">
                    Write a Review
                  </button>
                </div>

                {/* Reviews */}
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="p-4 bg-[#0f172a] rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00d4ff]/20 to-[#00a8cc]/20 flex items-center justify-center mr-3">
                            <span className="text-white">U{review}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">Anonymous Investor</p>
                            <p className="text-gray-400 text-sm">2 months ago</p>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {'★'.repeat(4)}
                        </div>
                      </div>
                      <p className="text-gray-300">
                        {review === 1 
                          ? 'Excellent returns over the past year. Fund management is professional and transparent.'
                          : review === 2
                          ? 'Good diversification in tech sector. SIP option makes it easy to invest regularly.'
                          : 'Slightly higher risk but potential for good returns. Would recommend for long term.'
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Investments */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Similar Investments</h2>
            <Link to="/investments" className="text-[#00d4ff] hover:text-[#00a8cc] flex items-center">
              View All <FiChevronRight className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarInvestments.map((inv) => (
              <InvestmentCard key={inv.id} investment={inv} compact={true} />
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'What is the minimum investment amount?',
                a: `The minimum investment amount is ₹${investment.minInvestment}. You can also start a SIP with as low as ₹500 per month.`
              },
              {
                q: 'How are returns calculated?',
                a: 'Returns are calculated based on NAV (Net Asset Value) movements. The expected return is an estimate based on historical performance and market conditions.'
              },
              {
                q: 'Is there any lock-in period?',
                a: 'No, there is no lock-in period. However, an exit load of 1% applies for redemptions within 1 year of investment.'
              },
              {
                q: 'How can I withdraw my investment?',
                a: 'You can redeem your investment anytime through your dashboard. The amount will be credited to your registered bank account within 3-5 working days.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                <h3 className="text-lg font-medium text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestmentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 max-w-md w-full border border-gray-700">
            <div className="text-center mb-6">
              <div className="h-16 w-16 mx-auto mb-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Confirm Investment</h3>
              <p className="text-gray-300">
                You are about to invest <span className="text-white font-bold">₹{investmentAmount.toLocaleString()}</span> in <span className="text-[#00d4ff]">{investment.name}</span>
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Investment Amount</span>
                <span className="text-white font-bold">₹{investmentAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Expected Return (1 year)</span>
                <span className="text-green-400 font-bold">{investment.expectedReturn}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Platform Fees</span>
                <span className="text-white">₹0 (Zero Commission)</span>
              </div>
              <div className="border-t border-gray-800 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Amount</span>
                  <span className="text-xl font-bold text-white">₹{investmentAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleInvestNow}
                disabled={isInvesting}
                className="w-full py-4 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isInvesting ? 'Processing Investment...' : 'Confirm & Invest'}
              </button>
              <button
                onClick={() => setShowInvestmentModal(false)}
                className="w-full py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">
                By investing, you agree to our{' '}
                <Link to="/terms" className="text-[#00d4ff] hover:underline">Terms & Conditions</Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentDetails;