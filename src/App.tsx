import { useState } from 'react';
import { AppProvider, useApp } from './store';
import { Sidebar, TabId } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { DepartmentManager } from './components/DepartmentManager';
import { EmployeeManager } from './components/EmployeeManager';
import { DeputiesManager } from './components/DeputiesManager';
import { NADeputiesManager } from './components/NADeputiesManager';
import { CommuneDirectoryManager } from './components/CommuneDirectoryManager';
import { TaskManager } from './components/TaskManager';
import { ScheduleManager } from './components/ScheduleManager';
import { AIAssistant } from './components/AIAssistant';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { PendingApproval } from './components/PendingApproval';
import { ApprovalManager } from './components/ApprovalManager';

function AppContent() {
  const { currentUser, authState } = useApp();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  if (authState === 'LOGGED_OUT' && !currentUser) {
    return <Login />;
  }

  if (authState === 'REGISTERING') {
    return <Registration />;
  }

  if (authState === 'PENDING_APPROVAL') {
    return <PendingApproval />;
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto w-full relative">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'departments' && <DepartmentManager />}
        {activeTab === 'employees' && <EmployeeManager />}
        {activeTab === 'commune-directory' && <CommuneDirectoryManager />}
        {activeTab === 'na-deputies' && <NADeputiesManager />}
        {activeTab === 'deputies' && <DeputiesManager />}
        {activeTab === 'schedules' && <ScheduleManager />}
        {activeTab === 'assistant' && <AIAssistant />}
        {activeTab === 'approvals' && <ApprovalManager />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

