import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import {
  Users,
  Building2,
  DollarSign,
  UserPlus,
  UserMinus,
  FileWarning,
  AlertTriangle,
  CalendarCheck,
  Clock,
  UploadCloud,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const StatCard = ({ to, title, value, change, icon: Icon, color }) => (
  <Link to={to} className="block">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-full hover:shadow-md hover:-translate-y-1 transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && <p className="text-sm mt-2 text-gray-500">{change}</p>}
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  </Link>
);

const ActionCard = ({ to, title, icon: Icon, color }) => (
    <Link to={to} className="block">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all flex items-center space-x-4`}
        >
            <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
                <h4 className="font-semibold text-gray-900">{title}</h4>
            </div>
        </motion.div>
    </Link>
);

const AdminDashboard = () => {
  const { 
    employees, 
    departments, 
    leaveRequests, 
    departmentEmployeeCounts,
    newHiresThisMonth,
    employeesOnLeaveCount,
    leaveTypeDistribution
  } = useData();

  const pendingLeaveCount = leaveRequests.filter(r => r.status === 'pending').length;

  const stats = [
    {
      to: '/admin/employees',
      title: 'Total Employees',
      value: employees.length,
      change: '+2 this month',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      to: '/admin/employees',
      title: 'New Hires',
      value: newHiresThisMonth,
      change: 'This month',
      icon: UserPlus,
      color: 'bg-green-500'
    },
    {
      to: '/admin/leave',
      title: 'On Leave',
      value: employeesOnLeaveCount,
      change: `${pendingLeaveCount} pending requests`,
      icon: UserMinus,
      color: 'bg-yellow-500'
    },
    {
      to: '/admin/departments',
      title: 'Total Departments',
      value: departments.length,
      change: '+1 this year',
      icon: Building2,
      color: 'bg-indigo-500'
    },
    {
      to: '/admin/payroll',
      title: 'Monthly Payroll',
      value: '$1.2M',
      change: 'Estimate',
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  const quickActions = [
      { to: '/admin/employees', title: 'Add Employee', icon: UserPlus, color: 'bg-blue-500' },
      { to: '/admin/leave', title: 'Approve Leave', icon: CalendarCheck, color: 'bg-green-500' },
      { to: '/admin/time-tracking', title: 'Review Timesheets', icon: Clock, color: 'bg-yellow-500' },
      { to: '/admin/documents', title: 'Upload Document', icon: UploadCloud, color: 'bg-indigo-500' }
  ];

  const alerts = [
      { id: 1, title: 'Contract Expiring', description: "John Doe's contract expires in 15 days.", icon: FileWarning, color: 'text-orange-500' },
      { id: 2, title: 'Overtime Alert', description: "Mike Wilson exceeded 40 hours this week.", icon: AlertTriangle, color: 'text-red-500' },
      { id: 3, title: 'Onboarding Due', description: "Complete onboarding for Sarah Johnson.", icon: UserPlus, color: 'text-blue-500' }
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
      type: 'department',
      title: 'Department Updated',
      description: 'Marketing budget increased by 10%.',
      time: '1 day ago',
      icon: TrendingUp,
      color: 'text-purple-500'
    }
  ];

  const departmentData = departments.map((dept) => ({
    name: dept.name,
    employees: departmentEmployeeCounts[dept.name] || 0,
    fill: dept.color.replace('bg-', '#').replace('-500', '')
  }));

  const attendanceData = [
    { day: 'Mon', present: 234, absent: 13 },
    { day: 'Tue', present: 241, absent: 6 },
    { day: 'Wed', present: 229, absent: 18 },
    { day: 'Thu', present: 245, absent: 2 },
    { day: 'Fri', present: 201, absent: 46 }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time overview of your workforce and HR metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map(action => <ActionCard key={action.title} {...action} />)}
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={110}
                  dataKey="employees"
                  nameKey="name"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

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
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" stackId="a" fill="#3b82f6" name="Present" />
                <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h3>
            </div>
            <div className="p-6 space-y-4">
                {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 pt-0.5">
                        <alert.icon className={`w-5 h-5 ${alert.color}`} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                        <p className="text-sm text-gray-500">{alert.description}</p>
                    </div>
                </div>
                ))}
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Leave Type Breakdown</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leaveTypeDistribution} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip />
                        <Bar dataKey="value" name="Requests">
                          {leaveTypeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
      </div>

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
                <div className="flex-shrink-0 pt-0.5">
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
