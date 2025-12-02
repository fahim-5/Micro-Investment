import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Our Schemes", href: "/schemes" },
    { name: "Planning & Solutions", href: "/planning" },
    { name: "Service Centre", href: "/service" },
    { name: "MoneyIQ", href: "/moneyiq" },
  ];

  return (
    <nav className="bg-[#971447] text-white w-full shadow-md relative z-50">
      <div className="w-full flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-white rounded-sm"></div>
          <span className="text-xl font-semibold tracking-wide uppercase">
            Axis Mutual Fund
          </span>
        </div>

        {/* Desktop Links Row 1 */}
        <div className="hidden lg:flex space-x-6 text-sm font-medium opacity-90">
          <Link to="/distributor" className="hover:opacity-100">Distributor</Link>
          <Link to="/about" className="hover:opacity-100">About Us</Link>
          <Link to="/downloads" className="hover:opacity-100">Downloads</Link>
          <Link to="/contact" className="hover:opacity-100">Contact Us</Link>
          <Link to="/app" className="hover:opacity-100">Download App</Link>
          <Link to="/corporates" className="hover:opacity-100">Corporates</Link>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-4 text-sm font-medium">
          <div className="flex items-center space-x-2">
            <span className="opacity-90">8108622211</span>
          </div>
          <button className="bg-white text-[#971447] px-5 py-2 rounded-full font-semibold shadow-sm hover:bg-gray-100">
            New Investor
          </button>
          <button className="bg-white text-[#971447] px-5 py-2 rounded-full font-semibold shadow-sm hover:bg-gray-100">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Second Row Navigation */}
      <div className="bg-white text-gray-900 w-full hidden lg:flex items-center space-x-8 px-10 py-3 text-sm font-medium">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`hover:text-[#971447] transition-colors duration-200 ${
              location.pathname === item.href ? "text-[#971447] font-semibold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
        <span className="text-xs bg-[#f3e6ec] text-[#971447] px-3 py-1 rounded-full">
          By Invest IQ
        </span>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white text-gray-900 px-6 py-4 space-y-3 shadow-inner">
          <div className="space-y-2">
            <Link to="/distributor">Distributor</Link>
            <Link to="/about">About Us</Link>
            <Link to="/downloads">Downloads</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/app">Download App</Link>
            <Link to="/corporates">Corporates</Link>
          </div>

          <div className="pt-3 border-t space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 flex flex-col space-y-3">
            <button className="bg-[#971447] text-white rounded-full py-2 font-semibold">
              New Investor
            </button>
            <button className="bg-[#971447] text-white rounded-full py-2 font-semibold">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
