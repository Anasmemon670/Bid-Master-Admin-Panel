import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { AppSidebar } from './components/AppSidebar';
import { TopNavbar } from './components/TopNavbar';
import { LoginPage, UserRole } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { ProductManagementPage } from './pages/ProductManagementPage';
import { OrderManagementPage } from './pages/OrderManagementPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('super-admin');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleNavigate = (page: string) => {
    if (page === 'login') {
      setIsAuthenticated(false);
    } else {
      setCurrentPage(page);
    }
    setIsMobileSidebarOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <AppSidebar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            userRole={userRole}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 z-50 md:hidden">
              <AppSidebar
                currentPage={currentPage}
                onNavigate={handleNavigate}
                isCollapsed={false}
                onToggleCollapse={() => {}}
                userRole={userRole}
              />
            </div>
          </>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navbar */}
          <TopNavbar 
            onNavigate={handleNavigate}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {currentPage === 'dashboard' && <DashboardPage userRole={userRole} />}
            {currentPage === 'users' && <UserManagementPage userRole={userRole} />}
            {currentPage === 'products' && <ProductManagementPage userRole={userRole} />}
            {currentPage === 'orders' && <OrderManagementPage userRole={userRole} />}
            {currentPage === 'analytics' && <AnalyticsPage />}
            {currentPage === 'notifications' && <NotificationsPage />}
            {currentPage === 'settings' && <SettingsPage userRole={userRole} />}
          </main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
