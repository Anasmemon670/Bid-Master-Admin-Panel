import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Shield, Users, Eye as EyeIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import React from 'react';
export function LoginPage({
  onLogin
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('super-admin');
  const handleSubmit = e => {
    e.preventDefault();
    onLogin(selectedRole);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-2xl"
  }, "BM")), /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900 dark:text-white mb-2"
  }, "BidMaster Admin Panel"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Secure authentication portal")), /*#__PURE__*/React.createElement(Card, {
    className: "shadow-xl"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Admin Login"), /*#__PURE__*/React.createElement(CardDescription, null, "Enter your credentials to access the admin panel")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "email"
  }, "Email Address"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
  }), /*#__PURE__*/React.createElement(Input, {
    id: "email",
    type: "email",
    placeholder: "admin@bidmaster.com",
    className: "pl-10",
    value: email,
    onChange: e => setEmail(e.target.value),
    required: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "password"
  }, "Password"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Lock, {
    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
  }), /*#__PURE__*/React.createElement(Input, {
    id: "password",
    type: showPassword ? 'text' : 'password',
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    className: "pl-10 pr-10",
    value: password,
    onChange: e => setPassword(e.target.value),
    required: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowPassword(!showPassword),
    className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
  }, showPassword ? /*#__PURE__*/React.createElement(EyeOff, {
    className: "h-4 w-4"
  }) : /*#__PURE__*/React.createElement(Eye, {
    className: "h-4 w-4"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, null, "Select Role"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setSelectedRole('super-admin'),
    className: `p-3 rounded-lg border-2 transition-all text-left ${selectedRole === 'super-admin' ? 'border-blue-600 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-800 hover:border-blue-300'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-8 h-8 rounded-lg flex items-center justify-center ${selectedRole === 'super-admin' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`
  }, /*#__PURE__*/React.createElement(Shield, {
    className: `h-4 w-4 ${selectedRole === 'super-admin' ? 'text-white' : 'text-gray-600'}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "Super Admin"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Full access to all features")), selectedRole === 'super-admin' && /*#__PURE__*/React.createElement("div", {
    className: "w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2 h-2 bg-white rounded-full"
  })))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setSelectedRole('moderator'),
    className: `p-3 rounded-lg border-2 transition-all text-left ${selectedRole === 'moderator' ? 'border-purple-600 bg-purple-50 dark:bg-purple-950' : 'border-gray-200 dark:border-gray-800 hover:border-purple-300'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-8 h-8 rounded-lg flex items-center justify-center ${selectedRole === 'moderator' ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'}`
  }, /*#__PURE__*/React.createElement(Users, {
    className: `h-4 w-4 ${selectedRole === 'moderator' ? 'text-white' : 'text-gray-600'}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "Moderator"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Manage users, products & orders")), selectedRole === 'moderator' && /*#__PURE__*/React.createElement("div", {
    className: "w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2 h-2 bg-white rounded-full"
  })))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setSelectedRole('viewer'),
    className: `p-3 rounded-lg border-2 transition-all text-left ${selectedRole === 'viewer' ? 'border-green-600 bg-green-50 dark:bg-green-950' : 'border-gray-200 dark:border-gray-800 hover:border-green-300'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-8 h-8 rounded-lg flex items-center justify-center ${selectedRole === 'viewer' ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}`
  }, /*#__PURE__*/React.createElement(EyeIcon, {
    className: `h-4 w-4 ${selectedRole === 'viewer' ? 'text-white' : 'text-gray-600'}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "Viewer"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Read-only access to analytics")), selectedRole === 'viewer' && /*#__PURE__*/React.createElement("div", {
    className: "w-5 h-5 bg-green-600 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2 h-2 bg-white rounded-full"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: "remember"
  }), /*#__PURE__*/React.createElement(Label, {
    htmlFor: "remember",
    className: "text-sm cursor-pointer"
  }, "Remember me")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-sm text-blue-600 hover:underline"
  }, "Forgot password?")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg"
  }, /*#__PURE__*/React.createElement(Lock, {
    className: "h-4 w-4 text-green-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-green-700 dark:text-green-400"
  }, "Secured with JWT Authentication & HTTPS")), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    className: "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
  }, "Sign In")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-700 dark:text-blue-400"
  }, "\uD83D\uDCA1 Two-factor authentication available in Settings")))), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-xs text-gray-500 mt-6"
  }, "Protected by BidMaster Security \xA9 2025")));
}