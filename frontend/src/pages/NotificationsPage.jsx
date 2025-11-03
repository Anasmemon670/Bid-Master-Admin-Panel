import React from 'react';
import { Bell, Activity, Mail, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
const notifications = [{
  id: 1,
  type: 'product',
  title: 'New Product Submitted',
  message: 'Vintage Camera by John Doe awaits approval',
  time: '5 min ago',
  read: false
}, {
  id: 2,
  type: 'user',
  title: 'User Reported',
  message: 'User Mike Johnson has been reported for suspicious activity',
  time: '15 min ago',
  read: false
}, {
  id: 3,
  type: 'bid',
  title: 'High-Value Bid Alert',
  message: 'Bid of $5,000 placed on Antique Painting',
  time: '1 hour ago',
  read: false
}, {
  id: 4,
  type: 'system',
  title: 'System Update',
  message: 'Platform maintenance scheduled for tonight',
  time: '2 hours ago',
  read: true
}, {
  id: 5,
  type: 'payment',
  title: 'Payment Completed',
  message: 'Transaction #ORD-1005 successfully processed',
  time: '3 hours ago',
  read: true
}];
const activityLog = [{
  id: 1,
  admin: 'Super Admin',
  action: 'Approved product: Gaming Laptop',
  timestamp: '2025-10-16 14:23:45',
  ip: '192.168.1.1'
}, {
  id: 2,
  admin: 'Moderator',
  action: 'Suspended user: Mike Johnson',
  timestamp: '2025-10-16 13:15:22',
  ip: '192.168.1.2'
}, {
  id: 3,
  admin: 'Super Admin',
  action: 'Modified user role: Jane Smith to Seller',
  timestamp: '2025-10-16 12:45:10',
  ip: '192.168.1.1'
}, {
  id: 4,
  admin: 'Moderator',
  action: 'Flagged auction: Suspicious Listing #234',
  timestamp: '2025-10-16 11:30:05',
  ip: '192.168.1.2'
}, {
  id: 5,
  admin: 'Super Admin',
  action: 'Exported analytics report',
  timestamp: '2025-10-16 10:15:33',
  ip: '192.168.1.1'
}];
export function NotificationsPage() {
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900 dark:text-white mb-1"
  }, "Notifications & Logs"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Stay updated with platform activities")), /*#__PURE__*/React.createElement(Tabs, {
    defaultValue: "notifications",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(TabsList, null, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "notifications",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Bell, {
    className: "h-4 w-4"
  }), "Notifications", /*#__PURE__*/React.createElement(Badge, {
    variant: "destructive"
  }, notifications.filter(n => !n.read).length)), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "activity",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Activity, {
    className: "h-4 w-4"
  }), "Activity Log"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "settings",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Shield, {
    className: "h-4 w-4"
  }), "Settings")), /*#__PURE__*/React.createElement(TabsContent, {
    value: "notifications"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardTitle, null, "All Notifications"), /*#__PURE__*/React.createElement(CardDescription, null, "Recent platform alerts and updates")), /*#__PURE__*/React.createElement("button", {
    className: "text-sm text-blue-600 hover:underline"
  }, "Mark all as read"))), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, notifications.map(notification => /*#__PURE__*/React.createElement("div", {
    key: notification.id,
    className: `p-4 rounded-lg border transition-all hover:shadow-md ${notification.read ? 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950' : 'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-10 h-10 rounded-lg flex items-center justify-center ${notification.type === 'product' ? 'bg-purple-100 dark:bg-purple-950' : notification.type === 'user' ? 'bg-orange-100 dark:bg-orange-950' : notification.type === 'bid' ? 'bg-green-100 dark:bg-green-950' : notification.type === 'payment' ? 'bg-blue-100 dark:bg-blue-950' : 'bg-gray-100 dark:bg-gray-900'}`
  }, notification.type === 'product' ? /*#__PURE__*/React.createElement(Bell, {
    className: "h-5 w-5 text-purple-600"
  }) : notification.type === 'user' ? /*#__PURE__*/React.createElement(Shield, {
    className: "h-5 w-5 text-orange-600"
  }) : notification.type === 'bid' ? /*#__PURE__*/React.createElement(Activity, {
    className: "h-5 w-5 text-green-600"
  }) : notification.type === 'payment' ? /*#__PURE__*/React.createElement(CheckCircle, {
    className: "h-5 w-5 text-blue-600"
  }) : /*#__PURE__*/React.createElement(Mail, {
    className: "h-5 w-5 text-gray-600"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-900 dark:text-white"
  }, notification.title), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, notification.time)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400 mt-1"
  }, notification.message))))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "activity"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Admin Activity Log"), /*#__PURE__*/React.createElement(CardDescription, null, "Complete audit trail of admin actions")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableHead, null, "Admin"), /*#__PURE__*/React.createElement(TableHead, null, "Action"), /*#__PURE__*/React.createElement(TableHead, null, "Timestamp"), /*#__PURE__*/React.createElement(TableHead, null, "IP Address"))), /*#__PURE__*/React.createElement(TableBody, null, activityLog.map(log => /*#__PURE__*/React.createElement(TableRow, {
    key: log.id
  }, /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, log.admin)), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm"
  }, log.action), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, log.timestamp), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, log.ip)))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "settings"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Notification Settings"), /*#__PURE__*/React.createElement(CardDescription, null, "Customize your notification preferences")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "Email Notifications"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Receive notifications via email")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "Product Approvals"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Alert when new products need approval")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "User Reports"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Alert when users are reported")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "High-Value Bids"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Alert for bids over $1,000")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "System Updates"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Important platform announcements")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  })), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(Label, null, "Security Alerts"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Login attempts and security events")), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: true
  }))))))));
}