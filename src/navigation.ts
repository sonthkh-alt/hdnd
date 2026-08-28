import {
  Activity,
  Bot,
  Calendar,
  Contact,
  FileText,
  LayoutDashboard,
  LayoutGrid,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { AuthUser } from './types';

export type TabId =
  | 'dashboard'
  | 'employees'
  | 'commune-directory'
  | 'province-directory'
  | 'deputies'
  | 'na-deputies'
  | 'ktns-schedules'
  | 'pcn-schedules'
  | 'schedules'
  | 'personal-schedule'
  | 'assistant'
  | 'approvals'
  | 'document-management'
  | 'document-draft'
  | 'digital-transformation'
  | 'kpi-portal'
  | 'kpi-bieuquyet'
  | 'kpi-okr'
  | 'kpi-kiemdiem'
  | 'kpi-tieuchi'
  | 'kpi-troly'
  | 'login'
  | 'ioc-overview'
  | 'ioc-economic'
  | 'ioc-documents'
  | 'ioc-voters'
  | 'ioc-sessions';

export interface NavChild {
  id: TabId;
  label: string;
}

export interface NavItem {
  /** Unique key of the entry. For leaf entries this is the TabId itself. */
  key: string;
  label: string;
  icon: LucideIcon;
  /** Leaf entries navigate directly. */
  tab?: TabId;
  children?: NavChild[];
  /** Highlights the entry with the IOC accent colour. */
  accent?: 'ioc';
  /** Renders a live counter badge fed by the app store. */
  badge?: 'pending';
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

/** Human readable name of every routable tab — used by the top bar breadcrumb. */
export const PAGE_TITLES: Record<TabId, string> = {
  dashboard: 'Tổng quan hệ thống',
  employees: 'Hồ sơ cán bộ',
  'commune-directory': 'Danh bạ xã, phường',
  'province-directory': 'Danh bạ điện thoại tỉnh Thanh Hóa',
  deputies: 'Đại biểu HĐND tỉnh',
  'na-deputies': 'Đại biểu Quốc hội',
  'ktns-schedules': 'Lịch Ban Kinh tế - Ngân sách',
  'pcn-schedules': 'Lịch Ban Pháp chế',
  schedules: 'Lịch công tác cơ quan',
  'personal-schedule': 'Lịch công tác cá nhân',
  assistant: 'Trợ lý số',
  approvals: 'Duyệt đăng ký',
  'document-management': 'Văn phòng số',
  'document-draft': 'Soạn thảo văn bản',
  'digital-transformation': 'Chuyển đổi số & AI',
  'kpi-portal': 'Phần mềm nghiệp vụ dùng chung',
  'kpi-bieuquyet': 'Biểu quyết Online',
  'kpi-okr': 'Đánh giá OKR / KPI cán bộ, công chức',
  'kpi-kiemdiem': 'Kiểm điểm, đánh giá, xếp loại đảng viên',
  'kpi-tieuchi': 'Đánh giá tiêu chí HĐND tỉnh, xã, phường',
  'kpi-troly': 'Trợ lý AI nghiệp vụ dân cử',
  login: 'Đăng nhập hệ thống',
  'ioc-overview': 'IOC · Dashboard trung tâm',
  'ioc-economic': 'IOC · Chỉ số Kinh tế - Xã hội',
  'ioc-documents': 'IOC · Giám sát văn bản',
  'ioc-voters': 'IOC · Phân tích cử tri',
  'ioc-sessions': 'IOC · Giám sát kỳ họp',
};

/** Builds the sidebar tree; entries requiring an account are added only when signed in. */
export function buildNavigation(currentUser: AuthUser | null): NavSection[] {
  const sections: NavSection[] = [
    {
      title: 'Điều hành',
      items: [
        { key: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard, tab: 'dashboard' },
        {
          key: 'ioc',
          label: 'IOC Điều hành',
          icon: Activity,
          accent: 'ioc',
          children: [
            { id: 'ioc-overview', label: 'Dashboard Trung tâm' },
            { id: 'ioc-economic', label: 'Chỉ số Kinh tế - XH' },
            { id: 'ioc-documents', label: 'Giám sát Văn bản' },
            { id: 'ioc-voters', label: 'Phân tích Cử tri' },
            { id: 'ioc-sessions', label: 'Giám sát Kỳ họp' },
          ],
        },
      ],
    },
    {
      title: 'Nghiệp vụ',
      items: [
        {
          key: 'documents',
          label: 'Quản lý văn bản',
          icon: FileText,
          children: [
            { id: 'document-management', label: 'Văn phòng số' },
            ...(currentUser ? [{ id: 'document-draft' as TabId, label: 'Soạn thảo văn bản' }] : []),
          ],
        },
        {
          key: 'schedules',
          label: 'Lịch công tác',
          icon: Calendar,
          children: [
            { id: 'schedules', label: 'Lịch cơ quan' },
            { id: 'pcn-schedules', label: 'Lịch Ban Pháp chế' },
            { id: 'ktns-schedules', label: 'Lịch Ban KTNS' },
            ...(currentUser ? [{ id: 'personal-schedule' as TabId, label: 'Lịch cá nhân' }] : []),
          ],
        },
        {
          key: 'kpi',
          label: 'Phần mềm nghiệp vụ',
          icon: LayoutGrid,
          children: [
            { id: 'kpi-portal', label: 'Tất cả phân hệ' },
            { id: 'kpi-bieuquyet', label: 'Biểu quyết Online' },
            { id: 'kpi-okr', label: 'Đánh giá OKR / KPI' },
            { id: 'kpi-kiemdiem', label: 'Kiểm điểm đảng viên' },
            { id: 'kpi-tieuchi', label: 'Tiêu chí HĐND' },
            { id: 'kpi-troly', label: 'Trợ lý AI dân cử' },
          ],
        },
        {
          key: 'digital-transformation',
          label: 'Chuyển đổi số',
          icon: Zap,
          tab: 'digital-transformation',
        },
      ],
    },
    {
      title: 'Danh bạ & Hồ sơ',
      items: [
        {
          key: 'directory',
          label: 'Danh bạ',
          icon: Contact,
          children: [
            { id: 'employees', label: 'Hồ sơ Cán bộ' },
            { id: 'commune-directory', label: 'Danh bạ điện thoại' },
            { id: 'province-directory', label: 'Danh bạ tỉnh Thanh Hóa' },
            { id: 'na-deputies', label: 'Đại biểu Quốc hội' },
            { id: 'deputies', label: 'Đại biểu HĐND' },
          ],
        },
      ],
    },
    {
      title: 'Tiện ích',
      items: [{ key: 'assistant', label: 'Trợ lý số', icon: Bot, tab: 'assistant' }],
    },
  ];

  if (currentUser?.role === 'ADMIN') {
    sections.push({
      title: 'Quản trị',
      items: [
        {
          key: 'approvals',
          label: 'Duyệt đăng ký',
          icon: ShieldCheck,
          tab: 'approvals',
          badge: 'pending',
        },
      ],
    });
  }

  return sections;
}

/** Locates the section / item / child owning a tab so the header can render a breadcrumb. */
export function findNavLocation(sections: NavSection[], activeTab: TabId) {
  for (const section of sections) {
    for (const item of section.items) {
      if (item.tab === activeTab) return { section, item, child: undefined as NavChild | undefined };
      const child = item.children?.find(c => c.id === activeTab);
      if (child) return { section, item, child };
    }
  }
  return null;
}

export function isItemActive(item: NavItem, activeTab: TabId) {
  return item.tab === activeTab || !!item.children?.some(c => c.id === activeTab);
}
