import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import {
  Plus,
  Edit,
  Trash2,
  Users,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

const Departments = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Generate mock department data
  const departments = [
    {
      id: 1,
      name: 'Engineering',
      description: 'Software development and technical operations',
      manager: 'John Smith',
      managerEmail: 'john.smith@company.com',
      managerPhone: '+1 (555) 123-4567',
      employeeCount: 89,
      location: 'San Francisco, CA',
      budget: '$2.5M',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Sales',
      description: 'Revenue generation and client acquisition',
      manager: 'Sarah Johnson',
      managerEmail: 'sarah.johnson@company.com',
      managerPhone: '+1 (555) 234-5678',
      employeeCount: 67,
      location: 'New York, NY',
      budget: '$1.8M',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Marketing',
      description: 'Brand development and customer engagement',
      manager: 'Mike Wilson',
      managerEmail: 'mike.wilson@company.com',
      managerPhone: '+1 (555) 345-6789',
      employeeCount: 43,
      location: 'Los Angeles, CA',
      budget: '$1.2M',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Human Resources',
      description: 'Employee relations and organizational development',
      manager: 'Lisa Brown',
      managerEmail: 'lisa.brown@company.com',
      managerPhone: '+1 (555) 456-7890',
      employeeCount: 28,
      location: 'Chicago, IL',
      budget: '$800K',
      color: 'bg-orange-500'
    },
    {
      id: 5,
      name: 'Finance',
      description: 'Financial planning and accounting operations',
      manager: 'David Chen',
      managerEmail: 'david.chen@company.com',
      managerPhone: '+1 (555) 567-8901',
      employeeCount: 20,
      location: 'Austin, TX',
      budget: '$600K',
      color: 'bg-red-500'
    }
  ];

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedDepartment(null);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600 mt-2">Manage organizational departments and teams</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </button>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department, index) => (
          <motion.div
            key={department.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className={`${department.color} p-6 text-white`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">{department.name}</h3>
                  <p className="text-sm opacity-90">{department.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(department)}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">{department.employeeCount}</span>
                  </div>
                  <p className="text-sm text-gray-600">Employees</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">{department.budget}</div>
                  <p className="text-sm text-gray-600">Budget</p>
                </div>
              </div>

              {/* Manager Info */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Department Manager</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{department.manager}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="truncate">{department.managerEmail}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{department.managerPhone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{department.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {selectedDepartment ? 'Edit Department' : 'Add New Department'}
                </h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department Name
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedDepartment?.name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter department name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      defaultValue={selectedDepartment?.description || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter department description"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manager Name
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedDepartment?.manager || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter manager name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedDepartment?.location || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter location"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedDepartment?.budget || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter budget"
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
                  {selectedDepartment ? 'Update' : 'Create'}
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

export default Departments;
