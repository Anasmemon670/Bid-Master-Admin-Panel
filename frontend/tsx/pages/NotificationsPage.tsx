import { Bell, Activity, Mail, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

const notifications = [
  { id: 1, type: 'product', title: 'New Product Submitted', message: 'Vintage Camera by John Doe awaits approval', time: '5 min ago', read: false },
  { id: 2, type: 'user', title: 'User Reported', message: 'User Mike Johnson has been reported for suspicious activity', time: '15 min ago', read: false },
  { id: 3, type: 'bid', title: 'High-Value Bid Alert', message: 'Bid of $5,000 placed on Antique Painting', time: '1 hour ago', read: false },
  { id: 4, type: 'system', title: 'System Update', message: 'Platform maintenance scheduled for tonight', time: '2 hours ago', read: true },
  { id: 5, type: 'payment', title: 'Payment Completed', message: 'Transaction #ORD-1005 successfully processed', time: '3 hours ago', read: true },
];

const activityLog = [
  { id: 1, admin: 'Super Admin', action: 'Approved product: Gaming Laptop', timestamp: '2025-10-16 14:23:45', ip: '192.168.1.1' },
  { id: 2, admin: 'Moderator', action: 'Suspended user: Mike Johnson', timestamp: '2025-10-16 13:15:22', ip: '192.168.1.2' },
  { id: 3, admin: 'Super Admin', action: 'Modified user role: Jane Smith to Seller', timestamp: '2025-10-16 12:45:10', ip: '192.168.1.1' },
  { id: 4, admin: 'Moderator', action: 'Flagged auction: Suspicious Listing #234', timestamp: '2025-10-16 11:30:05', ip: '192.168.1.2' },
  { id: 5, admin: 'Super Admin', action: 'Exported analytics report', timestamp: '2025-10-16 10:15:33', ip: '192.168.1.1' },
];

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white mb-1">Notifications & Logs</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Stay updated with platform activities</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
            <Badge variant="destructive">{notifications.filter(n => !n.read).length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="h-4 w-4" />
            Activity Log
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Shield className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Notifications</CardTitle>
                  <CardDescription>Recent platform alerts and updates</CardDescription>
                </div>
                <button className="text-sm text-blue-600 hover:underline">
                  Mark all as read
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                      notification.read
                        ? 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950'
                        : 'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        notification.type === 'product' ? 'bg-purple-100 dark:bg-purple-950' :
                        notification.type === 'user' ? 'bg-orange-100 dark:bg-orange-950' :
                        notification.type === 'bid' ? 'bg-green-100 dark:bg-green-950' :
                        notification.type === 'payment' ? 'bg-blue-100 dark:bg-blue-950' :
                        'bg-gray-100 dark:bg-gray-900'
                      }`}>
                        {notification.type === 'product' ? <Bell className="h-5 w-5 text-purple-600" /> :
                         notification.type === 'user' ? <Shield className="h-5 w-5 text-orange-600" /> :
                         notification.type === 'bid' ? <Activity className="h-5 w-5 text-green-600" /> :
                         notification.type === 'payment' ? <CheckCircle className="h-5 w-5 text-blue-600" /> :
                         <Mail className="h-5 w-5 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <p className="text-sm text-gray-900 dark:text-white">{notification.title}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Admin Activity Log</CardTitle>
              <CardDescription>Complete audit trail of admin actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Admin</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLog.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <Badge variant="outline">{log.admin}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{log.action}</TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                        {log.timestamp}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                        {log.ip}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Customize your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Product Approvals</Label>
                    <p className="text-sm text-gray-500">Alert when new products need approval</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>User Reports</Label>
                    <p className="text-sm text-gray-500">Alert when users are reported</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>High-Value Bids</Label>
                    <p className="text-sm text-gray-500">Alert for bids over $1,000</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>System Updates</Label>
                    <p className="text-sm text-gray-500">Important platform announcements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-gray-500">Login attempts and security events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
