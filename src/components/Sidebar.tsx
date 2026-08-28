import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import {
  Building2,
  ChevronRight,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  UserCircle,
  X,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../store';
import {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_MAX_WIDTH,
  SIDEBAR_MIN_WIDTH,
  type SidebarLayout,
} from '../hooks/useSidebarLayout';
import { buildNavigation, isItemActive, type NavItem, type TabId } from '../navigation';

export type { TabId } from '../navigation';

interface SidebarProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
  layout: SidebarLayout;
}

const ROLE_LABEL: Record<string, string> = {
  ADMIN: 'Quản trị viên',
  MANAGER: 'Lãnh đạo',
  USER: 'Chuyên viên',
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : true,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export function Sidebar({ activeTab, onChangeTab, layout }: SidebarProps) {
  const { currentUser, logout, pendingRegistrations } = useApp();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const asideRef = useRef<HTMLElement | null>(null);

  const sections = useMemo(() => buildNavigation(currentUser), [currentUser]);
  const pendingCount = pendingRegistrations.filter(r => r.status === 'PENDING').length;

  // Collapsed is a desktop-only affordance: the mobile drawer always shows labels.
  const iconOnly = layout.collapsed && isDesktop;

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [flyout, setFlyout] = useState<{ item: NavItem; top: number } | null>(null);
  const flyoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the group owning the current page unfolded.
  useEffect(() => {
    for (const section of sections) {
      for (const item of section.items) {
        if (item.children?.some(c => c.id === activeTab)) {
          setOpenGroups(prev => (prev[item.key] ? prev : { ...prev, [item.key]: true }));
        }
      }
    }
  }, [activeTab, sections]);

  useEffect(() => {
    if (!iconOnly) setFlyout(null);
  }, [iconOnly]);

  // Visual feedback while dragging the resize handle.
  useEffect(() => {
    if (!layout.isResizing) return;
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    return () => {
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = '';
    };
  }, [layout.isResizing]);

  const startResize = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      const origin = asideRef.current?.getBoundingClientRect().left ?? 0;
      layout.setIsResizing(true);

      const onMove = (ev: PointerEvent) => layout.setWidth(ev.clientX - origin);
      const onUp = () => {
        layout.setIsResizing(false);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    },
    [layout],
  );

  const onHandleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 32 : 12;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      layout.setWidth(layout.width - step);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      layout.setWidth(layout.width + step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      layout.resetWidth();
    }
  };

  const navigate = (tab: TabId) => {
    onChangeTab(tab);
    setFlyout(null);
    if (!isDesktop) layout.setMobileOpen(false);
  };

  const openFlyout = (item: NavItem, el: HTMLElement) => {
    if (flyoutTimer.current) clearTimeout(flyoutTimer.current);
    const rect = el.getBoundingClientRect();
    setFlyout({ item, top: Math.max(12, Math.min(rect.top, window.innerHeight - 320)) });
  };

  const scheduleCloseFlyout = () => {
    if (flyoutTimer.current) clearTimeout(flyoutTimer.current);
    flyoutTimer.current = setTimeout(() => setFlyout(null), 140);
  };

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = isItemActive(item, activeTab);
    const isIoc = item.accent === 'ioc';
    const badge = item.badge === 'pending' && pendingCount > 0 ? pendingCount : null;
    const expanded = !!openGroups[item.key];

    return (
      <li
        key={item.key}
        className="relative"
        onMouseEnter={e => {
          if (iconOnly && item.children) openFlyout(item, e.currentTarget);
        }}
        onMouseLeave={() => {
          if (iconOnly) scheduleCloseFlyout();
        }}
      >
        <button
          type="button"
          onClick={() => {
            if (item.tab) {
              navigate(item.tab);
            } else if (iconOnly) {
              if (item.children?.[0]) navigate(item.children[0].id);
            } else {
              setOpenGroups(prev => ({ ...prev, [item.key]: !prev[item.key] }));
            }
          }}
          title={iconOnly ? item.label : undefined}
          aria-current={active && item.tab ? 'page' : undefined}
          aria-expanded={item.children && !iconOnly ? expanded : undefined}
          className={cn(
            'group relative flex w-full items-center rounded-lg text-[13.5px] font-medium transition-colors duration-150',
            iconOnly ? 'h-11 justify-center px-0' : 'gap-3 px-3 py-2.5',
            active
              ? isIoc
                ? 'bg-blue-500/15 text-blue-200'
                : 'bg-slate-800 text-white'
              : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100',
          )}
        >
          {/* Active rail marker */}
          <span
            className={cn(
              'absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full transition-all duration-200',
              active ? (isIoc ? 'bg-blue-400' : 'bg-blue-500') : 'bg-transparent',
            )}
          />
          <Icon
            size={18}
            className={cn(
              'shrink-0 transition-colors',
              active
                ? isIoc
                  ? 'text-blue-300'
                  : 'text-blue-400'
                : 'text-slate-500 group-hover:text-slate-300',
            )}
          />
          {!iconOnly && <span className="flex-1 truncate text-left">{item.label}</span>}
          {!iconOnly && badge !== null && (
            <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {badge}
            </span>
          )}
          {!iconOnly && item.children && (
            <ChevronRight
              size={15}
              className={cn(
                'shrink-0 text-slate-500 transition-transform duration-200',
                expanded && 'rotate-90',
              )}
            />
          )}
          {iconOnly && badge !== null && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-900" />
          )}
        </button>

        {/* Nested pages, shown inline when the rail is expanded */}
        {!iconOnly && item.children && (
          <div
            className={cn(
              'grid transition-all duration-200 ease-out',
              expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            )}
          >
            <ul className="ml-[26px] space-y-0.5 overflow-hidden border-l border-slate-800 pl-3">
              {item.children.map(child => {
                const childActive = activeTab === child.id;
                return (
                  <li key={child.id} className="first:mt-1 last:mb-1">
                    <button
                      type="button"
                      onClick={() => navigate(child.id)}
                      aria-current={childActive ? 'page' : undefined}
                      className={cn(
                        'w-full truncate rounded-md px-3 py-2 text-left text-[13px] transition-colors',
                        childActive
                          ? 'bg-blue-500/10 font-semibold text-blue-300'
                          : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200',
                      )}
                    >
                      {child.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </li>
    );
  };

  const drawerWidth = iconOnly ? SIDEBAR_COLLAPSED_WIDTH : layout.width;

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={() => layout.setMobileOpen(false)}
        className={cn(
          'fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-200 lg:hidden',
          layout.mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
      />

      <aside
        ref={asideRef}
        style={{ width: drawerWidth }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-full shrink-0 flex-col border-r border-slate-800 bg-slate-900 text-slate-200',
          'max-lg:!w-[86vw] max-lg:!max-w-[320px] max-lg:shadow-2xl',
          layout.mobileOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full',
          'lg:relative lg:translate-x-0',
          layout.isResizing ? 'transition-none' : 'transition-[width,transform] duration-200 ease-out',
        )}
      >
        {/* Brand */}
        <div
          className={cn(
            'flex h-16 shrink-0 items-center border-b border-slate-800',
            iconOnly ? 'justify-center px-0' : 'gap-3 px-4',
          )}
        >
          <button
            type="button"
            onClick={() => navigate('dashboard')}
            className="flex shrink-0 items-center justify-center rounded-lg bg-red-600 p-2 shadow-inner transition-transform hover:scale-105"
            title="Về trang tổng quan"
          >
            <Building2 className="h-5 w-5 text-yellow-300" />
          </button>
          {!iconOnly && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold uppercase leading-tight tracking-wide text-white">
                Văn phòng ĐBQH &amp; HĐND
              </p>
              <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                tỉnh Thanh Hóa
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={() => layout.setMobileOpen(false)}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            title="Đóng menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation tree */}
        <nav className="hdnd-scroll flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
          {sections.map((section, index) => (
            <div key={section.title} className={cn(index > 0 && 'mt-5')}>
              {iconOnly
                ? index > 0 && <div className="mx-auto mb-3 h-px w-8 bg-slate-800" />
                : (
                  <p className="mb-2 px-3 text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    {section.title}
                  </p>
                )}
              <ul className="space-y-1">{section.items.map(renderItem)}</ul>
            </div>
          ))}
        </nav>

        {/* Account block */}
        <div className={cn('shrink-0 border-t border-slate-800 p-3', iconOnly && 'px-2')}>
          {currentUser ? (
            <div
              className={cn(
                'flex items-center rounded-lg bg-slate-800/60',
                iconOnly ? 'justify-center p-2' : 'gap-3 p-2.5',
              )}
              title={iconOnly ? currentUser.name : undefined}
            >
              <UserCircle size={iconOnly ? 24 : 32} className="shrink-0 text-blue-400" />
              {!iconOnly && (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-bold text-white">{currentUser.name}</p>
                    <p className="truncate text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {ROLE_LABEL[currentUser.role] ?? currentUser.role}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    className="rounded-md p-2 text-red-400 transition-colors hover:bg-red-600 hover:text-white"
                    title="Đăng xuất"
                  >
                    <LogOut size={16} />
                  </button>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate('login')}
              className={cn(
                'flex w-full items-center justify-center rounded-lg bg-blue-600 font-bold text-white transition-colors hover:bg-blue-700',
                iconOnly ? 'h-10 px-0' : 'gap-2 px-3 py-2.5 text-[13px]',
              )}
              title="Đăng nhập"
            >
              <UserCircle size={18} />
              {!iconOnly && 'Đăng nhập'}
            </button>
          )}

          {/* Collapse control */}
          <button
            type="button"
            onClick={layout.toggleCollapsed}
            className={cn(
              'mt-2 hidden w-full items-center rounded-lg px-3 py-2 text-[12px] font-medium text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200 lg:flex',
              iconOnly && 'justify-center px-0',
            )}
            title={layout.collapsed ? 'Mở rộng menu (Ctrl+B)' : 'Thu gọn menu (Ctrl+B)'}
          >
            {layout.collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            {!iconOnly && <span className="ml-3">Thu gọn menu</span>}
          </button>
        </div>

        {/* Drag handle — only meaningful while the rail shows labels */}
        {!iconOnly && (
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Kéo để điều chỉnh độ rộng menu"
            aria-valuenow={layout.width}
            aria-valuemin={SIDEBAR_MIN_WIDTH}
            aria-valuemax={SIDEBAR_MAX_WIDTH}
            tabIndex={0}
            onPointerDown={startResize}
            onDoubleClick={layout.resetWidth}
            onKeyDown={onHandleKeyDown}
            title="Kéo để chỉnh độ rộng · nhấp đúp để đặt lại"
            className={cn(
              'absolute inset-y-0 -right-1 z-10 hidden w-2 cursor-col-resize touch-none focus:outline-none lg:block',
              'after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:rounded-full after:transition-colors',
              layout.isResizing
                ? 'after:bg-blue-500'
                : 'after:bg-transparent hover:after:bg-blue-500/60 focus-visible:after:bg-blue-500',
            )}
          />
        )}
      </aside>

      {/* Flyout submenu for the collapsed rail */}
      {iconOnly && flyout?.item.children && (
        <div
          style={{ top: flyout.top, left: SIDEBAR_COLLAPSED_WIDTH + 6 }}
          onMouseEnter={() => {
            if (flyoutTimer.current) clearTimeout(flyoutTimer.current);
          }}
          onMouseLeave={scheduleCloseFlyout}
          className="fixed z-[60] w-60 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 py-2 shadow-2xl"
        >
          <p className="px-4 pb-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-500">
            {flyout.item.label}
          </p>
          {flyout.item.children.map(child => (
            <button
              key={child.id}
              type="button"
              onClick={() => navigate(child.id)}
              className={cn(
                'block w-full px-4 py-2 text-left text-[13px] transition-colors',
                activeTab === child.id
                  ? 'bg-blue-500/15 font-semibold text-blue-300'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white',
              )}
            >
              {child.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
