import React from "react";
import { FiUser, FiPhone, FiMail } from "react-icons/fi";
import { MdOutlineBadge } from "react-icons/md";

const RegisterStep1 = ({ role, setRole, formData, errors, handleChange }) => {
  return (
    <div className="md:flex">
      {/* Left Info Panel - Bangla Version */}
      <div className="md:w-2/5 bg-gradient-to-b from-green-50 to-cyan-50 p-8 border-r border-gray-200">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <MdOutlineBadge className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">
              Required Documents
            </h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-gray-700">
                Applicant's and nominee's National ID Card
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-gray-700">
                Colour photos and signatures of the applicant(s) and nominee(s)
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-gray-700">
                Blank cheque or bank statement
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-gray-700">BO Account number</span>
            </li>
          </ul>
        </div>

        <div className="p-4 bg-white rounded-lg border border-green-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-red-600">Note:</span> Mutual
            fund units will not be credited if a BO account number is not
            provided.
          </p>
        </div>
      </div>

      {/* Right Form Panel - Step 1 */}
      <div className="md:w-3/5 p-8">
        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Select account type
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setRole("Investor")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                role === "Investor"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Investor
            </button>
            <button
              type="button"
              onClick={() => setRole("RM")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                role === "RM"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              RM
            </button>
          </div>
        </div>

        {/* Form - Step 1 */}
        <div className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Full name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-green-600" size={18} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3.5 bg-gray-50 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-red-600 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Mobile number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-green-600" size={18} />
              </div>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3.5 bg-gray-50 border ${errors.mobile ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
                placeholder="01XXX-XXX-XXXX"
                maxLength={13}
              />
            </div>
            {errors.mobile && (
              <p className="mt-1 text-red-600 text-sm">{errors.mobile}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              11-digit Bangladeshi mobile number
            </p>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-green-600" size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3.5 bg-gray-50 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep1;
