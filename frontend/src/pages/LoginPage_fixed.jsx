import { useState, useEffect } from 'react';
import { Phone, Shield, Users, Eye as EyeIcon, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import axios from 'axios';
import React from 'react';

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

// Normalize Iraq phone number
function normalizeIraqPhone(phone) {
  if (!phone) return null;
  
  let cleaned = phone.replace(/[\s-]/g, '');
  
  if (cleaned.startsWith('0')) {
    cleaned = '+964' + cleaned.substring(1);
  } else if (cleaned.startsWith('00964')) {
    cleaned = '+964' + cleaned.substring(5);
  } else if (cleaned.startsWith('964')) {
    cleaned = '+' + cleaned;
  } else if (!cleaned.startsWith('+964')) {
    return null;
  }
  
  return cleaned;
}

// Validate Iraq phone number
function isValidIraqPhone(phone) {
  const normalized = normalizeIraqPhone(phone);
  if (!normalized) return false;
  const phoneRegex = /^\+964[0-9]{9,10}$/;
  return phoneRegex.test(normalized);
}

export function LoginPage({ onLogin }) {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [selectedRole, setSelectedRole] = useState('super-admin');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState('');

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneError('');
    setError('');
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setPhoneError('');

    if (!phone) {
      setPhoneError('Phone number is required');
      return;
    }

    if (!isValidIraqPhone(phone)) {
      setPhoneError('Only Iraq numbers allowed');
      return;
    }

    setLoading(true);
    try {
      const normalizedPhone = normalizeIraqPhone(phone);
      const response = await axios.post(`${BASE_URL}/api/auth/send-otp`, {
        phone: normalizedPhone
      });

      if (response.data.success) {
        setOtpSent(true);
        setResendCooldown(30);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    setLoading(true);
    setError('');
    try {
      const normalizedPhone = normalizeIraqPhone(phone);
      const response = await axios.post(`${BASE_URL}/api/auth/send-otp`, {
        phone: normalizedPhone
      });

      if (response.data.success) {
        setResendCooldown(30);
        setOtp('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const normalizedPhone = normalizeIraqPhone(phone);
      const response = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
        phone: normalizedPhone,
        otp: otp
      });

      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4"
  }, React.createElement("div", {
    className: "w-full max-w-md"
  }, React.createElement("div", {
    className: "text-center mb-8"
  }, React.createElement("div", {
    className: "inline-flex w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4"
  }, React.createElement("span", {
    className: "text-white text-2xl"
  }, "BM")), React.createElement("h1", {
    className: "text-gray-900 dark:text-white mb-2"
  }, "BidMaster Admin Panel"), React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Secure authentication portal")), React.createElement(Card, {
    className: "shadow-xl"
  }, React.createElement(CardHeader, null, React.createElement(CardTitle, null, "Admin Login"), React.createElement(CardDescription, null, "Enter your credentials to access the admin panel")), React.createElement(CardContent, null, React.createElement("form", {
    onSubmit: otpSent ? handleVerifyOTP : handleSendOTP,
    className: "space-y-4"
  }, React.createElement("div", {
    className: "space-y-2"
  }, React.createElement(Label, {
    htmlFor: "phone"
  }, "Phone Number"), React.createElement("div", {
    className: "relative"
  }, React.createElement(Phone, {
    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
  }), React.createElement(Input, {
    id: "phone",
    type: "tel",
    placeholder: "+96477xxxxxxxx",
    className: "pl-10",
    value: phone,
    onChange: handlePhoneChange,
    required: true,
    disabled: otpSent || loading
  })), phoneError && React.createElement("p", {
    className: "text-sm text-red-600 dark:text-red-400"
  }, phoneError)), !otpSent ? React.createElement(React.Fragment, null, React.createElement("div", {
    className: "space-y-2"
  }, React.createElement(Label, null, "Select Role"), React.createElement("div", {
    className: "grid grid-cols-1 gap-2"
  }, React.createElement("button", {
    type: "button",
    onClick: () => setSelectedRole('super-admin'),
    className: `p-3 rounded-lg border-2 transition-all text-left ${selectedRole === 'super-admin' ? 'border-blue-600 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-800 hover:border-blue-300'`
  }, React.createElement("div", {
    className: "flex items-center gap-3"
  }, React.createElement("div", {
    className: `w-8 h-8 rounded-lg flex items-center justify-center ${selectedRole === 'super-admin' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`
  }, React.createElement(Shield, {
    className: `h-4 w-4 ${selectedRole === 'super-admin' ? 'text-white' : 'text-gray-600'}`
  })), React.createElement("div", {
    className: "flex-1"
  }, React.createElement("p", {
    className: "text-sm"
  }, "Super Admin"), React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Full access to all features")), selectedRole === 'super-admin' && React.createElement("div", {
    className: "w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"
  }, React.createElement("div", {
    className: "w-2 h-2 bg-white rounded-full"
  })))), React.createElement("button", {
    type: "button",
    onClick: () => setSelectedRole('moderator'),
    className: `p-3 rounded-lg border-2 transition-all text-left ${selectedRole === 'moderator' ? 'border-purple-600 bg-purple-50 dark:bg-purple-950' : 'border-gray-200 dark:border-gray-800 hover:border-purple-300'}`
  }, React.createElement("div", {
    className: "flex items-center gap-3"
  }, React.createElement("div", {
    className: `w-8 h-8 rounded-lg flex items-center justify-center ${selectedRole === 'moderator' ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'}`
  }, React.createElement(Users, {
    className: `h-4 w-4 ${selectedRole === 'moderator' ? 'text-white' : 'text-gray-600'}`
  })), React.createElement("div", {
    className: "flex-1"
  }, React.createElement("p", {
    className: "text-sm"
  }, "Moderator"), React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Manage users, products & orders")), selectedRole === 'moderator' && React.createElement("div", {
    className: "w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center"
  }, React.createElement("div", {
    className: "w-2 h-2 bg-white rounded-full"
  })))), React.createElement("button", {
    type: "button",
    onClick: () => setSelectedRole('viewer'),
    className: `p-3 rounded-lg border-2 transition-all text-left ${selectedRole === 'viewer' ? 'border-green-600 bg-green-50 dark:bg-green-950' : 'border-gray-200 dark:border-gray-800 hover:border-green-300'}`
  }, React.createElement("div", {
    className: "flex items-center gap-3"
  }, React.createElement("div", {
    className: `w-8 h-8 rounded-lg flex items-center justify-center ${selectedRole === 'viewer' ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}`
  }, React.createElement(EyeIcon, {
    className: `h-4 w-4 ${selectedRole === 'viewer' ? 'text-white' : 'text-gray-600'}`
  })), React.createElement("div", {
    className: "flex-1"
  }, React.createElement("p", {
    className: "text-sm"
  }, "Viewer"), React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Read-only access to analytics")), selectedRole === 'viewer' && React.createElement("div", {
    className: "w-5 h-5 bg-green-600 rounded-full flex items-center justify-center"
  }, React.createElement("div", {
    className: "w-2 h-2 bg-white rounded-full"
  })))))), React.createElement("div", {
    className: "flex items-center justify-between"
  }, React.createElement("div", {
    className: "flex items-center gap-2"
  }, React.createElement(Checkbox, {
    id: "remember"
  }), React.createElement(Label, {
    htmlFor: "remember",
    className: "text-sm cursor-pointer"
  }, "Remember me")), React.createElement("a", {
    href: "#",
    className: "text-sm text-blue-600 hover:underline"
  }, "Forgot password?")), React.createElement("div", {
    className: "flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg"
  }, React.createElement(Lock, {
    className: "h-4 w-4 text-green-600"
  }), React.createElement("span", {
    className: "text-xs text-green-700 dark:text-green-400"
  }, "Secured with JWT Authentication & HTTPS")), React.createElement(Button, {
    type: "submit",
    className: "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
    disabled: loading
  }, loading ? "Sending..." : "Send OTP"))) : React.createElement(React.Fragment, null, React.createElement("div", {
    className: "space-y-2"
  }, React.createElement(Label, {
    htmlFor: "otp"
  }, "Enter OTP"), React.createElement(Input, {
    id: "otp",
    type: "text",
    placeholder: "123456",
    className: "text-center text-lg tracking-widest",
    value: otp,
    onChange: (e) => {
      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
      setOtp(value);
      setError('');
    },
    maxLength: 6,
    required: true,
    disabled: loading
  }), React.createElement("p", {
    className: "text-xs text-gray-500 dark:text-gray-400 text-center"
  }, "Mock OTP = 123456 (Development Only)")), React.createElement("div", {
    className: "flex items-center justify-between"
  }, React.createElement("button", {
    type: "button",
    onClick: handleResendOTP,
    disabled: resendCooldown > 0 || loading,
    className: `text-sm ${resendCooldown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'}`
  }, resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"), React.createElement("button", {
    type: "button",
    onClick: () => {
      setOtpSent(false);
      setOtp('');
      setError('');
    },
    className: "text-sm text-blue-600 hover:underline"
  }, "Change Phone")), error && React.createElement("div", {
    className: "p-3 bg-red-50 dark:bg-red-950 rounded-lg"
  }, React.createElement("p", {
    className: "text-sm text-red-600 dark:text-red-400"
  }, error)), React.createElement(Button, {
    type: "submit",
    className: "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
    disabled: loading
  }, loading ? "Verifying..." : "Verify OTP"))), React.createElement("div", {
    className: "mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg"
  }, React.createElement("p", {
    className: "text-xs text-blue-700 dark:text-blue-400"
  }, "💡 Two-factor authentication available in Settings")))), React.createElement("p", {
    className: "text-center text-xs text-gray-500 mt-6"
  }, "Protected by BidMaster Security © 2025")));
}

