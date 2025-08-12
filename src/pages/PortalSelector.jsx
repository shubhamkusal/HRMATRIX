import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Settings, User, Users, ArrowLeft } from 'lucide-react';

const PortalSelector = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const portals = [
    {
      id: 'admin',
      title: 'Admin Portal',
      description: 'Full access to all HR management features',
      icon: Settings,
      path: '/admin',
      color: 'bg-blue-600',
      available: user.role === 'admin'
    },
    {
      id: 'employee',
      title: 'Employee Portal',
      description: 'Access your personal HR information and tools',
      icon: User,
      path: '/employee',
      color: 'bg-green-600',
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">HRMatrix</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Welcome back,</p>
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Portal
          </h2>
          <p className="text-lg text-gray-600">
            Select the portal that matches your role and access level
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {portals.map((portal, index) => (
            <motion.div
              key={portal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {portal.available ? (
                <Link
                  to={portal.path}
                  className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 text-center group"
                >
                  <div className={`w-16 h-16 ${portal.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <portal.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {portal.title}
                  </h3>
                  <p className="text-gray-600">
                    {portal.description}
                  </p>
                </Link>
              ) : (
                <div className="bg-gray-100 rounded-2xl p-8 text-center opacity-50 cursor-not-allowed">
                  <div className="w-16 h-16 bg-gray-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <portal.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-500 mb-2">
                    {portal.title}
                  </h3>
                  <p className="text-gray-400">
                    Access restricted
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortalSelector;
