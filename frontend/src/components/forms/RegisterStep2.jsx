import React from "react";
import { FiCalendar, FiCreditCard } from "react-icons/fi";
import { MdAccountBalance } from "react-icons/md";

const RegisterStep2 = ({ formData, errors, setFormData, handleChange }) => {
  return (
    <div className="md:flex">
      {/* Left Steps Panel */}
      <div className="md:w-1/4 bg-gradient-to-b from-green-50 to-cyan-50 p-6 border-r border-gray-200">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Steps</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium text-green-700">
                Basic Information
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">2</span>
              </div>
              <span className="font-medium text-gray-900">
                Personal Information
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs">3</span>
              </div>
              <span className="text-gray-600">Joint Applicant Information</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs">4</span>
              </div>
              <span className="text-gray-600">Bank Information</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs">5</span>
              </div>
              <span className="text-gray-600">Nominee Information</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs">6</span>
              </div>
              <span className="text-gray-600">Document Upload</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs">7</span>
              </div>
              <span className="text-gray-600">Submit Application</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs">8</span>
              </div>
              <span className="text-gray-600">Investment & Payment</span>
            </li>
          </ul>
        </div>

        <div className="p-4 bg-white rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <MdAccountBalance className="text-green-600" />
            <h4 className="font-medium text-gray-800">Note</h4>
          </div>
          <p className="text-xs text-gray-600">
            If you have a 13-digit NID, prepend your birth year to convert it to
            a 17-digit NID.
          </p>
        </div>
      </div>

      {/* Right Form Panel - Step 2 */}
      <div className="md:w-3/4 p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Your Personal Information
        </h2>
        <p className="text-gray-600 mb-6">Provide additional information</p>

        <div className="space-y-6">
          {/* Account Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Account Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    accountType: "Individual",
                  }))
                }
                className={`p-4 rounded-lg border-2 ${
                  formData.accountType === "Individual"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-300 bg-gray-50 text-gray-700 hover:border-green-400"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      formData.accountType === "Individual"
                        ? "border-green-600 bg-green-600"
                        : "border-gray-400"
                    }`}
                  >
                    {formData.accountType === "Individual" && (
                      <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
                    )}
                  </div>
                  <span className="font-medium">Individual (Personal)</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, accountType: "Joint" }))
                }
                className={`p-4 rounded-lg border-2 ${
                  formData.accountType === "Joint"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-300 bg-gray-50 text-gray-700 hover:border-green-400"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      formData.accountType === "Joint"
                        ? "border-green-600 bg-green-600"
                        : "border-gray-400"
                    }`}
                  >
                    {formData.accountType === "Joint" && (
                      <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
                    )}
                  </div>
                  <span className="font-medium">Joint (Two Persons)</span>
                </div>
              </button>
            </div>
            {errors.accountType && (
              <p className="mt-2 text-red-600 text-sm">{errors.accountType}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="text-green-600" size={18} />
              </div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3.5 bg-gray-50 border ${errors.dob ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
              />
            </div>
            {errors.dob && (
              <p className="mt-2 text-red-600 text-sm">{errors.dob}</p>
            )}
          </div>

          {/* NID */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              National ID (NID) Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCreditCard className="text-green-600" size={18} />
              </div>
              <input
                type="text"
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3.5 bg-gray-50 border ${errors.nid ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
                placeholder="10 or 17 digit NID number"
                maxLength={17}
              />
            </div>
            {errors.nid && (
              <p className="mt-2 text-red-600 text-sm">{errors.nid}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Only 10 or 17 digit NID numbers are accepted. If you have a
              13-digit NID, prepend your birth year to convert it to 17 digits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep2;
