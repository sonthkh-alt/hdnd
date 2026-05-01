import { useApp } from '../store';
import { Check, X } from 'lucide-react';
import { formatDateVN } from '../lib/utils';
import { useState } from 'react';

export function ApprovalManager() {
  const { pendingRegistrations, approveRegistration, rejectRegistration, pendingEdits, approveProfileEdit, rejectProfileEdit } = useApp();
  const [activeTab, setActiveTab] = useState<'REGISTRATION' | 'PROFILE'>('REGISTRATION');

  const pendingList = pendingRegistrations.filter(r => r.status === 'PENDING');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Duyệt hệ thống</h2>
        <p className="text-slate-500 mt-2 text-lg">Trang quản lý các yêu cầu từ người dùng.</p>
      </div>

      <div className="flex space-x-1 border-b border-slate-200">
        <button 
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${activeTab === 'REGISTRATION' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
          onClick={() => setActiveTab('REGISTRATION')}
        >
          Duyệt tài khoản ({pendingList.length})
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${activeTab === 'PROFILE' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
          onClick={() => setActiveTab('PROFILE')}
        >
          Duyệt cập nhật hồ sơ ({pendingEdits.length})
        </button>
      </div>

      {activeTab === 'REGISTRATION' && (
        pendingList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center mt-6">
            <Check size={48} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">Không có yêu cầu chờ duyệt</h3>
            <p className="text-slate-500 mt-2">Tất cả các tài khoản đăng ký mới đã được xử lý.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                    <th className="p-4 font-semibold pb-3">Họ và Tên</th>
                    <th className="p-4 font-semibold pb-3">Email</th>
                    <th className="p-4 font-semibold pb-3">Chức vụ / Ngạch</th>
                    <th className="p-4 font-semibold pb-3">Trình độ</th>
                    <th className="p-4 font-semibold pb-3">Ngày gửi</th>
                    <th className="p-4 font-semibold pb-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendingList.map(reg => (
                    <tr key={reg.uid} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-slate-800">{reg.name}</div>
                        {reg.isPartyMember && <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded border border-red-200">Đảng viên</span>}
                      </td>
                      <td className="p-4 text-slate-600 text-sm">{reg.email}</td>
                      <td className="p-4">
                        <div className="text-sm font-medium text-slate-800">{reg.role}</div>
                        <div className="text-xs text-slate-500">{reg.rank}</div>
                      </td>
                      <td className="p-4 text-slate-600 text-sm">{reg.education}</td>
                      <td className="p-4 text-slate-600 text-sm">
                        {new Date(reg.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button 
                          onClick={() => approveRegistration(reg.uid)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 font-medium text-sm rounded transition-colors border border-green-200"
                        >
                          <Check size={16} /> Duyệt
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm(`Bạn có chắc chắn muốn TỪ CHỐI truy cập của đồng chí ${reg.name}?`)) {
                               rejectRegistration(reg.uid);
                            }
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 font-medium text-sm rounded transition-colors border border-red-200"
                        >
                          <X size={16} /> Từ chối
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {activeTab === 'PROFILE' && (
        pendingEdits.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center mt-6">
            <Check size={48} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">Không có yêu cầu cập nhật hồ sơ</h3>
            <p className="text-slate-500 mt-2">Hệ thống đang không có hồ sơ nào chờ duyệt.</p>
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            {pendingEdits.map((edit: any) => (
              <div key={edit.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start gap-6">
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-900 mb-2">Yêu cầu từ: {edit.employeeName}</h4>
                  <p className="text-sm text-slate-500 mb-4">Ngày yêu cầu: {new Date(edit.timestamp).toLocaleString('vi-VN')}</p>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <h5 className="font-medium text-slate-700 mb-2 border-b border-slate-200 pb-2">Thông tin thay đổi:</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                      {Object.entries(edit.updates).map(([key, val]) => {
                         if (key === 'avatar' && val) return <div key={key} className="col-span-2"><strong>Ảnh đại diện:</strong> <img src={val as string} alt="avatar" className="w-16 h-16 rounded object-cover mt-1" /></div>;
                         return <div key={key}><strong>{key}:</strong> {String(val) || '---'}</div>;
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-w-[120px]">
                  <button 
                    onClick={() => approveProfileEdit(edit.employeeId)}
                    className="flex justify-center items-center gap-1 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm rounded transition-colors shadow-sm"
                  >
                    <Check size={16} /> Phê duyệt
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm(`Từ chối yêu cầu thay đổi thông tin của ${edit.employeeName}?`)) {
                        rejectProfileEdit(edit.employeeId);
                      }
                    }}
                    className="flex justify-center items-center gap-1 px-4 py-2 bg-white text-red-600 hover:bg-red-50 border border-red-200 font-medium text-sm rounded transition-colors"
                  >
                    <X size={16} /> Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
