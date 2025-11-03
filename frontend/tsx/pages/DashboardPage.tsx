import { Users, Package, DollarSign, Activity, CheckCircle, AlertTriangle, UserX, TrendingUp } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { name: 'Mon', revenue: 4000, bids: 2400 },
  { name: 'Tue', revenue: 3000, bids: 1398 },
  { name: 'Wed', revenue: 2000, bids: 9800 },
  { name: 'Thu', revenue: 2780, bids: 3908 },
  { name: 'Fri', revenue: 1890, bids: 4800 },
  { name: 'Sat', revenue: 2390, bids: 3800 },
  { name: 'Sun', revenue: 3490, bids: 4300 },
];

const categoryData = [
  { name: 'Electronics', value: 400, color: '#3b82f6' },
  { name: 'Fashion', value: 300, color: '#8b5cf6' },
  { name: 'Home', value: 200, color: '#ec4899' },
  { name: 'Sports', value: 100, color: '#10b981' },
];

const recentActions = [
  { id: 1, type: 'approval', user: 'John Doe', action: 'Product approved', time: '2 min ago', status: 'success' },
  { id: 2, type: 'flag', user: 'Jane Smith', action: 'Auction flagged for review', time: '15 min ago', status: 'warning' },
  { id: 3, type: 'user', user: 'Mike Johnson', action: 'User suspended', time: '1 hour ago', status: 'error' },
  { id: 4, type: 'bid', user: 'Sarah Williams', action: 'High-value bid placed', time: '2 hours ago', status: 'info' },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white mb-1">Dashboard Overview</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, Super Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value="12,543"
          change="+12.5% from last month"
          changeType="positive"
          icon={Users}
          iconColor="bg-blue-500"
        />
        <StatsCard
          title="Active Auctions"
          value="347"
          change="+8.2% from last week"
          changeType="positive"
          icon={Package}
          iconColor="bg-purple-500"
        />
        <StatsCard
          title="Completed Bids"
          value="8,621"
          change="+23.1% from last month"
          changeType="positive"
          icon={Activity}
          iconColor="bg-green-500"
        />
        <StatsCard
          title="Total Revenue"
          value="$543,210"
          change="+15.3% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-orange-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Bids Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Bidding Trends</CardTitle>
            <CardDescription>Last 7 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))' 
                  }}
                />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="bids" stackId="2" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Product distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{cat.name}</span>
                  </div>
                  <span className="text-sm">{cat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your platform efficiently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm">Approve Products</p>
                <p className="text-xs text-gray-500">12 pending approvals</p>
              </div>
              <Badge>12</Badge>
            </Button>

            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm">View Flagged Auctions</p>
                <p className="text-xs text-gray-500">5 items need review</p>
              </div>
              <Badge variant="destructive">5</Badge>
            </Button>

            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-950 rounded-lg flex items-center justify-center">
                <UserX className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm">Suspend Users</p>
                <p className="text-xs text-gray-500">3 reported accounts</p>
              </div>
              <Badge variant="secondary">3</Badge>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest admin actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActions.map((action) => (
                <div key={action.id} className="flex items-start gap-3 pb-4 border-b last:border-0 border-gray-200 dark:border-gray-800">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    action.status === 'success' ? 'bg-green-500' :
                    action.status === 'warning' ? 'bg-orange-500' :
                    action.status === 'error' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{action.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{action.user} • {action.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
