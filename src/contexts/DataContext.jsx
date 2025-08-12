import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { faker } from '@faker-js/faker';

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
  const departments = [
    { id: '1', name: 'Engineering', description: 'Software development and technical operations', manager: 'John Smith', location: 'San Francisco, CA', budget: '$2.5M', color: 'bg-blue-500' },
    { id: '2', name: 'Sales', description: 'Revenue generation and client acquisition', manager: 'Sarah Johnson', location: 'New York, NY', budget: '$1.8M', color: 'bg-green-500' },
    { id: '3', name: 'Marketing', description: 'Brand development and customer engagement', manager: 'Mike Wilson', location: 'Los Angeles, CA', budget: '$1.2M', color: 'bg-purple-500' },
    { id: '4', name: 'Human Resources', description: 'Employee relations and organizational development', manager: 'Lisa Brown', location: 'Chicago, IL', budget: '$800K', color: 'bg-orange-500' },
    { id: '5', name: 'Finance', description: 'Financial planning and accounting operations', manager: 'David Chen', location: 'Austin, TX', budget: '$600K', color: 'bg-red-500' }
  ];

  const employees = Array.from({ length: 50 }, (_, index) => {
    const department = faker.helpers.arrayElement(departments);
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number(),
      department: department.name,
      position: faker.person.jobTitle(),
      location: faker.location.city(),
      joinDate: faker.date.past({ years: 3 }).toISOString(),
      avatar: `https://img-wrapper.vercel.app/image?url=https://i.pravatar.cc/100?u=${faker.string.uuid()}`,
      status: faker.helpers.arrayElement(['active', 'inactive', 'on-leave']),
      salary: faker.number.int({ min: 50000, max: 150000 }),
    };
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

  return { employees, departments, leaveRequests, documents };
};


export const DataProvider = ({ children }) => {
  const [initialData] = useState(generateInitialData);
  const [employees, setEmployees] = useState(initialData.employees);
  const [departments, setDepartments] = useState(initialData.departments);
  const [leaveRequests, setLeaveRequests] = useState(initialData.leaveRequests);
  const [documents, setDocuments] = useState(initialData.documents);

  const getEmployeeById = useCallback((id) => employees.find(e => e.id === id), [employees]);

  const addEmployee = (employeeData) => {
    const newEmployee = {
      ...employeeData,
      id: faker.string.uuid(),
      joinDate: new Date().toISOString(),
      avatar: `https://img-wrapper.vercel.app/image?url=https://i.pravatar.cc/100?u=${faker.string.uuid()}`,
      status: 'active',
      salary: faker.number.int({ min: 50000, max: 150000 }),
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
      color: 'bg-gray-500'
    };
    setDepartments(prev => [newDepartment, ...prev]);
  };

  const updateDepartment = (departmentData) => {
    setDepartments(prev => prev.map(d => d.id === departmentData.id ? { ...d, ...departmentData } : d));
  };

  const deleteDepartment = (id) => {
    setDepartments(prev => prev.filter(d => d.id !== id));
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
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
