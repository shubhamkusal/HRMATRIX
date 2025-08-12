import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import PortalSelector from './pages/PortalSelector';
import AdminPortal from './pages/AdminPortal';
import EmployeePortal from './pages/EmployeePortal';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/portals" element={<PortalSelector />} />
            <Route path="/admin/*" element={<AdminPortal />} />
            <Route path="/employee/*" element={<EmployeePortal />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
