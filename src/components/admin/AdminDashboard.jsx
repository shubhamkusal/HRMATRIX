import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Employees',
      value: '247',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Present Today',
      value: '201',
      change: '81%',
      changeType: 'neutral',
      icon: UserCheck,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Leave',
      value: '23',
      change: '+5',
      changeType: 'increase',
      icon: Calendar,
      color: 'bg-yellow-500'
    },
    {
      title: 'Monthly Payroll',
      value: '$1.2M',
      change: '+8%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  const departmentData = [
    { name: 'Engineering', employees: 89, color: '#3b82f6' },
    { name: 'Sales', employees: 67, color: '#10b981' },
    { name: 'Marketing', employees: 43, color: '#f59e0b' },
    { name: 'HR', employees: 28, color: '#ef4444' },
    { name: 'Finance', employees: 20, color: '#8b5cf6' }
  ];

  const attendanceData = [
    { day: 'Mon', present: 234, absent: 13 },
    { day: 'Tue', present: 241, absent: 6 },
    { day: 'Wed', present: 229, absent: 18 },
    { day: 'Thu', present: 245, absent: 2 },
    { day: 'Fri', present: 201, absent: 46 }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'leave',
      title: 'Leave request approved',
      description: 'John Doe - 3 days vacation leave',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'employee',
      title: 'New employee onboarded',
      description: 'Sarah Johnson joined Engineering team',
      time: '4 hours ago',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Overtime alert',
      description: 'Mike Wilson exceeded 40 hours this week',
      time: '1 day ago',
      icon: AlertCircle,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at your company today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className={`text-sm mt-2 ${
                  stat.changeType === 'increase' ? 'text-green-600' : 
                  stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="employees"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {departmentData.map((dept) => (
              <div key={dept.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: dept.color }}
                />
                <span className="text-sm text-gray-600">{dept.name}</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">{dept.employees}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Attendance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Attendance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#3b82f6" name="Present" />
                <Bar dataKey="absent" fill="#ef4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
