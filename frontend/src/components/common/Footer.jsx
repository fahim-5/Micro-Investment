import React from 'react';
import { Link } from 'react-router-dom';
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
  FiGlobe
} from 'react-icons/fi';
import { MdSecurity, MdAccountBalance } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'আমাদের সম্পর্কে', path: '/about' },
    { name: 'কিভাবে কাজ করে', path: '/how-it-works' },
    { name: 'বিনিয়োগ প্ল্যান', path: '/plans' },
    { name: 'মূল্য নির্ধারণ', path: '/pricing' },
    { name: 'ব্লগ', path: '/blog' },
    { name: 'ক্যারিয়ার', path: '/careers' },
  ];

  const investmentTypes = [
    { name: 'স্টক মার্কেট', path: '/investments/stocks' },
    { name: 'মিউচুয়াল ফান্ড', path: '/investments/mutual-funds' },
    { name: 'ক্রিপ্টোকারেন্সি', path: '/investments/crypto' },
    { name: 'রিয়েল এস্টেট', path: '/investments/real-estate' },
    { name: 'স্বর্ণ ও ধাতু', path: '/investments/gold' },
  ];

  const legalLinks = [
    { name: 'গোপনীয়তা নীতি', path: '/privacy' },
    { name: 'সেবা শর্তাবলী', path: '/terms' },
    { name: 'KYC নীতি', path: '/kyc-policy' },
    { name: 'অভিযোগ নিষ্পত্তি', path: '/grievance' },
  ];

  const socialLinks = [
    { icon: <FiFacebook />, name: 'ফেসবুক' },
    { icon: <FiTwitter />, name: 'টুইটার' },
    { icon: <FiInstagram />, name: 'ইনস্টাগ্রাম' },
    { icon: <FiLinkedin />, name: 'লিংকডইন' },
    { icon: <FiYoutube />, name: 'ইউটিউব' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-white">৳</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">বাংলা ইনভেস্ট</h2>
                <p className="text-sm text-green-400">সবার জন্য বিনিয়োগ</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm">
              বাংলাদেশের জন্য আধুনিক বিনিয়োগ প্ল্যাটফর্ম। 
              মাত্র ১০০ টাকা দিয়ে শুরু করুন আপনার আর্থিক ভ্রমণ।
            </p>
            
            {/* Trust Badges */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-2 text-sm">
                <MdSecurity className="text-green-500" />
                <span className="text-gray-300">বিএসইসি নিবন্ধিত</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <FiShield className="text-green-500" />
                <span className="text-gray-300">সিকিউর এনক্রিপশন</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <FiTrendingUp className="text-green-500" />
              <span>দ্রুত লিঙ্ক</span>
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
              <span>বিনিয়োগের ধরন</span>
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
            <h3 className="text-white font-semibold mb-4">যোগাযোগ</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FiPhone className="text-green-500 mt-1" />
                <div>
                  <p className="text-white">+৮৮০ ১৬৭৮-১২৩৪৫৬</p>
                  <p className="text-gray-400 text-sm">২৪/৭ সহায়তা</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FiMail className="text-green-500 mt-1" />
                <div>
                  <p className="text-white">support@banglainvest.com</p>
                  <p className="text-gray-400 text-sm">ইমেইল সহায়তা</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FiMapPin className="text-green-500 mt-1" />
                <div>
                  <p className="text-white">গুলশান, ঢাকা</p>
                  <p className="text-gray-400 text-sm">নিবন্ধিত অফিস</p>
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
              <p className="text-sm font-medium mb-3 text-gray-400">আমাদের সাথে যুক্ত হোন</p>
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
                <span className="text-sm">বিএসইসি নিবন্ধিত</span>
              </div>
              <div className="text-sm text-gray-400">
                CIN: BD1234567890
              </div>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:w-auto">
              <p className="text-sm font-medium mb-3 text-gray-400">নিয়মিত আপডেট পান</p>
              <div className="flex max-w-md">
                <input
                  type="email"
                  placeholder="আপনার ইমেইল"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:border-green-500"
                />
                <button className="bg-green-600 px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  সাবস্ক্রাইব
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
              <span>বাংলা ভাষায় সমর্থিত</span>
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
              © {currentYear} বাংলা ইনভেস্ট টেকনোলজিস লিমিটেড
            </p>

            {/* Bangladesh Flag */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-6 h-4 bg-green-600"></div>
                <div className="w-2 h-4 bg-red-600"></div>
              </div>
              <span className="text-gray-400 text-sm">বাংলাদেশের জন্য</span>
            </div>

            {/* Risk Note */}
            <p className="text-gray-500 text-sm text-center max-w-md">
              বিনিয়োগ ঝুঁকিপূর্ণ, বিনিয়োগের পূর্বে সতর্কতা অবলম্বন করুন
            </p>
          </div>

          {/* Simple Disclaimer */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600 max-w-3xl mx-auto">
              পুঁজিবাজারে বিনিয়োগ বাজারের ঝুঁকির অধীন। বিনিয়োগের পূর্বে সংশ্লিষ্ট সমস্ত নথি পড়ুন।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;