import { Search, Moon, Sun, Bell, User, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTheme } from './ThemeProvider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import React from 'react';

export function TopNavbar({
  onNavigate,
  onToggleMobileSidebar
}) {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return /*#__PURE__*/React.createElement("div", {
    className: "h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 flex-1"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon",
    onClick: onToggleMobileSidebar,
    className: "md:hidden"
  }, /*#__PURE__*/React.createElement(Menu, {
    className: "h-5 w-5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 max-w-md hidden sm:block"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search users, products, orders...",
    className: "pl-10"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-2 w-2 bg-green-500 rounded-full animate-pulse"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-green-700 dark:text-green-400"
  }, "Session: 45:23")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon",
    onClick: toggleTheme
  }, theme === 'light' ? /*#__PURE__*/React.createElement(Moon, {
    className: "h-5 w-5"
  }) : /*#__PURE__*/React.createElement(Sun, {
    className: "h-5 w-5"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon",
    className: "relative",
    onClick: () => onNavigate('notifications')
  }, /*#__PURE__*/React.createElement(Bell, {
    className: "h-5 w-5"
  }), /*#__PURE__*/React.createElement(Badge, {
    className: "absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
  }, "3")), /*#__PURE__*/React.createElement(DropdownMenu, null, /*#__PURE__*/React.createElement(DropdownMenuTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    className: "gap-2"
  }, /*#__PURE__*/React.createElement(Avatar, {
    className: "h-8 w-8"
  }, /*#__PURE__*/React.createElement(AvatarFallback, {
    className: "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
  }, "SA")), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block text-left"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "Super Admin"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 dark:text-gray-400"
  }, "admin@bidmaster.com")))), /*#__PURE__*/React.createElement(DropdownMenuContent, {
    align: "end",
    className: "w-56"
  }, /*#__PURE__*/React.createElement(DropdownMenuLabel, null, "My Account"), /*#__PURE__*/React.createElement(DropdownMenuSeparator, null), /*#__PURE__*/React.createElement(DropdownMenuItem, null, /*#__PURE__*/React.createElement(User, {
    className: "mr-2 h-4 w-4"
  }), "Profile Settings"), /*#__PURE__*/React.createElement(DropdownMenuItem, {
    onClick: () => onNavigate('notifications')
  }, /*#__PURE__*/React.createElement(Bell, {
    className: "mr-2 h-4 w-4"
  }), "Notifications"), /*#__PURE__*/React.createElement(DropdownMenuSeparator, null), /*#__PURE__*/React.createElement(DropdownMenuItem, {
    onClick: () => onNavigate('login'),
    className: "text-red-600"
  }, "Logout")))));
}