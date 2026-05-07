import { useApp } from '../store';
import { Bot, MapPin, Users, Clock, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { formatDateVN } from '../lib/utils';
import React, { useState } from 'react';
import { Modal } from './Modal';
import { EventSchedule } from '../types';

export function ScheduleManager() {
  const { schedules, addSchedule, currentUser } = useApp();
  const currentMonth = new Date().getMonth();
  const [selectedPeriod, setSelectedPeriod] = useState('Lịch tháng');
  
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<EventSchedule>>({ type: 'Họp Thường trực' });

  const handleExportPDF = () => {
    window.print();
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) return;
    
    const id = `s${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    const newSchedule: EventSchedule = {
      id,
      title: formData.title,
      date: formData.date,
      time: formData.time,
      location: formData.location || '',
      attendees: formData.attendees ? (formData.attendees as unknown as string).split(',').map(s => s.trim()) : [],
      type: formData.type as 'Tiếp cử tri' | 'Giám sát chuyên đề' | 'Họp Thường trực' | 'Khác'
    };
    addSchedule(newSchedule);
    setFormData({ type: 'Họp Thường trực' });
    setIsAdding(false);
  };

  const getFilteredSchedules = () => {
    if (selectedPeriod === 'Tất cả lịch') {
      return [...schedules].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    if (selectedPeriod === 'Lịch tháng') {
      return schedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate.getMonth() === currentMonth;
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    if (selectedPeriod.startsWith('Tháng')) {
      const monthStr = selectedPeriod.split(' ')[1];
      const monthIndex = parseInt(monthStr, 10) - 1;
      return schedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate.getMonth() === monthIndex;
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return [...schedules].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const displaySchedules = getFilteredSchedules();
  const months = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);

  const canManageSchedules = currentUser?.role === 'ADMIN' || currentUser?.role === 'MANAGER';

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Lịch công tác</h2>
          <p className="text-slate-500 mt-2 text-lg">Lịch làm việc của Thường trực HĐND, Ban HĐND và Lãnh đạo Đoàn ĐBQH.</p>
        </div>
        <div className="flex gap-2 print:hidden">
          <button 
            onClick={handleExportPDF}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Xuất PDF
          </button>
          {canManageSchedules && (
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Tạo sự kiện
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 print:border-none print:shadow-none">
         <div className="flex flex-wrap items-center gap-4 mb-6 border-b border-slate-100 pb-4 print:hidden">
            {['Tất cả lịch', 'Lịch tháng'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedPeriod === period 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {period}
              </button>
            ))}

            <select 
              value={selectedPeriod.startsWith('Tháng') ? selectedPeriod : ''} 
              onChange={(e) => {
                if (e.target.value) {
                  setSelectedPeriod(e.target.value);
                }
              }}
              className={`px-4 py-2 rounded-md font-medium transition-colors border outline-none ${
                selectedPeriod.startsWith('Tháng') 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'text-slate-600 border-transparent hover:bg-slate-50'
               }`}
            >
              <option value="" disabled>Chọn tháng</option>
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
         </div>

         <div className="space-y-4">
            {displaySchedules.map(schedule => (
              <div key={schedule.id} className="flex gap-4 p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors bg-slate-50/50 print:border-slate-300 print:break-inside-avoid">
                <div className="w-32 shrink-0 flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg p-3 print:bg-slate-800">
                  <span className="text-sm font-medium opacity-90">Ngày</span>
                  <span className="text-xl font-bold">{new Date(schedule.date).getDate()}</span>
                  <span className="text-sm font-medium opacity-90">Tháng {new Date(schedule.date).getMonth() + 1}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{schedule.title}</h3>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
                        {schedule.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-600 text-sm">
                    <div className="flex items-center gap-2">
                       <Clock size={16} className="text-slate-400" />
                       <span className="font-medium text-slate-800">{schedule.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <MapPin size={16} className="text-slate-400" />
                       <span>{schedule.location}</span>
                    </div>
                    <div className="flex items-start gap-2 md:col-span-2">
                       <Users size={16} className="text-slate-400 mt-0.5" />
                       <span><strong>Thành phần:</strong> {schedule.attendees.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {displaySchedules.length === 0 && (
              <div className="text-center p-8 text-slate-500">
                Không có sự kiện nào trong {selectedPeriod.toLowerCase()}.
              </div>
            )}
         </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800 print:hidden">
         <Bot className="shrink-0 mt-0.5" />
         <p className="text-sm">
           <strong>Trợ lý số gợi ý:</strong> Đồng chí có thể yêu cầu Trợ lý số tự động dự thảo lịch công tác tuần dựa trên các sự kiện, nghị quyết mới nhất.
         </p>
      </div>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Tạo sự kiện mới">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tên sự kiện <span className="text-red-500">*</span></label>
            <input 
              type="text" required
              value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: Họp Thường trực định kỳ"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ngày <span className="text-red-500">*</span></label>
              <input 
                type="date" required
                value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Giờ <span className="text-red-500">*</span></label>
              <input 
                type="time" required
                value={formData.time || ''} onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Địa điểm</label>
            <input 
              type="text"
              value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: Phòng họp số 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Loại sự kiện</label>
            <select
              value={formData.type || 'Họp Thường trực'} onChange={e => setFormData({...formData, type: e.target.value as any})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Tiếp cử tri">Tiếp cử tri</option>
              <option value="Giám sát chuyên đề">Giám sát chuyên đề</option>
              <option value="Họp Thường trực">Họp Thường trực</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Thành phần tham dự</label>
            <textarea 
              rows={2}
              value={(formData.attendees as unknown as string) || ''} onChange={e => setFormData({...formData, attendees: e.target.value as any})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Cách nhau bằng dấu phẩy (VD: Thường trực HĐND, Lãnh đạo ĐBQH)"
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors">
              Lưu sự kiện
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
