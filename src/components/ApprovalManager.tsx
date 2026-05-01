import { useApp } from '../store';
import { Check, X, Clock } from 'lucide-react';
import { formatDateVN } from '../lib/utils';

export function ApprovalManager() {
  const { pendingRegistrations, approveRegistration, rejectRegistration } = useApp();

  const pendingList = pendingRegistrations.filter(r => r.status === 'PENDING');

  if (pendingList.length === 0) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Duyệt tài khoản</h2>
          <p className="text-slate-500 mt-2 text-lg">Quản lý các yêu cầu truy cập hệ thống từ cán bộ.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <Check size={48} className="mx-auto text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-slate-800">Không có yêu cầu chờ duyệt</h3>
          <p className="text-slate-500 mt-2">Tất cả các tài khoản đăng ký mới đã được xử lý.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Duyệt tài khoản</h2>
        <p className="text-slate-500 mt-2 text-lg">Bạn có {pendingList.length} yêu cầu cần xử lý.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
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
    </div>
  );
}
