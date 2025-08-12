import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useData } from '../../contexts/DataContext';
import PageHeader from '../ui/PageHeader';
import ConfirmationDialog from '../ui/ConfirmationDialog';
import TeamModal from '../ui/TeamModal';
import { Plus, Search, Edit, Trash2, Filter, ArrowUpDown } from 'lucide-react';

const MemberAvatars = ({ teamId }) => {
  const { employees } = useData();
  const members = employees.filter(e => e.teamId === teamId);
  
  return (
    <div className="flex -space-x-2">
      {members.slice(0, 3).map(member => (
        <img key={member.id} src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full border-2 border-white" title={member.name} />
      ))}
      {members.length > 3 && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white">
          +{members.length - 3}
        </div>
      )}
    </div>
  );
};

const TeamManagement = () => {
  const { teams, departments, employees, addTeam, updateTeam, deleteTeam } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamToDelete, setTeamToDelete] = useState(null);

  const getDepartmentName = (departmentId) => {
    return departments.find(d => d.id === departmentId)?.name || 'N/A';
  };

  const getMemberCount = (teamId) => {
    return employees.filter(e => e.teamId === teamId).length;
  };

  const filteredTeams = useMemo(() => teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getDepartmentName(team.departmentId).toLowerCase().includes(searchTerm.toLowerCase())
  ), [teams, searchTerm, departments]);

  const handleAdd = () => {
    setSelectedTeam(null);
    setIsModalOpen(true);
  };

  const handleEdit = (team) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (team) => {
    setTeamToDelete(team);
  };

  const handleConfirmDelete = () => {
    deleteTeam(teamToDelete.id);
    toast.success(`Team "${teamToDelete.name}" deleted successfully.`);
    setTeamToDelete(null);
  };

  const handleSave = (formData) => {
    if (formData.id) {
      updateTeam(formData);
      toast.success(`Team "${formData.name}" updated successfully.`);
    } else {
      addTeam(formData);
      toast.success(`Team "${formData.name}" created successfully.`);
    }
    setIsModalOpen(false);
    setSelectedTeam(null);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Team Management"
        description="View and manage all teams across the organization"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Team
        </button>
      </PageHeader>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">All Teams</h2>
          <div className="flex items-center space-x-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center text-sm">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center text-sm">
              <ArrowUpDown className="w-4 h-4 mr-2" /> Sort
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeams.map((team) => (
                <tr key={team.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getDepartmentName(team.departmentId)}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><MemberAvatars teamId={team.id} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getMemberCount(team.id)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleEdit(team)} className="text-gray-400 hover:text-green-600 p-1"><Edit className="w-5 h-5" /></button>
                      <button onClick={() => handleDeleteClick(team)} className="text-gray-400 hover:text-red-600 p-1"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        team={selectedTeam}
      />

      <ConfirmationDialog
        isOpen={!!teamToDelete}
        onClose={() => setTeamToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Team"
        message={`Are you sure you want to delete the "${teamToDelete?.name}" team? This action is permanent.`}
        confirmText="Delete"
      />
    </div>
  );
};

export default TeamManagement;
