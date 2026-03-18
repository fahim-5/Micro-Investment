import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiArrowRight, 
  FiArrowLeft,
  FiCalendar,
  FiCreditCard
} from 'react-icons/fi';
import { MdOutlineBadge, MdAccountBalance } from 'react-icons/md';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we're coming from step 1
  const initialStep = location.state?.step || 1;
  const step1Data = location.state?.step1Data || {};

  const [step, setStep] = useState(initialStep);
  const [role, setRole] = useState(step1Data.role || 'Investor');
  const [formData, setFormData] = useState({
    // Step 1 data
    name: step1Data.name || '',
    mobile: step1Data.mobile || '',
    email: step1Data.email || '',
    
    // Step 2 data
    accountType: '',
    dob: '',
    nid: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate progress percentage
  const progressPercentage = step === 1 ? 12 : 25;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format mobile number as user types (Step 1)
    if (name === 'mobile') {
      const phone = value.replace(/\D/g, '');
      if (phone.length <= 3) {
        setFormData(prev => ({ ...prev, [name]: phone }));
      } else if (phone.length <= 7) {
        setFormData(prev => ({ ...prev, [name]: `${phone.slice(0, 4)}-${phone.slice(4)}` }));
      } else {
        setFormData(prev => ({ ...prev, [name]: `${phone.slice(0, 4)}-${phone.slice(4, 8)}-${phone.slice(8, 11)}` }));
      }
    } else if (name === 'nid') {
      // Only allow numbers for NID
      const nidValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: nidValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'নাম প্রয়োজন';
    }
    
    if (!formData.mobile) {
      newErrors.mobile = 'মোবাইল নম্বর প্রয়োজন';
    } else {
      const cleanMobile = formData.mobile.replace(/\D/g, '');
      if (!/^01[3-9]\d{8}$/.test(cleanMobile)) {
        newErrors.mobile = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (01XXXXXXXXX)';
      }
    }
    
    if (!formData.email) {
      newErrors.email = 'ইমেইল প্রয়োজন';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'সঠিক ইমেইল ঠিকানা দিন';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.accountType) {
      newErrors.accountType = 'অ্যাকাউন্ট টাইপ নির্বাচন করুন';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'জন্ম তারিখ প্রয়োজন';
    } else {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      if (age < 18) {
        newErrors.dob = 'আপনার বয়স কমপক্ষে ১৮ বছর হতে হবে';
      }
    }
    
    if (!formData.nid) {
      newErrors.nid = 'এনআইডি নম্বর প্রয়োজন';
    } else if (!/^(\d{10}|\d{17})$/.test(formData.nid)) {
      newErrors.nid = '১০ বা ১৭ ডিজিটের এনআইডি নম্বর দিন';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!validateStep1()) return;
      
      // Clean mobile number before proceeding
      const cleanMobile = formData.mobile.replace(/\D/g, '');
      const step1Data = {
        role,
        name: formData.name,
        mobile: cleanMobile,
        email: formData.email
      };
      
      // Navigate to step 2 with state
      navigate('/register', {
        state: {
          step: 2,
          step1Data: step1Data
        },
        replace: true
      });
      setStep(2);
    } else if (step === 2) {
      if (!validateStep2()) return;
      
      // Here you would typically submit to backend
      console.log('Registration data:', {
        ...formData,
        mobile: formData.mobile.replace(/\D/g, '')
      });
      
      // Navigate to OTP verification or next step
      navigate('/verify-otp', {
        state: {
          mobile: formData.mobile.replace(/\D/g, ''),
          email: formData.email
        }
      });
    }
  };

  const handleBackStep = () => {
    if (step === 2) {
      navigate('/register', {
        state: {
          step: 1,
          step1Data: {
            role,
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email
          }
        },
        replace: true
      });
      setStep(1);
    } else {
      navigate('/');
    }
  };

  const renderStep1 = () => (
    <div className="md:flex">
      {/* Left Info Panel - Bangla Version */}
      <div className="md:w-2/5 bg-gradient-to-b from-green-50 to-cyan-50 p-8 border-r border-gray-200">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <MdOutlineBadge className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">প্রয়োজনীয় নথিপত্র</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-gray-700">আবেদনকারী ও মনোনীত ব্যক্তির জাতীয় পরিচয়পত্র</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-gray-700">আবেদনকারী ও মনোনীত ব্যক্তির ছবি ও স্বাক্ষর</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-gray-700">ব্ল্যাংক চেক বা ব্যাংক স্টেটমেন্ট</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-gray-700">বিও অ্যাকাউন্ট নম্বর</span>
            </li>
          </ul>
        </div>
        
        <div className="p-4 bg-white rounded-lg border border-green-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-red-600">দ্রষ্টব্য:</span> মিউচুয়াল ফান্ড ইউনিট ক্রেডিট করা হবে না যদি BO অ্যাকাউন্ট নম্বর প্রদান না করা হয়।
          </p>
        </div>
      </div>

      {/* Right Form Panel - Step 1 */}
      <div className="md:w-3/5 p-8">
        {/* Role Selection - Bangla */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            অ্যাকাউন্ট টাইপ নির্বাচন করুন
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setRole('Investor')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${role === 'Investor' 
                ? 'bg-green-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              বিনিয়োগকারী
            </button>
            <button
              type="button"
              onClick={() => setRole('RM')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${role === 'RM' 
                ? 'bg-green-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
              পূর্ণ নাম <span className="text-red-500">*</span>
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
                className={`w-full pl-10 pr-4 py-3.5 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
                placeholder="আপনার পূর্ণ নাম লিখুন"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-red-600 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              মোবাইল নম্বর <span className="text-red-500">*</span>
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
                className={`w-full pl-10 pr-4 py-3.5 bg-gray-50 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
                placeholder="01XXX-XXX-XXXX"
                maxLength={13}
              />
            </div>
            {errors.mobile && (
              <p className="mt-1 text-red-600 text-sm">{errors.mobile}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর</p>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              ইমেইল ঠিকানা <span className="text-red-500">*</span>
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
                className={`w-full pl-10 pr-4 py-3.5 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
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

  const renderStep2 = () => (
    <div className="md:flex">
      {/* Left Steps Panel - Bangla Version */}
      <div className="md:w-1/4 bg-gradient-to-b from-green-50 to-cyan-50 p-6 border-r border-gray-200">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ধাপসমূহ</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium text-green-700">মৌলিক তথ্য</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">2</span>
              </div>
              <span className="font-medium text-gray-900">ব্যক্তিগত তথ্য</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs">3</span>
              </div>
              <span className="text-gray-600">যৌথ আবেদনকারীর তথ্য</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs">4</span>
              </div>
              <span className="text-gray-600">ব্যাংক তথ্য</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs">5</span>
              </div>
              <span className="text-gray-600">মনোনীত ব্যক্তির তথ্য</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs">6</span>
              </div>
              <span className="text-gray-600">নথি জমা</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs">7</span>
              </div>
              <span className="text-gray-600">আবেদন জমা</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs">8</span>
              </div>
              <span className="text-gray-600">বিনিয়োগ ও পেমেন্ট</span>
            </li>
          </ul>
        </div>
        
        <div className="p-4 bg-white rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <MdAccountBalance className="text-green-600" />
            <h4 className="font-medium text-gray-800">দ্রষ্টব্য</h4>
          </div>
          <p className="text-xs text-gray-600">
            আপনি যদি ১৩ ডিজিটের এনআইডি নম্বর ব্যবহার করেন তবে সামনে জন্ম সাল যোগ করে ১৭ ডিজিট করুন।
          </p>
        </div>
      </div>

      {/* Right Form Panel - Step 2 */}
      <div className="md:w-3/4 p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          আপনার ব্যক্তিগত তথ্য
        </h2>
        <p className="text-gray-600 mb-6">অতিরিক্ত তথ্য প্রদান করুন</p>

        <div className="space-y-6">
          {/* Account Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              অ্যাকাউন্ট টাইপ <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, accountType: 'Individual' }))}
                className={`p-4 rounded-lg border-2 ${formData.accountType === 'Individual' 
                  ? 'border-green-600 bg-green-50 text-green-700' 
                  : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-green-400'}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 ${formData.accountType === 'Individual' 
                    ? 'border-green-600 bg-green-600' 
                    : 'border-gray-400'}`}>
                    {formData.accountType === 'Individual' && (
                      <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
                    )}
                  </div>
                  <span className="font-medium">একক (ব্যক্তিগত)</span>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, accountType: 'Joint' }))}
                className={`p-4 rounded-lg border-2 ${formData.accountType === 'Joint' 
                  ? 'border-green-600 bg-green-50 text-green-700' 
                  : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-green-400'}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 ${formData.accountType === 'Joint' 
                    ? 'border-green-600 bg-green-600' 
                    : 'border-gray-400'}`}>
                    {formData.accountType === 'Joint' && (
                      <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
                    )}
                  </div>
                  <span className="font-medium">যৌথ (দুইজন)</span>
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
              জন্ম তারিখ <span className="text-red-500">*</span>
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
                className={`w-full pl-10 pr-4 py-3.5 bg-gray-50 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
              />
            </div>
            {errors.dob && (
              <p className="mt-2 text-red-600 text-sm">{errors.dob}</p>
            )}
          </div>

          {/* NID */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              জাতীয় পরিচয়পত্র (এনআইডি) নম্বর <span className="text-red-500">*</span>
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
                className={`w-full pl-10 pr-4 py-3.5 bg-gray-50 border ${errors.nid ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/30 transition-all duration-200`}
                placeholder="১০ বা ১৭ ডিজিটের এনআইডি নম্বর"
                maxLength={17}
              />
            </div>
            {errors.nid && (
              <p className="mt-2 text-red-600 text-sm">{errors.nid}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              শুধুমাত্র ১০ বা ১৭ ডিজিটের এনআইডি নম্বর গ্রহণযোগ্য। আপনার যদি ১৩ ডিজিটের এনআইডি নম্বর থাকে তবে সামনে জন্ম সাল যোগ করে ১৭ ডিজিট করুন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 flex items-center justify-center p-4 font-sans">
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
            {step === 1 ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'ব্যক্তিগত তথ্য প্রদান করুন'}
          </h1>
          <p className="text-gray-700 text-lg">
            {step === 1 ? 'প্রথম ধাপ: মৌলিক তথ্য' : 'দ্বিতীয় ধাপ: অতিরিক্ত তথ্য'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>প্রগতি</span>
                <span>{progressPercentage}% সম্পন্ন</span>
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
                  {step === 1 ? 'নতুন বিনিয়োগকারী রেজিস্ট্রেশন' : 'ব্যক্তিগত তথ্য ফর্ম'}
                </h2>
                <p className="text-green-100 mt-1">
                  {step === 1 ? 'ধাপ ১: মৌলিক তথ্য প্রদান করুন' : 'ধাপ ২: অতিরিক্ত তথ্য প্রদান করুন'}
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-green-800/50 px-4 py-2 rounded-full">
                <span className="text-green-100 font-medium">
                  ধাপ {step}/২
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {step === 1 ? renderStep1() : renderStep2()}

          {/* Action Buttons */}
          <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBackStep}
                className="px-8 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-all duration-200 flex items-center"
              >
                <FiArrowLeft className="mr-2" />
                {step === 1 ? 'বাতিল করুন' : 'পূর্ববর্তী ধাপ'}
              </button>
              
              <div className="flex space-x-4">
                {step === 2 && (
                  <button
                    type="button"
                    className="px-8 py-3 rounded-lg bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-all duration-200 border border-blue-300"
                  >
                    খসড়া সংরক্ষণ
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
                      প্রক্রিয়াকরণ...
                    </>
                  ) : (
                    <>
                      {step === 1 ? 'পরবর্তী ধাপ' : 'ওটিপি যাচাই করুন'}
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
                  ? 'পরবর্তী ধাপে আপনাকে অতিরিক্ত তথ্য প্রদান করতে হবে' 
                  : 'ওটিপি যাচাইয়ের পর আপনি আপনার অ্যাকাউন্ট এক্সেস পাবেন'}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center text-green-700 hover:text-green-900 transition-colors text-sm font-medium"
          >
            <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            লগইন পেজে ফিরে যান
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;