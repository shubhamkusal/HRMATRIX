import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Edit,
  Save,
  X,
  Camera,
  Download
} from 'lucide-react';

const EmployeeProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Mock extended user data
  const profileData = {
    personal: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1990-05-15',
      address: '123 Main St, San Francisco, CA 94102',
      emergencyContact: 'Jane Doe - +1 (555) 987-6543'
    },
    work: {
      employeeId: 'EMP001',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      manager: 'Sarah Johnson',
      startDate: '2022-03-15',
      workLocation: 'San Francisco Office',
      employmentType: 'Full-time',
      salary: '$95,000'
    },
    benefits: {
      healthInsurance: 'Premium Plan',
      dentalInsurance: 'Basic Plan',
      visionInsurance: 'Standard Plan',
      retirement: '401k - 6% match',
      paidTimeOff: '20 days/year',
      sickLeave: '10 days/year'
    }
  };

  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'work', label: 'Work Details', icon: Building },
    { id: 'benefits', label: 'Benefits', icon: Calendar }
  ];

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
        {isEditing ? (
          <input
            type="text"
            value={formData.personal.firstName}
            onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <p className="text-gray-900">{formData.personal.firstName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
        {isEditing ? (
          <input
            type="text"
            value={formData.personal.lastName}
            onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <p className="text-gray-900">{formData.personal.lastName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        {isEditing ? (
          <input
            type="email"
            value={formData.personal.email}
            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <p className="text-gray-900">{formData.personal.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        {isEditing ? (
          <input
            type="tel"
            value={formData.personal.phone}
            onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <p className="text-gray-900">{formData.personal.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
        {isEditing ? (
          <input
            type="date"
            value={formData.personal.dateOfBirth}
            onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <p className="text-gray-900">{new Date(formData.personal.dateOfBirth).toLocaleDateString()}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        {isEditing ? (
          <input
            type="text"
            value={formData.personal.address}
            onChange={(e) => handleInputChange('personal', 'address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <p className="text-gray-900">{formData.personal.address}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
        {isEditing ? (
          <input
            type="text"
            value={formData.personal.emergencyContact}
            onChange={(e) => handleInputChange('personal', 'emergencyContact', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <p className="text-gray-900">{formData.personal.emergencyContact}</p>
        )}
      </div>
    </div>
  );

  const renderWorkInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
        <p className="text-gray-900">{formData.work.employeeId}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
        <p className="text-gray-900">{formData.work.department}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
        <p className="text-gray-900">{formData.work.position}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
        <p className="text-gray-900">{formData.work.manager}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
        <p className="text-gray-900">{new Date(formData.work.startDate).toLocaleDateString()}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Work Location</label>
        <p className="text-gray-900">{formData.work.workLocation}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
        <p className="text-gray-900">{formData.work.employmentType}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
        <p className="text-gray-900">{formData.work.salary}</p>
      </div>
    </div>
  );

  const renderBenefits = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Health Insurance</label>
        <p className="text-gray-900">{formData.benefits.healthInsurance}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Dental Insurance</label>
        <p className="text-gray-900">{formData.benefits.dentalInsurance}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Vision Insurance</label>
        <p className="text-gray-900">{formData.benefits.visionInsurance}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Retirement Plan</label>
        <p className="text-gray-900">{formData.benefits.retirement}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Paid Time Off</label>
        <p className="text-gray-900">{formData.benefits.paidTimeOff}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sick Leave</label>
        <p className="text-gray-900">{formData.benefits.sickLeave}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">View and manage your personal information</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900">
              {formData.personal.firstName} {formData.personal.lastName}
            </h2>
            <p className="text-lg text-gray-600">{formData.work.position}</p>
            <p className="text-gray-500">{formData.work.department}</p>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {formData.personal.email}
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {formData.personal.phone}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {formData.work.workLocation}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </div>
              </button>
            ))}
          </nav>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          {activeTab === 'personal' && renderPersonalInfo()}
          {activeTab === 'work' && renderWorkInfo()}
          {activeTab === 'benefits' && renderBenefits()}
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
