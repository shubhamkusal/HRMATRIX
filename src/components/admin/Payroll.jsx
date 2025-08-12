import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import {
  DollarSign,
  TrendingUp,
  Users,
  Download,
  Search,
  Eye
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Payroll = () => {
  const { employees, departments } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const payrollData = useMemo(() => {
    return employees.map(emp => {
      const baseSalary = emp.salary;
      const monthlyBase = baseSalary / 12;
      const overtime = Math.random() * (monthlyBase * 0.1);
      const bonuses = Math.random() * (monthlyBase * 0.05);
      const deductions = monthlyBase * 0.15; // Simplified tax/deductions
      const netPay = monthlyBase + overtime + bonuses - deductions;
      return {
        ...emp,
        baseSalary,
        overtime,
        bonuses,
        deductions,
        netPay,
        status: ['processed', 'pending', 'review'][Math.floor(Math.random() * 3)]
      };
    });
  }, [employees]);

  const payrollSummary = useMemo(() => {
    const totalPayroll = payrollData.reduce((sum, emp) => sum + emp.netPay, 0);
    const totalBenefits = payrollData.reduce((sum, emp) => sum + (emp.bonuses + emp.overtime), 0);
    return {
      totalPayroll,
      employeeCount: employees.length,
      averageSalary: employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length,
      totalBenefits
    };
  }, [payrollData, employees]);

  const departmentPayroll = useMemo(() => {
    const deptData = {};
    departments.forEach(dept => {
      deptData[dept.name] = { totalPay: 0, employees: 0, color: dept.color.replace('bg-', '#').replace('-500', '') };
    });
    payrollData.forEach(emp => {
      if (deptData[emp.department]) {
        deptData[emp.department].totalPay += emp.netPay;
        deptData[emp.department].employees++;
      }
    });
    return Object.entries(deptData).map(([name, data]) => ({ name, ...data }));
  }, [payrollData, departments]);

  const filteredEmployees = payrollData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600 mt-2">Manage employee compensation and benefits</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center mt-4 sm:mt-0">
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Payroll" value={`$${(payrollSummary.totalPayroll * 12 / 1000000).toFixed(1)}M`} icon={DollarSign} color="green" />
        <StatCard title="Employees" value={payrollSummary.employeeCount} icon={Users} color="blue" />
        <StatCard title="Avg Salary" value={`$${(payrollSummary.averageSalary / 1000).toFixed(0)}k`} icon={TrendingUp} color="purple" />
        <StatCard title="Benefits Paid" value={`$${(payrollSummary.totalBenefits / 1000).toFixed(0)}k`} icon={DollarSign} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Payroll</h3>
          <div className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={departmentPayroll} layout="vertical" margin={{ right: 20 }}><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} /><YAxis type="category" dataKey="name" width={80} /><Tooltip formatter={(value) => `$${value.toLocaleString()}`} /><Bar dataKey="totalPay" fill="#3b82f6" name="Total Pay" /></BarChart></ResponsiveContainer></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Payroll Breakdown</h3>
          <div className="h-80"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={departmentPayroll} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="totalPay" nameKey="name"><Cell key="cell-0" fill="#3b82f6" /><Cell key="cell-1" fill="#10b981" /><Cell key="cell-2" fill="#8b5cf6" /><Cell key="cell-3" fill="#f59e0b" /><Cell key="cell-4" fill="#ef4444" /></Pie><Tooltip formatter={(value) => `$${value.toLocaleString()}`} /></PieChart></ResponsiveContainer></div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100"><div className="flex flex-col sm:flex-row justify-between items-start sm:items-center"><h3 className="text-lg font-semibold text-gray-900">Employee Payroll</h3><div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0"><div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search employees..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg" /></div><select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg"><option value="all">All Departments</option>{departments.map(dept => (<option key={dept.id} value={dept.name}>{dept.name}</option>))}</select></div></div></div>
        <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-200"><thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Salary (Annual)</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay (Monthly)</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody className="bg-white divide-y divide-gray-200">{filteredEmployees.map((employee) => (<tr key={employee.id} className="hover:bg-gray-50"><td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full" /><div className="ml-4"><div className="text-sm font-medium text-gray-900">{employee.name}</div><div className="text-sm text-gray-500">{employee.department}</div></div></div></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${employee.baseSalary.toLocaleString()}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${employee.netPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td><td className="px-6 py-4 whitespace-nowrap"><span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}`}>{employee.status}</span></td><td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><div className="flex justify-end space-x-2"><button className="text-blue-600 hover:text-blue-900 p-1"><Eye className="w-4 h-4" /></button></div></td></tr>))}</tbody></table></div>
      </motion.div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div className="flex items-center">
      <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default Payroll;
