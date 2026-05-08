import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  Activity, Users, FileText, MessageSquare, TrendingUp, 
  AlertCircle, CheckCircle2, Clock, MapPin, Search
} from 'lucide-react';

const economicData = [
  { name: 'Tháng 1', gdp: 400, budget: 240 },
  { name: 'Tháng 2', gdp: 300, budget: 139 },
  { name: 'Tháng 3', gdp: 600, budget: 980 },
  { name: 'Tháng 4', gdp: 800, budget: 390 },
  { name: 'Tháng 5', gdp: 500, budget: 480 },
  { name: 'Tháng 6', gdp: 900, budget: 380 },
];

const voterSentiment = [
  { name: 'Hài lòng', value: 65, color: '#10b981' },
  { name: 'Bình thường', value: 25, color: '#f59e0b' },
  { name: 'Chưa hài lòng', value: 10, color: '#ef4444' },
];

const documentStats = [
  { name: 'Đã xử lý', value: 850 },
  { name: 'Đang xử lý', value: 120 },
  { name: 'Quá hạn', value: 30 },
];

export function IOCDashboard() {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">TRUNG TÂM ĐIỀU HÀNH THÔNG MINH (IOC)</h1>
          </div>
          <p className="text-slate-500 font-medium italic">Văn phòng Đoàn ĐBQH và HĐND tỉnh Thanh Hóa</p>
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
          { label: 'Văn bản đến hôm nay', value: '124', change: '+12%', icon: FileText, color: 'blue' },
          { label: 'Đại biểu đang online', value: '42', change: '85%', icon: Users, color: 'emerald' },
          { label: 'Kiến nghị đang xử lý', value: '18', change: '-4', icon: MessageSquare, color: 'amber' },
          { label: 'Tỷ lệ giải quyết số', value: '94%', change: '+2.4%', icon: TrendingUp, color: 'indigo' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group hover:border-blue-500 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-1">{stat.value}</h3>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={20} />
              Chỉ số Tăng trưởng & Ngân sách (Quý I-II/2026)
            </h2>
            <select className="bg-slate-100 border-none rounded-lg text-sm font-bold px-3 py-1.5 focus:ring-1 focus:ring-blue-500">
              <option>6 tháng qua</option>
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
                <Area type="monotone" dataKey="gdp" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorGdp)" name="Chỉ số GDP Vùng" />
                <Area type="monotone" dataKey="budget" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorBudget)" name="Thu Ngân sách" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
            <MessageSquare className="text-emerald-500" size={20} />
            Phân tích Cảm xúc Cử tri (AI)
          </h2>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={voterSentiment}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {voterSentiment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-800">82%</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Tích cực</span>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {voterSentiment.map((item, i) => (
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
