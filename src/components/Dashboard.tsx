import { Users, CheckSquare, Calendar, AlertCircle } from 'lucide-react';
import { useApp } from '../store';
import { getPriorityColor } from '../lib/utils';

export function Dashboard() {
  const { employees, tasks, schedules, currentUser } = useApp();

  const viewableTasks = currentUser?.role === 'USER' 
    ? tasks.filter(t => t.assigneeIds.includes(currentUser.employeeId!))
    : tasks;

  const activeTasks = viewableTasks.filter(t => t.status !== 'Hoàn thành');
  const urgentTasks = viewableTasks.filter(t => t.priority === 'Hỏa tốc' || t.priority === 'Thượng khẩn');

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Tổng quan hệ thống</h2>
        <p className="text-slate-500 mt-2 text-lg">Chào mừng {currentUser?.name}. Dưới đây là tóm tắt tình hình công việc {currentUser?.role === 'USER' ? 'của đồng chí' : 'hiện tại'}.</p>
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
              <CheckSquare size={24} className="text-indigo-700" />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Công việc đang xử lý</p>
              <h3 className="text-3xl font-bold text-slate-800">{activeTasks.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-4 rounded-lg">
              <AlertCircle size={24} className="text-red-700" />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Việc khẩn/Hỏa tốc</p>
              <h3 className="text-3xl font-bold text-slate-800">{urgentTasks.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <Calendar size={24} className="text-green-700" />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Lịch sự kiện tới</p>
              <h3 className="text-3xl font-bold text-slate-800">{schedules.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-800 text-lg">Công việc cần chú ý</h3>
          </div>
          <ul className="divide-y divide-slate-100">
            {urgentTasks.length === 0 && (
              <li className="p-6 text-center text-slate-500">Không có công việc khẩn.</li>
            )}
            {urgentTasks.map(task => (
              <li key={task.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">{task.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">Hạn xử lý: {task.deadline}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
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
