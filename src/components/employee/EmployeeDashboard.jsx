import React from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import {
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Users,
  Coffee,
  Play,
  Pause
} from 'lucide-react';

const EmployeeDashboard = () => {
  const [isClocked, setIsClocked] = React.useState(true);
  const [timeWorked, setTimeWorked] = React.useState('7:32:15');

  // Mock data for employee dashboard
  const todayStats = {
    clockIn: '09:15 AM',
    hoursWorked: '7.5',
    breaksTaken: '2',
    tasksCompleted: '8'
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'Team Standup',
      time: '10:00 AM',
      type: 'meeting',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      title: 'Project Review',
      time: '2:00 PM',
      type: 'meeting',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 3,
      title: 'Lunch Break',
      time: '12:30 PM',
      type: 'break',
      color: 'bg-green-100 text-green-800'
    }
  ];

  const recentTasks = [
    {
      id: 1,
      title: 'Update user authentication module',
      status: 'completed',
      dueDate: 'Today',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Review pull requests',
      status: 'in-progress',
      dueDate: 'Today',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Write documentation for API endpoints',
      status: 'pending',
      dueDate: 'Tomorrow',
      priority: 'low'
    }
  ];

  const leaveBalance = {
    vacation: 12,
    sick: 8,
    personal: 3
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Quick Actions & Time Clock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Time Clock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Time Clock</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isClocked ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isClocked ? 'Clocked In' : 'Clocked Out'}
            </span>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{timeWorked}</div>
            <p className="text-gray-600 mb-6">Time worked today</p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsClocked(!isClocked)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  isClocked 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isClocked ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isClocked ? 'Clock Out' : 'Clock In'}
              </button>
              
              <button className="flex items-center px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                <Coffee className="w-5 h-5 mr-2" />
                Break
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Clock In</span>
              <span className="font-medium text-gray-900">{todayStats.clockIn}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Hours Worked</span>
              <span className="font-medium text-gray-900">{todayStats.hoursWorked}h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Breaks Taken</span>
              <span className="font-medium text-gray-900">{todayStats.breaksTaken}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tasks Done</span>
              <span className="font-medium text-gray-900">{todayStats.tasksCompleted}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${event.color}`}>
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leave Balance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Leave Balance</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-900">Vacation Days</span>
              <span className="text-2xl font-bold text-blue-600">{leaveBalance.vacation}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="font-medium text-red-900">Sick Days</span>
              <span className="text-2xl font-bold text-red-600">{leaveBalance.sick}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="font-medium text-purple-900">Personal Days</span>
              <span className="text-2xl font-bold text-purple-600">{leaveBalance.personal}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  {task.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority).replace('text-', 'bg-')}`} />
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeDashboard;
