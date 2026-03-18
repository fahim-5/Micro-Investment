import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  FiArrowLeft,
  FiCreditCard,
  FiBank,
  FiSmartphone,
  FiCheck,
  FiLock,
  FiShield,
  FiClock,
  FiDollarSign,
  FiAlertCircle,
  FiCopy,
  FiChevronRight
} from 'react-icons/fi';
import { 
  MdOutlineQrCode,
  MdOutlineAccountBalanceWallet,
  MdOutlineSecurity,
  MdOutlineAttachMoney,
  MdOutlinePayment
} from 'react-icons/md';
import { SiGooglepay, SiPhonepe, SiPaytm } from 'react-icons/si';

const Deposit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Amount, 2: Method, 3: Payment
  const [amount, setAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'processing', 'success', 'failed'
  const [transactionId, setTransactionId] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    accountNumber: '',
    ifsc: ''
  });

  // Quick amount options
  const quickAmounts = [500, 1000, 2000, 5000, 10000, 20000];

  // Payment methods
  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      icon: <SiGooglepay className="text-2xl" />,
      description: 'Instant using UPI apps',
      color: 'from-purple-500 to-pink-500',
      popular: true,
      apps: [
        { name: 'Google Pay', icon: <SiGooglepay />, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
        { name: 'PhonePe', icon: <SiPhonepe />, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
        { name: 'Paytm', icon: <SiPaytm />, color: 'bg-gradient-to-r from-blue-400 to-cyan-500' },
        { name: 'Any UPI App', icon: <MdOutlinePayment />, color: 'bg-gradient-to-r from-gray-600 to-gray-700' },
      ]
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <FiBank className="text-2xl" />,
      description: 'All Indian banks',
      color: 'from-blue-500 to-cyan-500',
      popular: false,
      banks: [
        { name: 'HDFC Bank', code: 'HDFC' },
        { name: 'ICICI Bank', code: 'ICIC' },
        { name: 'SBI', code: 'SBIN' },
        { name: 'Axis Bank', code: 'UTIB' },
        { name: 'Kotak Bank', code: 'KKBK' },
        { name: 'Other Banks', code: 'OTHR' },
      ]
    },
    {
      id: 'card',
      name: 'Debit/Credit Card',
      icon: <FiCreditCard className="text-2xl" />,
      description: 'Visa, Mastercard, Rupay',
      color: 'from-green-500 to-emerald-500',
      popular: true,
      cards: [
        { type: 'Visa', icon: '💳', color: 'bg-gradient-to-r from-blue-400 to-blue-600' },
        { type: 'Mastercard', icon: '💳', color: 'bg-gradient-to-r from-red-500 to-orange-500' },
        { type: 'Rupay', icon: '💳', color: 'bg-gradient-to-r from-blue-300 to-indigo-600' },
      ]
    },
    {
      id: 'wallet',
      name: 'Wallet',
      icon: <MdOutlineAccountBalanceWallet className="text-2xl" />,
      description: 'Paytm, PhonePe Wallet',
      color: 'from-orange-500 to-red-500',
      popular: false,
      wallets: [
        { name: 'Paytm Wallet', icon: <SiPaytm /> },
        { name: 'PhonePe Wallet', icon: <SiPhonepe /> },
        { name: 'MobiKwik', icon: '💰' },
      ]
    }
  ];

  // Recent transactions
  const recentTransactions = [
    { id: 1, amount: 10000, method: 'UPI', date: '2024-01-15', status: 'success' },
    { id: 2, amount: 5000, method: 'Card', date: '2024-01-10', status: 'success' },
    { id: 3, amount: 20000, method: 'Net Banking', date: '2024-01-05', status: 'success' },
  ];

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
  };

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    setStep(2);
  };

  const handlePayment = () => {
    if (amount < 100) {
      alert('Minimum deposit amount is ₹100');
      return;
    }

    setLoading(true);
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      setLoading(false);
      
      if (success) {
        setPaymentStatus('success');
        const txId = 'TXN' + Date.now().toString().slice(-8);
        setTransactionId(txId);
        
        // In real app, update user balance via API
        alert(`₹${amount.toLocaleString()} deposited successfully!`);
      } else {
        setPaymentStatus('failed');
      }
    }, 2000);
  };

  const handleReset = () => {
    setStep(1);
    setAmount(0);
    setSelectedMethod(null);
    setPaymentStatus(null);
    setTransactionId('');
    setPaymentDetails({
      upiId: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      accountNumber: '',
      ifsc: ''
    });
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

  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Amount Selection */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
        <div className="text-center mb-8">
          <div className="h-16 w-16 mx-auto mb-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
            <FiDollarSign className="text-green-400 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">How much would you like to deposit?</h2>
          <p className="text-gray-400">Minimum amount: ₹100 • Maximum amount: ₹1,00,000</p>
        </div>

        {/* Amount Input */}
        <div className="mb-8">
          <label className="block text-gray-300 text-lg font-medium mb-3">Enter Amount (₹)</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="100"
              max="100000"
              className="w-full bg-[#0f172a] border-2 border-gray-700 rounded-2xl px-6 py-5 text-3xl text-white text-center focus:outline-none focus:border-[#00d4ff]"
              placeholder="0"
            />
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl">₹</div>
          </div>
          <div className="text-center mt-2">
            <span className="text-gray-500">Balance: </span>
            <span className="text-white font-medium">{formatCurrency(user?.balance || 0)}</span>
          </div>
        </div>

        {/* Quick Amounts */}
        <div>
          <p className="text-gray-300 mb-4 text-center">Or select a quick amount:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => handleAmountSelect(quickAmount)}
                className={`py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                  amount === quickAmount
                    ? 'bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white transform scale-105'
                    : 'bg-[#0f172a] text-gray-300 hover:bg-[#1a2438] hover:text-white'
                }`}
              >
                ₹{quickAmount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Current Offers */}
        <div className="mt-8 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl">
          <div className="flex items-center">
            <span className="text-yellow-400 mr-2">🎁</span>
            <div>
              <p className="text-yellow-400 font-medium">Special Offer!</p>
              <p className="text-gray-300 text-sm">Deposit ₹10,000 or more and get ₹100 bonus credit!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={() => amount >= 100 && setStep(2)}
        disabled={amount < 100}
        className="w-full py-4 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-2xl font-bold text-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      {/* Method Selection */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Select Payment Method</h2>
          <p className="text-gray-400">You're depositing {formatCurrency(amount)}</p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                selectedMethod === method.id
                  ? 'border-[#00d4ff] bg-gradient-to-r from-[#00d4ff]/10 to-[#00a8cc]/10'
                  : 'border-gray-800 hover:border-gray-700 hover:bg-[#1a2438]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center text-white`}>
                  {method.icon}
                </div>
                {method.popular && (
                  <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-xs rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{method.name}</h3>
              <p className="text-gray-400 text-sm">{method.description}</p>
              <div className="mt-4 flex items-center text-[#00d4ff]">
                <span>Select</span>
                <FiChevronRight className="ml-1" />
              </div>
            </button>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={() => setStep(1)}
          className="w-full mt-6 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Back to Amount Selection
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    
    if (!method) return null;

    return (
      <div className="space-y-8">
        {/* Payment Details */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Complete Payment</h2>
              <div className="flex items-center text-gray-400">
                <div className={`h-8 w-8 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center text-white mr-3`}>
                  {method.icon}
                </div>
                <span>{method.name} • </span>
                <span className="text-white font-medium ml-1">{formatCurrency(amount)}</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-white"
            >
              Change Method
            </button>
          </div>

          {/* Payment Form based on selected method */}
          {method.id === 'upi' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Select UPI App</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {method.apps.map((app, index) => (
                    <button
                      key={index}
                      className="flex flex-col items-center p-4 bg-[#0f172a] rounded-xl hover:bg-[#1a2438] transition-colors"
                    >
                      <div className={`h-12 w-12 rounded-xl ${app.color} flex items-center justify-center text-white mb-3`}>
                        {app.icon}
                      </div>
                      <span className="text-white text-sm">{app.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Enter UPI ID</label>
                <div className="relative">
                  <input
                    type="text"
                    value={paymentDetails.upiId}
                    onChange={(e) => setPaymentDetails({...paymentDetails, upiId: e.target.value})}
                    className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]"
                    placeholder="yourname@bank"
                  />
                </div>
              </div>

              {/* QR Code Option */}
              <div className="p-4 bg-[#0f172a] rounded-xl border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Pay using QR Code</p>
                    <p className="text-gray-400 text-sm">Scan to pay from any UPI app</p>
                  </div>
                  <button className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg">
                    <MdOutlineQrCode className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {method.id === 'netbanking' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Select Your Bank</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {method.banks.map((bank, index) => (
                    <button
                      key={index}
                      className="flex items-center p-4 bg-[#0f172a] rounded-xl hover:bg-[#1a2438] transition-colors"
                    >
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center mr-3">
                        <FiBank className="text-blue-400" />
                      </div>
                      <span className="text-white">{bank.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Account Number</label>
                  <input
                    type="text"
                    value={paymentDetails.accountNumber}
                    onChange={(e) => setPaymentDetails({...paymentDetails, accountNumber: e.target.value})}
                    className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]"
                    placeholder="Enter account number"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">IFSC Code</label>
                  <input
                    type="text"
                    value={paymentDetails.ifsc}
                    onChange={(e) => setPaymentDetails({...paymentDetails, ifsc: e.target.value})}
                    className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]"
                    placeholder="Enter IFSC"
                  />
                </div>
              </div>
            </div>
          )}

          {method.id === 'card' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Card Type</h3>
                <div className="flex space-x-3">
                  {method.cards.map((card, index) => (
                    <button
                      key={index}
                      className={`flex-1 p-4 rounded-xl border ${
                        index === 0 ? 'border-[#00d4ff]' : 'border-gray-800'
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl mb-2">{card.icon}</span>
                        <p className="text-white text-sm">{card.type}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Card Number</label>
                <input
                  type="text"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={paymentDetails.expiry}
                    onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})}
                    className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]"
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">CVV</label>
                  <input
                    type="text"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                    className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4ff]"
                    placeholder="123"
                    maxLength="3"
                  />
                </div>
              </div>
            </div>
          )}

          {method.id === 'wallet' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Select Wallet</h3>
                <div className="space-y-3">
                  {method.wallets.map((wallet, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-4 bg-[#0f172a] rounded-xl hover:bg-[#1a2438] transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center mr-3">
                          {wallet.icon}
                        </div>
                        <span className="text-white">{wallet.name}</span>
                      </div>
                      <FiChevronRight className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Info */}
          <div className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
            <div className="flex items-start">
              <FiShield className="text-green-400 mt-0.5 mr-2" />
              <div>
                <p className="text-green-400 font-medium">Secure Payment</p>
                <p className="text-gray-300 text-sm">
                  Your payment is secured with 256-bit SSL encryption. We never store your card details.
                </p>
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full mt-6 py-4 rounded-2xl font-bold text-xl transition-opacity ${
              loading
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing Payment...
              </div>
            ) : (
              `Pay ${formatCurrency(amount)}`
            )}
          </button>
        </div>

        {/* Recent Deposits */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4">Your Recent Deposits</h3>
          <div className="space-y-3">
            {recentTransactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                <div>
                  <p className="text-white font-medium">{formatCurrency(txn.amount)}</p>
                  <p className="text-gray-400 text-sm">{txn.method} • {formatDate(txn.date)}</p>
                </div>
                <span className="px-2 py-1 bg-green-400/10 text-green-400 text-xs rounded">
                  {txn.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentStatus = () => {
    if (paymentStatus === 'success') {
      return (
        <div className="text-center py-12">
          <div className="h-24 w-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <FiCheck className="text-white text-4xl" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Payment Successful!</h2>
          <p className="text-gray-300 text-lg mb-2">You have successfully deposited</p>
          <p className="text-4xl font-bold text-green-400 mb-6">{formatCurrency(amount)}</p>
          
          <div className="bg-[#1e293b] rounded-xl p-6 max-w-md mx-auto mb-8">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Transaction ID</span>
                <div className="flex items-center">
                  <span className="text-white font-mono">{transactionId}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(transactionId)}
                    className="ml-2 p-1 text-gray-400 hover:text-white"
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method</span>
                <span className="text-white">
                  {paymentMethods.find(m => m.id === selectedMethod)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Time</span>
                <span className="text-white">{new Date().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="text-green-400 font-medium">Completed</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              Make Another Deposit
            </button>
            <button
              onClick={() => navigate('/investments')}
              className="px-8 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Explore Investments
            </button>
          </div>
        </div>
      );
    }

    if (paymentStatus === 'failed') {
      return (
        <div className="text-center py-12">
          <div className="h-24 w-24 mx-auto mb-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
            <FiAlertCircle className="text-white text-4xl" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Payment Failed</h2>
          <p className="text-gray-300 text-lg mb-6">
            We couldn't process your payment. Please try again or use a different payment method.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/wallet')}
              className="px-8 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Go to Wallet
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1a1f38]">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/wallet"
                className="flex items-center text-gray-400 hover:text-white transition-colors mr-6"
              >
                <FiArrowLeft className="mr-2" />
                Back
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Deposit Funds</h1>
                <p className="text-gray-400">Add money to your investment wallet</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Current Balance</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(user?.balance || 0)}</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-8">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((stepNum) => (
                <React.Fragment key={stepNum}>
                  <div className="flex flex-col items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      step >= stepNum
                        ? 'bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white'
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                      {stepNum}
                    </div>
                    <span className={`text-xs mt-2 ${
                      step >= stepNum ? 'text-[#00d4ff]' : 'text-gray-500'
                    }`}>
                      {stepNum === 1 ? 'Amount' : stepNum === 2 ? 'Method' : 'Payment'}
                    </span>
                  </div>
                  {stepNum < 3 && (
                    <div className={`h-0.5 w-16 mx-4 ${
                      step > stepNum ? 'bg-gradient-to-r from-[#00d4ff] to-[#00a8cc]' : 'bg-gray-800'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {paymentStatus ? (
          renderPaymentStatus()
        ) : (
          <>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </>
        )}

        {/* Security & Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <FiLock className="text-green-400 text-xl mr-3" />
              <h3 className="text-lg font-bold text-white">Secure Payment</h3>
            </div>
            <p className="text-gray-400 text-sm">
              256-bit SSL encryption ensures your payment details are completely secure.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <FiClock className="text-blue-400 text-xl mr-3" />
              <h3 className="text-lg font-bold text-white">Instant Credit</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Most payments are credited instantly. Some bank transfers may take 2-3 hours.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <FiAlertCircle className="text-yellow-400 text-xl mr-3" />
              <h3 className="text-lg font-bold text-white">No Hidden Fees</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Zero transaction fees on deposits. We only charge for withdrawals after 1 year.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'What is the minimum and maximum deposit amount?',
                a: 'Minimum deposit is ₹100 and maximum is ₹1,00,000 per transaction.'
              },
              {
                q: 'How long does it take for money to reflect in my wallet?',
                a: 'UPI and card payments are instant. Net banking may take 2-3 hours. Bank transfers take 1-2 working days.'
              },
              {
                q: 'Are there any transaction fees?',
                a: 'No, we don\'t charge any fees for deposits. All payment gateway charges are borne by us.'
              },
              {
                q: 'Is my money safe?',
                a: 'Yes, all funds are held in secure, SEBI-compliant escrow accounts with partner banks.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                <h3 className="text-lg font-medium text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;