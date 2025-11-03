import React from 'react';
import { TrendingUp, Download, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const weeklyData = [{
  day: 'Mon',
  revenue: 4200,
  bids: 145,
  users: 89
}, {
  day: 'Tue',
  revenue: 3800,
  bids: 132,
  users: 76
}, {
  day: 'Wed',
  revenue: 5100,
  bids: 178,
  users: 102
}, {
  day: 'Thu',
  revenue: 4600,
  bids: 156,
  users: 94
}, {
  day: 'Fri',
  revenue: 6200,
  bids: 201,
  users: 118
}, {
  day: 'Sat',
  revenue: 7800,
  bids: 234,
  users: 145
}, {
  day: 'Sun',
  revenue: 6900,
  bids: 212,
  users: 132
}];
const monthlyData = [{
  month: 'Jan',
  revenue: 45000,
  bids: 1240
}, {
  month: 'Feb',
  revenue: 52000,
  bids: 1456
}, {
  month: 'Mar',
  revenue: 48000,
  bids: 1334
}, {
  month: 'Apr',
  revenue: 61000,
  bids: 1678
}, {
  month: 'May',
  revenue: 58000,
  bids: 1589
}, {
  month: 'Jun',
  revenue: 67000,
  bids: 1823
}, {
  month: 'Jul',
  revenue: 72000,
  bids: 1945
}, {
  month: 'Aug',
  revenue: 69000,
  bids: 1876
}, {
  month: 'Sep',
  revenue: 75000,
  bids: 2012
}, {
  month: 'Oct',
  revenue: 81000,
  bids: 2178
}];
const categoryData = [{
  category: 'Electronics',
  value: 12500
}, {
  category: 'Fashion',
  value: 9800
}, {
  category: 'Home & Garden',
  value: 7200
}, {
  category: 'Sports',
  value: 5400
}, {
  category: 'Collectibles',
  value: 4100
}, {
  category: 'Art',
  value: 3800
}];
export function AnalyticsPage() {
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900 dark:text-white mb-1"
  }, "Analytics & Reports"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Track performance metrics and insights")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "h-4 w-4 mr-2"
  }), "Date Range"), /*#__PURE__*/React.createElement(Button, {
    className: "bg-gradient-to-r from-blue-600 to-purple-600"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "h-4 w-4 mr-2"
  }), "Download Report"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Total Revenue"), /*#__PURE__*/React.createElement(TrendingUp, {
    className: "h-4 w-4 text-green-600"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 dark:text-white mb-1"
  }, "$543,210"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green-600"
  }, "+15.3% from last period"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Total Bids"), /*#__PURE__*/React.createElement(TrendingUp, {
    className: "h-4 w-4 text-green-600"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 dark:text-white mb-1"
  }, "18,432"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green-600"
  }, "+23.1% from last period"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Avg. Bid Value"), /*#__PURE__*/React.createElement(TrendingUp, {
    className: "h-4 w-4 text-green-600"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 dark:text-white mb-1"
  }, "$29.47"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green-600"
  }, "+7.8% from last period"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Success Rate"), /*#__PURE__*/React.createElement(TrendingUp, {
    className: "h-4 w-4 text-green-600"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 dark:text-white mb-1"
  }, "87.3%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green-600"
  }, "+2.1% from last period")))), /*#__PURE__*/React.createElement(Tabs, {
    defaultValue: "weekly",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(TabsList, null, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "weekly"
  }, "Weekly"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "monthly"
  }, "Monthly")), /*#__PURE__*/React.createElement(TabsContent, {
    value: "weekly",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Revenue & Bidding Trends (Weekly)"), /*#__PURE__*/React.createElement(CardDescription, null, "Last 7 days performance")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 350
  }, /*#__PURE__*/React.createElement(AreaChart, {
    data: weeklyData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    className: "stroke-gray-200 dark:stroke-gray-800"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "day",
    className: "text-xs"
  }), /*#__PURE__*/React.createElement(YAxis, {
    className: "text-xs"
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))'
    }
  }), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "revenue",
    stroke: "#3b82f6",
    fill: "#3b82f6",
    fillOpacity: 0.6,
    name: "Revenue ($)"
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "bids",
    stroke: "#8b5cf6",
    fill: "#8b5cf6",
    fillOpacity: 0.6,
    name: "Bids"
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "User Activity (Weekly)"), /*#__PURE__*/React.createElement(CardDescription, null, "New user registrations")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: weeklyData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    className: "stroke-gray-200 dark:stroke-gray-800"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "day",
    className: "text-xs"
  }), /*#__PURE__*/React.createElement(YAxis, {
    className: "text-xs"
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))'
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "users",
    fill: "#10b981",
    radius: [8, 8, 0, 0]
  })))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "monthly",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Revenue & Bidding Trends (Monthly)"), /*#__PURE__*/React.createElement(CardDescription, null, "Year-to-date performance")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 350
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: monthlyData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    className: "stroke-gray-200 dark:stroke-gray-800"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "month",
    className: "text-xs"
  }), /*#__PURE__*/React.createElement(YAxis, {
    className: "text-xs"
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))'
    }
  }), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "revenue",
    stroke: "#3b82f6",
    strokeWidth: 3,
    dot: {
      r: 5
    },
    name: "Revenue ($)"
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "bids",
    stroke: "#8b5cf6",
    strokeWidth: 3,
    dot: {
      r: 5
    },
    name: "Total Bids"
  }))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Top Categories by Revenue"), /*#__PURE__*/React.createElement(CardDescription, null, "Performance breakdown by product category")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: categoryData,
    layout: "vertical"
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    className: "stroke-gray-200 dark:stroke-gray-800"
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number",
    className: "text-xs"
  }), /*#__PURE__*/React.createElement(YAxis, {
    dataKey: "category",
    type: "category",
    className: "text-xs",
    width: 120
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))'
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "value",
    fill: "#ec4899",
    radius: [0, 8, 8, 0]
  }))))));
}