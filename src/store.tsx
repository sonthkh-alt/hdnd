import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Department, Employee, Task, EventSchedule, AuthUser, RegistrationData } from './types';
import { mockDepartments, mockEmployees, mockTasks, mockSchedules } from './data/mock';

type AuthState = 'LOGGED_OUT' | 'REGISTERING' | 'PENDING_APPROVAL' | 'LOGGED_IN';

interface AppState {
  currentUser: AuthUser | null;
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
  registrationUser: any | null;
  setRegistrationUser: (user: any) => void;
  login: (user: AuthUser) => void;
  logout: () => void;
  departments: Department[];
  employees: Employee[];
  tasks: Task[];
  schedules: EventSchedule[];
  pendingRegistrations: RegistrationData[];
  addRegistration: (data: RegistrationData) => void;
  approveRegistration: (uid: string) => void;
  rejectRegistration: (uid: string) => void;
  addDepartment: (dept: Department) => void;
  removeDepartment: (id: string) => void;
  addEmployee: (emp: Employee) => void;
  removeEmployee: (id: string) => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  addSchedule: (schedule: EventSchedule) => void;
  removeSchedule: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authState, setAuthState] = useState<AuthState>('LOGGED_OUT');
  const [registrationUser, setRegistrationUser] = useState<any | null>(null);

  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  
  // Try to load persisted data from localStorage first
  const loadInitialData = <T, >(key: string, defaultVal: T): T => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultVal;
  };

  const [employees, setEmployees] = useState<Employee[]>(() => loadInitialData('ais_employees', mockEmployees));
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [schedules, setSchedules] = useState<EventSchedule[]>(mockSchedules);
  const [pendingRegistrations, setPendingRegistrations] = useState<RegistrationData[]>(() => loadInitialData('ais_registrations', []));

  // Persist important data
  useEffect(() => {
    localStorage.setItem('ais_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('ais_registrations', JSON.stringify(pendingRegistrations));
  }, [pendingRegistrations]);

  const login = (user: AuthUser) => {
    setCurrentUser(user);
    setAuthState('LOGGED_IN');
  };
  const logout = () => {
    setCurrentUser(null);
    setRegistrationUser(null);
    setAuthState('LOGGED_OUT');
  };

  const addRegistration = (data: RegistrationData) => {
    setPendingRegistrations(prev => [...prev.filter(r => r.uid !== data.uid), data]);
    setAuthState('PENDING_APPROVAL');
  };

  const approveRegistration = (uid: string) => {
    setPendingRegistrations(prev => prev.map(r => r.uid === uid ? { ...r, status: 'APPROVED' } : r));
    const approvedData = pendingRegistrations.find(r => r.uid === uid);
    if (approvedData) {
       // Auto-add to employees
       const newEmp: Employee = {
         id: approvedData.uid,
         name: approvedData.name,
         departmentId: approvedData.departmentId,
         role: approvedData.role,
         rank: approvedData.rank,
         education: approvedData.education,
         isPartyMember: approvedData.isPartyMember,
         dateOfBirth: approvedData.dateOfBirth
       };
       setEmployees(prev => {
         if (prev.some(e => e.id === approvedData.uid)) return prev;
         return [...prev, newEmp];
       });
    }
  };

  const rejectRegistration = (uid: string) => {
    setPendingRegistrations(prev => prev.map(r => r.uid === uid ? { ...r, status: 'REJECTED' } : r));
  };

  const addDepartment = (dept: Department) => setDepartments([...departments, dept]);
  const removeDepartment = (id: string) => setDepartments(departments.filter(d => d.id !== id));
  
  const addEmployee = (emp: Employee) => setEmployees([...employees, emp]);
  const removeEmployee = (id: string) => setEmployees(employees.filter(e => e.id !== id));

  const addTask = (task: Task) => setTasks([...tasks, task]);
  const removeTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));

  const addSchedule = (schedule: EventSchedule) => setSchedules([...schedules, schedule]);
  const removeSchedule = (id: string) => setSchedules(schedules.filter(s => s.id !== id));

  return (
    <AppContext.Provider value={{
      currentUser, authState, setAuthState, registrationUser, setRegistrationUser, login, logout,
      departments, employees, tasks, schedules, pendingRegistrations,
      addRegistration, approveRegistration, rejectRegistration,
      addDepartment, removeDepartment, addEmployee, removeEmployee, addTask, removeTask, addSchedule, removeSchedule
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
