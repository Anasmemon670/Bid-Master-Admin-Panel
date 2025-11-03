import React from 'react';
import { useState } from 'react';
import { Search, Filter, Download, MoreVertical, Eye, UserX, UserCheck, Edit, Shield, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { toast } from 'sonner@2.0.3';
const users = [{
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Buyer',
  status: 'Active',
  joined: '2024-01-15',
  bids: 45
}, {
  id: 2,
  name: 'Jane Smith',
  email: 'jane@example.com',
  role: 'Seller',
  status: 'Active',
  joined: '2024-02-20',
  bids: 32
}, {
  id: 3,
  name: 'Mike Johnson',
  email: 'mike@example.com',
  role: 'Buyer',
  status: 'Suspended',
  joined: '2024-03-10',
  bids: 12
}, {
  id: 4,
  name: 'Sarah Williams',
  email: 'sarah@example.com',
  role: 'Seller',
  status: 'Active',
  joined: '2024-01-05',
  bids: 89
}, {
  id: 5,
  name: 'Tom Brown',
  email: 'tom@example.com',
  role: 'Buyer',
  status: 'Pending',
  joined: '2024-10-14',
  bids: 3
}];
export function UserManagementPage({
  userRole
}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isReadOnly = userRole === 'viewer';
  const handleActionClick = () => {
    if (isReadOnly) {
      toast.error('You do not have permission to perform this action', {
        description: 'Only Super Admins and Moderators can modify users'
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, isReadOnly && /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-orange-50 dark:bg-orange-950 rounded-lg flex items-start gap-3"
  }, /*#__PURE__*/React.createElement(Lock, {
    className: "h-5 w-5 text-orange-600 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-orange-900 dark:text-orange-100"
  }, "Read-Only Mode"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-orange-700 dark:text-orange-400 mt-1"
  }, "You are logged in as a Viewer. You can view data but cannot make changes."))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900 dark:text-white mb-1"
  }, "User Management"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Manage all platform users")), /*#__PURE__*/React.createElement(Button, {
    className: "bg-gradient-to-r from-blue-600 to-purple-600"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "h-4 w-4 mr-2"
  }), "Export Users")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search by name or email...",
    className: "pl-10"
  })), /*#__PURE__*/React.createElement(Select, {
    defaultValue: "all"
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "w-full md:w-40"
  }, /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Role"
  })), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "all"
  }, "All Roles"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "buyer"
  }, "Buyer"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "seller"
  }, "Seller"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "admin"
  }, "Admin"))), /*#__PURE__*/React.createElement(Select, {
    defaultValue: "all"
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "w-full md:w-40"
  }, /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Status"
  })), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "all"
  }, "All Status"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "active"
  }, "Active"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "suspended"
  }, "Suspended"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "pending"
  }, "Pending"))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, /*#__PURE__*/React.createElement(Filter, {
    className: "h-4 w-4 mr-2"
  }), "Filters")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "All Users"), /*#__PURE__*/React.createElement(CardDescription, null, "Total: ", users.length, " users")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableHead, null, "User"), /*#__PURE__*/React.createElement(TableHead, null, "Role"), /*#__PURE__*/React.createElement(TableHead, null, "Status"), /*#__PURE__*/React.createElement(TableHead, null, "Joined"), /*#__PURE__*/React.createElement(TableHead, null, "Total Bids"), /*#__PURE__*/React.createElement(TableHead, {
    className: "text-right"
  }, "Actions"))), /*#__PURE__*/React.createElement(TableBody, null, users.map(user => /*#__PURE__*/React.createElement(TableRow, {
    key: user.id,
    className: "hover:bg-gray-50 dark:hover:bg-gray-900"
  }, /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Avatar, null, /*#__PURE__*/React.createElement(AvatarFallback, {
    className: "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
  }, user.name.split(' ').map(n => n[0]).join(''))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, user.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, user.email)))), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, user.role)), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Badge, {
    variant: user.status === 'Active' ? 'default' : user.status === 'Suspended' ? 'destructive' : 'secondary'
  }, user.status)), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, user.joined), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-sm"
  }, user.bids), /*#__PURE__*/React.createElement(TableCell, {
    className: "text-right"
  }, /*#__PURE__*/React.createElement(DropdownMenu, null, /*#__PURE__*/React.createElement(DropdownMenuTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon",
    disabled: isReadOnly
  }, /*#__PURE__*/React.createElement(MoreVertical, {
    className: "h-4 w-4"
  }))), /*#__PURE__*/React.createElement(DropdownMenuContent, {
    align: "end"
  }, /*#__PURE__*/React.createElement(DropdownMenuItem, {
    onClick: () => {
      if (isReadOnly) {
        handleActionClick();
        return;
      }
      setSelectedUser(user);
      setIsEditModalOpen(true);
    }
  }, /*#__PURE__*/React.createElement(Eye, {
    className: "mr-2 h-4 w-4"
  }), "View Profile"), /*#__PURE__*/React.createElement(DropdownMenuItem, {
    onClick: () => {
      setSelectedUser(user);
      setIsEditModalOpen(true);
    }
  }, /*#__PURE__*/React.createElement(Edit, {
    className: "mr-2 h-4 w-4"
  }), "Edit User"), /*#__PURE__*/React.createElement(DropdownMenuItem, null, /*#__PURE__*/React.createElement(Shield, {
    className: "mr-2 h-4 w-4"
  }), "Change Role"), user.status === 'Active' ? /*#__PURE__*/React.createElement(DropdownMenuItem, {
    className: "text-red-600"
  }, /*#__PURE__*/React.createElement(UserX, {
    className: "mr-2 h-4 w-4"
  }), "Suspend User") : /*#__PURE__*/React.createElement(DropdownMenuItem, {
    className: "text-green-600"
  }, /*#__PURE__*/React.createElement(UserCheck, {
    className: "mr-2 h-4 w-4"
  }), "Activate User"))))))))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Showing 1 to ", users.length, " of ", users.length, " results"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    disabled: true
  }, "Previous"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Next"))))), /*#__PURE__*/React.createElement(Dialog, {
    open: isEditModalOpen,
    onOpenChange: setIsEditModalOpen
  }, /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(DialogHeader, null, /*#__PURE__*/React.createElement(DialogTitle, null, "User Profile"), /*#__PURE__*/React.createElement(DialogDescription, null, "View and edit user details")), selectedUser && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
  }, /*#__PURE__*/React.createElement(Avatar, {
    className: "w-16 h-16"
  }, /*#__PURE__*/React.createElement(AvatarFallback, {
    className: "bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl"
  }, selectedUser.name.split(' ').map(n => n[0]).join(''))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, selectedUser.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, selectedUser.email))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, null, "Role"), /*#__PURE__*/React.createElement(Select, {
    defaultValue: selectedUser.role.toLowerCase()
  }, /*#__PURE__*/React.createElement(SelectTrigger, null, /*#__PURE__*/React.createElement(SelectValue, null)), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "buyer"
  }, "Buyer"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "seller"
  }, "Seller"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "admin"
  }, "Admin")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, null, "Status"), /*#__PURE__*/React.createElement(Select, {
    defaultValue: selectedUser.status.toLowerCase()
  }, /*#__PURE__*/React.createElement(SelectTrigger, null, /*#__PURE__*/React.createElement(SelectValue, null)), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "active"
  }, "Active"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "suspended"
  }, "Suspended"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "pending"
  }, "Pending"))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Joined Date"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, selectedUser.joined)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Total Bids"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, selectedUser.bids)))), /*#__PURE__*/React.createElement(DialogFooter, null, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setIsEditModalOpen(false)
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, null, "Save Changes")))));
}