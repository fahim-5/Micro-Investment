import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiArrowRight,
  FiArrowLeft,
  FiCalendar,
  FiCreditCard,
} from "react-icons/fi";
import { MdOutlineBadge, MdAccountBalance } from "react-icons/md";
import RegisterStep1 from "../../components/forms/RegisterStep1";
import RegisterStep2 from "../../components/forms/RegisterStep2";
import guideImg from "../../assets/images/banner/RegistationGuide.jpeg";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if we're coming from step 1
  const initialStep = location.state?.step || 1;
  const step1Data = location.state?.step1Data || {};

  const [step, setStep] = useState(initialStep);
  const [role, setRole] = useState(step1Data.role || "Investor");
  const [formData, setFormData] = useState({
    // Step 1 data
    name: step1Data.name || "",
    mobile: step1Data.mobile || "",
    email: step1Data.email || "",

    // Step 2 data
    accountType: "",
    dob: "",
    nid: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGuide, setShowGuide] = useState(() => {
    try {
      return !localStorage.getItem("registrationGuideAccepted");
    } catch (e) {
      return true;
    }
  });

  // Always show the guide when the Register page mounts so users see required docs
  useEffect(() => {
    setShowGuide(true);
  }, []);

  const acceptGuide = () => {
    try {
      localStorage.setItem("registrationGuideAccepted", "true");
    } catch (e) {}
    setShowGuide(false);
  };

  // Calculate progress percentage
  const progressPercentage = step === 1 ? 12 : 25;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format mobile number as user types (Step 1)
    if (name === "mobile") {
      const phone = value.replace(/\D/g, "");
      if (phone.length <= 3) {
        setFormData((prev) => ({ ...prev, [name]: phone }));
      } else if (phone.length <= 7) {
        setFormData((prev) => ({
          ...prev,
          [name]: `${phone.slice(0, 4)}-${phone.slice(4)}`,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: `${phone.slice(0, 4)}-${phone.slice(4, 8)}-${phone.slice(8, 11)}`,
        }));
      }
    } else if (name === "nid") {
      // Only allow numbers for NID
      const nidValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: nidValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else {
      const cleanMobile = formData.mobile.replace(/\D/g, "");
      if (!/^01[3-9]\d{8}$/.test(cleanMobile)) {
        newErrors.mobile = "Enter a valid 11-digit mobile number (01XXXXXXXXX)";
      }
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.accountType) {
      newErrors.accountType = "Please select an account type";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      if (age < 18) {
        newErrors.dob = "You must be at least 18 years old";
      }
    }

    if (!formData.nid) {
      newErrors.nid = "NID number is required";
    } else if (!/^(\d{10}|\d{17})$/.test(formData.nid)) {
      newErrors.nid = "Enter a 10 or 17 digit NID number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!validateStep1()) return;

      // Clean mobile number before proceeding
      const cleanMobile = formData.mobile.replace(/\D/g, "");
      const step1Data = {
        role,
        name: formData.name,
        mobile: cleanMobile,
        email: formData.email,
      };

      // Navigate to step 2 with state
      navigate("/register", {
        state: {
          step: 2,
          step1Data: step1Data,
        },
        replace: true,
      });
      setStep(2);
    } else if (step === 2) {
      if (!validateStep2()) return;

      // Here you would typically submit to backend
      console.log("Registration data:", {
        ...formData,
        mobile: formData.mobile.replace(/\D/g, ""),
      });

      // Navigate to OTP verification or next step
      navigate("/verify-otp", {
        state: {
          mobile: formData.mobile.replace(/\D/g, ""),
          email: formData.email,
        },
      });
    }
  };

  const handleBackStep = () => {
    if (step === 2) {
      navigate("/register", {
        state: {
          step: 1,
          step1Data: {
            role,
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email,
          },
        },
        replace: true,
      });
      setStep(1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 flex items-center justify-center p-4 font-sans">
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl flex overflow-hidden shadow-2xl">
            <div className="hidden md:block md:w-1/2">
              <img
                src={guideImg}
                alt="Registration guide"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-10">
              <div className="flex justify-end">
                <button
                  onClick={acceptGuide}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Please keep the soft copy of the following documents ready:
              </h3>
              <ul className="space-y-3 text-gray-700 mb-6 list-inside">
                <li>• Applicant's and Nominee's National ID Card</li>
                <li>
                  • Colour Photos and Signatures of the Applicant(s) and
                  Nominee(s)
                </li>
                <li>• Blank Cheque / Bank Statement of the Applicant</li>
                <li>• Applicant's E-TIN Certificate (if any)</li>
                <li>
                  • Soft copy of the Applicant's Signature, BO Setup
                  Acknowledgement
                </li>
              </ul>
              <p className="text-xs text-gray-500 mb-6">
                Note: Mutual fund units will not be credited to your BO account
                unless BO Account Number is provided. For any query, please
                contact 09678666888
              </p>
              <div className="flex justify-end">
                <button
                  onClick={acceptGuide}
                  className="px-6 py-2 rounded-full bg-gray-800 text-white font-medium hover:bg-gray-900"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Bangladeshi Pattern Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full mix-blend-multiply"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-500 rounded-full mix-blend-multiply"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-500 rounded-lg rotate-45"></div>
      </div>

      <div className="w-full max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">₹</span>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {step === 1
              ? "Create a new account"
              : "Provide personal information"}
          </h1>
          <p className="text-gray-700 text-lg">
            {step === 1
              ? "Step 1: Basic information"
              : "Step 2: Additional information"}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{progressPercentage}% complete</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Card Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {step === 1
                    ? "New Investor Registration"
                    : "Personal Information Form"}
                </h2>
                <p className="text-green-100 mt-1">
                  {step === 1
                    ? "Step 1: Provide basic information"
                    : "Step 2: Provide additional information"}
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-green-800/50 px-4 py-2 rounded-full">
                <span className="text-green-100 font-medium">
                  Step {step}/2
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {step === 1 ? (
            <RegisterStep1
              role={role}
              setRole={setRole}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
            />
          ) : (
            <RegisterStep2
              formData={formData}
              errors={errors}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          )}

          {/* Action Buttons */}
          <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBackStep}
                className="px-8 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-all duration-200 flex items-center"
              >
                <FiArrowLeft className="mr-2" />
                {step === 1 ? "Cancel" : "Previous Step"}
              </button>

              <div className="flex space-x-4">
                {step === 2 && (
                  <button
                    type="button"
                    className="px-8 py-3 rounded-lg bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-all duration-200 border border-blue-300"
                  >
                    Save Draft
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-bold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      {step === 1 ? "Next Step" : "Verify OTP"}
                      <FiArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">ℹ️</span>
              </div>
              <p className="text-xs text-gray-600 text-center">
                {step === 1
                  ? "You will be asked for additional information in the next step"
                  : "After OTP verification you will get access to your account"}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center text-green-700 hover:text-green-900 transition-colors text-sm font-medium"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to login page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
