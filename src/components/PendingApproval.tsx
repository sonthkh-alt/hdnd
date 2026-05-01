import { useApp } from '../store';
import { Clock, LogOut } from 'lucide-react';
import { logoutGoogle } from '../lib/firebase';

export function PendingApproval() {
  const { logout } = useApp();

  const handleLogout = async () => {
    await logoutGoogle();
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-yellow-100 p-4 rounded-full">
            <Clock size={40} className="text-yellow-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Hồ sơ đang chờ duyệt
        </h2>
        <p className="mt-2 text-center text-slate-600">
          Thông tin của đồng chí đã được gửi đến Quản trị viên. Xin vui lòng chờ hệ thống xét duyệt cấp quyền truy cập.
        </p>
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <LogOut size={16} />
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
