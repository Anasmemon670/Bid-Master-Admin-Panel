import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Shield, Users, Eye as EyeIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';

export type UserRole = 'super-admin' | 'moderator' | 'viewer';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('super-admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4">
            <span className="text-white text-2xl">BM</span>
          </div>
          <h1 className="text-gray-900 dark:text-white mb-2">BidMaster Admin Panel</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Secure authentication portal</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@bidmaster.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label>Select Role</Label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('super-admin')}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedRole === 'super-admin'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                        : 'border-gray-200 dark:border-gray-800 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selectedRole === 'super-admin' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        <Shield className={`h-4 w-4 ${selectedRole === 'super-admin' ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Super Admin</p>
                        <p className="text-xs text-gray-500">Full access to all features</p>
                      </div>
                      {selectedRole === 'super-admin' && (
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('moderator')}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedRole === 'moderator'
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-950'
                        : 'border-gray-200 dark:border-gray-800 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selectedRole === 'moderator' ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        <Users className={`h-4 w-4 ${selectedRole === 'moderator' ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Moderator</p>
                        <p className="text-xs text-gray-500">Manage users, products & orders</p>
                      </div>
                      {selectedRole === 'moderator' && (
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('viewer')}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedRole === 'viewer'
                        ? 'border-green-600 bg-green-50 dark:bg-green-950'
                        : 'border-gray-200 dark:border-gray-800 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selectedRole === 'viewer' ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        <EyeIcon className={`h-4 w-4 ${selectedRole === 'viewer' ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Viewer</p>
                        <p className="text-xs text-gray-500">Read-only access to analytics</p>
                      </div>
                      {selectedRole === 'viewer' && (
                        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <Lock className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-700 dark:text-green-400">
                  Secured with JWT Authentication & HTTPS
                </span>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Sign In
              </Button>
            </form>

            {/* 2FA Notice */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-400">
                💡 Two-factor authentication available in Settings
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Protected by BidMaster Security © 2025
        </p>
      </div>
    </div>
  );
}
