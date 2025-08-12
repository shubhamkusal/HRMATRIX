import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useData } from '../../contexts/DataContext';
import PageHeader from '../ui/PageHeader';
import ConfirmationDialog from '../ui/ConfirmationDialog';
import DepartmentModal from '../ui/DepartmentModal';
import TeamModal from '../ui/TeamModal';
import {
  Plus,
  Search,
  FileText,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Briefcase,
  User,
} from 'lucide-react';

const DropdownMenu = ({ onEdit, onManage, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-100">
        <MoreHorizontal className="w-5 h-5 text-gray-500" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border">
          <button onClick={onEdit} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <Edit className="w-4 h-4 mr-2" /> Edit Department
          </button>
          <Link to="/admin/teams" className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <Users className="w-4 h-4 mr-2" /> Manage Teams
          </Link>
          <button onClick={onDelete} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
            <Trash2 className="w-4 h-4 mr-2" /> Delete Department
          </button>
        </div>
      )}
    </div>
  );
};

const DepartmentCard = ({ department, onEdit, onDelete, onAddTeam }) => {
  const { employees, teams, getEmployeeById } = useData();
  
  const manager = getEmployeeById(department.managerId);
  const departmentTeams = teams.filter(t => t.departmentId === department.id);
  const memberCount = employees.filter(e => e.departmentId === department.id).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
            <FileText className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{department.name}</h3>
            <p className="text-sm text-gray-500">{departmentTeams.length} teams, {memberCount} members</p>
          </div>
        </div>
        <DropdownMenu onEdit={() => onEdit(department)} onDelete={() => onDelete(department)} />
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-600 mb-2 flex items-center"><User className="w-4 h-4 mr-2" /> Manager</p>
        {manager ? (
          <div className="flex items-center bg-gray-50 p-3 rounded-lg">
            <img src={manager.avatar} alt={manager.name} className="w-10 h-10 rounded-full" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{manager.name}</p>
              <p className="text-xs text-gray-500">{manager.position}</p>
            </div>
          </div>
        ) : <p className="text-sm text-gray-500">Not assigned</p>}
      </div>

      <div className="flex-grow">
        <p className="text-sm font-semibold text-gray-600 mb-2 flex items-center"><Briefcase className="w-4 h-4 mr-2" /> Teams</p>
        <div className="space-y-2">
          {departmentTeams.map(team => {
            const teamMemberCount = employees.filter(e => e.teamId === team.id).length;
            return (
              <div key={team.id} className="flex justify-between items-center text-sm">
                <p className="text-gray-800">{team.name}</p>
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">{teamMemberCount} members</span>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={() => onAddTeam(department.id)} className="w-full mt-6 border-2 border-dashed border-gray-300 text-gray-500 py-2 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center justify-center">
        <Plus className="w-4 h-4 mr-2" /> Add Team
      </button>
    </motion.div>
  );
};

const Departments = () => {
  const { departments, deleteDepartment, addDepartment, updateDepartment, addTeam } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [preselectedDeptForTeam, setPreselectedDeptForTeam] = useState(null);

  const filteredDepartments = useMemo(() => departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  ), [departments, searchTerm]);

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setIsDeptModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedDepartment(null);
    setIsDeptModalOpen(true);
  };

  const handleDeleteClick = (department) => {
    setDepartmentToDelete(department);
  };

  const handleConfirmDelete = () => {
    deleteDepartment(departmentToDelete.id);
    toast.success(`Department "${departmentToDelete.name}" deleted successfully.`);
    setDepartmentToDelete(null);
  };

  const handleSaveDepartment = (formData) => {
    if (selectedDepartment) {
      updateDepartment({ ...formData, id: selectedDepartment.id });
      toast.success(`Department "${formData.name}" updated successfully.`);
    } else {
      addDepartment(formData);
      toast.success(`Department "${formData.name}" created successfully.`);
    }
    setIsDeptModalOpen(false);
    setSelectedDepartment(null);
  };
  
  const handleAddTeam = (departmentId) => {
    setPreselectedDeptForTeam(departmentId);
    setIsTeamModalOpen(true);
  };

  const handleSaveTeam = (teamData) => {
    addTeam(teamData);
    toast.success(`Team "${teamData.name}" created successfully.`);
    setIsTeamModalOpen(false);
    setPreselectedDeptForTeam(null);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Departments"
        description="Manage organizational structure, departments, and teams"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Department
        </button>
        <Link to="/admin/teams" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
          View All Teams
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <DepartmentCard
            key={department.id}
            department={department}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onAddTeam={handleAddTeam}
          />
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleAdd}
          className="bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[200px] cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <div className="text-center text-gray-500">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Plus className="w-6 h-6" />
            </div>
            <p className="font-semibold">Add New Department</p>
            <p className="text-sm">Expand your organizational structure</p>
          </div>
        </motion.div>
      </div>

      <DepartmentModal
        isOpen={isDeptModalOpen}
        onClose={() => setIsDeptModalOpen(false)}
        onSave={handleSaveDepartment}
        department={selectedDepartment}
      />
      
      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onSave={handleSaveTeam}
        team={null} // For now, only adding new teams from this page
        departmentId={preselectedDeptForTeam}
      />

      <ConfirmationDialog
        isOpen={!!departmentToDelete}
        onClose={() => setDepartmentToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Department"
        message={`Are you sure you want to delete the "${departmentToDelete?.name}" department? All associated teams will also be removed. This action cannot be undone.`}
        confirmText="Delete"
      />
    </div>
  );
};

export default Departments;
