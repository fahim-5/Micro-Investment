import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InvestmentCard from '../components/common/InvestmentCard';
import { 
  FiTrendingUp, 
  FiShield, 
  FiDollarSign, 
  FiClock,
  FiArrowRight,
  FiCheck,
  FiAward,
  FiBarChart2,
  FiUsers
} from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  
  // Static data - no backend connection
  const [stats] = useState({
    totalUsers: 12543,
    totalInvested: 45289000,
    avgReturns: 12.4,
    activeInvestments: 89
  });

  // Mock authentication state (for demo purposes only)
  const [isAuthenticated] = useState(false);
  const [user] = useState(null);

  // Featured investments data - Bangla names
  const featuredInvestments = [
    {
      id: 1,
      name: 'টেক গ্রোথ ফান্ড',
      type: 'মিউচুয়াল ফান্ড',
      category: 'প্রযুক্তি',
      currentValue: 5000000,
      minInvestment: 1000,
      expectedReturn: 18.5,
      riskLevel: 'Medium',
      duration: '৩ বছর',
      popularity: 95,
      isTrending: true,
      isFeatured: true,
      tags: ['উচ্চ প্রবৃদ্ধি', 'প্রযুক্তি', 'নিফটি ৫০'],
      status: 'active'
    },
    {
      id: 2,
      name: 'স্বর্ণ সঞ্চয় প্ল্যান',
      type: 'স্বর্ণ',
      category: 'কমোডিটি',
      currentValue: 2500000,
      minInvestment: 500,
      expectedReturn: 8.2,
      riskLevel: 'Low',
      duration: '৫ বছর',
      popularity: 87,
      isTrending: true,
      isFeatured: false,
      tags: ['নিরাপদ', 'হেজ', 'মুদ্রাস্ফীতি'],
      status: 'active'
    },
    {
      id: 3,
      name: 'রিয়েল এস্টেট রিট',
      type: 'রিয়েল এস্টেট',
      category: 'প্রপার্টি',
      currentValue: 7500000,
      minInvestment: 5000,
      expectedReturn: 12.8,
      riskLevel: 'Medium',
      duration: '৭ বছর',
      popularity: 92,
      isTrending: false,
      isFeatured: true,
      tags: ['বাণিজ্যিক', 'ভাড়া', 'রিট'],
      status: 'active'
    },
    {
      id: 4,
      name: 'ক্রিপ্টো ইনডেক্স ফান্ড',
      type: 'ক্রিপ্টো',
      category: 'ডিজিটাল সম্পদ',
      currentValue: 1500000,
      minInvestment: 100,
      expectedReturn: 25.3,
      riskLevel: 'High',
      duration: '২ বছর',
      popularity: 98,
      isTrending: true,
      isFeatured: true,
      tags: ['ব্লকচেইন', 'উচ্চ ঝুঁকি', 'বিটকয়েন'],
      status: 'active'
    }
  ];

  const benefits = [
    {
      icon: <FiDollarSign className="text-2xl" />,
      title: 'শুধুমাত্র ১০০ টাকা দিয়ে শুরু',
      description: 'মাত্র ১০০ টাকা দিয়ে আপনার বিনিয়োগ যাত্রা শুরু করুন। বড় পুঁজির প্রয়োজন নেই।',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: 'বিএসইসি নিবন্ধিত',
      description: 'সমস্ত বিনিয়োগ বিএসইসি নিবন্ধিত সত্তার মাধ্যমে। আপনার টাকা নিরাপদ।',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: <FiTrendingUp className="text-2xl" />,
      title: 'স্মার্ট পোর্টফোলিও',
      description: 'আপনার ঝুঁকি প্রোফাইল এবং লক্ষ্যের ভিত্তিতে এআই-চালিত পোর্টফোলিও সুপারিশ।',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: <FiClock className="text-2xl" />,
      title: 'অটো-ইনভেস্ট',
      description: 'স্বয়ংক্রিয় বিনিয়োগ সেটআপ করুন এবং নির্বিঘ্নে আপনার সম্পদ বৃদ্ধি করুন।',
      color: 'from-orange-400 to-red-500'
    }
  ];

  const testimonials = [
    {
      name: 'রাহুল শর্মা',
      role: 'সফটওয়্যার ইঞ্জিনিয়ার',
      avatar: 'রা',
      quote: 'মাসে ৫০০ টাকা দিয়ে শুরু করেছিলাম, মাত্র ২ বছরে আমার পোর্টফোলিও এখন ২.৫ লক্ষ টাকা!',
      returns: '+৪৫%'
    },
    {
      name: 'প্রিয়া প্যাটেল',
      role: 'শিক্ষিকা',
      avatar: 'প্রি',
      quote: 'মাইক্রো-বিনিয়োগ ফিচারটি আমাকে লক্ষ্য না করেই সঞ্চয় করতে সাহায্য করেছে। শুরু করার জন্য নিখুঁত!',
      returns: '+২৮%'
    },
    {
      name: 'অমিত ভার্মা',
      role: 'ছোট ব্যবসা মালিক',
      avatar: 'অ',
      quote: 'মাত্র ১০,০০০ টাকা দিয়ে ৮টি ভিন্ন সম্পদ শ্রেণিতে বৈচিত্র্য অর্জন করেছি। চমৎকার প্ল্যাটফর্ম!',
      returns: '+৩২%'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleExploreInvestments = () => {
    navigate('/investments');
  };

  const handleLearnMore = () => {
    navigate('/how-it-works');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section - Bangla */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-sm font-medium mb-6">
                <FiAward className="mr-2" />
                {stats.totalUsers.toLocaleString()}+ বিনিয়োগকারীদের বিশ্বাস
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                স্মার্ট বিনিয়োগ,
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {' '}সম্পদ বৃদ্ধি
                </span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                মাত্র ১০০ টাকা দিয়ে আপনার বিনিয়োগ যাত্রা শুরু করুন। পেশাদার পোর্টফোলিও, 
                স্বয়ংক্রিয় বিনিয়োগ এবং বিশেষজ্ঞ নির্দেশনা - সবকিছু এক প্ল্যাটফর্মে।
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  বিনিয়োগ শুরু করুন
                  <FiArrowRight className="inline ml-2" />
                </button>
                <button
                  onClick={handleExploreInvestments}
                  className="px-8 py-4 border-2 border-green-500 text-green-400 rounded-xl font-bold text-lg hover:bg-green-500/10 transition-all duration-300"
                >
                  বিনিয়োগ এক্সপ্লোর করুন
                </button>
              </div>
              
              {/* Stats - Bangla */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <p className="text-2xl font-bold text-white">১০০ টাকা</p>
                  <p className="text-gray-400 text-sm">ন্যূনতম বিনিয়োগ</p>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <p className="text-2xl font-bold text-green-400">{stats.avgReturns}%</p>
                  <p className="text-gray-400 text-sm">গড় রিটার্ন</p>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <p className="text-2xl font-bold text-white">০%</p>
                  <p className="text-gray-400 text-sm">কমিশন</p>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <p className="text-2xl font-bold text-white">২৪/৭</p>
                  <p className="text-gray-400 text-sm">সহায়তা</p>
                </div>
              </div>
            </div>
            
            {/* Hero Illustration - Bangla */}
            <div className="relative">
              <div className="absolute -top-10 -right-10 h-64 w-64 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl opacity-20"></div>
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl">
                <div className="space-y-4">
                  {['মাসিক এসআইপি', 'এককালীন বিনিয়োগ', 'স্বর্ণ সঞ্চয়', 'ট্যাক্স সেভিং'].map((type, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-900 rounded-xl hover:bg-gray-700 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-lg bg-gradient-to-r ${index === 0 ? 'from-green-400 to-emerald-500' : 'from-blue-400 to-cyan-500'} flex items-center justify-center`}>
                          {index === 0 && <FiTrendingUp />}
                          {index === 1 && <FiDollarSign />}
                          {index === 2 && '🥇'}
                          {index === 3 && '📊'}
                        </div>
                        <div>
                          <p className="font-medium text-white">{type}</p>
                          <p className="text-sm text-gray-400">শুধুমাত্র ১০০ টাকা দিয়ে</p>
                        </div>
                      </div>
                      <button 
                        onClick={handleGetStarted}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
                      >
                        এখন বিনিয়োগ করুন
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Live Portfolio Preview - Bangla */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white font-medium">লাইভ পোর্টফোলিও প্রবৃদ্ধি</p>
                    <span className="text-green-400 text-sm flex items-center">
                      <FiTrendingUp className="mr-1" /> +১২.৪%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>জানুয়ারী ২০২৩</span>
                    <span>ডিসেম্বর ২০২৩</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Bangla */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              কেন <span className="text-green-400">বাংলা ইনভেস্ট</span> বেছে নেবেন?
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              আমরা সবার জন্য বিনিয়োগ সহজ, প্রবেশযোগ্য এবং লাভজনক করে তুলি
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-r ${benefit.color} flex items-center justify-center text-white mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Investments - Bangla */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                নির্বাচিত <span className="text-green-400">বিনিয়োগ</span>
              </h2>
              <p className="text-gray-400">উচ্চ প্রবৃদ্ধি সম্ভাবনা সহ নির্বাচিত সুযোগ</p>
            </div>
            <Link 
              to="/investments" 
              className="px-5 py-2.5 border border-green-500 text-green-400 rounded-lg hover:bg-green-500/10 transition-colors text-sm"
            >
              সমস্ত বিনিয়োগ দেখুন
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredInvestments.map((investment) => (
              <InvestmentCard 
                key={investment.id} 
                investment={investment}
                compact={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Bangla */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              <span className="text-green-400">৩টি সহজ ধাপে</span> বিনিয়োগ শুরু করুন
            </h2>
            <p className="text-gray-400">মিনিটে শুরু করুন, দিনে নয়</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400"></div>
            
            {[
              { step: '১', title: 'নিবন্ধন ও যাচাই', desc: '২ মিনিটে আপনার অ্যাকাউন্ট তৈরি করুন KYC যাচাইকরণের মাধ্যমে' },
              { step: '২', title: 'টাকা যোগ করুন', desc: 'ইউপিআই, নেট ব্যাংকিং বা কার্ড ব্যবহার করে নিরাপদে টাকা জমা করুন' },
              { step: '৩', title: 'বিনিয়োগ শুরু করুন', desc: 'নির্বাচিত পোর্টফোলিও থেকে বেছে নিন অথবা পৃথক বিনিয়োগ বেছে নিন' }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={handleGetStarted}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
            >
              আজই আপনার যাত্রা শুরু করুন
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials - Bangla */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              আমাদের <span className="text-green-400">বিনিয়োগকারীরা</span> কী বলেন
            </h2>
            <p className="text-gray-400">হাজারো সফল বিনিয়োগকারীর সাথে যুক্ত হন</p>
          </div>
          
          <div className="relative h-72">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 max-w-2xl mx-auto">
                  <div className="flex items-start mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      <div className="mt-1 px-2 py-0.5 bg-green-400/10 text-green-400 rounded-full text-xs inline-block">
                        রিটার্ন: {testimonial.returns}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </div>
              </div>
            ))}
            
            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-6 absolute bottom-0 left-0 right-0">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-6 bg-green-400' 
                      : 'w-1.5 bg-gray-700 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Bangla */}
      <section className="py-16 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            আপনার <span className="text-green-400">বিনিয়োগ যাত্রা</span> শুরু করতে প্রস্তুত?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {stats.totalUsers.toLocaleString()} জন বিনিয়োগকারীর সাথে যুক্ত হন যারা আমাদের তাদের আর্থিক বৃদ্ধিতে বিশ্বাস করে। 
            কোন গোপন ফি নেই, কোন ন্যূনতম ব্যালেন্স নেই, শুধু স্মার্ট বিনিয়োগ।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
            >
              বিনিয়োগ শুরু করুন
            </button>
            <button
              onClick={handleLearnMore}
              className="px-6 py-3 border-2 border-gray-300 text-white rounded-lg font-bold hover:bg-white/10 transition-all duration-300"
            >
              কিভাবে কাজ করে জানুন
            </button>
          </div>
          <div className="mt-6 text-gray-400 text-sm">
            <p className="flex items-center justify-center">
              <FiCheck className="mr-2 text-green-400" />
              ক্রেডিট কার্ডের প্রয়োজন নেই • নিবন্ধন সম্পূর্ণ ফ্রি • যে কোনো সময় বাতিল করুন
            </p>
          </div>
        </div>
      </section>

      {/* Bangladesh Flag Section */}
      <div className="bg-gray-900 py-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <div className="w-6 h-4 bg-green-600 rounded-l-sm"></div>
                <div className="w-2 h-4 bg-red-600 rounded-r-sm"></div>
              </div>
              <span className="text-gray-400 text-sm">বাংলাদেশের জন্য বিনিয়োগ সমাধান</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <FiUsers className="text-gray-500" />
              <span className="text-gray-400 text-sm">
                {stats.totalUsers.toLocaleString()} জন বিনিয়োগকারী
              </span>
            </div>
            
            <div className="text-gray-400 text-sm">
              ১০০% নিরাপদ ও নিবন্ধিত
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;