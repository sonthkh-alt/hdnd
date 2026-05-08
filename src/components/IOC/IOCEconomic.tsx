import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Target, DollarSign, PieChart as PieIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const data = [
  { name: 'Nông nghiệp', tieu_chi: 45, thuc_hien: 48 },
  { name: 'Công nghiệp', tieu_chi: 85, thuc_hien: 72 },
  { name: 'Dịch vụ', tieu_chi: 60, thuc_hien: 65 },
  { name: 'Du lịch', tieu_chi: 35, thuc_hien: 42 },
  { name: 'Xuất khẩu', tieu_chi: 50, thuc_hien: 48 },
];

export function IOCEconomic() {
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Chỉ số Kinh tế - Xã hội</h2>
          <p className="text-slate-500">Giám sát các chỉ tiêu phát triển trọng điểm của tỉnh</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Xuất báo cáo</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">Cập nhật dữ liệu</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Tổng sản phẩm (GRDP)', value: '124,500 tỷ', trend: '+8.2%', icon: TrendingUp, color: 'blue' },
          { label: 'Thu cân đối ngân sách', value: '32,100 tỷ', trend: '+15.4%', icon: DollarSign, color: 'emerald' },
          { label: 'Vốn đầu tư thực hiện', value: '45,800 tỷ', trend: '-2.1%', icon: Target, color: 'amber' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <div className={`w-12 h-12 rounded-xl bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center mb-4`}>
                <item.icon size={24} />
             </div>
             <p className="text-slate-500 text-sm font-medium mb-1">{item.label}</p>
             <div className="flex items-end gap-3">
               <h3 className="text-2xl font-black text-slate-800">{item.value}</h3>
               <span className={`text-xs font-bold mb-1 flex items-center ${item.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                 {item.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                 {item.trend}
               </span>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <PieIcon className="text-blue-500" size={20} />
            Tiến độ thực hiện Chỉ tiêu 2026
          </h3>
          <div className="h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                 <XAxis type="number" axisLine={false} tickLine={false} />
                 <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} />
                 <Tooltip />
                 <Legend />
                 <Bar dataKey="tieu_chi" name="Chỉ tiêu kế hoạch" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={20} />
                 <Bar dataKey="thuc_hien" name="Thực tế đạt được" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-emerald-500" size={20} />
            Phân tích số liệu Ngành trọng điểm
          </h3>
          <div className="space-y-6">
             {[
               { name: 'Công nghiệp chế biến', progress: 85, color: 'blue' },
               { name: 'Nông nghiệp ứng dụng công nghệ cao', progress: 42, color: 'emerald' },
               { name: 'Dịch vụ logistics', progress: 68, color: 'amber' },
               { name: 'Kinh tế biển', progress: 91, color: 'indigo' },
             ].map((n, i) => (
               <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-700">{n.name}</span>
                    <span className={`text-${n.color}-600`}>{n.progress}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${n.color}-500 transition-all duration-1000`} 
                      style={{ width: `${n.progress}%` }} 
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Cập nhật: 2 giờ trước bởi AI Engine</p>
               </div>
             ))}
          </div>
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
             <p className="text-sm text-blue-700 font-medium leading-relaxed">
               <span className="font-bold">Nhận xét AI:</span> Ngành kinh tế biển đang vượt tiến độ 15%, trong khi đó Nông nghiệp ứng dụng công nghệ cao cần chú trọng giải ngân vốn trung hạn trong Quý III.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
