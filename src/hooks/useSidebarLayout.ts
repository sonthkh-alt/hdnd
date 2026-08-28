import { useCallback, useEffect, useState } from 'react';

export const SIDEBAR_MIN_WIDTH = 224;
export const SIDEBAR_MAX_WIDTH = 460;
export const SIDEBAR_DEFAULT_WIDTH = 288;
export const SIDEBAR_COLLAPSED_WIDTH = 76;

const WIDTH_KEY = 'hdnd_sidebar_width';
const COLLAPSED_KEY = 'hdnd_sidebar_collapsed';

const clampWidth = (value: number) =>
  Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, Math.round(value)));

function readStoredWidth() {
  try {
    const saved = localStorage.getItem(WIDTH_KEY);
    if (saved) {
      const parsed = Number.parseInt(saved, 10);
      if (Number.isFinite(parsed)) return clampWidth(parsed);
    }
  } catch (e) {}
  return SIDEBAR_DEFAULT_WIDTH;
}

function readStoredCollapsed() {
  try {
    return localStorage.getItem(COLLAPSED_KEY) === '1';
  } catch (e) {
    return false;
  }
}

/**
 * Owns the persistent layout preferences of the left navigation: the user
 * chosen width, the collapsed (icon only) mode and the mobile drawer state.
 */
export function useSidebarLayout() {
  const [width, setWidthState] = useState<number>(readStoredWidth);
  const [collapsed, setCollapsed] = useState<boolean>(readStoredCollapsed);
  const [isResizing, setIsResizing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(WIDTH_KEY, String(width));
    } catch (e) {}
  }, [width]);

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSED_KEY, collapsed ? '1' : '0');
    } catch (e) {}
  }, [collapsed]);

  const setWidth = useCallback((value: number) => setWidthState(clampWidth(value)), []);
  const resetWidth = useCallback(() => setWidthState(SIDEBAR_DEFAULT_WIDTH), []);
  const toggleCollapsed = useCallback(() => setCollapsed(prev => !prev), []);

  // Ctrl/Cmd + B mirrors the collapse button, Escape closes the mobile drawer.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCollapsed();
      }
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggleCollapsed]);

  // Prevent the page behind the mobile drawer from scrolling.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return {
    width,
    setWidth,
    resetWidth,
    collapsed,
    setCollapsed,
    toggleCollapsed,
    isResizing,
    setIsResizing,
    mobileOpen,
    setMobileOpen,
  };
}

export type SidebarLayout = ReturnType<typeof useSidebarLayout>;
