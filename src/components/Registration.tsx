import { useState } from 'react';
import { useApp } from '../store';
import { RegistrationData } from '../types';

export function Registration() {
  const { registrationUser, departments, addRegistration, logout } = useApp();
  
  const [formData, setFormData] = useState({
    name: registrationUser?.displayName || '',
    dateOfBirth: '',
    departmentId: departments[0]?.id || '',
    role: '',
    rank: '',
    education: '',
    isPartyMember: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dateOfBirth || !formData.role || !formData.rank || !formData.education) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    const regData: RegistrationData = {
      uid: registrationUser.uid,
      email: registrationUser.email || '',
      ...formData,
      status: 'PENDING',
      createdAt: Date.now()
    };

    addRegistration(regData);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-8 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Khai báo Hồ sơ cán bộ</h2>
          <p className="mt-2 text-sm text-slate-600">
            Xin chào <span className="font-semibold">{registrationUser?.email}</span>. Đây là lần đầu tiên đồng chí đăng nhập vào hệ thống. Vui lòng khai báo thông tin hồ sơ để Quản trị viên xét duyệt.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Họ và Tên <span className="text-red-500">*</span></label>
              <input 
                type="text" required
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Ngày sinh <span className="text-red-500">*</span></label>
              <input 
                type="date" required
                value={formData.dateOfBirth} onChange={e => setFormData({...formData, dateOfBirth: e.target.value})}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Phòng ban <span className="text-red-500">*</span></label>
              <select
                required
                value={formData.departmentId} onChange={e => setFormData({...formData, departmentId: e.target.value})}
                className="mt-1 block w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Chức vụ <span className="text-red-500">*</span></label>
              <input 
                type="text" required placeholder="VD: Chuyên viên"
                value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Ngạch công chức <span className="text-red-500">*</span></label>
              <input 
                type="text" required placeholder="VD: Chuyên viên chính"
                value={formData.rank} onChange={e => setFormData({...formData, rank: e.target.value})}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Trình độ chuyên môn <span className="text-red-500">*</span></label>
              <input 
                type="text" required placeholder="VD: Thạc sĩ Luật"
                value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="h-5 flex items-center">
              <input
                id="partyMember" type="checkbox"
                checked={formData.isPartyMember} onChange={e => setFormData({...formData, isPartyMember: e.target.checked})}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-slate-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="partyMember" className="font-medium text-slate-700">Đảng viên Đảng Cộng sản Việt Nam</label>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 mt-6">
            <button 
              type="button" 
              onClick={logout}
              className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Hủy / Đăng xuất
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Gửi yêu cầu xét duyệt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
