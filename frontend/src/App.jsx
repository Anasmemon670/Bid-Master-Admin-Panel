import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { AppSidebar } from './components/AppSidebar';
import { TopNavbar } from './components/TopNavbar';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { ProductManagementPage } from './pages/ProductManagementPage';
import { OrderManagementPage } from './pages/OrderManagementPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { Toaster } from './components/ui/sonner';
import React from 'react';
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const [userRole, setUserRole] = useState('super-admin');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const handleLogin = role => {
    setUserRole(role);
    setIsAuthenticated(true);
  };
  const handleNavigate = page => {
    if (page === 'login') {
      setIsAuthenticated(false);
    } else {
      setCurrentPage(page);
    }
    setIsMobileSidebarOpen(false);
  };
  if (!isAuthenticated) {
    return /*#__PURE__*/React.createElement(ThemeProvider, null, /*#__PURE__*/React.createElement(LoginPage, {
      onLogin: handleLogin
    }), /*#__PURE__*/React.createElement(Toaster, null));
  }
  return /*#__PURE__*/React.createElement(ThemeProvider, null, /*#__PURE__*/React.createElement("div", {
    className: "h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block"
  }, /*#__PURE__*/React.createElement(AppSidebar, {
    currentPage: currentPage,
    onNavigate: handleNavigate,
    isCollapsed: isSidebarCollapsed,
    onToggleCollapse: () => setIsSidebarCollapsed(!isSidebarCollapsed),
    userRole: userRole
  })), isMobileSidebarOpen && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/50 z-40 md:hidden",
    onClick: () => setIsMobileSidebarOpen(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-y-0 left-0 z-50 md:hidden"
  }, /*#__PURE__*/React.createElement(AppSidebar, {
    currentPage: currentPage,
    onNavigate: handleNavigate,
    isCollapsed: false,
    onToggleCollapse: () => {},
    userRole: userRole
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col overflow-hidden"
  }, /*#__PURE__*/React.createElement(TopNavbar, {
    onNavigate: handleNavigate,
    onToggleMobileSidebar: () => setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-y-auto p-4 md:p-6"
  }, currentPage === 'dashboard' && /*#__PURE__*/React.createElement(DashboardPage, {
    userRole: userRole
  }), currentPage === 'users' && /*#__PURE__*/React.createElement(UserManagementPage, {
    userRole: userRole
  }), currentPage === 'products' && /*#__PURE__*/React.createElement(ProductManagementPage, {
    userRole: userRole
  }), currentPage === 'orders' && /*#__PURE__*/React.createElement(OrderManagementPage, {
    userRole: userRole
  }), currentPage === 'analytics' && /*#__PURE__*/React.createElement(AnalyticsPage, null), currentPage === 'notifications' && /*#__PURE__*/React.createElement(NotificationsPage, null), currentPage === 'settings' && /*#__PURE__*/React.createElement(SettingsPage, {
    userRole: userRole
  })))), /*#__PURE__*/React.createElement(Toaster, null));
}