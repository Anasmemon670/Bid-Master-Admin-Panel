import React from 'react';
import { useState } from 'react';
import { Settings, Shield, Mail, CreditCard, Palette, Database, Globe, Lock, Save, Users, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner@2.0.3';
export function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully!');
    }, 1000);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900 dark:text-white mb-1"
  }, "Settings"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Configure your admin panel and platform settings")), /*#__PURE__*/React.createElement(Button, {
    onClick: handleSave,
    disabled: isSaving,
    className: "bg-gradient-to-r from-blue-600 to-purple-600"
  }, /*#__PURE__*/React.createElement(Save, {
    className: "h-4 w-4 mr-2"
  }), isSaving ? 'Saving...' : 'Save Changes')), /*#__PURE__*/React.createElement(Tabs, {
    defaultValue: "general",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 h-auto"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "general",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Settings, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "General")), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "security",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Shield, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Security")), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "email",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Email")), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "payment",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(CreditCard, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Payment")), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "platform",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Globe, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Platform")), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "admins",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Admins")), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "appearance",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Palette, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Appearance")), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "system",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Database, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "System"))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "general",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "General Settings"), /*#__PURE__*/React.createElement(CardDescription, null, "Basic platform configuration")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "platform-name"
  }, "Platform Name"), /*#__PURE__*/React.createElement(Input, {
    id: "platform-name",
    defaultValue: "BidMaster Auction Platform"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "platform-tagline"
  }, "Tagline"), /*#__PURE__*/React.createElement(Input, {
    id: "platform-tagline",
    defaultValue: "Your trusted auction marketplace"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "timezone"
  }, "Timezone"), /*#__PURE__*/React.createElement(Select, {
    defaultValue: "utc"
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    id: "timezone"
  }, /*#__PURE__*/React.createElement(SelectValue, null)), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "utc"
  }, "UTC (GMT+0)"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "pkt"
  }, "PKT (GMT+5)"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "est"
  }, "EST (GMT-5)"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "pst"
  }, "PST (GMT-8)")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "language"
  }, "Default Language"), /*#__PURE__*/React.createElement(Select, {
    defaultValue: "en"
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    id: "language"
  }, /*#__PURE__*/React.createElement(SelectValue, null)), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "en"
  }, "English"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "ur"
  }, "\u0627\u0631\u062F\u0648 (Urdu)"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "ar"
  }, "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (Arabic)"))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "contact-email"
  }, "Contact Email"), /*#__PURE__*/React.createElement(Input, {
    id: "contact-email",
    type: "email",
    defaultValue: "support@bidmaster.com"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "support-phone"
  }, "Support Phone"), /*#__PURE__*/React.createElement(Input, {
    id: "support-phone",
    type: "tel",
    defaultValue: "+92 300 1234567"
  }))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "security",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Security Settings"), /*#__PURE__*/React.createElement(CardDescription, null, "Protect your platform and user data")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "Two-Factor Authentication (2FA)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Require 2FA for all admin accounts")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "session-timeout"
  }, "Session Timeout (minutes)"), /*#__PURE__*/React.createElement(Input, {
    id: "session-timeout",
    type: "number",
    defaultValue: "60"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Auto-logout inactive admins after specified time")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "password-min"
  }, "Minimum Password Length"), /*#__PURE__*/React.createElement(Input, {
    id: "password-min",
    type: "number",
    defaultValue: "8"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "Require Special Characters"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Passwords must include symbols")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "Login Attempt Limit"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Lock account after failed attempts")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "max-attempts"
  }, "Max Login Attempts"), /*#__PURE__*/React.createElement(Input, {
    id: "max-attempts",
    type: "number",
    defaultValue: "5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-blue-50 dark:bg-blue-950 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement(Lock, {
    className: "h-5 w-5 text-blue-600 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-blue-900 dark:text-blue-100"
  }, "SSL Certificate Status"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-1"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
  }, "Active"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-blue-700 dark:text-blue-400"
  }, "Expires: Dec 31, 2025")))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "email",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Email Configuration"), /*#__PURE__*/React.createElement(CardDescription, null, "SMTP settings and email notifications")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "smtp-host"
  }, "SMTP Host"), /*#__PURE__*/React.createElement(Input, {
    id: "smtp-host",
    defaultValue: "smtp.gmail.com"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "smtp-port"
  }, "SMTP Port"), /*#__PURE__*/React.createElement(Input, {
    id: "smtp-port",
    type: "number",
    defaultValue: "587"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "smtp-encryption"
  }, "Encryption"), /*#__PURE__*/React.createElement(Select, {
    defaultValue: "tls"
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    id: "smtp-encryption"
  }, /*#__PURE__*/React.createElement(SelectValue, null)), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "tls"
  }, "TLS"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "ssl"
  }, "SSL"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "none"
  }, "None"))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "smtp-username"
  }, "SMTP Username"), /*#__PURE__*/React.createElement(Input, {
    id: "smtp-username",
    type: "email",
    defaultValue: "noreply@bidmaster.com"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "smtp-password"
  }, "SMTP Password"), /*#__PURE__*/React.createElement(Input, {
    id: "smtp-password",
    type: "password",
    defaultValue: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  })), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm"
  }, "Email Notifications"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement(Label, null, "New User Registration"), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement(Label, null, "Product Approval Requests"), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement(Label, null, "High-Value Transactions"), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement(Label, null, "User Reports"), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement(Label, null, "Daily Summary Report"), /*#__PURE__*/React.createElement(Switch, null))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "h-4 w-4 mr-2"
  }), "Send Test Email")))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "payment",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Payment Configuration"), /*#__PURE__*/React.createElement(CardDescription, null, "Payment gateways and commission settings")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm"
  }, "Payment Gateways"), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border rounded-lg space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(CreditCard, {
    className: "h-5 w-5 text-blue-600"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "Stripe"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Credit/Debit Cards"))), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Stripe API Key",
    defaultValue: "sk_live_\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border rounded-lg space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(CreditCard, {
    className: "h-5 w-5 text-purple-600"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "PayPal"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "PayPal Account"))), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement(Input, {
    placeholder: "PayPal Client ID",
    defaultValue: "AZ\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border rounded-lg space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-green-100 dark:bg-green-950 rounded flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(DollarSign, {
    className: "h-5 w-5 text-green-600"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "JazzCash"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Mobile Wallet (Pakistan)"))), /*#__PURE__*/React.createElement(Switch, null)), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Merchant ID"
  }))), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm"
  }, "Commission & Fees"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "platform-commission"
  }, "Platform Commission (%)"), /*#__PURE__*/React.createElement(Input, {
    id: "platform-commission",
    type: "number",
    defaultValue: "5",
    step: "0.1"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Percentage charged on successful auctions")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "listing-fee"
  }, "Listing Fee ($)"), /*#__PURE__*/React.createElement(Input, {
    id: "listing-fee",
    type: "number",
    defaultValue: "2.99",
    step: "0.01"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "One-time fee for creating an auction")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "min-withdrawal"
  }, "Minimum Withdrawal Amount ($)"), /*#__PURE__*/React.createElement(Input, {
    id: "min-withdrawal",
    type: "number",
    defaultValue: "50"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "currency"
  }, "Default Currency"), /*#__PURE__*/React.createElement(Select, {
    defaultValue: "usd"
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    id: "currency"
  }, /*#__PURE__*/React.createElement(SelectValue, null)), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "usd"
  }, "USD ($)"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "pkr"
  }, "PKR (\u20A8)"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "eur"
  }, "EUR (\u20AC)"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "gbp"
  }, "GBP (\xA3)")))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "platform",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Platform Rules"), /*#__PURE__*/React.createElement(CardDescription, null, "Auction and bidding configuration")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "min-bid"
  }, "Minimum Bid Amount ($)"), /*#__PURE__*/React.createElement(Input, {
    id: "min-bid",
    type: "number",
    defaultValue: "1"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "bid-increment"
  }, "Bid Increment ($)"), /*#__PURE__*/React.createElement(Input, {
    id: "bid-increment",
    type: "number",
    defaultValue: "5"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Minimum amount each bid must increase")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "auction-duration"
  }, "Default Auction Duration (days)"), /*#__PURE__*/React.createElement(Input, {
    id: "auction-duration",
    type: "number",
    defaultValue: "7"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "max-duration"
  }, "Maximum Auction Duration (days)"), /*#__PURE__*/React.createElement(Input, {
    id: "max-duration",
    type: "number",
    defaultValue: "30"
  })), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "Auto-Extend Auctions"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Extend time if bid placed in last 5 minutes")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "Require Product Approval"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Admin must approve before listing")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "Allow Buy Now Option"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Sellers can set instant purchase price")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "Reserve Price"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Allow sellers to set minimum selling price")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "max-images"
  }, "Maximum Images per Product"), /*#__PURE__*/React.createElement(Input, {
    id: "max-images",
    type: "number",
    defaultValue: "8"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "max-file-size"
  }, "Maximum File Size (MB)"), /*#__PURE__*/React.createElement(Input, {
    id: "max-file-size",
    type: "number",
    defaultValue: "5"
  }))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "admins",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardTitle, null, "Admin Users"), /*#__PURE__*/React.createElement(CardDescription, null, "Manage admin access and roles")), /*#__PURE__*/React.createElement(Button, null, /*#__PURE__*/React.createElement(Users, {
    className: "h-4 w-4 mr-2"
  }), "Add Admin"))), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 border rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white"
  }, "SA"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "Super Admin"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "admin@bidmaster.com"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Badge, null, "Super Admin"), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
  }, "Active")))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white"
  }, "JD"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "John Doe"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "john.doe@bidmaster.com"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary"
  }, "Moderator"), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
  }, "Active"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Edit")))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white"
  }, "JS"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "Jane Smith"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "jane.smith@bidmaster.com"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "Viewer"), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
  }, "Active"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Edit"))))), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm"
  }, "Role Permissions"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm mb-2"
  }, "Super Admin"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Full access to all features and settings")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm mb-2"
  }, "Moderator"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Can manage users, products, and orders. Cannot modify settings.")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm mb-2"
  }, "Viewer"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Read-only access to analytics and reports"))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "appearance",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Branding & Theme"), /*#__PURE__*/React.createElement(CardDescription, null, "Customize the look and feel")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, null, "Platform Logo"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl"
  }, "BM"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "Upload New Logo"))), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm"
  }, "Color Scheme"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, null, "Primary Color"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "color",
    defaultValue: "#3b82f6",
    className: "w-16 h-10"
  }), /*#__PURE__*/React.createElement(Input, {
    defaultValue: "#3b82f6"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, null, "Secondary Color"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "color",
    defaultValue: "#8b5cf6",
    className: "w-16 h-10"
  }), /*#__PURE__*/React.createElement(Input, {
    defaultValue: "#8b5cf6"
  }))))), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm"
  }, "Default Theme"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    className: "p-4 border-2 border-blue-600 rounded-lg bg-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "Light Mode"), /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 bg-blue-600 rounded-full"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-2 bg-gray-200 rounded"
  }), /*#__PURE__*/React.createElement("div", {
    className: "h-2 bg-gray-100 rounded w-3/4"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "p-4 border-2 rounded-lg bg-gray-900"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-white"
  }, "Dark Mode"), /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 border-2 rounded-full"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-2 bg-gray-700 rounded"
  }), /*#__PURE__*/React.createElement("div", {
    className: "h-2 bg-gray-800 rounded w-3/4"
  }))))), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "favicon"
  }, "Favicon"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(Palette, {
    className: "h-4 w-4 mr-2"
  }), "Upload Favicon")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "custom-css"
  }, "Custom CSS"), /*#__PURE__*/React.createElement(Textarea, {
    id: "custom-css",
    placeholder: "/* Add your custom CSS here */",
    className: "font-mono text-xs",
    rows: 6
  }))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "system",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "System Configuration"), /*#__PURE__*/React.createElement(CardDescription, null, "Database, backup, and maintenance settings")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-green-900 dark:text-green-100"
  }, "System Status"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green-700 dark:text-green-400"
  }, "All services operational")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
  }, "Online")), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "Maintenance Mode"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Put platform in maintenance mode")), /*#__PURE__*/React.createElement(Switch, null)), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "maintenance-message"
  }, "Maintenance Message"), /*#__PURE__*/React.createElement(Textarea, {
    id: "maintenance-message",
    placeholder: "We'll be back soon! The site is under maintenance.",
    rows: 3
  })), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm"
  }, "Database"), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "Database Size"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "342 MB used")), /*#__PURE__*/React.createElement(Database, {
    className: "h-5 w-5 text-blue-600"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "flex-1"
  }, "Optimize"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    className: "flex-1"
  }, "Backup Now"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, null, "Automatic Backups"), /*#__PURE__*/React.createElement(Select, {
    defaultValue: "daily"
  }, /*#__PURE__*/React.createElement(SelectTrigger, null, /*#__PURE__*/React.createElement(SelectValue, null)), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "hourly"
  }, "Every Hour"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "daily"
  }, "Daily"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "weekly"
  }, "Weekly"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "monthly"
  }, "Monthly")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, null, "Backup Retention (days)"), /*#__PURE__*/React.createElement(Input, {
    type: "number",
    defaultValue: "30"
  }))), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm"
  }, "Cache Management"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "Clear Cache"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "Clear Logs"))), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm"
  }, "System Information"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Version"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "v2.5.1")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Uptime"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "45 days")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Server Load"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "23%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Memory Usage"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "512 MB / 2 GB")))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-orange-50 dark:bg-orange-950 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-orange-900 dark:text-orange-100 mb-2"
  }, "\u26A0\uFE0F Danger Zone"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-orange-700 dark:text-orange-400 mb-3"
  }, "These actions cannot be undone. Please be careful."), /*#__PURE__*/React.createElement(Button, {
    variant: "destructive",
    size: "sm"
  }, "Reset All Settings")))))));
}