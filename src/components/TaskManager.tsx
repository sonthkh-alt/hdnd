import { useState } from 'react';
import { useApp } from '../store';
import { Search, Plus, Clock, FileText } from 'lucide-react';
import { formatDateVN, getPriorityColor } from '../lib/utils';
import { Priority, Task } from '../types';
import { Modal } from './Modal';

export function TaskManager() {
  const { tasks, employees, addTask, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Task>>({ 
    priority: 'Thường',
    status: 'Chờ xử lý',
    assigneeIds: []
  });

  const priorityWeight: Record<Priority, number> = {
    'Hỏa tốc': 4,
    'Thượng khẩn': 3,
    'Khẩn': 2,
    'Thường': 1
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.deadline) return;

    const newTask: Task = {
      id: `t${Date.now()}`,
      title: formData.title,
      description: formData.description || '',
      priority: formData.priority as Priority || 'Thường',
      deadline: formData.deadline,
      status: 'Chờ xử lý',
      assigneeIds: formData.assigneeIds || [],
      documentRef: formData.documentRef
    };
    addTask(newTask);
    setFormData({ priority: 'Thường', status: 'Chờ xử lý', assigneeIds: [] });
    setIsAdding(false);
  };

  const toggleAssignee = (empId: string) => {
    setFormData(prev => {
      const current = prev.assigneeIds || [];
      if (current.includes(empId)) return { ...prev, assigneeIds: current.filter(id => id !== empId) };
      return { ...prev, assigneeIds: [...current, empId] };
    });
  };

  // Sort by priority first, then by deadline
  const sortedTasks = [...tasks].sort((a, b) => {
    if (priorityWeight[a.priority] !== priorityWeight[b.priority]) {
      return priorityWeight[b.priority] - priorityWeight[a.priority]; 
    }
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  // Chuyên viên only sees tasks assigned to them
  const viewableTasks = currentUser?.role === 'USER' 
    ? sortedTasks.filter(t => t.assigneeIds.includes(currentUser.employeeId!))
    : sortedTasks;

  const filteredTasks = viewableTasks.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.documentRef?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canManageTasks = currentUser?.role === 'ADMIN' || currentUser?.role === 'MANAGER';

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Quản lý Công việc</h2>
          <p className="text-slate-500 mt-2 text-lg">Theo dõi tiến độ, văn bản đi/đến và kỳ hạn báo cáo.</p>
        </div>
        {canManageTasks && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Giao việc mới
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm kiếm công việc, số văn bản..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
             {/* Future filters can go here */}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-sm tracking-wider">
                <th className="p-4 font-semibold border-b">Công việc / Văn bản</th>
                <th className="p-4 font-semibold border-b">Độ khẩn</th>
                <th className="p-4 font-semibold border-b">Thời hạn</th>
                <th className="p-4 font-semibold border-b">Người xử lý</th>
                <th className="p-4 font-semibold border-b">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTasks.map(task => {
                const assignees = task.assigneeIds.map(id => employees.find(e => e.id === id)?.name).filter(Boolean);
                
                return (
                  <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-slate-900">{task.title}</div>
                      {task.documentRef && (
                        <div className="flex items-center gap-1 mt-1 text-sm text-slate-500 font-medium">
                          <FileText size={14} />
                          <span>VB: {task.documentRef}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Clock size={16} className="text-slate-400" />
                        {formatDateVN(task.deadline)}
                      </div>
                    </td>
                    <td className="p-4">
                       <div className="flex flex-col gap-1">
                          {assignees.map((name, idx) => (
                            <span key={idx} className="text-sm bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                              {name}
                            </span>
                          ))}
                       </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-sm text-slate-600">
                        {task.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Không tìm thấy công việc nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center italic mt-6">
        * Lưu ý: Hệ thống đã tự động sắp xếp ưu tiên theo độ khẩn. Vui lòng không đính kèm tài liệu Mật.
      </p>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Giao việc mới">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung công việc <span className="text-red-500">*</span></label>
            <input 
              type="text" required
              value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: Chuẩn bị tài liệu kỳ họp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Căn cứ văn bản / Số ký hiệu</label>
            <input 
              type="text"
              value={formData.documentRef || ''} onChange={e => setFormData({...formData, documentRef: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: 123/BC-ĐBQH"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hạn xử lý (Deadline) <span className="text-red-500">*</span></label>
              <input 
                type="date" required
                value={formData.deadline || ''} onChange={e => setFormData({...formData, deadline: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Độ khẩn <span className="text-red-500">*</span></label>
              <select
                required
                value={formData.priority || 'Thường'} onChange={e => setFormData({...formData, priority: e.target.value as Priority})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Thường">Thường</option>
                <option value="Khẩn">Khẩn</option>
                <option value="Thượng khẩn">Thượng khẩn</option>
                <option value="Hỏa tốc">Hỏa tốc</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Người tiếp nhận xử lý</label>
            <div className="border border-slate-300 rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
              {employees.map(emp => (
                <label key={emp.id} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-slate-50 rounded">
                  <input 
                    type="checkbox"
                    checked={(formData.assigneeIds || []).includes(emp.id)}
                    onChange={() => toggleAssignee(emp.id)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-800">{emp.name}</span>
                    <span className="text-xs text-slate-500">{emp.role}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả thêm / Yêu cầu chi tiết</label>
            <textarea 
              rows={2}
              value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Nhập ghi chú..."
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors">
              Giao việc
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
