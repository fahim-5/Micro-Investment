import React from "react";
import { FiUser, FiPhone, FiMail } from "react-icons/fi";
import GuideImg from "../../assets/images/banner/RegistationGuide.jpeg";

// Reusable input field component
const FormField = ({ icon: Icon, label, name, value, error, onChange, placeholder, type = "text", helperText, maxLength }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-800 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="text-green-600" size={18} />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-full text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
        placeholder={placeholder}
      />
    </div>
    {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
    {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
  </div>
);

// Reusable role button component
const RoleButton = ({ role, currentRole, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
      role === currentRole
        ? "bg-green-600 text-white shadow-md"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {children}
  </button>
);

const RegisterStep1 = ({
  role,
  setRole,
  formData,
  errors,
  handleChange,
  onSendOtp,
}) => {
  const fields = [
    {
      icon: FiUser,
      label: "Full name",
      name: "name",
      value: formData.name,
      error: errors.name,
      placeholder: "Full Name",
      type: "text",
    },
    {
      icon: FiPhone,
      label: "Mobile number",
      name: "mobile",
      value: formData.mobile,
      error: errors.mobile,
      placeholder: "01XXXXXXXXX",
      type: "text",
      helperText: "11-digit Bangladeshi mobile number",
      maxLength: 13,
    },
    {
      icon: FiMail,
      label: "Email address",
      name: "email",
      value: formData.email,
      error: errors.email,
      placeholder: "Enter Your Email Address",
      type: "email",
    },
  ];

  return (
    <div className="md:flex bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Left Panel - Guide Image */}
      <div className="md:w-2/5 w-full md:h-auto border-r border-gray-200 bg-gradient-to-b from-green-50 to-cyan-50">
        <div className="w-full h-80 md:h-full">
          <img
            src={GuideImg}
            alt="Registration Guide"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="md:w-3/5 p-8 bg-white">
        <h2 className="text-2xl text-green-600 text-center font-semibold mb-6">
          New Investor
        </h2>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Select account type
          </label>
          <div className="flex space-x-4">
            <RoleButton role="Investor" currentRole={role} onClick={() => setRole("Investor")}>
              Investor
            </RoleButton>
            <RoleButton role="RM" currentRole={role} onClick={() => setRole("RM")}>
              RM
            </RoleButton>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {fields.map((field) => (
            <FormField key={field.name} {...field} onChange={handleChange} />
          ))}

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => console.log("Cancel clicked")}
              className="px-5 py-2.5 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => onSendOtp?.()}
              className="px-6 py-2.5 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              Send OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep1;