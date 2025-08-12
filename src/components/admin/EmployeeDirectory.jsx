import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useData } from '../../contexts/DataContext';
import PageHeader from '../ui/PageHeader';
import ConfirmationDialog from '../ui/ConfirmationDialog';
import EmptyState from '../ui/EmptyState';
import EmployeeModal from '../ui/EmployeeModal';
import {
  Search,
  Plus,
  Edit,
  Mail,
  Phone,
  MapPin,
  Download,
  Trash2
} from 'lucide-react';

const EmployeeDirectory = () => {
  const { employees, deleteEmployee, addEmployee, updateEmployee, departments: allDepartments } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const departments = ['all', ...allDepartments.map(d => d.name)];

  const filteredEmployees = useMemo(() => employees.filter(employee => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = employee.name.toLowerCase().includes(searchLower) ||
                         employee.email.toLowerCase().includes(searchLower) ||
                         employee.department.toLowerCase().includes(searchLower);
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  }), [employees, searchTerm, selectedDepartment]);

  const handleAdd = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
  };

  const handleConfirmDelete = () => {
    deleteEmployee(employeeToDelete.id);
    toast.success(`Employee "${employeeToDelete.name}" deleted successfully.`);
    setEmployeeToDelete(null);
  };

  const handleSave = (formData) => {
    if (formData.id) {
      updateEmployee(formData);
      toast.success(`Employee "${formData.name}" updated successfully.`);
    } else {
      addEmployee(formData);
      toast.success(`Employee "${formData.name}" created successfully.`);
    }
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Employee Directory"
        description="Manage and view all employee information"
      >
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </button>
      </PageHeader>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm border-l border-gray-300 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>
      </div>

      {filteredEmployees.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.map((employee, index) => (
              <motion.div
                key={employee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="text-center">
                  <img src={employee.avatar} alt={employee.name} className="w-16 h-16 rounded-full mx-auto mb-4"/>
                  <h3 className="font-semibold text-gray-900 mb-1">{employee.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{employee.position}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    employee.status === 'active' ? 'bg-green-100 text-green-800' :
                    employee.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {employee.status}
                  </span>
                </div>
                
                <div className="mt-4 space-y-2 flex-grow">
                  <div className="flex items-center text-sm text-gray-600"><Mail className="w-4 h-4 mr-2" /><span className="truncate">{employee.email}</span></div>
                  <div className="flex items-center text-sm text-gray-600"><Phone className="w-4 h-4 mr-2" /><span>{employee.phone}</span></div>
                  <div className="flex items-center text-sm text-gray-600"><MapPin className="w-4 h-4 mr-2" /><span>{employee.location}</span></div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
                  <Link to={`/admin/employees/${employee.id}`} className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center text-sm">
                    <Edit className="w-4 h-4 mr-2" />
                    View
                  </Link>
                  <button onClick={() => handleDeleteClick(employee)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee, index) => (
                    <motion.tr key={employee.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: index * 0.02 }} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.email}</div>
                        <div className="text-sm text-gray-500">{employee.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          employee.status === 'active' ? 'bg-green-100 text-green-800' :
                          employee.status === 'inactive' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>{employee.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(employee.joinDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button onClick={() => handleEdit(employee)} className="text-blue-600 hover:text-blue-900 p-1"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteClick(employee)} className="text-gray-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <EmptyState
            title="No employees found"
            message="Your search or filter criteria did not match any employees."
        />
      )}
      
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        employee={selectedEmployee}
      />

      <ConfirmationDialog
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employeeToDelete?.name}? This action is permanent.`}
        confirmText="Delete"
      />
    </div>
  );
};

export default EmployeeDirectory;
