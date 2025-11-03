import { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Mail, 
  CreditCard, 
  Palette, 
  Database,
  Globe,
  Bell,
  Lock,
  Save,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-1">Settings</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Configure your admin panel and platform settings</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 h-auto">
          <TabsTrigger value="general" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger value="platform" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Platform</span>
          </TabsTrigger>
          <TabsTrigger value="admins" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Admins</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input id="platform-name" defaultValue="BidMaster Auction Platform" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform-tagline">Tagline</Label>
                <Input id="platform-tagline" defaultValue="Your trusted auction marketplace" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                      <SelectItem value="pkt">PKT (GMT+5)</SelectItem>
                      <SelectItem value="est">EST (GMT-5)</SelectItem>
                      <SelectItem value="pst">PST (GMT-8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ur">اردو (Urdu)</SelectItem>
                      <SelectItem value="ar">العربية (Arabic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="support@bidmaster.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-phone">Support Phone</Label>
                <Input id="support-phone" type="tel" defaultValue="+92 300 1234567" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Protect your platform and user data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Two-Factor Authentication (2FA)</Label>
                  <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
                <p className="text-xs text-gray-500">Auto-logout inactive admins after specified time</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-min">Minimum Password Length</Label>
                <Input id="password-min" type="number" defaultValue="8" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Require Special Characters</Label>
                  <p className="text-sm text-gray-500">Passwords must include symbols</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Login Attempt Limit</Label>
                  <p className="text-sm text-gray-500">Lock account after failed attempts</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-attempts">Max Login Attempts</Label>
                <Input id="max-attempts" type="number" defaultValue="5" />
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900 dark:text-blue-100">SSL Certificate Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                        Active
                      </Badge>
                      <span className="text-xs text-blue-700 dark:text-blue-400">Expires: Dec 31, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>SMTP settings and email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input id="smtp-host" defaultValue="smtp.gmail.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" type="number" defaultValue="587" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-encryption">Encryption</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger id="smtp-encryption">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tls">TLS</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-username">SMTP Username</Label>
                <Input id="smtp-username" type="email" defaultValue="noreply@bidmaster.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-password">SMTP Password</Label>
                <Input id="smtp-password" type="password" defaultValue="••••••••" />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm">Email Notifications</h4>
                
                <div className="flex items-center justify-between">
                  <Label>New User Registration</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Product Approval Requests</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>High-Value Transactions</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>User Reports</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Daily Summary Report</Label>
                  <Switch />
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Test Email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Configuration</CardTitle>
              <CardDescription>Payment gateways and commission settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm">Payment Gateways</h4>
                
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm">Stripe</p>
                        <p className="text-xs text-gray-500">Credit/Debit Cards</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Input placeholder="Stripe API Key" defaultValue="sk_live_••••••••••••" />
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm">PayPal</p>
                        <p className="text-xs text-gray-500">PayPal Account</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Input placeholder="PayPal Client ID" defaultValue="AZ••••••••••" />
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-950 rounded flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm">JazzCash</p>
                        <p className="text-xs text-gray-500">Mobile Wallet (Pakistan)</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <Input placeholder="Merchant ID" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm">Commission & Fees</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="platform-commission">Platform Commission (%)</Label>
                  <Input id="platform-commission" type="number" defaultValue="5" step="0.1" />
                  <p className="text-xs text-gray-500">Percentage charged on successful auctions</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="listing-fee">Listing Fee ($)</Label>
                  <Input id="listing-fee" type="number" defaultValue="2.99" step="0.01" />
                  <p className="text-xs text-gray-500">One-time fee for creating an auction</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-withdrawal">Minimum Withdrawal Amount ($)</Label>
                  <Input id="min-withdrawal" type="number" defaultValue="50" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="pkr">PKR (₨)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Settings */}
        <TabsContent value="platform" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Rules</CardTitle>
              <CardDescription>Auction and bidding configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="min-bid">Minimum Bid Amount ($)</Label>
                <Input id="min-bid" type="number" defaultValue="1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bid-increment">Bid Increment ($)</Label>
                <Input id="bid-increment" type="number" defaultValue="5" />
                <p className="text-xs text-gray-500">Minimum amount each bid must increase</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auction-duration">Default Auction Duration (days)</Label>
                <Input id="auction-duration" type="number" defaultValue="7" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-duration">Maximum Auction Duration (days)</Label>
                <Input id="max-duration" type="number" defaultValue="30" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Auto-Extend Auctions</Label>
                  <p className="text-sm text-gray-500">Extend time if bid placed in last 5 minutes</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Require Product Approval</Label>
                  <p className="text-sm text-gray-500">Admin must approve before listing</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Allow Buy Now Option</Label>
                  <p className="text-sm text-gray-500">Sellers can set instant purchase price</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Reserve Price</Label>
                  <p className="text-sm text-gray-500">Allow sellers to set minimum selling price</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="max-images">Maximum Images per Product</Label>
                <Input id="max-images" type="number" defaultValue="8" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
                <Input id="max-file-size" type="number" defaultValue="5" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Management */}
        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Admin Users</CardTitle>
                  <CardDescription>Manage admin access and roles</CardDescription>
                </div>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Add Admin
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                        SA
                      </div>
                      <div>
                        <p className="text-sm">Super Admin</p>
                        <p className="text-xs text-gray-500">admin@bidmaster.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Super Admin</Badge>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white">
                        JD
                      </div>
                      <div>
                        <p className="text-sm">John Doe</p>
                        <p className="text-xs text-gray-500">john.doe@bidmaster.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Moderator</Badge>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                        Active
                      </Badge>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white">
                        JS
                      </div>
                      <div>
                        <p className="text-sm">Jane Smith</p>
                        <p className="text-xs text-gray-500">jane.smith@bidmaster.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Viewer</Badge>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                        Active
                      </Badge>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm">Role Permissions</h4>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm mb-2">Super Admin</p>
                    <p className="text-xs text-gray-500">Full access to all features and settings</p>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm mb-2">Moderator</p>
                    <p className="text-xs text-gray-500">Can manage users, products, and orders. Cannot modify settings.</p>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm mb-2">Viewer</p>
                    <p className="text-xs text-gray-500">Read-only access to analytics and reports</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Branding & Theme</CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Platform Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl">
                    BM
                  </div>
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm">Color Scheme</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input type="color" defaultValue="#3b82f6" className="w-16 h-10" />
                      <Input defaultValue="#3b82f6" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input type="color" defaultValue="#8b5cf6" className="w-16 h-10" />
                      <Input defaultValue="#8b5cf6" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm">Default Theme</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border-2 border-blue-600 rounded-lg bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Light Mode</span>
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded" />
                      <div className="h-2 bg-gray-100 rounded w-3/4" />
                    </div>
                  </button>

                  <button className="p-4 border-2 rounded-lg bg-gray-900">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white">Dark Mode</span>
                      <div className="w-3 h-3 border-2 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-700 rounded" />
                      <div className="h-2 bg-gray-800 rounded w-3/4" />
                    </div>
                  </button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon</Label>
                <Button variant="outline" className="w-full">
                  <Palette className="h-4 w-4 mr-2" />
                  Upload Favicon
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-css">Custom CSS</Label>
                <Textarea 
                  id="custom-css" 
                  placeholder="/* Add your custom CSS here */"
                  className="font-mono text-xs"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Database, backup, and maintenance settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div>
                  <p className="text-sm text-green-900 dark:text-green-100">System Status</p>
                  <p className="text-xs text-green-700 dark:text-green-400">All services operational</p>
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                  Online
                </Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Put platform in maintenance mode</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance-message">Maintenance Message</Label>
                <Textarea 
                  id="maintenance-message"
                  placeholder="We'll be back soon! The site is under maintenance."
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm">Database</h4>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm">Database Size</p>
                      <p className="text-xs text-gray-500">342 MB used</p>
                    </div>
                    <Database className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Optimize
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Backup Now
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Automatic Backups</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Backup Retention (days)</Label>
                  <Input type="number" defaultValue="30" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm">Cache Management</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    Clear Cache
                  </Button>
                  <Button variant="outline">
                    Clear Logs
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm">System Information</h4>
                
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Version</p>
                    <p className="text-sm">v2.5.1</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Uptime</p>
                    <p className="text-sm">45 days</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Server Load</p>
                    <p className="text-sm">23%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Memory Usage</p>
                    <p className="text-sm">512 MB / 2 GB</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <p className="text-sm text-orange-900 dark:text-orange-100 mb-2">⚠️ Danger Zone</p>
                <p className="text-xs text-orange-700 dark:text-orange-400 mb-3">
                  These actions cannot be undone. Please be careful.
                </p>
                <Button variant="destructive" size="sm">
                  Reset All Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
