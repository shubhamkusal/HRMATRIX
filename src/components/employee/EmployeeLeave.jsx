import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import { format, addDays } from 'date-fns';
import {
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter
} from 'lucide-react';

const EmployeeLeave = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock leave data
  const leaveBalance = {
    vacation: { available: 12, used: 8, total: 20 },
    sick: { available: 8, used: 2, total: 10 },
    personal: { available: 3, used: 2, total: 5 }
  };

  const leaveRequests = [
    {
      id: 1,
      type: 'Vacation',
      startDate: new Date('2025-02-15'),
      endDate: new Date('2025-02-17'),
      days: 3,
      reason: 'Family vacation',
      status: 'approved',
      appliedDate: new Date('2025-01-10'),
      approvedBy: 'Sarah Johnson'
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: new Date('2025-01-28'),
      endDate: new Date('2025-01-28'),
      days: 1,
      reason: 'Medical appointment',
      status: 'pending',
      appliedDate: new Date('2025-01-25'),
      approvedBy: null
    },
    {
      id: 3,
      type: 'Personal',
      startDate: new Date('2025-03-05'),
      endDate: new Date('2025-03-06'),
      days: 2,
      reason: 'Personal matters',
      status: 'rejected',
      appliedDate: new Date('2025-01-20'),
      approvedBy: 'Sarah Johnson',
      rejectionReason: 'Conflicts with project deadline'
    }
  ];

  const upcomingLeave = leaveRequests.filter(req => 
    req.status === 'approved' && req.startDate > new Date()
  );

  const filteredRequests = selectedFilter === 'all' 
    ? leaveRequests 
    : leaveRequests.filter(req => req.status === selectedFilter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case 'Vacation': return 'bg-blue-100 text-blue-800';
      case 'Sick Leave': return 'bg-red-100 text-red-800';
      case 'Personal': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Requests</h1>
          <p className="text-gray-600 mt-2">Manage your time off and leave balance</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Request Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(leaveBalance).map(([type, balance], index) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {type === 'vacation' ? 'Vacation Days' : type === 'sick' ? 'Sick Leave' : 'Personal Days'}
              </h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Available</span>
                <span className="text-2xl font-bold text-green-600">{balance.available}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Used</span>
                <span className="text-lg font-semibold text-gray-900">{balance.used}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-700">Total</span>
                <span className="text-lg font-semibold text-gray-900">{balance.total}</span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(balance.used / balance.total) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((balance.used / balance.total) * 100)}% used
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Leave */}
      {upcomingLeave.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Upcoming Time Off</h3>
          <div className="space-y-3">
            {upcomingLeave.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {format(leave.startDate, 'MMM d')} - {format(leave.endDate, 'MMM d, yyyy')}
                  </p>
                  <p className="text-sm text-gray-600">
                    {leave.type} • {leave.days} {leave.days === 1 ? 'day' : 'days'}
                  </p>
                </div>
                <span className="text-green-600 font-medium">Approved</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Leave Requests List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h3 className="text-lg font-semibold text-gray-900">Leave History</h3>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="mt-4 sm:mt-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredRequests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    {getStatusIcon(request.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getLeaveTypeColor(request.type)}`}>
                        {request.type}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">
                        {format(request.startDate, 'MMM d')} - {format(request.endDate, 'MMM d, yyyy')}
                        <span className="text-gray-500 ml-2">
                          ({request.days} {request.days === 1 ? 'day' : 'days'})
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">{request.reason}</p>
                      <p className="text-xs text-gray-500">
                        Applied on {format(request.appliedDate, 'MMM d, yyyy')}
                        {request.approvedBy && (
                          <span> • {request.status === 'approved' ? 'Approved' : 'Reviewed'} by {request.approvedBy}</span>
                        )}
                      </p>
                      {request.status === 'rejected' && request.rejectionReason && (
                        <p className="text-xs text-red-600 mt-2">
                          Reason: {request.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Request Leave Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Request Time Off
                </h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Leave Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Vacation</option>
                      <option>Sick Leave</option>
                      <option>Personal</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Please provide a reason for your leave request"
                    />
                  </div>
                </form>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeave;
