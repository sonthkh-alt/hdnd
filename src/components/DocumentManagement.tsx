import { ExternalLink, FileText, Globe, ShieldCheck, AlertCircle } from 'lucide-react';

export function DocumentManagement() {
  const portalUrl = "https://qlvbdh.thanhhoa.gov.vn/truycap";

  return (
    <div className="p-4 md:p-8 w-full h-[calc(100vh-1rem)] flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-700 shadow-sm border border-emerald-200">
            <FileText size={32} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Cổng Quản lý văn bản</h2>
            <p className="text-slate-500 text-sm md:text-base mt-1 italic">Truy cập Hệ thống Quản lý văn bản và Điều hành tỉnh Thanh Hóa</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl shadow-xl">
        <div className="max-w-xl w-full text-center space-y-8">
          <div className="relative inline-block">
            <div className="bg-emerald-50 p-8 rounded-full border border-emerald-100 shadow-inner">
              <Globe size={80} className="text-emerald-600 animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-lg shadow-md border border-slate-100">
              <ShieldCheck size={24} className="text-emerald-500" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800">Thông báo Bảo mật Hệ thống</h3>
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-left">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-amber-600 shrink-0 mt-1" />
                <div className="text-sm text-amber-900 leading-relaxed">
                  <p className="font-bold mb-1">Tại sao không hiển thị tại đây?</p>
                  Hệ thống <b>qlvbdh.thanhhoa.gov.vn</b> áp dụng chính sách bảo mật <i>X-Frame-Options</i> để bảo vệ dữ liệu công vụ, ngăn chặn việc truy cập thông qua các khung nhúng trung gian. 
                  <br /><br />
                  Để đảm bảo an toàn và đầy đủ tính năng, đồng chí cần truy cập trực tiếp qua cổng chính thức của tỉnh.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <a 
              href={portalUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 w-full px-8 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Truy cập Hệ thống Quản lý văn bản</span>
              <ExternalLink size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <p className="text-slate-400 text-xs mt-4">Tự động chuyển hướng tới: {portalUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
