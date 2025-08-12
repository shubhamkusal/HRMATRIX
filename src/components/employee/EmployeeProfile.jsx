import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import toast from 'react-hot-toast';
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
  Camera
} from 'lucide-react';

const EmployeeProfile = () => {
  const { user } = useAuth();
  const { getEmployeeById, updateEmployee } = useData();
  
  const [employeeData, setEmployeeData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    if (user) {
      setEmployeeData(getEmployeeById(user.id));
    }
  }, [user, getEmployeeById]);

  const handleInputChange = (field, value) => {
    setEmployeeData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateEmployee(employeeData);
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEmployeeData(getEmployeeById(user.id)); // Reset changes
    setIsEditing(false);
  };

  if (!employeeData) {
    return <div>Loading profile...</div>;
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'work', label: 'Work Details', icon: Building }
  ];

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoField label="Full Name" value={employeeData.name} field="name" isEditing={isEditing} onChange={handleInputChange} />
      <InfoField label="Email" value={employeeData.email} field="email" type="email" isEditing={isEditing} onChange={handleInputChange} />
      <InfoField label="Phone" value={employeeData.phone} field="phone" type="tel" isEditing={isEditing} onChange={handleInputChange} />
      <InfoField label="Location" value={employeeData.location} field="location" isEditing={isEditing} onChange={handleInputChange} />
    </div>
  );

  const renderWorkInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoField label="Department" value={employeeData.department} isEditing={false} />
      <InfoField label="Position" value={employeeData.position} isEditing={false} />
      <InfoField label="Join Date" value={new Date(employeeData.joinDate).toLocaleDateString()} isEditing={false} />
      <InfoField label="Salary" value={`$${employeeData.salary.toLocaleString()}`} isEditing={false} />
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div><h1 className="text-3xl font-bold text-gray-900">My Profile</h1><p className="text-gray-600 mt-2">View and manage your personal information</p></div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          {isEditing ? (
            <><button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"><Save className="w-4 h-4 mr-2" />Save</button><button onClick={handleCancel} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center"><X className="w-4 h-4 mr-2" />Cancel</button></>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"><Edit className="w-4 h-4 mr-2" />Edit Profile</button>
          )}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative"><img src={employeeData.avatar} alt={employeeData.name} className="w-24 h-24 rounded-full" />{isEditing && (<button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"><Camera className="w-4 h-4" /></button>)}</div>
          <div className="text-center sm:text-left"><h2 className="text-2xl font-bold text-gray-900">{employeeData.name}</h2><p className="text-lg text-gray-600">{employeeData.position}</p><p className="text-gray-500">{employeeData.department}</p></div>
        </div>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200"><nav className="flex space-x-8 px-6">{tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><div className="flex items-center"><tab.icon className="w-4 h-4 mr-2" />{tab.label}</div></button>))}</nav></div>
        <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="p-6">
          {activeTab === 'personal' && renderPersonalInfo()}
          {activeTab === 'work' && renderWorkInfo()}
        </motion.div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value, field, type = 'text', isEditing, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {isEditing && onChange ? (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    ) : (
      <p className="text-gray-900 h-10 flex items-center">{value}</p>
    )}
  </div>
);

export default EmployeeProfile;
