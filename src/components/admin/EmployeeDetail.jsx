import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import PageHeader from '../ui/PageHeader';
import { ArrowLeft, Mail, Phone, MapPin, Building, Calendar, DollarSign, User } from 'lucide-react';

const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const { getEmployeeById } = useData();
  const navigate = useNavigate();
  const employee = getEmployeeById(employeeId);

  if (!employee) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Employee not found</h2>
        <button onClick={() => navigate('/admin/employees')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Back to Directory
        </button>
      </div>
    );
  }

  const details = [
    { label: 'Full Name', value: employee.name, icon: User },
    { label: 'Email Address', value: employee.email, icon: Mail },
    { label: 'Phone Number', value: employee.phone, icon: Phone },
    { label: 'Location', value: employee.location, icon: MapPin },
    { label: 'Department', value: employee.department, icon: Building },
    { label: 'Position', value: employee.position, icon: User },
    { label: 'Join Date', value: new Date(employee.joinDate).toLocaleDateString(), icon: Calendar },
    { label: 'Status', value: employee.status, icon: User },
  ];

  return (
    <div className="p-6">
      <PageHeader title="Employee Profile">
        <button
          onClick={() => navigate('/admin/employees')}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Directory
        </button>
      </PageHeader>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-24 h-24 rounded-full"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
              <p className="text-lg text-gray-600">{employee.position}</p>
              <p className="text-gray-500">{employee.department}</p>
              <span className={`mt-2 inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${
                employee.status === 'active' ? 'bg-green-100 text-green-800' :
                employee.status === 'inactive' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {employee.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Personal & Work Information</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.label}</p>
                  <p className="text-md font-semibold text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeDetail;
