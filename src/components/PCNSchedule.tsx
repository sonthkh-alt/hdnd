import { Calendar, ChevronRight, FileText, Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface PCNProgram {
  id: string;
  year: number;
  type: 'Giám sát' | 'Khảo sát' | 'Thẩm tra' | 'Tiếp xúc cử tri' | 'Tham mưu';
  title: string;
  content: string;
  timeline: {
    label: string;
    date?: string;
    from?: string;
    to?: string;
  }[];
  leader: string;
}

const pcnData: PCNProgram[] = [
  // 2026
  {
    id: '2026-gs-1',
    year: 2026,
    type: 'Giám sát',
    title: 'Giám sát việc giải quyết các ý kiến, kiến nghị của cử tri gửi đến các kỳ họp thường lệ HĐND tỉnh trong nhiệm kỳ 2021-2026',
    content: 'Cơ quan phối hợp: Các Ban của HĐND tỉnh; Văn phòng Đoàn ĐBQH và HĐND tỉnh. Đối tượng giám sát: UBND tỉnh; các sở, ban, ngành có liên quan; UBND các xã, phường.',
    leader: 'Trưởng Ban',
    timeline: [
      { label: 'Quyết định, Kế hoạch, đề cương gửi các đơn vị', from: '2026-04-15', to: '2026-05-14' },
      { label: 'Nghiên cứu báo cáo, tài liệu liên quan; tiến hành giám sát trực tiếp', from: '2026-05-15', to: '2026-06-15' },
      { label: 'Tổng hợp xây dựng dự thảo báo cáo; hoàn thiện và phát hành báo cáo kết quả', from: '2026-06-16', to: '2026-06-30' },
    ]
  },
  {
    id: '2026-ks-1',
    year: 2026,
    type: 'Khảo sát',
    title: 'Khảo sát việc chấp hành quy định của pháp luật về tải trọng của các xe vận chuyển đất và vật liệu xây dựng tại các khu vực khai thác khoáng sản',
    content: 'Cơ quan phối hợp: Văn phòng Đoàn ĐBQH và HĐND tỉnh; Ban Kinh tế - Ngân sách HĐND tỉnh. Đối tượng khảo sát: Công an tỉnh; các sở, ban, ngành có liên quan; UBND các xã, phường.',
    leader: 'Lãnh đạo Ban',
    timeline: [
      { label: 'Công văn, các Đề cương gửi các đơn vị khảo sát', to: '2026-04-30' },
      { label: 'Nghiên cứu báo cáo, tài liệu liên quan; tiến hành khảo sát trực tiếp', from: '2026-05-01', to: '2026-05-31' },
      { label: 'Báo cáo kết quả khảo sát trình Thường trực HĐND tỉnh', from: '2026-06-01', to: '2026-06-30' },
    ]
  },
  {
    id: '2026-tx-1',
    year: 2026,
    type: 'Tiếp xúc cử tri',
    title: 'Tiếp xúc cử tri trước kỳ họp thường lệ giữa năm 2026',
    content: 'Cơ quan phối hợp: Văn phòng Đoàn ĐBQH và HĐND tỉnh; UBMTTQ Việt Nam tỉnh. Tiếp xúc cử tri tại các địa điểm theo Kế hoạch của Thường trực HĐND tỉnh.',
    leader: 'Lãnh đạo Ban',
    timeline: [
      { label: 'Thực hiện tiếp xúc cử tri', from: '2026-05-01', to: '2026-05-31' },
    ]
  },
  {
    id: '2026-tm-1',
    year: 2026,
    type: 'Tham mưu',
    title: 'Tham mưu cho Thường trực HĐND tỉnh Giám sát việc thực hiện các quy định của pháp luật về tổ chức bộ máy và việc giải quyết thủ tục hành chính sau sắp xếp đơn vị hành chính cấp xã trên địa bàn tỉnh',
    content: 'Cơ quan phối hợp: Các Ban của HĐND tỉnh; Văn phòng Đoàn ĐBQH và HĐND tỉnh. Đối tượng giám sát: UBND tỉnh; Sở Nội vụ; các sở, ban, ngành có liên quan; UBND các xã, phường.',
    leader: 'Trưởng Ban',
    timeline: [
      { label: 'Quyết định, Kế hoạch, đề cương gửi các đơn vị', to: '2026-07-31' },
      { label: 'Nghiên cứu báo cáo, tiến hành giám sát trực tiếp', from: '2026-08-01', to: '2026-10-31' },
      { label: 'Tổng hợp xây dựng dự thảo báo cáo; phát hành báo cáo kết quả', from: '2026-11-01', to: '2026-11-30' },
    ]
  },
  {
    id: '2026-gs-2',
    year: 2026,
    type: 'Giám sát',
    title: 'Giám sát công tác quản lý, giáo dục, phòng ngừa và xử lý thanh thiếu niên hư vi phạm pháp luật trên địa bàn tỉnh giai đoạn 2022 - 2025',
    content: 'Cơ quan phối hợp: Văn phòng Đoàn ĐBQH và HĐND tỉnh; các cơ quan liên quan. Đối tượng giám sát: Công an tỉnh; các cơ quan có liên quan; UBND các xã, phường.',
    leader: 'Trưởng Ban',
    timeline: [
      { label: 'Quyết định, Kế hoạch, đề cương gửi các đơn vị', to: '2026-07-31' },
      { label: 'Nghiên cứu báo cáo, tiến hành giám sát trực tiếp', from: '2026-08-01', to: '2026-09-30' },
      { label: 'Tổng hợp xây dựng dự thảo báo cáo; phát hành báo cáo kết quả', from: '2026-10-01', to: '2026-10-31' },
    ]
  },
  // 2027
  {
    id: '2027-gs-1',
    year: 2027,
    type: 'Giám sát',
    title: 'Giám sát công tác giải quyết, xét xử án hình sự, dân sự của Toà án nhân dân hai cấp từ ngày 01/10/2025 đến ngày 30/9/2026',
    content: 'Chủ trì: Trưởng Ban. Đối tượng: Toà án nhân dân tỉnh, khu vực.',
    leader: 'Trưởng Ban',
    timeline: [
      { label: 'Chuẩn bị văn bản', to: '2027-02-28' },
      { label: 'Triển khai giám sát trực tiếp', from: '2027-03-01', to: '2027-04-30' },
      { label: 'Báo cáo kết quả', to: '2027-05-31' },
    ]
  }
];

export function PCNSchedule() {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>(2026);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = pcnData.filter(item => {
    const matchesYear = selectedYear === 'all' || item.year === selectedYear;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Kế hoạch công tác Ban Pháp chế</h2>
          <p className="text-slate-500 mt-2 text-lg">Chương trình công tác toàn khóa XIX (nhiệm kỳ 2026 - 2031)</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm nội dung..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-wrap items-center gap-4 mb-8 border-b border-slate-100 pb-6">
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              selectedYear === 'all' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất cả năm
          </button>
          {[2026, 2027, 2028, 2029, 2030, 2031].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                selectedYear === year 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Năm {year}
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          {filteredData.length === 0 && (
            <div className="text-center py-12 text-slate-500 italic">
              Không tìm thấy chương trình nào phù hợp.
            </div>
          )}
          {filteredData.map((item) => (
            <div 
              key={item.id} 
              className="group border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-400 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50/50"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        item.type === 'Giám sát' ? 'bg-red-100 text-red-700' :
                        item.type === 'Khảo sát' ? 'bg-blue-100 text-blue-700' :
                        item.type === 'Thẩm tra' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-xs font-bold text-slate-400">NĂM {item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-700 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm shrink-0">
                    <FileText size={24} className="text-slate-400" />
                  </div>
                </div>

                <div className="bg-white/60 rounded-lg p-4 mb-6 border border-slate-100/50">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {item.timeline.map((step, idx) => (
                    <div key={idx} className="relative pl-6 py-1">
                      <div className="absolute left-0 top-3 w-3 h-3 rounded-full border-2 border-indigo-500 bg-white" />
                      {idx < item.timeline.length - 1 && (
                        <div className="absolute left-1.5 top-6 bottom-0 w-0.5 bg-indigo-100" />
                      )}
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                        {step.from ? `${step.from} → ${step.to}` : `Trước ngày ${step.to}`}
                      </div>
                      <div className="text-sm font-medium text-slate-700 leading-tight">
                        {step.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500 tracking-wider uppercase">
                <span>Trọng tâm công tác ban</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Chủ trì:</span>
                  <span className="text-slate-700">{item.leader}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
