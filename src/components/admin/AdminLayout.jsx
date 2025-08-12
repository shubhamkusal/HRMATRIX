import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import {
  Users,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  LayoutDashboard,
  ListTodo,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Megaphone,
  Gift,
  FileBarChart,
  BarChart3
} from 'lucide-react';

const SidebarLink = ({ item, location }) => {
  const isActive = location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href));
  return (
    <Link
      to={item.href}
      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <item.icon className={`mr-3 w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
      {item.name}
    </Link>
  );
};

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    {
      category: 'HR Management',
      items: [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Employee Directory', href: '/admin/employees', icon: Users },
        { name: 'Departments', href: '/admin/departments', icon: Building2 },
        { name: 'Tasks', href: '/admin/tasks', icon: ListTodo },
        { name: 'Leave Management', href: '/admin/leave', icon: Calendar },
        { name: 'Time Tracking', href: '/admin/time-tracking', icon: Clock },
        { name: 'Payroll', href: '/admin/payroll', icon: DollarSign },
      ]
    },
    {
      category: 'Talent Management',
      items: [
        { name: 'Recruitment', href: '/admin/recruitment', icon: Briefcase },
        { name: 'Performance', href: '/admin/performance', icon: TrendingUp },
        { name: 'Learning & Development', href: '/admin/learning', icon: GraduationCap },
      ]
    },
    {
      category: 'Company',
      items: [
        { name: 'Announcements', href: '/admin/announcements', icon: Megaphone },
        { name: 'Documents', href: '/admin/documents', icon: FileText },
        { name: 'Benefits', href: '/admin/benefits', icon: Gift },
      ]
    },
    {
      category: 'Analytics',
      items: [
        { name: 'Reports', href: '/admin/reports', icon: FileBarChart },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900">HRMSuite</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <nav className="mt-5 flex-1 overflow-y-auto">
          <div className="px-4 space-y-6">
            {navigation.map((navGroup) => (
              <div key={navGroup.category}>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {navGroup.category}
                </h3>
                <div className="space-y-1">
                  {navGroup.items.map((item) => (
                    <SidebarLink key={item.name} item={item} location={location} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center mb-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900"
          >
            <LogOut className="mr-3 w-5 h-5 text-gray-400" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6 text-gray-400" />
            </button>

            <div className="flex-1 flex items-center justify-center lg:justify-start">
              <div className="w-full max-w-lg lg:max-w-xs">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees, departments..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
