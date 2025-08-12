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
import Tasks from '../components/admin/Tasks';
import Recruitment from '../components/admin/Recruitment';
import Performance from '../components/admin/Performance';
import LearningDevelopment from '../components/admin/LearningDevelopment';
import Announcements from '../components/admin/Announcements';
import Benefits from '../components/admin/Benefits';
import Reports from '../components/admin/Reports';
import Analytics from '../components/admin/Analytics';
import TeamManagement from '../components/admin/TeamManagement';
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
        <Route path="/teams" element={<TeamManagement />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/leave" element={<LeaveManagement />} />
        <Route path="/time-tracking" element={<TimeTracking />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/learning" element={<LearningDevelopment />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPortal;
