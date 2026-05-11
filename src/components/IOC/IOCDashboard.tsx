import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  Activity, Users, FileText, MessageSquare, TrendingUp, DollarSign,
  AlertCircle, CheckCircle2, Clock, MapPin, Search, PieChart as PieIcon,
  Target
} from 'lucide-react';

const economicData = [
  { name: '2025', gdp: 500, budget: 480 },
  { name: '2026', gdp: 555, budget: 550 },
  { name: '2027', gdp: 616, budget: 630 },
  { name: '2028', gdp: 684, budget: 720 },
  { name: '2029', gdp: 760, budget: 810 },
  { name: '2030', gdp: 845, budget: 900 },
];

const economicStructure = [
  { name: 'Công nghiệp - Xây dựng', value: 57, color: '#3b82f6' },
  { name: 'Dịch vụ', value: 33, color: '#10b981' },
  { name: 'Nông, lâm, thủy sản', value: 5, color: '#f59e0b' },
  { name: 'Thuế sản phẩm', value: 5, color: '#64748b' },
];

const documentStats = [
  { name: 'Đã xử lý', value: 850 },
  { name: 'Đang xử lý', value: 120 },
  { name: 'Quá hạn', value: 30 },
];

const targets2030 = [
  {
    category: 'Kinh tế & Ngân sách',
    color: 'blue',
    items: [
      { id: 1, name: 'Tốc độ tăng trưởng GRDP bình quân', value: '11% trở lên' },
      { id: 2, name: 'Cơ cấu kinh tế (CN-XD : DV : NN)', value: '57% : 33% : 5%' },
      { id: 3, name: 'Tỷ trọng kinh tế số trong GRDP', value: '30%' },
      { id: 4, name: 'GRDP bình quân đầu người', value: '7.900 USD' },
      { id: 5, name: 'Tỷ trọng công nghiệp chế biến, chế tạo', value: '36% GRDP' },
      { id: 6, name: 'Kim ngạch xuất khẩu đến năm 2030', value: '15 tỷ USD' },
      { id: 7, name: 'Tổng vốn đầu tư phát triển (2026-2030)', value: '840.000 tỷ' },
      { id: 8, name: 'Hệ số hiệu quả ICOR bình quân', value: '5,2' },
      { id: 9, name: 'Tốc độ tăng thu ngân sách bình quân', value: '7% trở lên' },
      { id: 10, name: 'Giá trị hàng hóa xuất khẩu (2030)', value: '15 tỷ USD' },
    ]
  },
  {
    category: 'Phát triển & Hạ tầng',
    color: 'emerald',
    items: [
      { id: 11, name: 'Sản lượng lương thực bình quân', value: '1,5 triệu tấn' },
      { id: 12, name: 'Số doanh nghiệp mới (2026-2030)', value: '15.000 DN' },
      { id: 13, name: 'Tỷ lệ đô thị hóa năm 2030', value: '50% trở lên' },
      { id: 14, name: 'Đất nông nghiệp tích tụ, tập trung', value: '50.000 ha' },
      { id: 15, name: 'Tăng năng suất lao động xã hội', value: '8,1% trở lên' },
      { id: 16, name: 'Đóng góp TFP vào tăng trưởng GRDP', value: '55%' },
      { id: 17, name: 'Xây dựng mới nhà ở xã hội (5 năm)', value: '7.500 căn' },
      { id: 18, name: 'Xã đạt chuẩn Nông thôn mới', value: '80% tổng số' },
    ]
  },
  {
    category: 'Xã hội & An sinh',
    color: 'amber',
    items: [
      { id: 19, name: 'Giảm tỷ lệ hộ nghèo bình quân năm', value: '1% trở lên' },
      { id: 20, name: 'Tỷ lệ lao động qua đào tạo', value: '80%' },
      { id: 21, name: 'Tỷ lệ lao động nông nghiệp', value: 'Dưới 20%' },
      { id: 22, name: 'Tỷ lệ dân số tham gia BHYT', value: '95% trở lên' },
      { id: 23, name: 'Số bác sĩ trên 1 vạn dân', value: '15 bác sĩ' },
      { id: 24, name: 'Tỷ lệ trường đạt chuẩn quốc gia', value: '88,5%' },
      { id: 25, name: 'Xã đạt bộ tiêu chí quốc gia về y tế', value: '59,5%' },
    ]
  },
  {
    category: 'Môi trường & Đảng bộ',
    color: 'red',
    items: [
      { id: 26, name: 'Tỷ lệ che phủ rừng năm 2030', value: '54,5%' },
      { id: 27, name: 'Dân số nông thôn dùng nước hợp vệ sinh', value: '99,5%' },
      { id: 28, name: 'Chất thải rắn sinh hoạt được xử lý', value: '95%' },
      { id: 29, name: 'Xã đạt chuẩn an toàn về ANTT', value: '80% trở lên' },
      { id: 30, name: 'Xã có lực lượng dân quân thường trực', value: '100% số xã' },
      { id: 31, name: 'Kết nạp đảng viên mới hàng năm', value: '8.100 ĐV' },
      { id: 32, name: 'TCCBS hoàn thành tốt nhiệm vụ', value: '90% trở lên' },
    ]
  }
];

export function IOCDashboard() {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">TRUNG TÂM ĐIỀU HÀNH THÔNG MINH (IOC) - ĐẠI HỘI XX</h1>
          </div>
          <p className="text-slate-500 font-medium italic">Theo dõi thực hiện mục tiêu Nghị quyết Đại hội Đảng bộ tỉnh Thanh Hóa nhiệm kỳ 2025 - 2030</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Tra cứu chỉ số..." 
              className="pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 w-64 transition-all"
            />
          </div>
          <div className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 cursor-pointer hover:bg-blue-700 transition-colors">
            <Activity size={18} />
            <span>Thời gian thực</span>
          </div>
        </div>
      </header>

      {/* Top Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Tăng trưởng GRDP (Bình quân)', value: '11%+', change: 'Mục tiêu 2030', icon: TrendingUp, color: 'blue' },
          { label: 'GRDP bình quân đầu người', value: '$7,900', change: 'Mục tiêu 2030', icon: Users, color: 'emerald' },
          { label: 'Tổng thu ngân sách nhà nước', value: '90.000tỷ', change: 'Mục tiêu 2030', icon: DollarSign, color: 'amber' },
          { label: 'Tỷ lệ đô thị hóa toàn tỉnh', value: '50%+', change: 'Mục tiêu 2030', icon: MapPin, color: 'indigo' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group hover:border-blue-500 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full bg-slate-100 text-slate-500">
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-1">{stat.value}</h3>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* 32 Major Targets Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black flex items-center gap-2">
              <Target className="text-yellow-400" size={24} />
              Theo dõi 32 Chỉ tiêu chủ yếu năm 2030 (Nghị quyết Đại hội XX)
            </h2>
            <p className="text-slate-400 text-sm mt-1">Giám sát lộ trình thực hiện mục tiêu phát triển kinh tế - xã hội tỉnh Thanh Hóa</p>
          </div>
          <div className="flex gap-2">
             <div className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-bold border border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Đang cập nhật tiến độ
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
          {targets2030.map((group, idx) => (
            <div key={idx} className="p-0">
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">{group.category}</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded">{group.items.length} chỉ tiêu</span>
              </div>
              <div className="divide-y divide-slate-50">
                {group.items.map((item) => (
                  <div key={item.id} className="px-5 py-4 hover:bg-slate-50 transition-colors flex flex-col gap-1 group">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <span className="text-[10px] font-bold text-slate-300 group-hover:text-slate-400">#{item.id}</span>
                      <span className={`text-[11px] font-black text-${group.color}-600 bg-${group.color}-50 px-2 py-0.5 rounded border border-${group.color}-100`}>
                        {item.value}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 leading-snug">{item.name}</p>
                    <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
                       <div 
                         className={`h-full bg-${group.color}-500 transition-all duration-1000`} 
                         style={{ width: `${Math.floor(Math.random() * 40) + 30}%` }} 
                       />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={20} />
              Dự báo Tăng trưởng GRDP & Ngân sách (Lộ trình 2025 - 2030)
            </h2>
            <select className="bg-slate-100 border-none rounded-lg text-sm font-bold px-3 py-1.5 focus:ring-1 focus:ring-blue-500">
              <option>Toàn nhiệm kỳ</option>
              <option>Năm nay</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={economicData}>
                <defs>
                  <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="gdp" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorGdp)" name="GRDP (Dự kiến)" />
                <Area type="monotone" dataKey="budget" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorBudget)" name="Thu Ngân sách (Dự kiến)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
            <PieIcon className="text-emerald-500" size={20} />
            Cơ cấu Kinh tế (Mục tiêu 2030)
          </h2>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={economicStructure}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {economicStructure.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-800">100%</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Tổng GRDP</span>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {economicStructure.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}} />
                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Logs & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Clock className="text-amber-500" size={20} />
              Nhật ký Điều hành Hệ thống
            </h2>
            <button className="text-xs font-bold text-blue-600 hover:underline">Tất cả nhật ký</button>
          </div>
          <div className="space-y-4">
            {[
              { time: '10:24', action: 'Ký số văn bản #204/NQ-HĐND', user: 'Hà Ngọc Sơn', type: 'success' },
              { time: '09:45', action: 'Cập nhật chỉ tiêu GDP nông nghiệp', user: 'Ban KTNS', type: 'info' },
              { time: '08:30', action: 'Thiết lập phòng họp trực tuyển IOC', user: 'Quản trị viên', type: 'info' },
              { time: 'Hôm qua', action: 'Cảnh báo quá hạn xử lý kiến nghị #99', user: 'Hệ thống AI', type: 'warning' },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="text-[10px] font-bold text-slate-400 uppercase w-12">{log.time}</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-700">{log.action}</p>
                  <p className="text-xs text-slate-500">Thực hiện bởi: {log.user}</p>
                </div>
                {log.type === 'success' ? <CheckCircle2 className="text-emerald-500" size={18} /> : 
                 log.type === 'warning' ? <AlertCircle className="text-red-500" size={18} /> :
                 <div className="w-4.5 h-4.5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                   <Clock size={12} />
                 </div>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MapPin className="text-red-500" size={20} />
              Trạng thái Tiếp xúc Cử tri (Bản đồ số)
            </h2>
            <button className="text-xs font-bold text-blue-600 hover:underline">Xem bản đồ chi tiết</button>
          </div>
          <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden relative group">
             <img 
               src="https://images.unsplash.com/photo-1548345666-a57164eda0ee?auto=format&fit=crop&q=80&w=1000" 
               className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="text-red-600 animate-bounce" size={40} />
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-600 rounded-full animate-ping" />
                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-emerald-600 rounded-full animate-ping" />
                <div className="absolute top-1/2 right-1/2 w-3 h-3 bg-blue-600 rounded-full animate-ping" />
             </div>
             <div className="absolute bottom-4 left-4 p-3 bg-white/90 backdrop-blur rounded-xl shadow-lg border border-slate-200">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Điểm nóng cử tri</p>
               <p className="text-sm font-bold text-slate-800">Thành phố Thanh Hóa (12 kiến nghị)</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
