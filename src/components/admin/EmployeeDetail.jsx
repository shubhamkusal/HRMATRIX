import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import EmployeeModal from '../ui/EmployeeModal';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { ArrowLeft, Edit, MessageSquare, Briefcase, User, Phone, Mail, MapPin, Calendar, DollarSign, Users, BarChart, Award, FileText, Shield, Clock, PlusCircle } from 'lucide-react';

const DetailCard = ({ title, icon: Icon, children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center">
        <Icon className="w-5 h-5 text-gray-500 mr-3" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-md font-semibold text-gray-900">{value || '-'}</p>
  </div>
);

const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const { getEmployeeById, updateEmployee } = useData();
  const navigate = useNavigate();
  const employee = getEmployeeById(employeeId);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSave = (formData) => {
    updateEmployee(formData);
    toast.success(`Employee "${formData.name}" updated successfully.`);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Profile</h1>
          <p className="text-gray-600 mt-2">Detailed employee information and management</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </button>
          <button onClick={() => navigate('/admin/employees')} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <img src={employee.avatar} alt={employee.name} className="w-24 h-24 rounded-full" />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
              <p className="text-lg text-gray-600">{employee.position}</p>
              <p className="text-gray-500">{employee.department} Department</p>
              <span className={`mt-2 inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${
                employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>{employee.status}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DetailCard title="Employment Details" icon={Briefcase}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <InfoItem label="Employee ID" value={employee.id.substring(0, 8)} />
                <InfoItem label="Start Date" value={format(new Date(employee.joinDate), 'MMM d, yyyy')} />
                <InfoItem label="Employment Type" value={employee.employmentType} />
                <InfoItem label="Salary" value={`$${employee.salary.toLocaleString()}/year`} />
                <InfoItem label="Standard Hours" value="40 hours / week" />
                <InfoItem label="Reporting Manager" value={employee.reportingManager} />
                <InfoItem label="Work Location" value={employee.workLocation} />
              </div>
            </DetailCard>
            <DetailCard title="Personal Information" icon={User}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <InfoItem label="Date of Birth" value={format(new Date(employee.dob), 'MMM d, yyyy')} />
                <InfoItem label="Gender" value={employee.gender} />
                <InfoItem label="Nationality" value={employee.nationality} />
                <InfoItem label="Marital Status" value={employee.maritalStatus} />
              </div>
            </DetailCard>
            <DetailCard title="Contact Information" icon={Phone}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <InfoItem label="Email" value={employee.email} />
                <InfoItem label="Phone" value={employee.phone} />
                <InfoItem label="Address" value={employee.address} />
                <InfoItem label="Emergency Contact" value={employee.emergencyContact.name} />
                <InfoItem label="Emergency Phone" value={employee.emergencyContact.phone} />
              </div>
            </DetailCard>
            <DetailCard title="Performance Metrics" icon={BarChart}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <InfoItem label="Overall Rating" value={`${employee.performanceMetrics.overall}/5.0`} />
                <InfoItem label="Technical Skills" value={`${employee.performanceMetrics.technical}/5.0`} />
                <InfoItem label="Communication" value={`${employee.performanceMetrics.communication}/5.0`} />
                <InfoItem label="Leadership" value={`${employee.performanceMetrics.leadership}/5.0`} />
              </div>
            </DetailCard>
            <DetailCard title="Skills & Certifications" icon={Award}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map(skill => <span key={skill} className="bg-gray-100 text-gray-800 px-2 py-1 text-sm rounded">{skill}</span>)}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Certifications</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {employee.certifications.map(cert => <li key={cert} className="text-gray-900">{cert}</li>)}
                  </ul>
                </div>
              </div>
            </DetailCard>
          </div>
          <div className="space-y-8">
            <DetailCard title="Leave Balance" icon={Clock}>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>Annual Leave</span><span>{employee.leaveBalance.annual.used}/{employee.leaveBalance.annual.total} days</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{width: `${(employee.leaveBalance.annual.used/employee.leaveBalance.annual.total)*100}%`}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>Sick Leave</span><span>{employee.leaveBalance.sick.used}/{employee.leaveBalance.sick.total} days</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-600 h-2 rounded-full" style={{width: `${(employee.leaveBalance.sick.used/employee.leaveBalance.sick.total)*100}%`}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>Personal Leave</span><span>{employee.leaveBalance.personal.used}/{employee.leaveBalance.personal.total} days</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-purple-600 h-2 rounded-full" style={{width: `${(employee.leaveBalance.personal.used/employee.leaveBalance.personal.total)*100}%`}}></div></div>
                </div>
              </div>
            </DetailCard>
            <DetailCard title="Quick Actions" icon={PlusCircle}>
              <div className="space-y-2">
                <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 text-sm font-medium text-gray-700">Schedule Meeting</button>
                <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 text-sm font-medium text-gray-700">Generate Report</button>
                <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 text-sm font-medium text-gray-700">Manage Access</button>
              </div>
            </DetailCard>
          </div>
        </div>
      </motion.div>
      <EmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} employee={employee} />
    </div>
  );
};

export default EmployeeDetail;
