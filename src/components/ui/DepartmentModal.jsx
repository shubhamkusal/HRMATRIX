import React, { useState, useEffect, useMemo } from 'react';
import { useData } from '../../contexts/DataContext';

const DepartmentModal = ({ isOpen, onClose, onSave, department }) => {
  const { employees } = useData();
  const [formData, setFormData] = useState({
    name: '',
    managerId: ''
  });

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || '',
        managerId: department.managerId || ''
      });
    } else {
      setFormData({ name: '', managerId: '' });
    }
  }, [department, isOpen]);

  const managerOptions = useMemo(() => employees.map(e => ({ id: e.id, name: e.name, position: e.position })), [employees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {department ? 'Edit Department' : 'Add New Department'}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Enter the details for the {department ? 'selected' : 'new'} department.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Product Design" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign Manager</label>
                  <select name="managerId" value={formData.managerId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select a manager</option>
                    {managerOptions.map(mgr => <option key={mgr.id} value={mgr.id}>{mgr.name} ({mgr.position})</option>)}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                {department ? 'Update' : 'Add Department'}
              </button>
              <button type="button" className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepartmentModal;
