import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import EmployeeDirectory from '../components/admin/EmployeeDirectory';
import Departments from '../components/admin/Departments';
import LeaveManagement from '../components/admin/LeaveManagement';
import TimeTracking from '../components/admin/TimeTracking';
import Payroll from '../components/admin/Payroll';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPortal = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/employees" element={<EmployeeDirectory />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/leave" element={<LeaveManagement />} />
        <Route path="/time-tracking" element={<TimeTracking />} />
        <Route path="/payroll" element={<Payroll />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPortal;
