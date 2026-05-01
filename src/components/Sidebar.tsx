import { LayoutDashboard, Users, CheckSquare, Calendar, Bot, Building2, LogOut, UserCircle, Contact } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../store';

export type TabId = 'dashboard' | 'departments' | 'employees' | 'deputies' | 'tasks' | 'schedules' | 'assistant' | 'approvals';

interface SidebarProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
}

export function Sidebar({ activeTab, onChangeTab }: SidebarProps) {
  const { currentUser, logout, pendingRegistrations } = useApp();
  
  const tabs = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'departments', label: 'Phòng ban', icon: Building2 },
    { id: 'employees', label: 'Hồ sơ Cán bộ', icon: Users },
    { id: 'deputies', label: 'Đại biểu HĐND', icon: Contact },
    { id: 'tasks', label: 'Công việc', icon: CheckSquare },
    { id: 'schedules', label: 'Lịch công tác', icon: Calendar },
    { id: 'assistant', label: 'Trợ lý số', icon: Bot },
  ] as any[];

  if (currentUser?.role === 'ADMIN') {
    tabs.push({ id: 'approvals', label: 'Duyệt hệ thống', icon: Users });
  }

  const pendingCount = pendingRegistrations.filter(r => r.status === 'PENDING').length;

  return (
    <div className="w-64 bg-slate-900 h-screen text-slate-300 flex flex-col items-center py-6 shadow-xl shrink-0">
      <div className="flex items-center gap-3 w-full px-6 mb-8 text-white">
        <div className="bg-red-600 p-2 rounded-lg">
          <Building2 size={24} className="text-yellow-300" />
        </div>
        <h1 className="font-bold text-lg leading-tight tracking-wide">
          Văn phòng<br />ĐBQH & HĐND
        </h1>
      </div>
      
      <nav className="w-full px-3 flex flex-col gap-1 flex-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id as TabId)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-md transition-colors font-medium relative",
                isActive 
                  ? "bg-slate-800 text-white shadow-sm" 
                  : "hover:bg-slate-800/50 hover:text-white"
              )}
            >
              <Icon size={20} className={cn(isActive ? "text-blue-400" : "text-slate-400")} />
              {tab.label}
              {tab.id === 'approvals' && pendingCount > 0 && (
                 <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {pendingCount}
                 </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto w-full px-4 text-xs">
        <div className="bg-slate-800 rounded-lg p-3 mb-2 border border-slate-700">
           <div className="flex items-center gap-2 mb-3">
             <UserCircle size={24} className="text-blue-400" />
             <div className="overflow-hidden">
               <p className="font-bold text-white truncate text-sm">{currentUser?.name}</p>
               <p className="text-slate-400 truncate mt-0.5">{currentUser?.role === 'ADMIN' ? 'Quản trị viên' : (currentUser?.role === 'MANAGER' ? 'Lãnh đạo' : 'Chuyên viên')}</p>
             </div>
           </div>
           <button 
             onClick={logout}
             className="w-full flex items-center justify-center gap-2 py-2 bg-slate-700 hover:bg-red-600/90 hover:text-white text-slate-300 rounded font-medium transition-colors"
           >
             <LogOut size={16} />
             Đăng xuất
           </button>
        </div>
        <div className="px-2 text-slate-500 font-medium">
          <p>Phiên bản 1.0</p>
          <p className="mt-1">Dữ liệu nội bộ</p>
        </div>
      </div>
    </div>
  );
}
