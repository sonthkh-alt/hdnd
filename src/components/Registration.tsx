import React, { useState } from 'react';
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
    profession: '',
    degree: '',
    politicalTheory: '',
    foreignLanguage: '',
    isPartyMember: false,
    partyDate: '',
    gender: '',
    nationality: 'Việt Nam',
    ethnicity: '',
    religion: '',
    hometown: '',
    currentResidence: ''
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
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-8 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Khai báo Hồ sơ cán bộ</h2>
          <p className="mt-2 text-sm text-slate-600">
            Xin chào <span className="font-semibold">{registrationUser?.email}</span>. Đây là lần đầu tiên đồng chí đăng nhập vào hệ thống. Vui lòng khai báo thông tin hồ sơ để Quản trị viên xét duyệt.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Họ và Tên <span className="text-red-500">*</span></label>
              <input 
                type="text" required
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ngày sinh <span className="text-red-500">*</span></label>
              <input 
                type="date" required
                value={formData.dateOfBirth} onChange={e => setFormData({...formData, dateOfBirth: e.target.value})}
                className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Giới tính</label>
              <select
                value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                value={formData.ethnicity} onChange={e => setFormData({...formData, ethnicity: e.target.value})}
                className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tôn giáo</label>
              <input 
                type="text"
                value={formData.religion} onChange={e => setFormData({...formData, religion: e.target.value})}
                className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Quốc tịch</label>
              <input 
                type="text"
                value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})}
                className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-slate-700 mb-1">Quê quán</label>
              <input 
                type="text"
                value={formData.hometown} onChange={e => setFormData({...formData, hometown: e.target.value})}
                className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nơi ở hiện nay</label>
              <input 
                type="text"
                value={formData.currentResidence} onChange={e => setFormData({...formData, currentResidence: e.target.value})}
                className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="border-t border-slate-200 mt-6 pt-6">
             <h4 className="font-semibold text-slate-800 mb-4">Thông tin Chức vụ - Trình độ</h4>
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
               <div className="sm:col-span-3">
                 <label className="block text-sm font-medium text-slate-700 mb-1">Phòng ban <span className="text-red-500">*</span></label>
                 <select
                   required
                   value={formData.departmentId} onChange={e => setFormData({...formData, departmentId: e.target.value})}
                   className="w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 >
                   {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Chức vụ <span className="text-red-500">*</span></label>
                 <input 
                   type="text" required placeholder="VD: Chuyên viên"
                   value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                   className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Ngạch công chức <span className="text-red-500">*</span></label>
                 <input 
                   type="text" required placeholder="VD: Chuyên viên chính"
                   value={formData.rank} onChange={e => setFormData({...formData, rank: e.target.value})}
                   className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Giáo dục phổ thông <span className="text-red-500">*</span></label>
                 <input 
                   type="text" required placeholder="VD: 12/12"
                   value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})}
                   className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 />
               </div>
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Chuyên môn, nghiệp vụ</label>
                <input 
                  type="text"
                  value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})}
                  className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Học hàm, học vị</label>
                <input 
                  type="text"
                  value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})}
                  className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Lý luận chính trị</label>
                <input 
                  type="text"
                  value={formData.politicalTheory} onChange={e => setFormData({...formData, politicalTheory: e.target.value})}
                  className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ngoại ngữ</label>
                <input 
                  type="text"
                  value={formData.foreignLanguage} onChange={e => setFormData({...formData, foreignLanguage: e.target.value})}
                  className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
             </div>
          </div>
          
          <div className="border-t border-slate-200 mt-6 pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  id="partyMember" type="checkbox"
                  checked={formData.isPartyMember} onChange={e => setFormData({...formData, isPartyMember: e.target.checked})}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-slate-300 rounded"
                />
                <label htmlFor="partyMember" className="ml-2 block text-sm font-medium text-slate-700">Đảng viên Đảng Cộng sản Việt Nam</label>
              </div>
              {formData.isPartyMember && (
                <div className="flex-1 max-w-xs">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ngày vào Đảng</label>
                  <input 
                    type="date"
                    value={formData.partyDate} onChange={e => setFormData({...formData, partyDate: e.target.value})}
                    className="w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}
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
