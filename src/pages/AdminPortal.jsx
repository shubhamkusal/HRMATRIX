import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import EmployeeDirectory from '../components/admin/EmployeeDirectory';
import Departments from '../components/admin/Departments';
import LeaveManagement from '../components/admin/LeaveManagement';
import TimeTracking from '../components/admin/TimeTracking';
import Payroll from '../components/admin/Payroll';
import Documents from '../components/admin/Documents';
import EmployeeDetail from '../components/admin/EmployeeDetail';
import { useAuth } from '../contexts/AuthContext';

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
        <Route path="/employees/:employeeId" element={<EmployeeDetail />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/leave" element={<LeaveManagement />} />
        <Route path="/time-tracking" element={<TimeTracking />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPortal;
