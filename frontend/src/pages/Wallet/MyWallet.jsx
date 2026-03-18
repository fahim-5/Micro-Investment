import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useInvestments } from '../../context/InvestmentContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  FiArrowUpRight,
  FiArrowDownRight,
  FiDollarSign,
  FiCreditCard,
  FiBank,
  FiSmartphone,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiCheck,
  FiX,
  FiMoreVertical,
  FiCopy
} from 'react-icons/fi';
import { 
  MdAccountBalanceWallet,
  MdOutlineSavings,
  MdOutlineSecurity,
  MdOutlineAttachMoney,
  MdOutlineQrCode
} from 'react-icons/md';
import { TbTransfer } from 'react-icons/tb';

const MyWallet = () => {
  const { user } = useAuth();
  const { totalInvested } = useInvestments();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('transactions');
  const [loading, setLoading] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [addMoneyAmount, setAddMoneyAmount] = useState(0);

  // Mock wallet data
  const [wallet, setWallet] = useState({
    balance: 125000,
    invested: totalInvested || 850000,
    returns: 125000,
    available: 125000,
    reserved: 0,
    totalEarnings: 250000
  });

  // Mock payment methods
  const paymentMethods = [
    { id: 1, type: 'bank', name: 'HDFC Bank', last4: '4321', default: true, icon: <FiBank /> },
    { id: 2, type: 'card', name: 'Visa Debit Card', last4: '8765', default: false, icon: <FiCreditCard /> },
    { id: 3, type: 'upi', name: 'Google Pay', upiId: 'user@okhdfcbank', default: false, icon: <FiSmartphone /> },
    { id: 4, type: 'bank', name: 'ICICI Bank', last4: '1234', default: false, icon: <FiBank /> },
  ];

  // Mock transactions
  const transactions = [
    { id: 1, type: 'deposit', method: 'UPI', amount: 10000, status: 'completed', date: '2024-01-15', description: 'Wallet Top-up', refId: 'TXN789456' },
    { id: 2, type: 'investment', method: 'Wallet', amount: -5000, status: 'completed', date: '2024-01-14', description: 'Tech Growth Fund', refId: 'INV123456' },
    { id: 3, type: 'dividend', method: 'System', amount: 1250, status: 'completed', date: '2024-01-12', description: 'Dividend Payout', refId: 'DIV789123' },
    { id: 4, type: 'withdrawal', method: 'Bank Transfer', amount: -3000, status: 'processing', date: '2024-01-10', description: 'Cash Withdrawal', refId: 'WTH456789' },
    { id: 5, type: 'deposit', method: 'Bank Transfer', amount: 25000, status: 'completed', date: '2024-01-08', description: 'Salary Credit', refId: 'TXN321654' },
    { id: 6, type: 'investment', method: 'Wallet', amount: -2000, status: 'completed', date: '2024-01-05', description: 'Gold Savings Plan', refId: 'INV987654' },
    { id: 7, type: 'refund', method: 'System', amount: 1500, status: 'completed', date: '2024-01-03', description: 'Investment Refund', refId: 'REF456123' },
    { id: 8, type: 'fee', method: 'System', amount: -100, status: 'completed', date: '2024-01-01', description: 'Annual Maintenance', refId: 'FEE789123' },
  ];

  // Mock bank accounts
  const bankAccounts = [
    { id: 1, bank: 'HDFC Bank', accountNo: 'XXXXXX4321', type: 'Savings', ifsc: 'HDFC0000123', verified: true },
    { id: 2, bank: 'ICICI Bank', accountNo: 'XXXXXX1234', type: 'Current', ifsc: 'ICIC0000567', verified: true },
  ];

  // Quick actions
  const quickActions = [
    { icon: <FiArrowDownRight />, label: 'Add Money', color: 'from-green-500 to-emerald-600', action: () => setShowAddMoneyModal(true) },
    { icon: <FiArrowUpRight />, label: 'Withdraw', color: 'from-blue-500 to-cyan-600', action: () => setShowWithdrawModal(true) },
    { icon: <TbTransfer />, label: 'Transfer', color: 'from-purple-500 to-pink-600', action: () => navigate('/wallet/transfer') },
    { icon: <MdOutlineQrCode />, label: 'UPI QR', color: 'from-orange-500 to-red-600', action: () => setShowUPIModal(true) },
  ];

  // Recent investments
  const recentInvestments = [
    { name: 'Tech Growth Fund', amount: 5000, date: '2024-01-14', type: 'Mutual Fund' },
    { name: 'Gold Savings Plan', amount: 2000, date: '2024-01-05', type: 'Gold' },
    { name: 'Real Estate REIT', amount: 10000, date: '2023-12-28', type: 'Real Estate' },
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10';
      case 'processing': return 'text-yellow-400 bg-yellow-400/10';
      case 'failed': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit': return <FiArrowDownRight className="text-green-400" />;
      case 'withdrawal': return <FiArrowUpRight className="text-red-400" />;
      case 'investment': return <MdOutlineSavings className="text-blue-400" />;
      case 'dividend': return <FiDollarSign className="text-yellow-400" />;
      case 'refund': return <FiRefreshCw className="text-purple-400" />;
      case 'fee': return <FiCreditCard className="text-gray-400" />;
      default: return <TbTransfer className="text-gray-400" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'deposit': return 'Deposit';
      case 'withdrawal': return 'Withdrawal';
      case 'investment': return 'Investment';
      case 'dividend': return 'Dividend';
      case 'refund': return 'Refund';
      case 'fee': return 'Fee';
      default: return 'Transaction';
    }
  };

  const handleAddMoney = (amount) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWallet(prev => ({
        ...prev,
        balance: prev.balance + amount,
        available: prev.available + amount
      }));
      setShowAddMoneyModal(false);
      setLoading(false);
      alert(`₹${amount.toLocaleString()} added successfully!`);
    }, 1500);
  };

  const handleWithdraw = () => {
    if (withdrawAmount > wallet.available) {
      alert('Insufficient balance');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWallet(prev => ({
        ...prev,
        balance: prev.balance - withdrawAmount,
        available: prev.available - withdrawAmount
      }));
      setShowWithdrawModal(false);
      setWithdrawAmount(0);
      setLoading(false);
      alert(`Withdrawal request for ₹${withdrawAmount.toLocaleString()} submitted successfully!`);
    }, 1500);
  };

  const handleQuickAmount = (type, amount) => {
    if (type === 'add') {
      setAddMoneyAmount(amount);
    } else {
      setWithdrawAmount(amount);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const refreshWallet = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Wallet balance updated!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1a1f38]">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">My Wallet</h1>
              <p className="text-gray-400">Manage your funds and transactions</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={refreshWallet}
                disabled={loading}
                className="px-4 py-2 bg-[#1e293b] text-gray-300 rounded-lg hover:bg-[#2d3748] transition-colors flex items-center"
              >
                <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button className="px-4 py-2 bg-[#1e293b] text-gray-300 rounded-lg hover:bg-[#2d3748] transition-colors flex items-center">
                <FiDownload className="mr-2" />
                Statement
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Balance & Quick Actions */}
          <div className="lg:col-span-2">
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800 mb-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#00d4ff]/20 to-[#00a8cc]/20 flex items-center justify-center mr-4">
                    <MdAccountBalanceWallet className="text-[#00d4ff] text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-400">Total Balance</p>
                    <p className="text-4xl font-bold text-white">{formatCurrency(wallet.balance)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Available to invest</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(wallet.available)}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0f172a] p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Invested</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(wallet.invested)}</p>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Total Returns</p>
                  <p className="text-xl font-bold text-green-400">{formatCurrency(wallet.returns)}</p>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Reserved</p>
                  <p className="text-xl font-bold text-yellow-400">{formatCurrency(wallet.reserved)}</p>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Total Earnings</p>
                  <p className="text-xl font-bold text-purple-400">{formatCurrency(wallet.totalEarnings)}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`bg-gradient-to-r ${action.color} p-4 rounded-xl flex flex-col items-center justify-center text-white hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <span className="font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 border-b border-gray-800">
                {['transactions', 'payment-methods', 'bank-accounts'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                      activeTab === tab
                        ? 'text-[#00d4ff] border-b-2 border-[#00d4ff]'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-b-2xl rounded-tr-2xl border border-gray-800">
                {activeTab === 'transactions' && (
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search transactions..."
                            className="pl-10 pr-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]"
                          />
                        </div>
                        <button className="p-2 bg-[#0f172a] border border-gray-700 rounded-lg text-gray-400 hover:text-white">
                          <FiFilter />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {transactions.map((txn) => (
                        <div
                          key={txn.id}
                          className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl hover:bg-[#1a2438] transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center">
                              {getTransactionIcon(txn.type)}
                            </div>
                            <div>
                              <p className="font-medium text-white">{txn.description}</p>
                              <div className="flex items-center space-x-3 mt-1">
                                <span className="text-sm text-gray-400">{getTypeLabel(txn.type)}</span>
                                <span className="text-gray-600">•</span>
                                <span className="text-sm text-gray-400">{txn.method}</span>
                                <span className="text-gray-600">•</span>
                                <span className="text-sm text-gray-400">{formatDate(txn.date)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className={`text-lg font-bold ${txn.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {txn.amount >= 0 ? '+' : ''}{formatCurrency(txn.amount)}
                            </p>
                            <div className="flex items-center justify-end mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(txn.status)}`}>
                                {txn.status}
                              </span>
                              <button
                                onClick={() => copyToClipboard(txn.refId)}
                                className="ml-2 p-1 text-gray-400 hover:text-white"
                                title="Copy Reference ID"
                              >
                                <FiCopy className="text-sm" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <button className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
                        View All Transactions
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'payment-methods' && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-white">Payment Methods</h2>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-lg font-medium hover:opacity-90">
                        + Add New
                      </button>
                    </div>

                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl border border-gray-800 hover:border-gray-700"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                              method.type === 'bank' ? 'bg-blue-500/20 text-blue-400' :
                              method.type === 'card' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {method.icon}
                            </div>
                            <div>
                              <p className="font-medium text-white">{method.name}</p>
                              <p className="text-gray-400 text-sm">
                                {method.type === 'upi' 
                                  ? `UPI ID: ${method.upiId}`
                                  : `**** **** **** ${method.last4}`
                                }
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {method.default && (
                              <span className="px-2 py-1 bg-green-400/10 text-green-400 text-xs rounded">
                                Default
                              </span>
                            )}
                            <button className="p-2 text-gray-400 hover:text-white">
                              <FiMoreVertical />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'bank-accounts' && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-white">Bank Accounts</h2>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-lg font-medium hover:opacity-90">
                        + Add Bank
                      </button>
                    </div>

                    <div className="space-y-4">
                      {bankAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="p-4 bg-[#0f172a] rounded-xl border border-gray-800 hover:border-gray-700"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center mr-3">
                                <FiBank className="text-blue-400" />
                              </div>
                              <div>
                                <p className="font-medium text-white">{account.bank}</p>
                                <p className="text-gray-400 text-sm">{account.type} Account</p>
                              </div>
                            </div>
                            {account.verified && (
                              <div className="flex items-center text-green-400">
                                <FiCheck className="mr-1" />
                                <span className="text-sm">Verified</span>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-400 text-sm">Account Number</p>
                              <div className="flex items-center">
                                <p className="text-white font-mono">{account.accountNo}</p>
                                <button
                                  onClick={() => copyToClipboard(account.accountNo)}
                                  className="ml-2 p-1 text-gray-400 hover:text-white"
                                >
                                  <FiCopy className="text-sm" />
                                </button>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">IFSC Code</p>
                              <div className="flex items-center">
                                <p className="text-white font-mono">{account.ifsc}</p>
                                <button
                                  onClick={() => copyToClipboard(account.ifsc)}
                                  className="ml-2 p-1 text-gray-400 hover:text-white"
                                >
                                  <FiCopy className="text-sm" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity & Info */}
          <div className="space-y-6">
            {/* Recent Investments */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Investments</h2>
                <Link to="/my-investments" className="text-[#00d4ff] text-sm hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentInvestments.map((investment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                    <div>
                      <p className="font-medium text-white">{investment.name}</p>
                      <p className="text-gray-400 text-sm">{investment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{formatCurrency(investment.amount)}</p>
                      <p className="text-gray-400 text-sm">{formatDate(investment.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wallet Security */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center mb-6">
                <MdOutlineSecurity className="text-green-400 text-2xl mr-3" />
                <h2 className="text-xl font-bold text-white">Wallet Security</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">2FA Enabled</span>
                  <span className="text-green-400">✓ Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Login Alerts</span>
                  <span className="text-green-400">✓ Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Withdrawal Limit</span>
                  <span className="text-white">₹50,000/day</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Last Login</span>
                  <span className="text-gray-400">Today, 14:30</span>
                </div>
              </div>

              <button className="w-full mt-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
                Security Settings
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-6">Wallet Stats</h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">This Month</span>
                    <span className="text-green-400">+₹25,000</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Total Deposits</span>
                    <span className="text-white">₹1,50,000</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Total Withdrawals</span>
                    <span className="text-white">₹25,000</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00a8cc]/10 rounded-2xl p-6 border border-gray-800">
              <div className="text-center">
                <div className="h-12 w-12 mx-auto mb-4 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] rounded-full flex items-center justify-center">
                  <span className="text-xl">❓</span>
                </div>
                <h3 className="font-bold text-white mb-2">Need Help?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Having issues with your wallet? Our support team is here to help.
                </p>
                <button className="w-full py-3 border border-[#00d4ff] text-[#00d4ff] rounded-lg hover:bg-[#00d4ff]/10 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Add Money to Wallet</h3>
              <button
                onClick={() => setShowAddMoneyModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiX />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Amount (₹)</label>
              <div className="relative">
                <input
                  type="number"
                  value={addMoneyAmount}
                  onChange={(e) => setAddMoneyAmount(Number(e.target.value))}
                  min="100"
                  max="100000"
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:border-[#00d4ff]"
                  placeholder="Enter amount"
                />
                <div className="absolute right-4 top-4 text-gray-400 text-lg">₹</div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[1000, 2000, 5000, 10000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleQuickAmount('add', amount)}
                    className={`py-2 rounded-lg text-sm ${
                      addMoneyAmount === amount
                        ? 'bg-[#00d4ff] text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h4 className="text-gray-300 mb-3">Select Payment Method</h4>
              <div className="space-y-2">
                {paymentMethods.slice(0, 2).map((method) => (
                  <div key={method.id} className="flex items-center p-3 bg-[#0f172a] rounded-lg border border-gray-800">
                    <input
                      type="radio"
                      name="payment-method"
                      id={`method-${method.id}`}
                      defaultChecked={method.default}
                      className="mr-3"
                    />
                    <label htmlFor={`method-${method.id}`} className="flex-1 flex items-center">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center mr-3 ${
                        method.type === 'bank' ? 'bg-blue-500/20 text-blue-400' :
                        method.type === 'card' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {method.icon}
                      </div>
                      <span className="text-white">{method.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleAddMoney(addMoneyAmount)}
              disabled={loading || addMoneyAmount < 100}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Add ₹${addMoneyAmount.toLocaleString()}`}
            </button>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Withdraw Funds</h3>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiX />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Amount (₹)</label>
              <div className="relative">
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  min="100"
                  max={wallet.available}
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:border-[#00d4ff]"
                  placeholder="Enter amount"
                />
                <div className="absolute right-4 top-4 text-gray-400 text-lg">₹</div>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Available: {formatCurrency(wallet.available)}
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[1000, 5000, 10000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleQuickAmount('withdraw', amount)}
                    className={`py-2 rounded-lg text-sm ${
                      withdrawAmount === amount
                        ? 'bg-[#00d4ff] text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Bank Account Selection */}
            <div className="mb-6">
              <h4 className="text-gray-300 mb-3">Select Bank Account</h4>
              <div className="space-y-2">
                {bankAccounts.map((account) => (
                  <div key={account.id} className="flex items-center p-3 bg-[#0f172a] rounded-lg border border-gray-800">
                    <input
                      type="radio"
                      name="bank-account"
                      id={`account-${account.id}`}
                      defaultChecked={account.id === 1}
                      className="mr-3"
                    />
                    <label htmlFor={`account-${account.id}`} className="flex-1">
                      <div className="flex items-center">
                        <FiBank className="text-blue-400 mr-2" />
                        <span className="text-white">{account.bank}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{account.accountNo}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
              <p className="text-yellow-400 text-sm">
                ⏱️ Withdrawals are processed within 3-5 working days. A nominal fee of ₹10 may apply.
              </p>
            </div>

            <button
              onClick={handleWithdraw}
              disabled={loading || withdrawAmount < 100 || withdrawAmount > wallet.available}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Withdraw ₹${withdrawAmount.toLocaleString()}`}
            </button>
          </div>
        </div>
      )}

      {/* UPI QR Modal */}
      {showUPIModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 max-w-sm w-full border border-gray-700">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <MdOutlineQrCode className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Your UPI QR Code</h3>
              <p className="text-gray-300 mb-6">
                Scan this QR code to receive money directly to your wallet
              </p>

              {/* QR Code Placeholder */}
              <div className="h-48 w-48 mx-auto mb-6 bg-white rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-gray-800 text-sm">UPI QR Code</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">Your UPI ID</p>
                <div className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                  <p className="text-white font-mono">investor@microwallet</p>
                  <button
                    onClick={() => copyToClipboard('investor@microwallet')}
                    className="p-1 text-gray-400 hover:text-white"
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowUPIModal(false)}
                className="w-full py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWallet;