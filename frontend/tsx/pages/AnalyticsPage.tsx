import { TrendingUp, Download, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const weeklyData = [
  { day: 'Mon', revenue: 4200, bids: 145, users: 89 },
  { day: 'Tue', revenue: 3800, bids: 132, users: 76 },
  { day: 'Wed', revenue: 5100, bids: 178, users: 102 },
  { day: 'Thu', revenue: 4600, bids: 156, users: 94 },
  { day: 'Fri', revenue: 6200, bids: 201, users: 118 },
  { day: 'Sat', revenue: 7800, bids: 234, users: 145 },
  { day: 'Sun', revenue: 6900, bids: 212, users: 132 },
];

const monthlyData = [
  { month: 'Jan', revenue: 45000, bids: 1240 },
  { month: 'Feb', revenue: 52000, bids: 1456 },
  { month: 'Mar', revenue: 48000, bids: 1334 },
  { month: 'Apr', revenue: 61000, bids: 1678 },
  { month: 'May', revenue: 58000, bids: 1589 },
  { month: 'Jun', revenue: 67000, bids: 1823 },
  { month: 'Jul', revenue: 72000, bids: 1945 },
  { month: 'Aug', revenue: 69000, bids: 1876 },
  { month: 'Sep', revenue: 75000, bids: 2012 },
  { month: 'Oct', revenue: 81000, bids: 2178 },
];

const categoryData = [
  { category: 'Electronics', value: 12500 },
  { category: 'Fashion', value: 9800 },
  { category: 'Home & Garden', value: 7200 },
  { category: 'Sports', value: 5400 },
  { category: 'Collectibles', value: 4100 },
  { category: 'Art', value: 3800 },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-1">Analytics & Reports</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Track performance metrics and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-gray-900 dark:text-white mb-1">$543,210</p>
            <p className="text-xs text-green-600">+15.3% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Bids</p>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-gray-900 dark:text-white mb-1">18,432</p>
            <p className="text-xs text-green-600">+23.1% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Bid Value</p>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-gray-900 dark:text-white mb-1">$29.47</p>
            <p className="text-xs text-green-600">+7.8% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-gray-900 dark:text-white mb-1">87.3%</p>
            <p className="text-xs text-green-600">+2.1% from last period</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Weekly/Monthly */}
      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4">
          {/* Revenue & Bids Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Bidding Trends (Weekly)</CardTitle>
              <CardDescription>Last 7 days performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))' 
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Revenue ($)" />
                  <Area type="monotone" dataKey="bids" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Bids" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Activity */}
          <Card>
            <CardHeader>
              <CardTitle>User Activity (Weekly)</CardTitle>
              <CardDescription>New user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))' 
                    }}
                  />
                  <Bar dataKey="users" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          {/* Monthly Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Bidding Trends (Monthly)</CardTitle>
              <CardDescription>Year-to-date performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))' 
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} name="Revenue ($)" />
                  <Line type="monotone" dataKey="bids" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} name="Total Bids" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Categories by Revenue</CardTitle>
          <CardDescription>Performance breakdown by product category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
              <XAxis type="number" className="text-xs" />
              <YAxis dataKey="category" type="category" className="text-xs" width={120} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))' 
                }}
              />
              <Bar dataKey="value" fill="#ec4899" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
