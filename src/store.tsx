import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Department, Employee, Task, EventSchedule, AuthUser, RegistrationData } from './types';
import { mockDepartments, mockEmployees, mockTasks, mockSchedules } from './data/mock';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './lib/firebase';

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
  pendingEdits: any[];
  requestProfileEdit: (edit: any) => void;
  approveProfileEdit: (id: string) => void;
  rejectProfileEdit: (id: string) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
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

  const [pendingEdits, setPendingEdits] = useState<any[]>(() => loadInitialData('ais_pending_edits', []));

  useEffect(() => {
    localStorage.setItem('ais_pending_edits', JSON.stringify(pendingEdits));
  }, [pendingEdits]);

  const requestProfileEdit = (edit: any) => {
    setPendingEdits(prev => [...prev.filter(e => e.employeeId !== edit.employeeId), edit]);
  };
  
  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const approveProfileEdit = (employeeId: string) => {
    const edit = pendingEdits.find(e => e.employeeId === employeeId);
    if (!edit) return;
    
    updateEmployee(employeeId, edit.updates);
    setPendingEdits(prev => prev.filter(e => e.employeeId !== employeeId));
  };
  
  const rejectProfileEdit = (employeeId: string) => {
    setPendingEdits(prev => prev.filter(e => e.employeeId !== employeeId));
  };


  // Sync data with Firebase
  useEffect(() => {
    const unsubRegs = onSnapshot(collection(db, 'registrations'), (snapshot) => {
      const regs: RegistrationData[] = [];
      snapshot.forEach(doc => regs.push({ uid: doc.id, ...doc.data() } as RegistrationData));
      setPendingRegistrations(regs);
      localStorage.setItem('ais_registrations', JSON.stringify(regs));
    }, (error) => {
      console.error('Lỗi lấy registrations từ Firebase:', error);
    });

    const unsubEmps = onSnapshot(collection(db, 'employees'), (snapshot) => {
      const emps: Employee[] = [];
      snapshot.forEach(doc => emps.push({ id: doc.id, ...doc.data() } as Employee));
      if (emps.length > 0) {
        setEmployees(emps);
        localStorage.setItem('ais_employees', JSON.stringify(emps));
      }
    }, (error) => {
      console.error('Lỗi lấy employees từ Firebase:', error);
    });

    return () => {
      unsubRegs();
      unsubEmps();
    };
  }, []);

  // Sync back to local storage when things update locally before Firebase fires
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

  const addRegistration = async (data: RegistrationData) => {
    // Update locally first for fast UI response
    setPendingRegistrations(prev => [...prev.filter(r => r.uid !== data.uid), data]);
    setAuthState('PENDING_APPROVAL');
    
    // Save to Firebase
    try {
      await setDoc(doc(db, 'registrations', data.uid), data);
    } catch (e) {
      console.error('Lỗi lưu đăng ký vào Firebase:', e);
    }
  };

  const approveRegistration = async (uid: string) => {
    const reg = pendingRegistrations.find(r => r.uid === uid);
    if (!reg) return;
    
    // Update locally
    setPendingRegistrations(prev => prev.map(r => r.uid === uid ? { ...r, status: 'APPROVED' } : r));
    const newEmp: Employee = {
      id: reg.uid,
      name: reg.name,
      departmentId: reg.departmentId || '',
      role: reg.role || '',
      rank: reg.rank || '',
      education: reg.education || '',
      isPartyMember: reg.isPartyMember || false,
      dateOfBirth: reg.dateOfBirth || '',
      gender: reg.gender,
      nationality: reg.nationality,
      ethnicity: reg.ethnicity,
      religion: reg.religion,
      hometown: reg.hometown,
      currentResidence: reg.currentResidence,
      profession: reg.profession,
      degree: reg.degree,
      politicalTheory: reg.politicalTheory,
      foreignLanguage: reg.foreignLanguage,
      partyDate: reg.partyDate
    };
    setEmployees(prev => {
      if (prev.some(e => e.id === uid)) return prev;
      return [...prev, newEmp];
    });

    // Save to Firebase
    try {
      await setDoc(doc(db, 'registrations', uid), { ...reg, status: 'APPROVED' });
      await setDoc(doc(db, 'employees', uid), newEmp);
    } catch (e) {
      console.error('Lỗi duyệt Firebase:', e);
    }
  };

  const rejectRegistration = async (uid: string) => {
    const reg = pendingRegistrations.find(r => r.uid === uid);
    if (!reg) return;

    setPendingRegistrations(prev => prev.map(r => r.uid === uid ? { ...r, status: 'REJECTED' } : r));
    
    try {
      await setDoc(doc(db, 'registrations', uid), { ...reg, status: 'REJECTED' });
    } catch (e) {
      console.error('Lỗi từ chối Firebase:', e);
    }
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
      pendingEdits, requestProfileEdit, approveProfileEdit, rejectProfileEdit, updateEmployee,
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
