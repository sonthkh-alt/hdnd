import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './store';
import { Sidebar, TabId } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { EmployeeManager } from './components/EmployeeManager';
import { DeputiesManager } from './components/DeputiesManager';
import { NADeputiesManager } from './components/NADeputiesManager';
import { CommuneDirectoryManager } from './components/CommuneDirectoryManager';
import { ScheduleManager } from './components/ScheduleManager';
import { KTNSSchedule } from './components/KTNSSchedule';
import { PCNSchedule } from './components/PCNSchedule';
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
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto w-full relative">
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
        {activeTab === 'assistant' && <AIAssistant />}
        {activeTab === 'approvals' && <ApprovalManager />}
        {activeTab === 'login' && <Login />}
        
        {/* IOC Routing */}
        {activeTab === 'ioc-overview' && <IOCDashboard />}
        {activeTab === 'ioc-economic' && <IOCEconomic />}
        {(activeTab === 'ioc-documents' || activeTab === 'ioc-voters' || activeTab === 'ioc-sessions') && (
          <div className="p-8 flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <Zap size={32} />
             </div>
             <p className="font-medium">Mô-đun đang được đồng bộ hóa dữ liệu từ hệ thống IOC Trung tâm...</p>
          </div>
        )}
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

