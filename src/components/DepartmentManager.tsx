import React, { useState } from 'react';
import { useApp } from '../store';
import { Building2, Plus, Users, Settings } from 'lucide-react';
import { Modal } from './Modal';
import { Department } from '../types';

export function DepartmentManager() {
  const { departments, employees, addDepartment, currentUser } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newDept: Department = {
      id: `d${Date.now()}`,
      name: newName.trim(),
      description: newDesc.trim()
    };
    addDepartment(newDept);
    setNewName('');
    setNewDesc('');
    setIsAdding(false);
  };

  const isAdmin = currentUser?.role === 'ADMIN';

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Cơ cấu Tổ chức</h2>
          <p className="text-slate-500 mt-2 text-lg">Quản lý các Phòng, Ban tham mưu và giúp việc.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Thêm Phòng/Ban
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => {
          const deptEmployees = employees.filter(e => e.departmentId === dept.id);
          const head = deptEmployees.find(e => e.role.includes('Trưởng phòng') || e.role.includes('Chánh Văn phòng'));
          
          return (
             <div key={dept.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 border-b border-slate-100">
                   <div className="flex items-start justify-between">
                     <div className="bg-blue-50 text-blue-700 p-3 rounded-lg">
                       <Building2 size={24} />
                     </div>
                     {isAdmin && (
                       <button className="text-slate-400 hover:text-slate-600 p-1">
                         <Settings size={18} />
                       </button>
                     )}
                   </div>
                   <h3 className="mt-4 text-xl font-bold text-slate-800 leading-tight">{dept.name}</h3>
                   <p className="mt-2 text-sm text-slate-500 h-10 line-clamp-2">{dept.description}</p>
                </div>
                <div className="bg-slate-50 p-5 space-y-3">
                   <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Phụ trách:</span>
                      <span className="font-semibold text-slate-800">{head?.name || 'Chưa phân công'}</span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Nhân sự:</span>
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                         <Users size={16} className="text-slate-400" />
                         <span>{deptEmployees.length} biên chế</span>
                      </div>
                   </div>
                </div>
             </div>
          );
        })}
      </div>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Thêm Phòng/Ban mới">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tên Phòng/Ban</label>
            <input 
              type="text" required
              value={newName} onChange={e => setNewName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ví dụ: Phòng Công tác Hội đồng"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả chức năng, nhiệm vụ</label>
            <textarea 
              rows={3} required
              value={newDesc} onChange={e => setNewDesc(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Nhập mô tả..."
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors">
              Xác nhận thêm
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
