import { Users, Calendar, Contact, Zap, Activity, Book, ArrowUpRight } from 'lucide-react';
import { useApp } from '../store';
import { mockNADeputies } from '../data/naDeputies';
import { deputiesData } from '../data/deputies';
import type { TabId } from '../navigation';

interface DashboardProps {
  onTabChange: (tab: TabId) => void;
}

const STAT_STYLES = {
  blue: { wrap: 'hover:border-blue-300', icon: 'bg-blue-50 text-blue-700' },
  indigo: { wrap: 'hover:border-indigo-300', icon: 'bg-indigo-50 text-indigo-700' },
  amber: { wrap: 'hover:border-amber-300', icon: 'bg-amber-50 text-amber-700' },
  emerald: { wrap: 'hover:border-emerald-300', icon: 'bg-emerald-50 text-emerald-700' },
} as const;

export function Dashboard({ onTabChange }: DashboardProps) {
  const { employees, schedules, currentUser } = useApp();

  const getWeekRange = (weekOffset: number) => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(today.getFullYear(), today.getMonth(), diff + (weekOffset * 7));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  };

  const { start: thisWeekStart, end: thisWeekEnd } = getWeekRange(0);
  const thisWeekSchedules = schedules.filter(s => {
    const d = new Date(s.date);
    return d >= thisWeekStart && d <= thisWeekEnd;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const stats = [
    { tab: 'employees' as TabId, label: 'Tổng số cán bộ', value: employees.length, icon: Users, tone: 'blue' as const },
    { tab: 'na-deputies' as TabId, label: 'Đại biểu Quốc hội', value: mockNADeputies.length, icon: Contact, tone: 'indigo' as const },
    { tab: 'deputies' as TabId, label: 'Đại biểu HĐND', value: deputiesData.length, icon: Contact, tone: 'amber' as const },
    { tab: 'schedules' as TabId, label: 'Sự kiện tuần này', value: thisWeekSchedules.length, icon: Calendar, tone: 'emerald' as const },
  ];

  const directoryLinks = [
    { tab: 'employees' as TabId, label: 'Văn phòng', icon: Users, tone: 'blue' as const },
    { tab: 'na-deputies' as TabId, label: 'Đại biểu QH', icon: Contact, tone: 'indigo' as const },
    { tab: 'deputies' as TabId, label: 'Đại biểu HĐND', icon: Contact, tone: 'amber' as const },
    { tab: 'commune-directory' as TabId, label: 'Xã, Phường', icon: Book, tone: 'emerald' as const },
  ];

  const today = new Date();

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8 animate-in">
      {/* Greeting banner */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-400">
          {today.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
          Kính chào {currentUser?.name ?? 'Quý đồng chí'}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400 md:text-base">
          Hệ thống điều hành tác nghiệp của Văn phòng Đoàn ĐBQH và HĐND tỉnh Thanh Hóa.
          Dưới đây là tóm tắt số liệu và lịch trình hiện tại.
        </p>
      </section>

      {/* Key figures */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(stat => {
          const Icon = stat.icon;
          const style = STAT_STYLES[stat.tone];
          return (
            <button
              key={stat.label}
              onClick={() => onTabChange(stat.tab)}
              className={`group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:shadow-md ${style.wrap}`}
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-xl p-3 ${style.icon}`}>
                  <Icon size={22} />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-slate-300 transition-colors group-hover:text-slate-500"
                />
              </div>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-800">{stat.value}</h3>
              <p className="mt-1 text-[13px] font-medium text-slate-500">{stat.label}</p>
            </button>
          );
        })}
      </section>

      {/* Featured modules */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
          onClick={() => onTabChange('ioc-overview')}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left shadow-sm transition-colors hover:bg-slate-800"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-red-600 p-3.5 transition-transform group-hover:scale-105">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold tracking-tight text-white">Hệ thống IOC Điều hành</h4>
              <p className="text-sm text-slate-400">Theo dõi chỉ số và vận hành tập trung</p>
            </div>
          </div>
          <ArrowUpRight size={20} className="shrink-0 text-slate-500 group-hover:text-white" />
        </button>

        <button
          onClick={() => onTabChange('digital-transformation')}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:border-amber-300 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-amber-50 p-3.5 text-amber-700 transition-transform group-hover:scale-105">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold tracking-tight text-slate-800">Chuyển đổi số &amp; AI</h4>
              <p className="text-sm text-slate-500">Hướng dẫn NotebookLM &amp; Gemini</p>
            </div>
          </div>
          <ArrowUpRight size={20} className="shrink-0 text-slate-300 group-hover:text-slate-500" />
        </button>
      </section>

      {/* Directory shortcuts + weekly agenda */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
            <h3 className="text-[15px] font-bold text-slate-800">Danh bạ điện thoại</h3>
            <Book size={18} className="text-slate-400" />
          </div>
          <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
            {directoryLinks.map(link => {
              const Icon = link.icon;
              const style = STAT_STYLES[link.tone];
              return (
                <button
                  key={link.label}
                  onClick={() => onTabChange(link.tab)}
                  className={`flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition-all hover:bg-slate-50 ${style.wrap}`}
                >
                  <div className={`rounded-lg p-2 ${style.icon}`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-[13.5px] font-semibold text-slate-700">{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
            <h3 className="text-[15px] font-bold text-slate-800">Sự kiện trong tuần</h3>
            <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-600">
              {thisWeekSchedules.length}
            </span>
          </div>
          <ul className="divide-y divide-slate-100">
            {thisWeekSchedules.length === 0 && (
              <li className="p-8 text-center text-sm text-slate-500">
                Không có sự kiện nào trong tuần này.
              </li>
            )}
            {thisWeekSchedules.map(schedule => (
              <li key={schedule.id} className="px-5 py-4 transition-colors hover:bg-slate-50">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="truncate font-semibold text-slate-900">{schedule.title}</h4>
                    <p className="mt-1 text-[13px] text-slate-500">
                      {new Date(schedule.date).toLocaleDateString('vi-VN')} · {schedule.time}
                      {schedule.location ? ` · ${schedule.location}` : ''}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    {schedule.type}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
