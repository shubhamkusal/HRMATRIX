import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useData } from '../../contexts/DataContext';
import ConfirmationDialog from '../ui/ConfirmationDialog';
import EmptyState from '../ui/EmptyState';
import EmployeeModal from '../ui/EmployeeModal';
import { format } from 'date-fns';
import {
  Search,
  Plus,
  Download,
  Users,
  UserPlus,
  UserMinus,
  Building2,
  Filter,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`p-6 rounded-lg ${color}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm">{title}</p>
      </div>
      <Icon className="w-8 h-8 opacity-70" />
    </div>
  </div>
);

const EmployeeDirectory = () => {
  const { employees, deleteEmployee, addEmployee, updateEmployee, departments, newHiresThisMonth, employeesOnLeaveCount } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const filteredEmployees = useMemo(() => employees.filter(employee => {
    const searchLower = searchTerm.toLowerCase();
    return employee.name.toLowerCase().includes(searchLower) ||
           employee.email.toLowerCase().includes(searchLower) ||
           employee.department.toLowerCase().includes(searchLower) ||
           employee.position.toLowerCase().includes(searchLower);
  }), [employees, searchTerm]);

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

  const stats = [
    { title: 'Total Employees', value: employees.length, icon: Users, color: 'bg-blue-100 text-blue-800' },
    { title: 'New Hires', value: newHiresThisMonth, icon: UserPlus, color: 'bg-green-100 text-green-800' },
    { title: 'On Leave', value: employeesOnLeaveCount, icon: UserMinus, color: 'bg-orange-100 text-orange-800' },
    { title: 'Departments', value: departments.length, icon: Building2, color: 'bg-purple-100 text-purple-800' }
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Directory</h1>
          <p className="text-gray-600 mt-2">Manage and view all employee information</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Employee List</h2>
          <div className="flex items-center space-x-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center text-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center text-sm">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${
                      employee.status === 'active' ? 'bg-green-100 text-green-800' :
                      employee.status === 'inactive' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>{employee.status.replace('-', ' ')}</span>
                  </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{format(new Date(employee.joinDate), 'MMM d, yyyy')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link to={`/admin/employees/${employee.id}`} className="text-gray-400 hover:text-blue-600 p-1"><Eye className="w-5 h-5" /></Link>
                      <button onClick={() => handleEdit(employee)} className="text-gray-400 hover:text-green-600 p-1"><Edit className="w-5 h-5" /></button>
                      <button onClick={() => handleDeleteClick(employee)} className="text-gray-400 hover:text-red-600 p-1"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEmployees.length === 0 && (
            <div className="p-6 text-center">
              <EmptyState title="No employees found" message="Your search did not match any employees." />
            </div>
          )}
        </div>
      </div>
      
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
