import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiMail,
  FiLock,
  FiPhone,
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { MdPhoneIphone } from "react-icons/md";

const Login = () => {
  const [formData, setFormData] = useState({
    mobileOrEmail: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isMobileInput, setIsMobileInput] = useState(true); // Default to mobile for BD
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    const phone = value.replace(/\D/g, "");
    if (phone.length <= 3) return phone;
    if (phone.length <= 7) return `${phone.slice(0, 4)}-${phone.slice(4)}`;
    return `${phone.slice(0, 4)}-${phone.slice(4, 8)}-${phone.slice(8, 11)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileOrEmail") {
      // Check if input looks like mobile number (starts with 01)
      const cleanValue = value.replace(/\D/g, "");
      if (cleanValue.startsWith("01") || /^\d+$/.test(cleanValue)) {
        setIsMobileInput(true);
        const formattedValue = formatPhoneNumber(cleanValue);
        setFormData((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));
      } else {
        setIsMobileInput(false);
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Mobile/Email validation for Bangladesh
    if (!formData.mobileOrEmail) {
      newErrors.mobileOrEmail = "Mobile number or email is required";
    } else if (isMobileInput) {
      const cleanPhone = formData.mobileOrEmail.replace(/\D/g, "");
      if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
        newErrors.mobileOrEmail =
          "Please enter a valid Bangladeshi mobile number (11 digits starting with 01)";
      }
    } else if (!/\S+@\S+\.\S+/.test(formData.mobileOrEmail)) {
      newErrors.mobileOrEmail = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Clean phone number by removing dashes
      const cleanMobileOrEmail = isMobileInput
        ? formData.mobileOrEmail.replace(/\D/g, "")
        : formData.mobileOrEmail;

      const credentials = {
        [isMobileInput ? "mobile" : "email"]: cleanMobileOrEmail,
        password: formData.password,
      };

      const result = await login(credentials);

      if (result.success) {
        // Navigate to dashboard
        const from = location.state?.from || "/dashboard";
        navigate(from, { replace: true });
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: "Sorry, an error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 flex items-center justify-center p-4 font-sans">
      {/* Bangladeshi Pattern Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full mix-blend-multiply"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-500 rounded-full mix-blend-multiply"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-500 rounded-lg rotate-45"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Header with Bangladeshi Flag Colors */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
        </div>

        {/* Login Card - Clean Bangladeshi Style */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Card Header with Gradient */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
            <h2 className="text-2xl font-bold text-white text-center">Login</h2>
            <p className="text-green-100 text-center mt-1">
              Sign in with your mobile or email
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Mobile/Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Mobile number or email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {isMobileInput ? (
                      <MdPhoneIphone className="text-green-600" size={20} />
                    ) : (
                      <FiMail className="text-green-600" size={18} />
                    )}
                  </div>
                  <input
                    type="text"
                    name="mobileOrEmail"
                    value={formData.mobileOrEmail}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3.5 bg-gray-50 border ${errors.mobileOrEmail ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
                    placeholder={
                      isMobileInput ? "01XXX-XXXXXX" : "you@example.com"
                    }
                    disabled={isLoading}
                    maxLength={isMobileInput ? 13 : undefined} // For formatted phone: 01XX-XXX-XXXX
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <div>
                    {errors.mobileOrEmail && (
                      <p className="text-red-600 text-sm">
                        {errors.mobileOrEmail}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileInput(!isMobileInput);
                      setFormData((prev) => ({ ...prev, mobileOrEmail: "" }));
                    }}
                    className="text-sm text-green-700 hover:text-green-900 font-medium transition-colors"
                  >
                    {isMobileInput ? "Use email" : "Use mobile"}
                  </button>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-800">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-green-600" size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3.5 bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-red-600 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Remember Me - Bangladeshi Style */}
              <div className="flex items-center">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="w-5 h-5 rounded border-2 border-green-600 text-green-600 focus:ring-green-500 focus:ring-offset-0"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 text-gray-700 text-sm font-medium cursor-pointer select-none"
                  >
                    Remember me for 30 days
                  </label>
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm text-center">
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
              >
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></span>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <FiArrowRight className="ml-3" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                Want to create a new account?
              </p>
              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full py-3 bg-white border-2 border-green-600 text-green-700 font-bold rounded-lg hover:bg-green-50 hover:border-green-700 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Create new account
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">🔒</span>
              </div>
              <p className="text-xs text-gray-600 text-center">
                Your information is protected with 256-bit encryption
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 flex justify-center space-x-6">
          <Link
            to="/terms"
            className="text-sm text-gray-600 hover:text-green-700 transition-colors"
          >
            Terms
          </Link>
          <Link
            to="/privacy"
            className="text-sm text-gray-600 hover:text-green-700 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/help"
            className="text-sm text-gray-600 hover:text-green-700 transition-colors"
          >
            Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
