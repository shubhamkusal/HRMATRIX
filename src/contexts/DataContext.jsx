import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { faker } from '@faker-js/faker';
import { startOfMonth, isWithinInterval } from 'date-fns';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Helper function
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const generateInitialData = () => {
  let departments = [
    { id: '1', name: 'Engineering', description: 'Software development and technical operations', managerId: null },
    { id: '2', name: 'Sales', description: 'Revenue generation and client acquisition', managerId: null },
    { id: '3', name: 'Marketing', description: 'Brand development and customer engagement', managerId: null },
    { id: '4', name: 'Human Resources', description: 'Employee relations and organizational development', managerId: null },
    { id: '5', name: 'Finance', description: 'Financial planning and accounting operations', managerId: null },
    { id: '6', name: 'Management', description: 'Executive and administrative leadership', managerId: null },
  ];

  let teams = [
    { id: 't1', name: 'Platform', departmentId: '1' },
    { id: 't2', name: 'Web', departmentId: '1' },
    { id: 't3', name: 'Enterprise', departmentId: '2' },
    { id: 't4', name: 'SMB', departmentId: '2' },
    { id: 't5', name: 'Demand Gen', departmentId: '3' },
  ];

  const adminUser = {
    id: '0',
    name: 'Admin',
    email: 'admin@company.com',
    phone: 'N/A',
    departmentId: '6',
    teamId: null,
    position: 'System Administrator',
    location: 'New York Office',
    joinDate: new Date('2020-01-01').toISOString(),
    avatar: `https://img-wrapper.vercel.app/image?url=https://i.pravatar.cc/100?u=admin`,
    status: 'active',
    salary: 150000,
    employmentType: 'Full-time',
    reportingManager: 'Admin',
    workLocation: 'New York Office',
    dob: new Date('1990-03-15').toISOString(),
    gender: 'Male',
    nationality: 'American',
    maritalStatus: 'Married',
    address: '-',
    emergencyContact: { name: 'Jane Smith', phone: '+1 (555) 987-6543' },
    employmentHistory: [{ position: 'System Administrator', department: 'Management', period: 'Jan 1, 2020 - Present' }],
    performanceMetrics: { overall: 4.8, technical: 4.9, communication: 4.6, leadership: 4.7 },
    leaveBalance: { annual: { used: 7, total: 25 }, sick: { used: 2, total: 10 }, personal: { used: 1, total: 5 } },
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    certifications: ['AWS Certified Developer', 'Scrum Master Certified', 'React Developer Certification']
  };

  let employees = [adminUser];
  
  departments.forEach(dept => {
    if (dept.name !== 'Management') {
      const manager = {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number(),
        departmentId: dept.id,
        teamId: null,
        position: `${dept.name} Lead`,
        location: faker.location.city(),
        joinDate: faker.date.past({ years: 3 }).toISOString(),
        avatar: `https://img-wrapper.vercel.app/image?url=https://i.pravatar.cc/100?u=${faker.string.uuid()}`,
        status: 'active',
        salary: faker.number.int({ min: 90000, max: 180000 }),
        employmentType: 'Full-time',
      };
      employees.push(manager);
      dept.managerId = manager.id;
    }
  });
  
  for (let i = 0; i < 40; i++) {
    const department = faker.helpers.arrayElement(departments.filter(d => d.name !== 'Management'));
    const departmentTeams = teams.filter(t => t.departmentId === department.id);
    const team = faker.helpers.arrayElement(departmentTeams);
    employees.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number(),
      departmentId: department.id,
      teamId: team.id,
      position: faker.person.jobTitle(),
      location: faker.location.city(),
      joinDate: faker.date.past({ years: 3 }).toISOString(),
      avatar: `https://img-wrapper.vercel.app/image?url=https://i.pravatar.cc/100?u=${faker.string.uuid()}`,
      status: faker.helpers.arrayElement(['active', 'inactive', 'on-leave']),
      salary: faker.number.int({ min: 50000, max: 150000 }),
      employmentType: faker.helpers.arrayElement(['Full-time', 'Part-time', 'Contract']),
    });
  }

  // Assign department names to employees for easier access
  employees.forEach(emp => {
    const dept = departments.find(d => d.id === emp.departmentId);
    emp.department = dept ? dept.name : 'N/A';
  });

  const leaveRequests = Array.from({ length: 25 }, () => {
      const employee = faker.helpers.arrayElement(employees);
      const startDate = faker.date.between({ from: new Date(), to: addDays(new Date(), 60) });
      const endDate = addDays(startDate, faker.number.int({ min: 0, max: 10 }));
      return {
        id: faker.string.uuid(),
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department,
        avatar: employee.avatar,
        leaveType: faker.helpers.arrayElement(['Vacation', 'Sick Leave', 'Personal', 'Maternity', 'Emergency']),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        days: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1,
        reason: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(['pending', 'approved', 'rejected']),
        appliedDate: faker.date.past().toISOString(),
      };
  });
  
  const documents = [
    { id: faker.string.uuid(), name: 'Company Handbook 2025.pdf', type: 'Company Policy', size: '2.5 MB', uploadDate: faker.date.past().toISOString(), uploader: 'Admin User' },
    { id: faker.string.uuid(), name: 'Q1 Financial Report.xlsx', type: 'Financial', size: '1.2 MB', uploadDate: faker.date.past().toISOString(), uploader: 'David Chen' },
  ];

  return { employees, departments, leaveRequests, documents, teams };
};


export const DataProvider = ({ children }) => {
  const [initialData] = useState(generateInitialData);
  const [employees, setEmployees] = useState(initialData.employees);
  const [departments, setDepartments] = useState(initialData.departments);
  const [leaveRequests, setLeaveRequests] = useState(initialData.leaveRequests);
  const [documents, setDocuments] = useState(initialData.documents);
  const [teams, setTeams] = useState(initialData.teams);

  const getEmployeeById = useCallback((id) => employees.find(e => e.id === id), [employees]);

  const addEmployee = (employeeData) => {
    const newEmployee = {
      ...employeeData,
      id: faker.string.uuid(),
      joinDate: new Date().toISOString(),
      avatar: `https://img-wrapper.vercel.app/image?url=https://i.pravatar.cc/100?u=${faker.string.uuid()}`,
      status: 'active',
      workLocation: employeeData.location,
      dob: new Date().toISOString(),
      gender: 'N/A',
      nationality: 'N/A',
      maritalStatus: 'N/A',
      address: 'N/A',
      emergencyContact: { name: 'N/A', phone: 'N/A' },
      employmentHistory: [],
      performanceMetrics: { overall: 0, technical: 0, communication: 0, leadership: 0 },
      leaveBalance: { annual: { used: 0, total: 25 }, sick: { used: 0, total: 10 }, personal: { used: 0, total: 5 } },
      skills: [],
      certifications: []
    };
    setEmployees(prev => [newEmployee, ...prev]);
  };

  const updateEmployee = (employeeData) => {
    setEmployees(prev => prev.map(e => e.id === employeeData.id ? { ...e, ...employeeData } : e));
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  const addDepartment = (departmentData) => {
    const newDepartment = {
      ...departmentData,
      id: faker.string.uuid(),
    };
    setDepartments(prev => [newDepartment, ...prev]);
  };

  const updateDepartment = (departmentData) => {
    setDepartments(prev => prev.map(d => d.id === departmentData.id ? { ...d, ...departmentData } : d));
  };

  const deleteDepartment = (id) => {
    setDepartments(prev => prev.filter(d => d.id !== id));
    setTeams(prev => prev.filter(t => t.departmentId !== id));
  };

  const addTeam = (teamData) => {
    const newTeam = {
      ...teamData,
      id: faker.string.uuid(),
    };
    setTeams(prev => [newTeam, ...prev]);
  };
  
  const updateTeam = (teamData) => {
    setTeams(prev => prev.map(t => t.id === teamData.id ? { ...t, ...teamData } : t));
  };

  const deleteTeam = (id) => {
    setTeams(prev => prev.filter(t => t.id !== id));
  };

  const addLeaveRequest = (requestData, employee) => {
    const newRequest = {
      ...requestData,
      id: faker.string.uuid(),
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department,
      avatar: employee.avatar,
      status: 'pending',
      appliedDate: new Date().toISOString(),
    };
    setLeaveRequests(prev => [newRequest, ...prev]);
  };

  const updateLeaveStatus = (id, status) => {
    setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };
  
  const addDocument = (docData, uploaderName) => {
    const newDoc = {
      ...docData,
      id: faker.string.uuid(),
      size: `${(Math.random() * 5).toFixed(1)} MB`,
      uploadDate: new Date().toISOString(),
      uploader: uploaderName
    };
    setDocuments(prev => [newDoc, ...prev]);
  };
  
  const deleteDocument = (id) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const departmentEmployeeCounts = useMemo(() => {
    const counts = {};
    departments.forEach(dept => {
        counts[dept.name] = employees.filter(emp => emp.department === dept.name).length;
    });
    return counts;
  }, [employees, departments]);

  const newHiresThisMonth = useMemo(() => {
    const today = new Date();
    const start = startOfMonth(today);
    return employees.filter(emp => {
      const joinDate = new Date(emp.joinDate);
      return isWithinInterval(joinDate, { start, end: today });
    }).length;
  }, [employees]);

  const employeesOnLeaveCount = useMemo(() => {
    return employees.filter(emp => emp.status === 'on-leave').length;
  }, [employees]);

  const leaveTypeDistribution = useMemo(() => {
    const counts = leaveRequests.reduce((acc, req) => {
      acc[req.leaveType] = (acc[req.leaveType] || 0) + 1;
      return acc;
    }, {});
    
    const colors = {
      'Vacation': '#3b82f6',
      'Sick Leave': '#ef4444',
      'Personal': '#8b5cf6',
      'Maternity': '#ec4899',
      'Emergency': '#f97316'
    };

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      fill: colors[name] || '#6b7280'
    }));
  }, [leaveRequests]);

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    departments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    departmentEmployeeCounts,
    leaveRequests,
    addLeaveRequest,
    updateLeaveStatus,
    documents,
    addDocument,
    deleteDocument,
    newHiresThisMonth,
    employeesOnLeaveCount,
    leaveTypeDistribution,
    teams,
    addTeam,
    updateTeam,
    deleteTeam,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
