import React, { useState, useEffect } from 'react';
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
import { toast } from 'sonner';
import { apiService } from '../services/api';

export function UserManagementPage({ userRole }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isReadOnly = userRole === 'viewer';

  useEffect(() => {
    loadUsers();
  }, [searchTerm, roleFilter, statusFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (roleFilter !== 'all') params.role = roleFilter;
      if (statusFilter !== 'all') params.status = statusFilter === 'active' ? 'approved' : statusFilter;

      const response = await apiService.getUsers(params);
      const formattedUsers = (response.users || []).map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Buyer',
        status: user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Active',
        joined: user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A',
        bids: user.bids_count || 0
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (isReadOnly) return toast.error('You do not have permission');
    try { await apiService.deleteUser(userId); toast.success('User deleted'); loadUsers(); } catch { toast.error('Failed'); }
  };

  const handleApprove = async (userId) => {
    if (isReadOnly) return toast.error('You do not have permission');
    try { await apiService.approveUser(userId); toast.success('User approved'); loadUsers(); } catch { toast.error('Failed'); }
  };

  const handleBlock = async (userId) => {
    if (isReadOnly) return toast.error('You do not have permission');
    try { await apiService.blockUser(userId); toast.success('User blocked'); loadUsers(); } catch { toast.error('Failed'); }
  };

  return React.createElement(
    "div",
    { className: "space-y-6" },

    isReadOnly && React.createElement(
      "div",
      { className: "p-4 bg-orange-50 dark:bg-orange-950 rounded-lg flex items-start gap-3" },
      React.createElement(Lock, { className: "h-5 w-5 text-orange-600 mt-0.5" }),
      React.createElement(
        "div",
        null,
        React.createElement("p", { className: "text-sm text-orange-900 dark:text-orange-100" }, "Read-Only Mode"),
        React.createElement("p", { className: "text-xs text-orange-700 dark:text-orange-400 mt-1" },
          "You are logged in as a Viewer. You can view data but cannot make changes.")
      )
    ),

    React.createElement(
      "div",
      { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" },
      React.createElement(
        "div",
        null,
        React.createElement("h1", { className: "text-gray-900 dark:text-white mb-1" }, "User Management"),
        React.createElement("p", { className: "text-sm text-gray-600 dark:text-gray-400" }, "Manage all platform users")
      ),
      React.createElement(Button, { className: "bg-gradient-to-r from-blue-600 to-purple-600" },
        React.createElement(Download, { className: "h-4 w-4 mr-2" }), "Export Users")
    ),

    // --- Search Filters Section ---
    React.createElement(
      Card,
      null,
      React.createElement(
        CardContent,
        { className: "p-4" },
        React.createElement(
          "div",
          { className: "flex flex-col md:flex-row gap-3" },
          React.createElement(
            "div",
            { className: "relative flex-1" },
            React.createElement(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" }),
            React.createElement(Input, {
              placeholder: "Search by name or email...",
              className: "pl-10",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value)
            })
          ),

          React.createElement(
            Select, { value: roleFilter, onValueChange: setRoleFilter },
            React.createElement(SelectTrigger, { className: "w-full md:w-40" },
              React.createElement(SelectValue, { placeholder: "Role" })
            ),
            React.createElement(
              SelectContent,
              null,
              React.createElement(SelectItem, { value: "all" }, "All Roles"),
              React.createElement(SelectItem, { value: "buyer" }, "Buyer"),
              React.createElement(SelectItem, { value: "seller" }, "Seller")
            )
          ),

          React.createElement(
            Select, { value: statusFilter, onValueChange: setStatusFilter },
            React.createElement(SelectTrigger, { className: "w-full md:w-40" },
              React.createElement(SelectValue, { placeholder: "Status" })
            ),
            React.createElement(
              SelectContent,
              null,
              React.createElement(SelectItem, { value: "all" }, "All Status"),
              React.createElement(SelectItem, { value: "active" }, "Active"),
              React.createElement(SelectItem, { value: "suspended" }, "Suspended"),
              React.createElement(SelectItem, { value: "pending" }, "Pending")
            )
          ),

          React.createElement(Button, { variant: "outline" },
            React.createElement(Filter, { className: "h-4 w-4 mr-2" }), "Filters")
        )
      )
    ),

    // --- Users Table ---
    React.createElement(
      Card,
      null,
      React.createElement(
        CardHeader,
        null,
        React.createElement(CardTitle, null, "All Users"),
        React.createElement(CardDescription, null, `Total: ${users.length} users`)
      ),
      React.createElement(
        CardContent,
        null,
        loading
          ? React.createElement("div", { className: "text-center py-8" },
              React.createElement("p", { className: "text-gray-600 dark:text-gray-400" }, "Loading users..."))
          : React.createElement(
              "div",
              { className: "overflow-x-auto" },
              React.createElement(
                Table,
                null,
                React.createElement(
                  TableHeader,
                  null,
                  React.createElement(
                    TableRow,
                    null,
                    React.createElement(TableHead, null, "User"),
                    React.createElement(TableHead, null, "Role"),
                    React.createElement(TableHead, null, "Status"),
                    React.createElement(TableHead, null, "Joined"),
                    React.createElement(TableHead, null, "Total Bids"),
                    React.createElement(TableHead, { className: "text-right" }, "Actions")
                  )
                ),

                React.createElement(
                  TableBody,
                  null,
                  users.length > 0
                    ? users.map(user =>
                        React.createElement(
                          TableRow,
                          { key: user.id, className: "hover:bg-gray-50 dark:hover:bg-gray-900" },
                          React.createElement(
                            TableCell,
                            null,
                            React.createElement(
                              "div",
                              { className: "flex items-center gap-3" },
                              React.createElement(
                                Avatar,
                                null,
                                React.createElement(
                                  AvatarFallback,
                                  { className: "bg-gradient-to-br from-blue-500 to-purple-500 text-white" },
                                  user.name.split(' ').map(n => n[0]).join('')
                                )
                              ),
                              React.createElement(
                                "div",
                                null,
                                React.createElement("p", { className: "text-sm" }, user.name),
                                React.createElement("p", { className: "text-xs text-gray-500" }, user.email)
                              )
                            )
                          ),
                          React.createElement(TableCell, null,
                            React.createElement(Badge, { variant: "outline" }, user.role)
                          ),
                          React.createElement(TableCell, null,
                            React.createElement(Badge, {
                              variant:
                                user.status === 'Active' || user.status === 'Approved'
                                  ? 'default'
                                  : user.status === 'Suspended' || user.status === 'Blocked'
                                  ? 'destructive'
                                  : 'secondary'
                            }, user.status)
                          ),
                          React.createElement(TableCell, { className: "text-sm text-gray-600 dark:text-gray-400" }, user.joined),
                          React.createElement(TableCell, { className: "text-sm" }, user.bids),

                          // Actions
                          React.createElement(
                            TableCell,
                            { className: "text-right" },
                            React.createElement(
                              DropdownMenu,
                              null,
                              React.createElement(
                                DropdownMenuTrigger,
                                { asChild: true },
                                React.createElement(
                                  Button,
                                  { variant: "ghost", size: "icon", disabled: isReadOnly },
                                  React.createElement(MoreVertical, { className: "h-4 w-4" })
                                )
                              ),
                              React.createElement(
                                DropdownMenuContent,
                                { align: "end" },
                                React.createElement(
                                  DropdownMenuItem,
                                  { onClick: () => { setSelectedUser(user); setIsEditModalOpen(true); } },
                                  React.createElement(Eye, { className: "mr-2 h-4 w-4" }), "View Profile"
                                ),
                                React.createElement(
                                  DropdownMenuItem,
                                  { onClick: () => { setSelectedUser(user); setIsEditModalOpen(true); } },
                                  React.createElement(Edit, { className: "mr-2 h-4 w-4" }), "Edit User"
                                ),
                                React.createElement(
                                  DropdownMenuItem,
                                  null,
                                  React.createElement(Shield, { className: "mr-2 h-4 w-4" }), "Change Role"
                                ),

                                (user.status === 'Active' || user.status === 'Approved')
                                  ? React.createElement(
                                      DropdownMenuItem,
                                      { className: "text-red-600", onClick: () => handleBlock(user.id) },
                                      React.createElement(UserX, { className: "mr-2 h-4 w-4" }), "Suspend User"
                                    )
                                  : React.createElement(
                                      DropdownMenuItem,
                                      { className: "text-green-600", onClick: () => handleApprove(user.id) },
                                      React.createElement(UserCheck, { className: "mr-2 h-4 w-4" }), "Activate User"
                                    ),

                                React.createElement(
                                  DropdownMenuItem,
                                  { className: "text-red-600", onClick: () => handleDelete(user.id) },
                                  React.createElement(UserX, { className: "mr-2 h-4 w-4" }), "Delete User"
                                )
                              )
                            )
                          )
                        )
                      )
                    : React.createElement(
                        TableRow,
                        null,
                        React.createElement(
                          TableCell,
                          { colSpan: 6, className: "text-center py-8 text-gray-500" },
                          "No users found"
                        )
                      )
                )
              )
            )
      )
    ),

    // ---- Pagination Footer ----
    React.createElement(
      "div",
      { className: "flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800" },
      React.createElement("p", { className: "text-sm text-gray-600 dark:text-gray-400" },
        `Showing 1 to ${users.length} of ${users.length} results`
      ),
      React.createElement(
        "div",
        { className: "flex gap-2" },
        React.createElement(Button, { variant: "outline", size: "sm", disabled: true }, "Previous"),
        React.createElement(Button, { variant: "outline", size: "sm" }, "Next")
      )
    ),

    // ---- Edit / View Modal ----
    React.createElement(
      Dialog,
      { open: isEditModalOpen, onOpenChange: setIsEditModalOpen },
      React.createElement(
        DialogContent,
        null,
        React.createElement(DialogHeader, null,
          React.createElement(DialogTitle, null, "User Profile"),
          React.createElement(DialogDescription, null, "View and edit user details")
        ),

        selectedUser && React.createElement(
          "div",
          { className: "space-y-4" },

          React.createElement(
            "div",
            { className: "flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg" },
            React.createElement(
              Avatar,
              { className: "w-16 h-16" },
              React.createElement(
                AvatarFallback,
                { className: "bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl" },
                selectedUser.name.split(' ').map(n => n[0]).join('')
              )
            ),
            React.createElement(
              "div",
              null,
              React.createElement("p", null, selectedUser.name),
              React.createElement("p", { className: "text-sm text-gray-500" }, selectedUser.email)
            )
          ),

          React.createElement(
            "div",
            { className: "grid grid-cols-2 gap-4" },
            React.createElement(
              "div",
              { className: "space-y-2" },
              React.createElement(Label, null, "Role"),
              React.createElement(
                Select,
                { defaultValue: selectedUser.role.toLowerCase() },
                React.createElement(SelectTrigger, null,
                  React.createElement(SelectValue, null)
                ),
                React.createElement(
                  SelectContent,
                  null,
                  React.createElement(SelectItem, { value: "buyer" }, "Buyer"),
                  React.createElement(SelectItem, { value: "seller" }, "Seller")
                )
              )
            ),

            React.createElement(
              "div",
              { className: "space-y-2" },
              React.createElement(Label, null, "Status"),
              React.createElement(
                Select,
                { defaultValue: selectedUser.status.toLowerCase() },
                React.createElement(SelectTrigger, null,
                  React.createElement(SelectValue, null)
                ),
                React.createElement(
                  SelectContent,
                  null,
                  React.createElement(SelectItem, { value: "active" }, "Active"),
                  React.createElement(SelectItem, { value: "suspended" }, "Suspended"),
                  React.createElement(SelectItem, { value: "pending" }, "Pending")
                )
              )
            )
          ),

          React.createElement(
            "div",
            { className: "grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg" },
            React.createElement(
              "div",
              null,
              React.createElement("p", { className: "text-sm text-gray-500" }, "Joined Date"),
              React.createElement("p", { className: "text-sm" }, selectedUser.joined)
            ),
            React.createElement(
              "div",
              null,
              React.createElement("p", { className: "text-sm text-gray-500" }, "Total Bids"),
              React.createElement("p", { className: "text-sm" }, selectedUser.bids)
            )
          ),

          // ✅ Final Fixed Buttons — this is where your error was
          React.createElement(
            DialogFooter,
            null,
            React.createElement(
              Button,
              { variant: "outline", onClick: () => setIsEditModalOpen(false) },
              "Cancel"
            ),
            React.createElement(Button, null, "Save Changes")
          )
        )
      )
    )
  );
}
