import { LayoutDashboard, Users, CheckSquare, Calendar, Bot, Building2, LogOut, UserCircle, Contact, ChevronDown, ChevronRight, FileText, Zap, Activity, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../store';
import React, { useEffect, useState, useRef } from 'react';

export type TabId = 'dashboard' | 'employees' | 'commune-directory' | 'deputies' | 'na-deputies' | 'ktns-schedules' | 'pcn-schedules' | 'schedules' | 'personal-schedule' | 'assistant' | 'approvals' | 'document-management' | 'document-draft' | 'digital-transformation' | 'login' | 'ioc-overview' | 'ioc-economic' | 'ioc-documents' | 'ioc-voters' | 'ioc-sessions';

interface SidebarProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
}

// Subcomponent for Desktop Dropdown Item
const DesktopNavItem: React.FC<{ tab: any, activeTab: string, onChangeTab: (t: TabId) => void }> = ({ tab, activeTab, onChangeTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = activeTab === tab.id || tab.subItems?.some((s: any) => s.id === activeTab);
  const Icon = tab.icon;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  if (tab.subItems) {
    return (
      <div 
        className="relative group" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-colors",
            isActive ? (tab.id === 'ioc' ? "bg-blue-600/20 text-blue-400" : "bg-slate-800 text-white") : "hover:bg-slate-800 text-slate-300"
          )}
          onClick={() => onChangeTab(tab.subItems[0].id)}
        >
          <Icon size={18} className={cn(isActive || tab.id === 'ioc' ? "text-blue-400" : "text-slate-400")} />
          <span className="whitespace-nowrap">{tab.label}</span>
          <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-slate-800 border border-slate-700 shadow-xl rounded-lg overflow-hidden z-50">
            <div className="py-2">
              {tab.subItems.map((sub: any) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    onChangeTab(sub.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm transition-colors",
                    activeTab === sub.id ? "bg-blue-600/20 text-blue-400 font-medium" : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  )}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => onChangeTab(tab.id as TabId)}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-colors",
        isActive ? "bg-slate-800 text-white" : "hover:bg-slate-800 text-slate-300"
      )}
    >
      <Icon size={18} className={cn(isActive ? "text-blue-400" : "text-slate-400")} />
      <span className="whitespace-nowrap">{tab.label}</span>
    </button>
  );
}

// Subcomponent for Mobile Accordion Item
const MobileNavItem: React.FC<{ tab: any, activeTab: string, onChangeTab: (t: TabId) => void, closeMenu: () => void }> = ({ tab, activeTab, onChangeTab, closeMenu }) => {
  const isActive = activeTab === tab.id || tab.subItems?.some((s: any) => s.id === activeTab);
  const [isOpen, setIsOpen] = useState(isActive);
  const Icon = tab.icon;

  if (tab.subItems) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-between w-full px-4 py-3 text-left transition-colors",
            isActive ? "bg-slate-800 text-white border-l-4 border-blue-500" : "text-slate-300 border-l-4 border-transparent"
          )}
        >
          <div className="flex items-center gap-3">
            <Icon size={20} className={isActive ? "text-blue-400" : "text-slate-400"} />
            <span className="font-medium">{tab.label}</span>
          </div>
          <ChevronRight size={18} className={cn("transition-transform", isOpen && "rotate-90")} />
        </button>
        {isOpen && (
          <div className="bg-slate-800/50 flex flex-col">
            {tab.subItems.map((sub: any) => (
              <button
                key={sub.id}
                onClick={() => {
                  onChangeTab(sub.id);
                  closeMenu();
                }}
                className={cn(
                  "w-full text-left px-12 py-3 text-sm transition-colors",
                  activeTab === sub.id ? "text-blue-400 font-bold bg-slate-800" : "text-slate-400 hover:text-white hover:bg-slate-800/80"
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
      onClick={() => {
        onChangeTab(tab.id as TabId);
        closeMenu();
      }}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 text-left transition-colors border-l-4",
        isActive ? "bg-slate-800 text-white border-blue-500" : "text-slate-300 hover:bg-slate-800 border-transparent"
      )}
    >
      <Icon size={20} className={isActive ? "text-blue-400" : "text-slate-400"} />
      <span className="font-medium">{tab.label}</span>
    </button>
  );
}

export function Sidebar({ activeTab, onChangeTab }: SidebarProps) {
  const { currentUser, logout, pendingRegistrations } = useApp();
  const [time, setTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    tabs.push({ id: 'approvals', label: 'Duyệt', icon: Users });
  }

  const pendingCount = pendingRegistrations.filter(r => r.status === 'PENDING').length;

  return (
    <div className="bg-slate-900 border-b border-slate-800 shrink-0 relative z-50">
      {/* Top Row: Centered Header */}
      <div className="flex items-center justify-center py-3 md:py-4 border-b border-slate-800/80 bg-slate-900/50">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-red-600 p-1.5 md:p-2 rounded-lg shadow-inner">
            <Building2 className="text-yellow-300 w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h1 className="font-bold text-base md:text-xl text-white tracking-wide uppercase text-center flex flex-col md:flex-row md:gap-2 leading-tight">
            <span>Văn phòng ĐBQH & HĐND</span>
            <span className="text-blue-400">tỉnh Thanh Hóa</span>
          </h1>
        </div>
      </div>

      {/* Bottom Row: Menu Toggle, Time, User Actions */}
      <div className="flex items-center justify-between px-3 md:px-5 h-14 md:h-16">
        {/* Left: Mobile Menu Toggle Button / Desktop Nav */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors flex items-center justify-center border border-slate-700"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Desktop Menu - Hidden on mobile, flex on xl and above */}
          <nav className="hidden xl:flex items-center gap-1">
            {tabs.map(tab => (
              <DesktopNavItem key={tab.id} tab={tab} activeTab={activeTab} onChangeTab={onChangeTab} />
            ))}
          </nav>
        </div>

        {/* Right: Time & User / Auth */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Time Display */}
          <div className="text-right">
            <div className="text-slate-300 text-xs md:text-sm font-bold font-mono tracking-wider">
              {time.toLocaleTimeString('vi-VN')}
            </div>
            <div className="hidden lg:block text-slate-500 text-[10px] uppercase font-bold mt-0.5">
              {time.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}
            </div>
          </div>
          
          {/* Auth Actions */}
          <div className="flex items-center pl-3 md:pl-4 border-l border-slate-700">
            {currentUser ? (
               <div className="flex items-center gap-3">
                 {pendingCount > 0 && currentUser?.role === 'ADMIN' && (
                   <span className="hidden md:flex bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                     {pendingCount} chờ duyệt
                   </span>
                 )}
                 <div className="hidden lg:block text-right mr-1">
                   <p className="font-bold text-white text-sm leading-tight">{currentUser.name}</p>
                   <p className="text-slate-400 text-[10px] uppercase font-bold">{currentUser.role === 'ADMIN' ? 'Quản trị viên' : (currentUser.role === 'MANAGER' ? 'Lãnh đạo' : 'Chuyên viên')}</p>
                 </div>
                 <UserCircle size={28} className="text-blue-400 hidden sm:block" />
                 <button 
                   onClick={logout}
                   className="flex items-center justify-center p-2 bg-slate-800 hover:bg-red-600 hover:text-white text-red-400 rounded-md transition-colors shadow-sm border border-slate-700"
                   title="Đăng xuất"
                 >
                   <LogOut size={16} />
                 </button>
               </div>
            ) : (
               <button 
                 onClick={() => onChangeTab('login')}
                 className="flex items-center gap-1.5 md:gap-2 py-1.5 px-3 md:px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold text-xs md:text-sm transition-all shadow-md active:scale-95 whitespace-nowrap"
               >
                 <UserCircle size={16} className="md:w-[18px] md:h-[18px]" />
                 Đăng nhập
               </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Menu Panel */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 shadow-2xl flex flex-col max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* User Profile Mobile */}
          <div className="p-4 border-b border-slate-800 bg-slate-800/30 lg:hidden flex justify-between items-center">
             {currentUser ? (
               <div className="flex items-center gap-3">
                 <UserCircle size={36} className="text-blue-400" />
                 <div>
                   <p className="font-bold text-white text-sm">{currentUser.name}</p>
                   <p className="text-slate-400 text-[11px] uppercase tracking-wider font-bold mt-0.5">{currentUser.role === 'ADMIN' ? 'Quản trị viên' : (currentUser.role === 'MANAGER' ? 'Lãnh đạo' : 'Chuyên viên')}</p>
                 </div>
               </div>
             ) : (
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Chế độ khách</p>
                  <p className="text-slate-300 text-[13px]">Vui lòng đăng nhập để sử dụng đầy đủ tính năng</p>
                </div>
             )}
             
             {pendingCount > 0 && currentUser?.role === 'ADMIN' && (
               <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md ml-auto mr-4">
                 {pendingCount} chờ duyệt
               </span>
             )}
          </div>

          <div className="flex flex-col py-2">
            {tabs.map(tab => (
              <MobileNavItem key={tab.id} tab={tab} activeTab={activeTab} onChangeTab={onChangeTab} closeMenu={() => setIsMobileMenuOpen(false)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}