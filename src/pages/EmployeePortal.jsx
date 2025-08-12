import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeLayout from '../components/employee/EmployeeLayout';
import EmployeeDashboard from '../components/employee/EmployeeDashboard';
import EmployeeSchedule from '../components/employee/EmployeeSchedule';
import EmployeeLeave from '../components/employee/EmployeeLeave';
import EmployeeProfile from '../components/employee/EmployeeProfile';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const EmployeePortal = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <EmployeeLayout>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/schedule" element={<EmployeeSchedule />} />
        <Route path="/leave" element={<EmployeeLeave />} />
        <Route path="/profile" element={<EmployeeProfile />} />
      </Routes>
    </EmployeeLayout>
  );
};

export default EmployeePortal;
