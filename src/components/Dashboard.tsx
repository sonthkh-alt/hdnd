import { Users, Calendar, AlertCircle, Contact } from 'lucide-react';
import { useApp } from '../store';
import { mockNADeputies } from '../data/naDeputies';
import { deputiesData } from '../data/deputies';

export function Dashboard() {
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

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Tổng quan hệ thống</h2>
        <p className="text-slate-500 mt-2 text-lg">Chào mừng {currentUser?.name}. Dưới đây là tóm tắt lịch trình hiện tại.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <Users size={24} className="text-blue-700" />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Tổng số cán bộ</p>
              <h3 className="text-3xl font-bold text-slate-800">{employees.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 p-4 rounded-lg">
              <Contact size={24} className="text-indigo-700" />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Đại biểu QH</p>
              <h3 className="text-3xl font-bold text-slate-800">{mockNADeputies.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-4 rounded-lg">
              <Contact size={24} className="text-amber-700" />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Đại biểu HĐND</p>
              <h3 className="text-3xl font-bold text-slate-800">{deputiesData.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <Calendar size={24} className="text-green-700" />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Sự kiện tuần này</p>
              <h3 className="text-3xl font-bold text-slate-800">{thisWeekSchedules.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-800 text-lg">Sự kiện trong tuần</h3>
          </div>
          <ul className="divide-y divide-slate-100">
            {thisWeekSchedules.length === 0 && (
              <li className="p-6 text-center text-slate-500">Không có sự kiện nào trong tuần này.</li>
            )}
            {thisWeekSchedules.map(schedule => (
              <li key={schedule.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">{schedule.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">Ngày: {new Date(schedule.date).toLocaleDateString('vi-VN')} lúc {schedule.time}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200`}>
                    {schedule.type}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
