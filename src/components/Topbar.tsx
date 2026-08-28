import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronRight,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  UserCircle,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../store';
import type { SidebarLayout } from '../hooks/useSidebarLayout';
import { PAGE_TITLES, buildNavigation, findNavLocation, type TabId } from '../navigation';

interface TopbarProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
  layout: SidebarLayout;
}

const ROLE_LABEL: Record<string, string> = {
  ADMIN: 'Quản trị viên',
  MANAGER: 'Lãnh đạo',
  USER: 'Chuyên viên',
};

export function Topbar({ activeTab, onChangeTab, layout }: TopbarProps) {
  const { currentUser, logout, pendingRegistrations } = useApp();
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onClickAway = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClickAway);
    return () => document.removeEventListener('mousedown', onClickAway);
  }, [menuOpen]);

  const sections = useMemo(() => buildNavigation(currentUser), [currentUser]);
  const location = findNavLocation(sections, activeTab);
  const pendingCount = pendingRegistrations.filter(r => r.status === 'PENDING').length;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/85 px-3 backdrop-blur-md md:px-5">
      {/* Left: menu controls + breadcrumb */}
      <div className="flex min-w-0 items-center gap-2 md:gap-3">
        <button
          type="button"
          onClick={() => layout.setMobileOpen(true)}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          title="Mở menu"
          aria-label="Mở menu"
        >
          <Menu size={20} />
        </button>

        <button
          type="button"
          onClick={layout.toggleCollapsed}
          className="hidden rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:block"
          title={layout.collapsed ? 'Mở rộng menu (Ctrl+B)' : 'Thu gọn menu (Ctrl+B)'}
          aria-label="Thu gọn hoặc mở rộng menu"
        >
          {layout.collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>

        <div className="min-w-0">
          <nav className="hidden items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:flex">
            <span>{location?.section.title ?? 'Hệ thống'}</span>
            {location && (
              <>
                <ChevronRight size={12} className="shrink-0" />
                <span className="truncate text-slate-500">{location.item.label}</span>
              </>
            )}
          </nav>
          <h1 className="truncate text-[15px] font-bold tracking-tight text-slate-800 md:text-lg">
            {PAGE_TITLES[activeTab]}
          </h1>
        </div>
      </div>

      {/* Right: clock + account */}
      <div className="flex shrink-0 items-center gap-3 md:gap-4">
        <div className="hidden text-right sm:block">
          <div className="font-mono text-sm font-bold tracking-wider text-slate-700">
            {time.toLocaleTimeString('vi-VN')}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            {time.toLocaleDateString('vi-VN', {
              weekday: 'short',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </div>
        </div>

        {currentUser?.role === 'ADMIN' && pendingCount > 0 && (
          <button
            type="button"
            onClick={() => onChangeTab('approvals')}
            className="hidden items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] font-bold text-red-700 transition-colors hover:bg-red-100 md:flex"
            title="Hồ sơ chờ duyệt"
          >
            <ShieldCheck size={14} />
            {pendingCount} chờ duyệt
          </button>
        )}

        {currentUser ? (
          <div className="relative border-l border-slate-200 pl-3 md:pl-4" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(prev => !prev)}
              className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-slate-100"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <UserCircle size={28} className="text-blue-600" />
              <div className="hidden text-left lg:block">
                <p className="text-[13px] font-bold leading-tight text-slate-800">
                  {currentUser.name}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {ROLE_LABEL[currentUser.role] ?? currentUser.role}
                </p>
              </div>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
              >
                <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="truncate text-sm font-bold text-slate-800">{currentUser.name}</p>
                  <p className="truncate text-xs text-slate-500">
                    {currentUser.email ?? currentUser.username}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-red-600',
                    'transition-colors hover:bg-red-50',
                  )}
                >
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onChangeTab('login')}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-[13px] font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 md:px-4"
          >
            <UserCircle size={17} />
            Đăng nhập
          </button>
        )}
      </div>
    </header>
  );
}
