import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiSearch, FiBarChart2, FiHelpCircle } from 'react-icons/fi';
import { MdOutlineErrorOutline } from 'react-icons/md';

const NotFound = () => {
  const navigate = useNavigate();

  // Mock popular investment pages
  const popularPages = [
    { name: 'All Investments', path: '/investments', icon: <FiBarChart2 />, description: 'Browse investment opportunities' },
    { name: 'My Portfolio', path: '/portfolio', icon: '📊', description: 'View your investment portfolio' },
    { name: 'My Wallet', path: '/wallet', icon: '💰', description: 'Manage your funds' },
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome />, description: 'Your investment dashboard' },
  ];

  // Mock trending investments
  const trendingInvestments = [
    'Tech Growth Fund',
    'Digital Gold Plan',
    'Real Estate REIT',
    'Sustainable Energy Portfolio',
  ];

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1a1f38] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="h-24 w-24 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
              <MdOutlineErrorOutline className="text-red-400 text-5xl" />
            </div>
            <div className="ml-6 text-left">
              <h1 className="text-7xl font-bold text-white">404</h1>
              <p className="text-2xl text-gray-300">Page Not Found</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Oops! The investment page you're looking for doesn't exist.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            It seems the investment opportunity or page you were looking for has moved, 
            been removed, or never existed. Don't worry though - we have plenty of other 
            great investment options for you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* What you can do */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FiHelpCircle className="mr-3 text-[#00d4ff]" />
              What you can do next
            </h3>
            <div className="space-y-4">
              <button
                onClick={handleGoBack}
                className="w-full flex items-center justify-between p-4 bg-[#0f172a] rounded-xl hover:bg-[#1a2438] transition-colors group"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center mr-3">
                    <FiArrowLeft className="text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Go back to previous page</p>
                    <p className="text-gray-400 text-sm">Return to where you were</p>
                  </div>
                </div>
                <span className="text-gray-400 group-hover:text-white">→</span>
              </button>

              <Link
                to="/"
                className="w-full flex items-center justify-between p-4 bg-[#0f172a] rounded-xl hover:bg-[#1a2438] transition-colors group"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center mr-3">
                    <FiHome className="text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Go to home page</p>
                    <p className="text-gray-400 text-sm">Start fresh from the beginning</p>
                  </div>
                </div>
                <span className="text-gray-400 group-hover:text-white">→</span>
              </Link>

              <Link
                to="/investments"
                className="w-full flex items-center justify-between p-4 bg-[#0f172a] rounded-xl hover:bg-[#1a2438] transition-colors group"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center mr-3">
                    <FiSearch className="text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Browse investments</p>
                    <p className="text-gray-400 text-sm">Find your next opportunity</p>
                  </div>
                </div>
                <span className="text-gray-400 group-hover:text-white">→</span>
              </Link>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">Popular Pages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularPages.map((page, index) => (
                <Link
                  key={index}
                  to={page.path}
                  className="p-4 bg-[#0f172a] rounded-xl hover:bg-[#1a2438] transition-colors group"
                >
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-[#00d4ff]/20 to-[#00a8cc]/20 flex items-center justify-center mr-2">
                      {page.icon}
                    </div>
                    <p className="font-medium text-white">{page.name}</p>
                  </div>
                  <p className="text-gray-400 text-sm">{page.description}</p>
                  <div className="mt-3 text-[#00d4ff] text-sm font-medium group-hover:underline">
                    Visit page →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Section */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-8 border border-gray-800 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Trending Investment Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingInvestments.map((investment, index) => (
              <div
                key={index}
                className="p-4 bg-[#0f172a] rounded-xl hover:bg-[#1a2438] transition-colors group cursor-pointer"
                onClick={() => navigate('/investments')}
              >
                <div className="flex items-center mb-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${
                    index === 0 ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20' :
                    index === 1 ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20' :
                    index === 2 ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' :
                    'bg-gradient-to-r from-green-500/20 to-emerald-500/20'
                  }`}>
                    <span className="text-xl">
                      {index === 0 ? '🚀' :
                       index === 1 ? '💎' :
                       index === 2 ? '🏠' : '🌱'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{investment}</p>
                    <p className="text-green-400 text-sm">+{15 + index * 3}% returns</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Min: ₹{1000 * (index + 1)}</span>
                  <span className="text-[#00d4ff] group-hover:underline">Invest now</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Help */}
        <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00a8cc]/10 rounded-2xl p-8 border border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Can't find what you're looking for?</h3>
              <p className="text-gray-300">
                Try searching for specific investments, funds, or contact our support team.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/investments"
                className="px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00a8cc] text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                Explore All Investments
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Still having trouble? Email us at{' '}
            <a href="mailto:support@microinvestpro.com" className="text-[#00d4ff] hover:underline">
              support@microinvestpro.com
            </a>{' '}
            or call{' '}
            <a href="tel:+9118001234567" className="text-[#00d4ff] hover:underline">
              1800-123-4567
            </a>
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-gray-600">
            <span className="text-sm">Error Code: 404 • </span>
            <span className="text-sm">Request ID: {Date.now().toString(36).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;