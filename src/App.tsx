import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './store';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { useSidebarLayout } from './hooks/useSidebarLayout';
import type { TabId } from './navigation';
import { Dashboard } from './components/Dashboard';
import { EmployeeManager } from './components/EmployeeManager';
import { DeputiesManager } from './components/DeputiesManager';
import { NADeputiesManager } from './components/NADeputiesManager';
import { CommuneDirectoryManager } from './components/CommuneDirectoryManager';
import { ScheduleManager } from './components/ScheduleManager';
import { KTNSSchedule } from './components/KTNSSchedule';
import { PCNSchedule } from './components/PCNSchedule';
import { PersonalSchedule } from './components/PersonalSchedule';
import { DocumentManagement } from './components/DocumentManagement';
import { DigitalTransformation } from './components/DigitalTransformation';
import { AIAssistant } from './components/AIAssistant';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { PendingApproval } from './components/PendingApproval';
import { ApprovalManager } from './components/ApprovalManager';
import { IOCDashboard } from './components/IOC/IOCDashboard';
import { IOCEconomic } from './components/IOC/IOCEconomic';
import { DraftAssistant } from './components/DraftAssistant';
import { Zap } from 'lucide-react';

function AppContent() {
  const { currentUser, authState } = useApp();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const layout = useSidebarLayout();

  // Automatically return to dashboard after login
  useEffect(() => {
    if (currentUser && activeTab === 'login') {
      setActiveTab('dashboard');
    }
  }, [currentUser, activeTab]);

  if (authState === 'REGISTERING') {
    return <Registration />;
  }

  if (authState === 'PENDING_APPROVAL') {
    return <PendingApproval />;
  }

  // Allow 'LOGGED_OUT' users to see the dashboard as guests
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100 font-sans text-slate-900">
      <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} layout={layout} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar activeTab={activeTab} onChangeTab={setActiveTab} layout={layout} />

        <main className="hdnd-scroll relative w-full flex-1 overflow-y-auto overflow-x-hidden bg-slate-50">
          {activeTab === 'dashboard' && <Dashboard onTabChange={setActiveTab} />}
          {activeTab === 'employees' && <EmployeeManager />}
          {activeTab === 'document-management' && <DocumentManagement />}
          {activeTab === 'document-draft' && <DraftAssistant />}
          {activeTab === 'digital-transformation' && <DigitalTransformation />}
          {activeTab === 'commune-directory' && <CommuneDirectoryManager />}
          {activeTab === 'na-deputies' && <NADeputiesManager />}
          {activeTab === 'deputies' && <DeputiesManager />}
          {activeTab === 'schedules' && <ScheduleManager />}
          {activeTab === 'ktns-schedules' && <KTNSSchedule />}
          {activeTab === 'pcn-schedules' && <PCNSchedule />}
          {activeTab === 'personal-schedule' && <PersonalSchedule />}
          {activeTab === 'assistant' && <AIAssistant />}
          {activeTab === 'approvals' && <ApprovalManager />}
          {activeTab === 'login' && <Login />}

          {/* IOC Routing */}
          {activeTab === 'ioc-overview' && <IOCDashboard />}
          {activeTab === 'ioc-economic' && <IOCEconomic />}
          {(activeTab === 'ioc-documents' ||
            activeTab === 'ioc-voters' ||
            activeTab === 'ioc-sessions') && (
            <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-slate-400">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Zap size={32} />
              </div>
              <p className="text-center font-medium">
                Mô-đun đang được đồng bộ hóa dữ liệu từ hệ thống IOC Trung tâm...
              </p>
            </div>
          )}
        </main>
      </div>
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
