import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InvestmentCard from "../components/common/InvestmentCard";
import {
  FiTrendingUp,
  FiShield,
  FiDollarSign,
  FiClock,
  FiArrowRight,
  FiCheck,
  FiAward,
  FiBarChart2,
  FiUsers,
} from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();

  // Static data - no backend connection
  const [stats] = useState({
    totalUsers: 12543,
    totalInvested: 45289000,
    avgReturns: 12.4,
    activeInvestments: 89,
  });

  // Mock authentication state (for demo purposes only)
  const [isAuthenticated] = useState(false);
  const [user] = useState(null);

  // Featured investments data
  const featuredInvestments = [
    {
      id: 1,
      name: "Tech Growth Fund",
      type: "Mutual Fund",
      category: "Technology",
      currentValue: 5000000,
      minInvestment: 1000,
      expectedReturn: 18.5,
      riskLevel: "Medium",
      duration: "3 years",
      popularity: 95,
      isTrending: true,
      isFeatured: true,
      tags: ["High growth", "Technology", "Nifty 50"],
      status: "active",
    },
    {
      id: 2,
      name: "Gold Savings Plan",
      type: "Gold",
      category: "Commodity",
      currentValue: 2500000,
      minInvestment: 500,
      expectedReturn: 8.2,
      riskLevel: "Low",
      duration: "5 years",
      popularity: 87,
      isTrending: true,
      isFeatured: false,
      tags: ["Safe", "Hedge", "Inflation"],
      status: "active",
    },
    {
      id: 3,
      name: "Real Estate REIT",
      type: "Real Estate",
      category: "Property",
      currentValue: 7500000,
      minInvestment: 5000,
      expectedReturn: 12.8,
      riskLevel: "Medium",
      duration: "7 years",
      popularity: 92,
      isTrending: false,
      isFeatured: true,
      tags: ["Commercial", "Rental", "REIT"],
      status: "active",
    },
    {
      id: 4,
      name: "Crypto Index Fund",
      type: "Crypto",
      category: "Digital Assets",
      currentValue: 1500000,
      minInvestment: 100,
      expectedReturn: 25.3,
      riskLevel: "High",
      duration: "2 years",
      popularity: 98,
      isTrending: true,
      isFeatured: true,
      tags: ["Blockchain", "High risk", "Bitcoin"],
      status: "active",
    },
  ];

  const benefits = [
    {
      icon: <FiDollarSign className="text-2xl" />,
      title: "Start from BDT 100",
      description:
        "Begin your investment journey with just BDT 100. No large capital required.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: "BSEC Registered",
      description:
        "All investments are facilitated through BSEC-registered entities. Your funds are secure.",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: <FiTrendingUp className="text-2xl" />,
      title: "Smart Portfolio",
      description:
        "AI-driven portfolio recommendations based on your risk profile and goals.",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: <FiClock className="text-2xl" />,
      title: "Auto-Invest",
      description:
        "Set up automatic investments and grow your assets effortlessly.",
      color: "from-orange-400 to-red-500",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer",
      avatar: "RS",
      quote:
        "I started with BDT 500 per month; in just 2 years my portfolio is now BDT 250,000!",
      returns: "+45%",
    },
    {
      name: "Priya Patel",
      role: "Teacher",
      avatar: "PP",
      quote:
        "The micro-investing feature helped me save without trying. Perfect to get started!",
      returns: "+28%",
    },
    {
      name: "Amit Verma",
      role: "Small Business Owner",
      avatar: "AV",
      quote:
        "With just BDT 10,000 I diversified across 8 asset classes. Excellent platform!",
      returns: "+32%",
    },
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
    navigate("/register");
  };

  const handleExploreInvestments = () => {
    navigate("/investments");
  };

  const handleLearnMore = () => {
    navigate("/how-it-works");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-sm font-medium mb-6">
                <FiAward className="mr-2" />
                Trusted by {stats.totalUsers.toLocaleString()}+ investors
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Smart investing,
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {" "}
                  Grow your wealth
                </span>
              </h1>

              <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                Start your investment journey from BDT 100. Professional
                portfolios, automated investments, and expert guidance — all on
                one platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started
                  <FiArrowRight className="inline ml-2" />
                </button>
                <button
                  onClick={handleExploreInvestments}
                  className="px-8 py-4 border-2 border-green-500 text-green-400 rounded-xl font-bold text-lg hover:bg-green-500/10 transition-all duration-300"
                >
                  Explore Investments
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <p className="text-2xl font-bold text-white">BDT 100</p>
                  <p className="text-gray-400 text-sm">Minimum investment</p>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <p className="text-2xl font-bold text-green-400">
                    {stats.avgReturns}%
                  </p>
                  <p className="text-gray-400 text-sm">Average returns</p>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <p className="text-2xl font-bold text-white">0%</p>
                  <p className="text-gray-400 text-sm">Commission</p>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <p className="text-2xl font-bold text-white">24/7</p>
                  <p className="text-gray-400 text-sm">Support</p>
                </div>
              </div>
            </div>

            {/* Hero Illustration - Bangla */}
            <div className="relative">
              <div className="absolute -top-10 -right-10 h-64 w-64 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl opacity-20"></div>
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl">
                <div className="space-y-4">
                  {[
                    "Monthly SIP",
                    "One-time Investment",
                    "Gold Savings",
                    "Tax Saving",
                  ].map((type, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-900 rounded-xl hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`h-10 w-10 rounded-lg bg-gradient-to-r ${index === 0 ? "from-green-400 to-emerald-500" : "from-blue-400 to-cyan-500"} flex items-center justify-center`}
                        >
                          {index === 0 && <FiTrendingUp />}
                          {index === 1 && <FiDollarSign />}
                          {index === 2 && "🥇"}
                          {index === 3 && "📊"}
                        </div>
                        <div>
                          <p className="font-medium text-white">{type}</p>
                          <p className="text-sm text-gray-400">
                            Start from BDT 100
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleGetStarted}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Invest Now
                      </button>
                    </div>
                  ))}
                </div>

                {/* Live Portfolio Preview - Bangla */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white font-medium">
                      Live portfolio growth
                    </p>
                    <span className="text-green-400 text-sm flex items-center">
                      <FiTrendingUp className="mr-1" /> +12.4%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>January 2023</span>
                    <span>December 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why choose <span className="text-green-400">Bangla Invest</span>?
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              We make investing simple, accessible and rewarding for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div
                  className={`h-12 w-12 rounded-lg bg-gradient-to-r ${benefit.color} flex items-center justify-center text-white mb-4`}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {benefit.title}
                </h3>
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
                Featured <span className="text-green-400">Investments</span>
              </h2>
              <p className="text-gray-400">
                Hand-picked opportunities with strong growth potential
              </p>
            </div>
            <Link
              to="/investments"
              className="px-5 py-2.5 border border-green-500 text-green-400 rounded-lg hover:bg-green-500/10 transition-colors text-sm"
            >
              View all investments
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
              Start investing in{" "}
              <span className="text-green-400">3 easy steps</span>
            </h2>
            <p className="text-gray-400">Get started in minutes, not days</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400"></div>

            {[
              {
                step: "1",
                title: "Sign up & Verify",
                desc: "Create your account in 2 minutes with KYC verification",
              },
              {
                step: "2",
                title: "Add Funds",
                desc: "Deposit securely via UPI, net-banking, or card",
              },
              {
                step: "3",
                title: "Start Investing",
                desc: "Choose a curated portfolio or pick individual investments",
              },
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleGetStarted}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
            >
              Start your journey today
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials - Bangla */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              What our <span className="text-green-400">investors</span> say
            </h2>
            <p className="text-gray-400">
              Join thousands of successful investors
            </p>
          </div>

          <div className="relative h-72">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 max-w-2xl mx-auto">
                  <div className="flex items-start mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                      <div className="mt-1 px-2 py-0.5 bg-green-400/10 text-green-400 rounded-full text-xs inline-block">
                        Returns: {testimonial.returns}
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
                      ? "w-6 bg-green-400"
                      : "w-1.5 bg-gray-700 hover:bg-gray-600"
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
            Ready to start your{" "}
            <span className="text-green-400">investment journey</span>?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join {stats.totalUsers.toLocaleString()} investors who trust us with
            their financial growth. No hidden fees, no minimum balance — just
            smart investing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
            >
              Start Investing
            </button>
            <button
              onClick={handleLearnMore}
              className="px-6 py-3 border-2 border-gray-300 text-white rounded-lg font-bold hover:bg-white/10 transition-all duration-300"
            >
              Learn how it works
            </button>
          </div>
          <div className="mt-6 text-gray-400 text-sm">
            <p className="flex items-center justify-center">
              <FiCheck className="mr-2 text-green-400" />
              No credit card required • Registration is completely free • Cancel
              anytime
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
              <span className="text-gray-400 text-sm">
                Investment solutions for Bangladesh
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <FiUsers className="text-gray-500" />
              <span className="text-gray-400 text-sm">
                {stats.totalUsers.toLocaleString()} investors
              </span>
            </div>

            <div className="text-gray-400 text-sm">
              100% secure & registered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
