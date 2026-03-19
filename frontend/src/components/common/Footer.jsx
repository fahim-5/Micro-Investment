import React from "react";
import { Link } from "react-router-dom";
import logo6 from "../../assets/logo/logo6.png";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiGlobe,
} from "react-icons/fi";
import { MdSecurity, MdAccountBalance } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Investment Plans", path: "/plans" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Careers", path: "/careers" },
  ];

  const investmentTypes = [
    { name: "Stock Market", path: "/investments/stocks" },
    { name: "Mutual Funds", path: "/investments/mutual-funds" },
    { name: "Cryptocurrency", path: "/investments/crypto" },
    { name: "Real Estate", path: "/investments/real-estate" },
    { name: "Gold & Metals", path: "/investments/gold" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "KYC Policy", path: "/kyc-policy" },
    { name: "Grievance Redressal", path: "/grievance" },
  ];

  const socialLinks = [
    { icon: <FiFacebook />, name: "Facebook" },
    { icon: <FiTwitter />, name: "Twitter" },
    { icon: <FiInstagram />, name: "Instagram" },
    { icon: <FiLinkedin />, name: "LinkedIn" },
    { icon: <FiYoutube />, name: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-transparent">
                <img
                  src={logo6}
                  alt="Investra logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Investra</h2>
                <p className="text-sm text-green-400">Start Small. Grow Big</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              A modern investment platform for Bangladesh. Start your financial
              journey from BDT 100.
            </p>

            {/* Trust Badges */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-2 text-sm">
                <MdSecurity className="text-green-500" />
                <span className="text-gray-300">BSEC Registered</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <FiShield className="text-green-500" />
                <span className="text-gray-300">Secure Encryption</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <FiTrendingUp className="text-green-500" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investment Types */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <FiUsers className="text-green-500" />
              <span>Investment Types</span>
            </h3>
            <ul className="space-y-3">
              {investmentTypes.map((type) => (
                <li key={type.name}>
                  <Link
                    to={type.path}
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm block py-1"
                  >
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FiPhone className="text-green-500 mt-1" />
                <div>
                  <p className="text-white">+88 01678-123456</p>
                  <p className="text-gray-400 text-sm">24/7 support</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FiMail className="text-green-500 mt-1" />
                <div>
                  <p className="text-white">support@banglainvest.com</p>
                  <p className="text-gray-400 text-sm">Email support</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FiMapPin className="text-green-500 mt-1" />
                <div>
                  <p className="text-white">Gulshan, Dhaka</p>
                  <p className="text-gray-400 text-sm">Registered office</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social & Regulatory Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Media */}
            <div>
              <p className="text-sm font-medium mb-3 text-gray-400">
                Connect with us
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-green-600 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Regulatory Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg">
                <MdAccountBalance className="text-green-500" />
                <span className="text-sm">BSEC Registered</span>
              </div>
              <div className="text-sm text-gray-400">CIN: BD1234567890</div>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:w-auto">
              <p className="text-sm font-medium mb-3 text-gray-400">
                Get regular updates
              </p>
              <div className="flex max-w-md">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:border-green-500"
                />
                <button className="bg-green-600 px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <FiGlobe />
              <span>Supports Bangla</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {currentYear} Bangla Invest Technologies Limited
            </p>

            {/* Bangladesh Flag */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <svg
                  className="w-6 h-4"
                  viewBox="0 0 30 20"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Flag of Bangladesh"
                >
                  <title>Flag of Bangladesh</title>
                  <rect width="30" height="20" fill="#006A4E" />
                  <circle cx="12" cy="10" r="5" fill="#F42A41" />
                </svg>
              </div>
              <span className="text-gray-400 text-sm">For Bangladesh</span>
            </div>

            {/* Risk Note */}
            <p className="text-gray-500 text-sm text-center max-w-md">
              Investing involves risk; please exercise caution before investing.
            </p>
          </div>

          {/* Simple Disclaimer */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600 max-w-3xl mx-auto">
              Investing in the capital market is subject to market risks. Please
              read all related documents before investing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
