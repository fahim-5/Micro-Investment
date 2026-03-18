import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useInvestments } from '../../context/InvestmentContext';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiStar, 
  FiClock, 
  FiDollarSign,
  FiAlertCircle,
  FiCheck,
  FiZap
} from 'react-icons/fi';
import { MdSecurity, MdShowChart } from 'react-icons/md';

const InvestmentCard = ({ investment, showActions = true, compact = false }) => {
  const { isAuthenticated } = useAuth();
  const { makeInvestment } = useInvestments();
  const [isInvesting, setIsInvesting] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(investment.minInvestment || 500);
  const [showModal, setShowModal] = useState(false);

  const {
    id,
    name,
    type,
    category,
    currentValue,
    minInvestment,
    expectedReturn,
    riskLevel,
    duration,
    popularity,
    isTrending,
    isFeatured,
    tags = [],
    status = 'active'
  } = investment;

  // Handle investment
  const handleInvest = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    setIsInvesting(true);
    try {
      const result = await makeInvestment(id, investmentAmount);
      if (result.success) {
        setShowModal(false);
        // Success toast/message would go here
        alert(`Successfully invested ₹${investmentAmount} in ${name}`);
      }
    } catch (error) {
      console.error('Investment failed:', error);
    } finally {
      setIsInvesting(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get risk level color
  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  // Get risk background color
  const getRiskBgColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'bg-green-400/10';
      case 'medium': return 'bg-yellow-400/10';
      case 'high': return 'bg-red-400/10';
      default: return 'bg-gray-400/10';
    }
  };

  // Get type icon
  const getTypeIcon = (invType) => {
    switch (invType?.toLowerCase()) {
      case 'stocks': return '📈';
      case 'mutual funds': return '💰';
      case 'crypto': return '₿';
      case 'real estate': return '🏠';
      case 'gold': return '🥇';
      case 'bonds': return '📋';
      default: return '💼';
    }
  };

  if (compact) {
    return (
      <div className="bg-[#1e293b] rounded-xl p-4 hover:bg-[#2d3748] transition-all duration-300 border border-gray-800 hover:border-[#00d4ff]/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#00d4ff]/20 to-[#00a8cc]/20 flex items-center justify-center">
              <span className="text-lg">{getTypeIcon(type)}</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">{name}</h3>
              <p className="text-xs text-gray-400">{type}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">{formatCurrency(currentValue)}</p>
            <div className={`text-xs px-2 py-1 rounded-full ${getRiskBgColor(riskLevel)} ${getRiskColor(riskLevel)}`}>
              {riskLevel} Risk
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FiClock className="text-gray-400" />
              <span className="text-gray-300">{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              {expectedReturn >= 0 ? (
                <FiTrendingUp className="text-green-400" />
              ) : (
                <FiTrendingDown className="text-red-400" />
              )}
              <span className={expectedReturn >= 0 ? 'text-green-400' : 'text-red-400'}>
                {expectedReturn}%
              </span>
            </div>
          </div>
          <Link
            to={`/investments/${id}`}
            className="text-[#00d4ff] hover:text-[#00a8cc] text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#1e293b] rounded-xl p-6 hover:bg-[#2d3748] transition-all duration-300 border border-gray-800 hover:border-[#00d4ff]/30 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#00a8cc]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">{getTypeIcon(type)}</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">{name}</h3>
                {isFeatured && (
                  <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full flex items-center">
                    <FiStar className="mr-1" /> Featured
                  </span>
                )}
                {isTrending && (
                  <span className="px-2 py-1 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white text-xs rounded-full flex items-center">
                    <FiZap className="mr-1" /> Trending
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm">{category}</p>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === 'active' 
              ? 'bg-green-400/10 text-green-400' 
              : status === 'closed'
              ? 'bg-red-400/10 text-red-400'
              : 'bg-gray-400/10 text-gray-400'
          }`}>
            {status === 'active' ? '🟢 Open' : status === 'closed' ? '🔴 Closed' : '⏸️ Paused'}
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0f172a] p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <FiDollarSign className="text-[#00d4ff]" />
              <span className="text-gray-400 text-sm">Current Value</span>
            </div>
            <p className="text-xl font-bold text-white">{formatCurrency(currentValue)}</p>
          </div>
          
          <div className="bg-[#0f172a] p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <MdShowChart className="text-[#00d4ff]" />
              <span className="text-gray-400 text-sm">Expected Return</span>
            </div>
            <div className="flex items-center space-x-1">
              {expectedReturn >= 0 ? (
                <FiTrendingUp className="text-green-400" />
              ) : (
                <FiTrendingDown className="text-red-400" />
              )}
              <p className={`text-xl font-bold ${expectedReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {expectedReturn}%
              </p>
            </div>
          </div>
          
          <div className="bg-[#0f172a] p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <MdSecurity className="text-[#00d4ff]" />
              <span className="text-gray-400 text-sm">Risk Level</span>
            </div>
            <div className={`px-2 py-1 rounded-full inline-block ${getRiskBgColor(riskLevel)}`}>
              <span className={`text-sm font-medium ${getRiskColor(riskLevel)}`}>
                {riskLevel}
              </span>
            </div>
          </div>
          
          <div className="bg-[#0f172a] p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <FiClock className="text-[#00d4ff]" />
              <span className="text-gray-400 text-sm">Duration</span>
            </div>
            <p className="text-lg font-bold text-white">{duration}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-6 line-clamp-2">
          {investment.description || 'A professionally managed investment opportunity with competitive returns.'}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="text-sm text-gray-400">
            <span className="text-white font-medium">{formatCurrency(minInvestment)}</span> minimum
          </div>
          
          <div className="flex items-center space-x-3">
            <Link
              to={`/investments/${id}`}
              className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Details
            </Link>
            
            {showActions && status === 'active' && (
              <button
                onClick={() => setShowModal(true)}
                disabled={isInvesting}
                className="px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInvesting ? 'Processing...' : 'Invest Now'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e293b] rounded-xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Invest in {name}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Investment Amount (₹)</label>
              <div className="relative">
                <input
                  type="number"
                  min={minInvestment}
                  max={1000000}
                  step={100}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]"
                />
                <div className="absolute right-3 top-3 text-gray-400">₹</div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>Min: {formatCurrency(minInvestment)}</span>
                <span>Max: {formatCurrency(1000000)}</span>
              </div>
              
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[500, 1000, 5000, 10000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setInvestmentAmount(amount)}
                    className={`py-2 text-sm rounded ${
                      investmentAmount === amount
                        ? 'bg-[#00d4ff] text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Expected Return Preview */}
            <div className="bg-[#0f172a] p-4 rounded-lg mb-6">
              <h4 className="text-gray-300 text-sm mb-2">Expected Returns</h4>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-white">
                    ₹{(investmentAmount * (1 + expectedReturn/100)).toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-sm">After 1 year</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-lg font-bold">+{expectedReturn}%</p>
                  <p className="text-gray-400 text-sm">Expected ROI</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInvest}
                disabled={isInvesting || investmentAmount < minInvestment}
                className="flex-1 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInvesting ? (
                  <span className="flex items-center justify-center">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Processing...
                  </span>
                ) : (
                  `Invest ₹${investmentAmount.toLocaleString()}`
                )}
              </button>
            </div>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>By investing, you agree to our Terms & Conditions</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvestmentCard;