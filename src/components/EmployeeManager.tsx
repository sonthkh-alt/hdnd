import React, { useState } from 'react';
import { useApp } from '../store';
import { Search, Plus, UserCircle, Briefcase } from 'lucide-react';
import { Modal } from './Modal';
import { Employee } from '../types';

export function EmployeeManager() {
  const { employees, departments, addEmployee, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Employee>>({
    departmentId: departments[0]?.id || '',
    role: 'Chuyên viên',
    isPartyMember: false
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.departmentId) return;

    const newEmp: Employee = {
      id: `e${Date.now()}`,
      name: formData.name,
      departmentId: formData.departmentId,
      role: formData.role || 'Chuyên viên',
      rank: formData.rank || 'Chuyên viên',
      education: formData.education || '12/12',
      isPartyMember: formData.isPartyMember || false,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      nationality: formData.nationality,
      ethnicity: formData.ethnicity,
      religion: formData.religion,
      hometown: formData.hometown,
      currentResidence: formData.currentResidence,
      profession: formData.profession,
      degree: formData.degree,
      politicalTheory: formData.politicalTheory,
      foreignLanguage: formData.foreignLanguage,
      partyDate: formData.partyDate
    };
    addEmployee(newEmp);
    setFormData({
      departmentId: departments[0]?.id || '',
      role: 'Chuyên viên',
      isPartyMember: false
    });
    setIsAdding(false);
  };

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAdmin = currentUser?.role === 'ADMIN';

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Hồ sơ Cán bộ</h2>
          <p className="text-slate-500 mt-2 text-lg">Quản lý danh sách, thông tin cán bộ, công chức, chuyên viên.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Thêm hồ sơ
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên, chức vụ..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-sm tracking-wider">
                <th className="p-4 font-semibold border-b">Họ và Tên</th>
                <th className="p-4 font-semibold border-b">Phòng ban</th>
                <th className="p-4 font-semibold border-b">Chức vụ / Ngạch</th>
                <th className="p-4 font-semibold border-b">Trình độ</th>
                <th className="p-4 font-semibold border-b text-center">Đảng viên</th>
                <th className="p-4 font-semibold border-b">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredEmployees.map(emp => {
                const dept = departments.find(d => d.id === emp.departmentId);
                return (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <UserCircle size={36} className="text-slate-400" />
                        <div>
                          <div className="font-semibold text-slate-900">{emp.name}</div>
                          <div className="text-xs text-slate-500">{emp.dateOfBirth}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Briefcase size={16} className="text-slate-400" />
                        <span>{dept?.name || '---'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-800">{emp.role}</div>
                      <div className="text-sm text-slate-500">{emp.rank}</div>
                    </td>
                    <td className="p-4 text-slate-700">{emp.education}</td>
                    <td className="p-4 text-center">
                      {emp.isPartyMember ? (
                        <span className="inline-flex items-center justify-center px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">
                          Đảng viên
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => setSelectedEmployee(emp)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Không tìm thấy hồ sơ nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <p className="text-xs text-slate-400 text-center italic mt-6">
        * Lưu ý: Đề nghị đồng chí kiểm tra tính toàn vẹn pháp lý và không nhập nội dung thuộc Danh mục bí mật Nhà nước.
      </p>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Thêm hồ sơ Cán bộ mới">
        <form onSubmit={handleAdd} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Họ và Tên <span className="text-red-500">*</span></label>
              <input 
                type="text" required
                value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ngày sinh</label>
              <input 
                type="date"
                value={formData.dateOfBirth || ''} onChange={e => setFormData({...formData, dateOfBirth: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Giới tính</label>
              <select
                value={formData.gender || ''} onChange={e => setFormData({...formData, gender: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Chọn --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Dân tộc</label>
              <input 
                type="text"
                value={formData.ethnicity || ''} onChange={e => setFormData({...formData, ethnicity: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tôn giáo</label>
              <input 
                type="text"
                value={formData.religion || ''} onChange={e => setFormData({...formData, religion: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Quốc tịch</label>
              <input 
                type="text"
                value={formData.nationality || 'Việt Nam'} onChange={e => setFormData({...formData, nationality: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Quê quán</label>
              <input 
                type="text"
                value={formData.hometown || ''} onChange={e => setFormData({...formData, hometown: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nơi ở hiện nay</label>
              <input 
                type="text"
                value={formData.currentResidence || ''} onChange={e => setFormData({...formData, currentResidence: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <h4 className="font-semibold text-slate-800 mb-3">Thông tin Chức vụ - Trình độ</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Phòng ban/Đơn vị công tác <span className="text-red-500">*</span></label>
                <select
                  required
                  value={formData.departmentId || ''} onChange={e => setFormData({...formData, departmentId: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Chức vụ <span className="text-red-500">*</span></label>
                <input 
                  type="text" required
                  value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Chuyên viên"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ngạch công chức</label>
                <input 
                  type="text"
                  value={formData.rank || ''} onChange={e => setFormData({...formData, rank: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Chuyên viên chính"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Giáo dục phổ thông</label>
                <input 
                  type="text"
                  value={formData.education || ''} onChange={e => setFormData({...formData, education: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: 12/12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Chuyên môn, nghiệp vụ</label>
                <input 
                  type="text"
                  value={formData.profession || ''} onChange={e => setFormData({...formData, profession: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Cử nhân Luật"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Học hàm, học vị</label>
                <input 
                  type="text"
                  value={formData.degree || ''} onChange={e => setFormData({...formData, degree: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Thạc sĩ Quản lý nhà nước"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Lý luận chính trị</label>
                <input 
                  type="text"
                  value={formData.politicalTheory || ''} onChange={e => setFormData({...formData, politicalTheory: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Cao cấp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ngoại ngữ</label>
                <input 
                  type="text"
                  value={formData.foreignLanguage || ''} onChange={e => setFormData({...formData, foreignLanguage: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Tiếng Anh B1"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mt-4">
                  <input 
                    type="checkbox" id="partyMember"
                    checked={formData.isPartyMember || false} onChange={e => setFormData({...formData, isPartyMember: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="partyMember" className="text-sm font-medium text-slate-700">Đảng viên Đảng Cộng sản VN</label>
                </div>
              </div>
              {formData.isPartyMember && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ngày vào Đảng</label>
                  <input 
                    type="date"
                    value={formData.partyDate || ''} onChange={e => setFormData({...formData, partyDate: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 mt-4">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors">
              Lưu hồ sơ
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal View Details */}
      <Modal isOpen={!!selectedEmployee} onClose={() => setSelectedEmployee(null)} title="Hồ sơ chi tiết cán bộ">
        {selectedEmployee && (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto px-1 pb-4">
            <div className="flex items-center gap-6 pb-6 border-b border-slate-200">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <UserCircle size={64} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{selectedEmployee.name}</h3>
                <p className="text-blue-600 font-medium">{selectedEmployee.role} - {departments.find(d => d.id === selectedEmployee.departmentId)?.name}</p>
                {selectedEmployee.isPartyMember && (
                  <span className="inline-block mt-2 px-2.5 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">
                    Đảng viên Đảng Cộng sản Việt Nam
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-sm text-slate-500 font-medium">Giới tính</p>
                <p className="text-base text-slate-900 font-semibold">{selectedEmployee.gender || '---'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Ngày sinh</p>
                <p className="text-base text-slate-900 font-semibold">{selectedEmployee.dateOfBirth || '---'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Dân tộc</p>
                <p className="text-base text-slate-900 font-semibold">{selectedEmployee.ethnicity || '---'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Tôn giáo</p>
                <p className="text-base text-slate-900 font-semibold">{selectedEmployee.religion || '---'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Quốc tịch</p>
                <p className="text-base text-slate-900 font-semibold">{selectedEmployee.nationality || '---'}</p>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-200 pt-4">
              <div>
                <p className="text-sm text-slate-500 font-medium">Quê quán</p>
                <p className="text-base text-slate-900 font-semibold">{selectedEmployee.hometown || '---'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Nơi ở hiện nay</p>
                <p className="text-base text-slate-900 font-semibold">{selectedEmployee.currentResidence || '---'}</p>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-200 pt-4">
              <h4 className="font-semibold text-slate-800 text-lg">Thông tin Chức vụ - Trình độ</h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Ngạch công chức</p>
                  <p className="text-base text-slate-900 font-semibold">{selectedEmployee.rank || '---'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Giáo dục phổ thông</p>
                  <p className="text-base text-slate-900 font-semibold">{selectedEmployee.education || '---'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Chuyên môn, nghiệp vụ</p>
                  <p className="text-base text-slate-900 font-semibold">{selectedEmployee.profession || '---'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Học hàm, học vị</p>
                  <p className="text-base text-slate-900 font-semibold">{selectedEmployee.degree || '---'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Lý luận chính trị</p>
                  <p className="text-base text-slate-900 font-semibold">{selectedEmployee.politicalTheory || '---'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Ngoại ngữ</p>
                  <p className="text-base text-slate-900 font-semibold">{selectedEmployee.foreignLanguage || '---'}</p>
                </div>
                {selectedEmployee.isPartyMember && (
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Ngày vào Đảng</p>
                    <p className="text-base text-slate-900 font-semibold">{selectedEmployee.partyDate || '---'}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 mt-4">
              <button type="button" onClick={() => setSelectedEmployee(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 rounded-lg transition-colors">
                Đóng
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
