import { LayoutDashboard, Users, CheckSquare, Calendar, Bot, Building2, LogOut, UserCircle, Contact, ChevronRight, ChevronLeft, FileText, Zap, Activity, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../store';
import { useEffect, useState } from 'react';

export type TabId = 'dashboard' | 'employees' | 'commune-directory' | 'deputies' | 'na-deputies' | 'ktns-schedules' | 'pcn-schedules' | 'schedules' | 'personal-schedule' | 'assistant' | 'approvals' | 'document-management' | 'document-draft' | 'digital-transformation' | 'login' | 'ioc-overview' | 'ioc-economic' | 'ioc-documents' | 'ioc-voters' | 'ioc-sessions';

interface SidebarProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
}

export function Sidebar({ activeTab, onChangeTab }: SidebarProps) {
  const { currentUser, logout, pendingRegistrations } = useApp();
  const [time, setTime] = useState(new Date());
  
  // Collapse state
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

  // Update on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [isSchedulesOpen, setIsSchedulesOpen] = useState(false);
  const [isIOCOpen, setIsIOCOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [isDocManagementOpen, setIsDocManagementOpen] = useState(false);

  // Auto-expand parents if child is active
  useEffect(() => {
    if (['ioc-overview', 'ioc-economic', 'ioc-documents', 'ioc-voters', 'ioc-sessions'].includes(activeTab)) setIsIOCOpen(true);
    if (['schedules', 'ktns-schedules', 'pcn-schedules', 'personal-schedule'].includes(activeTab)) setIsSchedulesOpen(true);
    if (['employees', 'commune-directory', 'deputies', 'na-deputies'].includes(activeTab)) setIsDirectoryOpen(true);
    if (['document-management', 'document-draft'].includes(activeTab)) setIsDocManagementOpen(true);
  }, [activeTab]);

  const tabs = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { 
      id: 'ioc', 
      label: 'IOC Điều hành', 
      icon: Activity,
      isSpecial: true,
      subItems: [
        { id: 'ioc-overview', label: 'Dashboard Trung tâm' },
        { id: 'ioc-economic', label: 'Chỉ số Kinh tế - XH' },
        { id: 'ioc-documents', label: 'Giám sát Văn bản' },
        { id: 'ioc-voters', label: 'Phân tích Cử tri' },
        { id: 'ioc-sessions', label: 'Giám sát Kỳ họp' },
      ]
    },
    { 
      id: 'document-management', 
      label: 'Quản lý văn bản', 
      icon: FileText,
      subItems: [
        { id: 'document-management', label: 'Văn phòng số' },
        ...(currentUser ? [{ id: 'document-draft', label: 'Soạn thảo VB' }] : []),
      ]
    },
    { id: 'digital-transformation', label: 'Chuyển đổi số', icon: Zap },
    { 
      id: 'directory', 
      label: 'Danh bạ', 
      icon: Contact,
      subItems: [
        { id: 'employees', label: 'Hồ sơ Cán bộ' },
        { id: 'commune-directory', label: 'Danh bạ điện thoại' },
        { id: 'na-deputies', label: 'Đại biểu Quốc hội' },
        { id: 'deputies', label: 'Đại biểu HĐND' },
      ]
    },
    { 
      id: 'schedules', 
      label: 'Lịch công tác', 
      icon: Calendar,
      subItems: [
        { id: 'schedules', label: 'Lịch cơ quan' },
        { id: 'pcn-schedules', label: 'Lịch Ban Pháp chế' },
        { id: 'ktns-schedules', label: 'Lịch Ban KTNS' },
        ...(currentUser ? [{ id: 'personal-schedule', label: 'Lịch cá nhân' }] : []),
      ]
    },
    { id: 'assistant', label: 'Trợ lý số', icon: Bot },
  ] as any[];

  if (currentUser?.role === 'ADMIN') {
    tabs.push({ id: 'approvals', label: 'Duyệt hệ thống', icon: Users });
  }

  const pendingCount = pendingRegistrations.filter(r => r.status === 'PENDING').length;

  return (
    <div 
      className={cn(
        "relative bg-slate-900 h-screen text-slate-300 flex flex-col pt-6 shadow-xl shrink-0 z-50 transition-all duration-300 ease-in-out font-sans",
        isCollapsed ? "w-16 sm:w-20" : "w-[260px]"
      )}
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-blue-600 outline outline-4 outline-slate-50 text-white rounded-full p-1 shadow-md z-50 hover:bg-blue-700 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className={cn("flex items-center w-full px-5 mb-8 text-white transition-all overflow-hidden", isCollapsed ? "justify-center gap-0" : "gap-3")}>
        <div className="bg-red-600 p-2 rounded-lg shrink-0">
          <Building2 size={24} className="text-yellow-300" />
        </div>
        <h1 className={cn("font-bold text-lg leading-tight tracking-wide whitespace-nowrap transition-opacity duration-300", isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto")}>
          Văn phòng<br />ĐBQH & HĐND
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar w-full px-3 pb-6 flex flex-col gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id || tab.subItems?.some((s: any) => s.id === activeTab);
          const isDocManagement = tab.id === 'document-management';
          const isDigitalTransformation = tab.id === 'digital-transformation';
          const isIOC = tab.id === 'ioc';
          
          if (tab.subItems) {
            let isOpen = true;
            let toggleOpen = () => {};

            if (tab.id === 'ioc') {
              isOpen = isIOCOpen;
              toggleOpen = () => setIsIOCOpen(!isIOCOpen);
            } else if (tab.id === 'schedules') {
              isOpen = isSchedulesOpen;
              toggleOpen = () => setIsSchedulesOpen(!isSchedulesOpen);
            } else if (tab.id === 'directory') {
              isOpen = isDirectoryOpen;
              toggleOpen = () => setIsDirectoryOpen(!isDirectoryOpen);
            } else if (tab.id === 'document-management') {
              isOpen = isDocManagementOpen;
              toggleOpen = () => setIsDocManagementOpen(!isDocManagementOpen);
            }

            return (
              <div key={tab.id} className="w-full">
                <button
                  onClick={() => {
                    if (isCollapsed) setIsCollapsed(false);
                    toggleOpen();
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-3 rounded-md transition-colors font-medium relative overflow-hidden whitespace-nowrap",
                    isActive ? (isIOC ? "bg-blue-600/10 text-blue-400" : "bg-slate-800 text-white") : "hover:bg-slate-800/50 hover:text-white",
                    isCollapsed && "justify-center px-0"
                  )}
                  title={isCollapsed ? tab.label : undefined}
                >
                  <Icon size={20} className={cn("shrink-0", isActive || isIOC ? "text-blue-400" : "text-slate-400")} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{tab.label}</span>
                      <ChevronRight size={16} className={cn("shrink-0 transition-transform", isOpen ? "rotate-90" : "")} />
                    </>
                  )}
                </button>
                {isOpen && !isCollapsed && (
                  <div className="mt-1 ml-9 flex flex-col gap-1 border-l border-slate-700 pl-2 pr-1">
                    {tab.subItems.map((sub: any) => (
                      <button
                        key={sub.id}
                        onClick={() => onChangeTab(sub.id)}
                        className={cn(
                          "px-3 py-2 rounded text-sm font-medium transition-colors text-left truncate w-full",
                          activeTab === sub.id ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                        )}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id as TabId)}
              title={isCollapsed ? tab.label : undefined}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-3 rounded-md transition-all font-medium relative border-l-4 overflow-hidden whitespace-nowrap",
                isActive 
                  ? (isDocManagement ? "bg-red-900 border-red-500 text-white shadow-lg" : 
                     isDigitalTransformation ? "bg-amber-900 border-amber-500 text-white shadow-lg" :
                     "bg-slate-800 text-white shadow-sm border-blue-500") 
                  : (isDocManagement ? "bg-red-600/10 hover:bg-red-600/20 text-red-400 border-red-500/30" : 
                     isDigitalTransformation ? "bg-amber-600/10 hover:bg-amber-600/20 text-amber-400 border-amber-500/30" :
                     "hover:bg-slate-800/50 hover:text-white border-transparent"),
                isCollapsed && "justify-center px-0 border-l-0" // Remove border-l indicator if collapsed (or keep it if you want)
              )}
            >
              <Icon size={20} className={cn("shrink-0", isActive 
                ? (isDocManagement ? "text-white" : isDigitalTransformation ? "text-white" : "text-blue-400") 
                : (isDocManagement ? "text-red-400" : isDigitalTransformation ? "text-amber-400" : "text-slate-400")
              )} />
              {!isCollapsed && (
                <>
                  <span className="truncate">{tab.label}</span>
                  {tab.id === 'approvals' && pendingCount > 0 && (
                     <span className="ml-auto shrink-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {pendingCount}
                     </span>
                  )}
                </>
              )}
              {isCollapsed && tab.id === 'approvals' && pendingCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className={cn("mt-auto w-full px-3 text-xs mb-4 transition-all duration-300", isCollapsed ? "px-2" : "px-4")}>
        {currentUser ? (
          <div className={cn("bg-slate-800 rounded-lg p-3 mb-2 border border-slate-700", isCollapsed ? "p-2" : "p-3")}>
             <div className={cn("flex items-center gap-2 mb-3", isCollapsed && "justify-center mb-0")}>
               <UserCircle size={24} className="text-blue-400 shrink-0" />
               {!isCollapsed && (
                 <div className="overflow-hidden">
                   <p className="font-bold text-white truncate text-sm">{currentUser.name}</p>
                   <p className="text-slate-400 truncate mt-0.5">{currentUser.role === 'ADMIN' ? 'Quản trị viên' : (currentUser.role === 'MANAGER' ? 'Lãnh đạo' : 'Chuyên viên')}</p>
                 </div>
               )}
             </div>
             {!isCollapsed && (
               <button 
                 onClick={logout}
                 className="w-full flex items-center justify-center gap-2 py-2 bg-slate-700 hover:bg-red-600/90 hover:text-white text-slate-300 rounded font-medium transition-colors"
               >
                 <LogOut size={16} />
                 Đăng xuất
               </button>
             )}
          </div>
        ) : (
          <div className="bg-slate-800 rounded-lg p-2 mb-2 border border-slate-700 flex flex-col items-center">
            <button 
              onClick={() => onChangeTab('login')}
              className={cn("flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded font-bold transition-all shadow-lg active:scale-95 w-full py-2.5", isCollapsed && "gap-0 px-0", !isCollapsed && "gap-2 px-2")}
              title="Đăng nhập"
            >
              <LogOut size={16} className="rotate-180 shrink-0" />
              {!isCollapsed && <span>Đăng nhập</span>}
            </button>
            {!isCollapsed && <p className="text-center text-slate-500 mt-2">Chế độ khách</p>}
          </div>
        )}
        {!isCollapsed && (
          <div className="px-2 text-slate-500 font-medium whitespace-nowrap overflow-hidden text-center truncate">
            <p>{time.toLocaleTimeString('vi-VN')}</p>
          </div>
        )}
      </div>
    </div>
  );
}