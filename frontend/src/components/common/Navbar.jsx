import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FiUser, 
  FiBell, 
  FiTrendingUp, 
  FiMenu, 
  FiX,
  FiPieChart,
  FiLogOut,
  FiBarChart2,
  FiBriefcase
} from 'react-icons/fi';
import { 
  MdDashboard, 
  MdAccountBalanceWallet,
  MdShowChart,
  MdNotificationsNone
} from 'react-icons/md';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  // Bangla navigation items
  const navigation = [
    { name: 'ড্যাশবোর্ড', href: '/dashboard', icon: <MdDashboard /> },
    { name: 'বিনিয়োগ', href: '/investments', icon: <FiTrendingUp /> },
    { name: 'পোর্টফোলিও', href: '/portfolio', icon: <FiPieChart /> },
    { name: 'ওয়ালেট', href: '/wallet', icon: <MdAccountBalanceWallet /> },
  ];

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  // DSE Market Data
  const marketData = {
    dsex: { value: '৬,৩৪২.১২', change: '+০.৭৫%', isUp: true },
    dses: { value: '১,৪৫৬.৩৪', change: '+০.৩২%', isUp: true }
  };

  return (
    <>
      {/* Top Market Bar */}
      <div className="bg-gray-800 text-gray-300 py-1.5 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiBarChart2 className="text-green-400" size={14} />
                <span className="font-medium">DSEX:</span>
                <span className={`font-bold ${marketData.dsex.isUp ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData.dsex.value}
                </span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${marketData.dsex.isUp ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                  {marketData.dsex.change}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MdShowChart className="text-green-400" size={14} />
                <span className="font-medium">DSES:</span>
                <span className={`font-bold ${marketData.dses.isUp ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData.dses.value}
                </span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${marketData.dses.isUp ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                  {marketData.dses.change}
                </span>
              </div>
            </div>
            
            <div className="text-xs text-gray-400">
              মাত্র ১০০ টাকা দিয়ে শুরু করুন • শূন্য কমিশন
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => navigate('/')}
              >
                <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold">৳</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-lg font-bold text-white">বাংলা ইনভেস্ট</h1>
                  <p className="text-xs text-gray-400">স্মার্ট বিনিয়োগ</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? 'bg-gray-800 text-green-400'
                      : 'text-gray-300 hover:text-green-400 hover:bg-gray-800/50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Notification */}
              <button className="relative p-2 text-gray-300 hover:text-green-400 transition-colors">
                <MdNotificationsNone size={20} />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {isAuthenticated ? (
                /* User Dropdown */
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-sm">
                      {user?.name?.charAt(0) || 'বি'}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm">{user?.name || 'বিনিয়োগকারী'}</p>
                      <p className="text-xs text-gray-400">৳ {user?.balance?.toLocaleString('bn-BD') || '০'}</p>
                    </div>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-1 z-50">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-700 text-sm"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <MdDashboard />
                        <span>ড্যাশবোর্ড</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-700 text-sm"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FiUser />
                        <span>প্রোফাইল</span>
                      </Link>
                      <Link
                        to="/my-investments"
                        className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-700 text-sm"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FiBriefcase />
                        <span>আমার বিনিয়োগ</span>
                      </Link>
                      <div className="border-t border-gray-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center space-x-3 px-4 py-2 hover:bg-red-900/30 hover:text-red-300 text-sm"
                      >
                        <FiLogOut />
                        <span>লগআউট</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Auth Buttons */
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400 transition-colors text-sm"
                  >
                    লগইন
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:opacity-90 transition-opacity text-sm font-medium"
                  >
                    শুরু করুন
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-300"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 py-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    location.pathname === item.href
                      ? 'bg-gray-700 text-green-400'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-700">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-700/50 rounded-lg mb-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        {user?.name?.charAt(0) || 'বি'}
                      </div>
                      <div>
                        <p className="font-medium">{user?.name || 'বিনিয়োগকারী'}</p>
                        <p className="text-sm text-gray-400">৳{user?.balance?.toLocaleString('bn-BD') || '০'}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center space-x-3 px-4 py-3 hover:bg-red-900/30 hover:text-red-300 rounded-lg"
                    >
                      <FiLogOut />
                      <span>লগআউট</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3 px-4 py-3">
                    <button
                      onClick={() => {
                        navigate('/login');
                        setIsOpen(false);
                      }}
                      className="w-full py-3 rounded-lg border border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400"
                    >
                      লগইন করুন
                    </button>
                    <button
                      onClick={() => {
                        navigate('/register');
                        setIsOpen(false);
                      }}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                    >
                      বিনিয়োগ শুরু করুন
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;