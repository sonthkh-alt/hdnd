import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Target, DollarSign, PieChart as PieIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const data = [
  { name: 'Tăng trưởng GRDP', tieu_chi: 11, thuc_hien: 8.2 },
  { name: 'Công nghiệp - XD (Tỉ trọng)', tieu_chi: 57, thuc_hien: 48 },
  { name: 'Dịch vụ (Tỉ trọng)', tieu_chi: 33, thuc_hien: 35 },
  { name: 'Công nghiệp chế biến (GRDP)', tieu_chi: 36, thuc_hien: 28 },
  { name: 'Thu ngân sách (Năm)', tieu_chi: 7, thuc_hien: 15 },
];

export function IOCEconomic() {
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Chỉ số Kinh tế - Xã hội (Nghị quyết Đại hội XX)</h2>
          <p className="text-slate-500">Mục tiêu phát triển Thanh Hóa đến năm 2030</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Xuất báo cáo NQ</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">Theo dõi tiến độ</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          { label: 'GRDP bình quân (2030)', value: '7,900 USD', trend: 'Mục tiêu', icon: TrendingUp, color: 'blue' },
          { label: 'Thu ngân sách 2030', value: '90,000 tỷ', trend: 'Mục tiêu', icon: DollarSign, color: 'emerald' },
          { label: 'Kim ngạch XK 2030', value: '15 tỷ USD', trend: 'Mục tiêu', icon: ArrowUpRight, color: 'indigo' },
          { label: 'Tỉ lệ đô thị hóa', value: '50%+', trend: 'Mục tiêu', icon: Target, color: 'amber' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <div className={`w-12 h-12 rounded-xl bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center mb-4`}>
                <item.icon size={24} />
             </div>
             <p className="text-slate-500 text-sm font-medium mb-1">{item.label}</p>
             <div className="flex items-end gap-3">
               <h3 className="text-2xl font-black text-slate-800">{item.value}</h3>
               <span className="text-[10px] font-bold mb-1 px-2 py-0.5 bg-slate-100 rounded text-slate-600">
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
            Tiến độ thực hiện các Chỉ tiêu Chủ yếu (Nhiệm kỳ 2025 - 2030)
          </h3>
          <div className="h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                 <XAxis type="number" axisLine={false} tickLine={false} hide />
                 <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={150} tick={{fontSize: 11, fontWeight: 600}} />
                 <Tooltip cursor={{fill: 'transparent'}} />
                 <Legend verticalAlign="top" iconType="circle" />
                 <Bar dataKey="tieu_chi" name="Kế hoạch Nghị quyết (%)" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={20} />
                 <Bar dataKey="thuc_hien" name="Hiện tại đạt được (%)" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-emerald-500" size={20} />
            Đột phá & Trọng điểm Nhiệm kỳ (AI Monitoring)
          </h3>
          <div className="space-y-6">
             {[
               { name: 'Công nghiệp chế biến, chế tạo', progress: 78, color: 'blue', goal: '36% GRDP' },
               { name: 'Đóng góp TFP vào GRDP', progress: 45, color: 'emerald', goal: '55% mục tiêu' },
               { name: 'Hệ số hiệu quả ICOR (bình quân)', progress: 100, color: 'amber', goal: 'Đạt 5.2' },
               { name: 'Giảm nghèo bình quân năm', progress: 95, color: 'indigo', goal: '1%+/năm' },
             ].map((n, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between text-sm font-bold">
                     <span className="text-slate-700">{n.name} <span className="text-[10px] text-slate-400 font-normal uppercase ml-2 tracking-wider">Goal: {n.goal}</span></span>
                     <span className={`text-${n.color}-600`}>{n.progress}%</span>
                   </div>
                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                     <div 
                       className={`h-full bg-${n.color}-500 transition-all duration-1000`} 
                       style={{ width: `${n.progress}%` }} 
                     />
                   </div>
                </div>
             ))}
          </div>
          <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
             <p className="text-sm text-emerald-700 font-medium leading-relaxed">
               <span className="font-bold">Giám sát Nghị quyết:</span> Thanh Hóa đang tập trung chuyển đổi nhanh từ mô hình tăng trưởng chiều rộng sang chiều sâu. Chỉ số TFP và ICOR đang có xu hướng cải thiện tích cực theo định hướng của Đại hội XX.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
