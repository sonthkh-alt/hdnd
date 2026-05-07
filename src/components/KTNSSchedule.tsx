import { Calendar, ChevronRight, FileText, Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface KTNSProgram {
  id: string;
  year: number;
  type: 'Giám sát chuyên đề' | 'Khảo sát' | 'Thẩm tra' | 'Khác';
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

const ktnsData: KTNSProgram[] = [
  // 2024
  {
    id: '2024-gs-1',
    year: 2024,
    type: 'Giám sát chuyên đề',
    title: 'Giám sát việc thực hiện các nghị quyết của HĐND tỉnh về cơ chế, chính sách hỗ trợ phát triển kinh tế nông nghiệp',
    content: 'Chủ trì: Lãnh đạo Ban. Đối tượng giám sát: Sở Nông nghiệp và Phát triển nông thôn; UBND các huyện, thị xã, thành phố.',
    leader: 'Trưởng Ban',
    timeline: [
      { label: 'Ban hành kế hoạch giám sát', to: '2024-03-15' },
      { label: 'Giám sát thực tế tại địa phương', from: '2024-04-01', to: '2024-05-15' },
      { label: 'Hoàn thiện báo cáo kết quả', to: '2024-06-10' },
    ]
  },
  // 2025
  {
    id: '2025-gs-1',
    year: 2025,
    type: 'Thẩm tra',
    title: 'Thẩm tra các báo cáo về tình hình thực hiện dự toán thu ngân sách nhà nước, chi ngân sách địa phương năm 2025',
    content: 'Chủ trì: Thường trực Ban. Đơn vị phối hợp: Sở Tài chính; Cục Thuế tỉnh; Cục Hải quan tỉnh.',
    leader: 'Trưởng Ban',
    timeline: [
      { label: 'Thu thập số liệu dự toán', to: '2025-10-31' },
      { label: 'Họp thẩm tra chuyên sâu', from: '2025-11-05', to: '2025-11-15' },
      { label: 'Báo cáo thẩm tra trình kỳ họp', to: '2025-12-05' },
    ]
  },
  // 2026
  {
    id: '2026-gs-1',
    year: 2026,
    type: 'Giám sát chuyên đề',
    title: 'Giám sát tình hình thu hút đầu tư, tiến độ triển khai thực hiện và hoạt động của các cụm công nghiệp trên địa bàn tỉnh',
    content: 'Chủ trì: Đồng chí Trưởng Ban. Đơn vị phối hợp: Thường trực HĐND các xã, phường; Tổ đại biểu HĐND tỉnh nơi Ban tổ chức giám sát trực tiếp. Đối tượng giám sát: Sở Công thương; UBND các xã, phường có cụm công nghiệp trên địa bàn; các chủ đầu tư hạ tầng cụm công nghiệp.',
    leader: 'Trưởng Ban',
    timeline: [
      { label: 'Ban hành Kế hoạch, Quyết định, đề cương', to: '2026-04-25' },
      { label: 'Triển khai giám sát trực tiếp', from: '2026-05-03', to: '2026-05-20' },
      { label: 'Xây dựng và ký ban hành báo cáo', to: '2026-06-15' },
    ]
  },
  {
    id: '2026-gs-2',
    year: 2026,
    type: 'Giám sát chuyên đề',
    title: 'Giám sát về tiến độ triển khai thực hiện các dự án đầu tư công trọng điểm trên địa bàn tỉnh',
    content: 'Chủ trì: Đồng chí Trưởng Ban. Đơn vị phối hợp: Thường trực HĐND các xã, phường; Tổ đại biểu HĐND tỉnh nơi Ban tổ chức giám sát trực tiếp. Đối tượng giám sát: Sở Tài chính; UBND các xã, phường; các Ban Quản lý dự án đầu tư xây dựng của tỉnh và chủ đầu tư các dự án khác.',
    leader: 'Trưởng Ban',
    timeline: [
      { label: 'Ban hành Kế hoạch, Quyết định, đề cương', to: '2026-07-31' },
      { label: 'Triển khai giám sát trực tiếp', from: '2026-08-15', to: '2026-09-15' },
      { label: 'Xây dựng và ký ban hành báo cáo', to: '2026-09-30' },
    ]
  },
  {
    id: '2026-ks-1',
    year: 2026,
    type: 'Khảo sát',
    title: 'Khảo sát đánh giá các nội dung liên quan đến chính sách phát triển nông nghiệp và môi trường, giai đoạn 2026 - 2030',
    content: 'Chủ trì: Lãnh đạo Ban. Đơn vị phối hợp: Sở Nông nghiệp và Phát triển nông thôn; UBND các xã, phường nơi Ban tổ chức khảo sát trực tiếp.',
    leader: 'Lãnh đạo Ban',
    timeline: [
      { label: 'Ban hành Kế hoạch, Quyết định thành lập Tổ khảo sát', to: '2026-04-30' },
      { label: 'Triển khai khảo sát trực tiếp', from: '2026-05-10', to: '2026-05-30' },
      { label: 'Hoàn thành báo cáo khảo sát', to: '2026-06-15' },
    ]
  },
  {
    id: '2026-ks-2',
    year: 2026,
    type: 'Khảo sát',
    title: 'Khảo sát hiệu quả việc thực hiện chính sách hỗ trợ các phương tiện vận tải biển quốc tế và nội địa; hỗ trợ doanh nghiệp vận chuyển hàng hóa bằng container qua Cảng Nghi Sơn',
    content: 'Chủ trì: Lãnh đạo Ban. Đơn vị phối hợp: Ban Quản lý Khu kinh tế Nghi Sơn và các Khu công nghiệp tỉnh; Hải quan khu vực 7.',
    leader: 'Lãnh đạo Ban',
    timeline: [
      { label: 'Ban hành Kế hoạch, Quyết định thành lập Tổ khảo sát', to: '2026-05-15' },
      { label: 'Triển khai khảo sát trực tiếp', from: '2026-05-20', to: '2026-05-30' },
      { label: 'Hoàn thành báo cáo khảo sát', to: '2026-06-15' },
    ]
  },
  {
    id: '2026-ks-3',
    year: 2026,
    type: 'Khảo sát',
    title: 'Khảo sát tiến độ thực hiện các dự án khu đô thị trên địa bàn tỉnh',
    content: 'Chủ trì: Lãnh đạo Ban. Đơn vị phối hợp: Ban Pháp chế HĐND tỉnh; Thường trực HĐND các xã, phường. Đối tượng khảo sát: Các dự án khu đô thị trên địa bàn các phường trung tâm của tỉnh.',
    leader: 'Lãnh đạo Ban',
    timeline: [
      { label: 'Ban hành Kế hoạch, Quyết định thành lập Tổ khảo sát', to: '2026-09-30' },
      { label: 'Triển khai khảo sát trực tiếp', from: '2026-10-15', to: '2026-11-05' },
      { label: 'Hoàn thành báo cáo khảo sát', to: '2026-11-20' },
    ]
  },
  // 2027
  {
    id: '2027-gs-1',
    year: 2027,
    type: 'Giám sát chuyên đề',
    title: 'Giám sát việc giải quyết các vấn đề khó khăn, vướng mắc các dự án tồn đọng trên địa bàn tỉnh theo Kế hoạch số 66/KH-UBND ngày 10/3/2026',
    content: 'Chủ trì: Đồng chí Trưởng Ban. Đơn vị phối hợp: Thường trực HĐND, UBND các xã, phường; Tổ đại biểu HĐND tỉnh nơi Ban tổ chức giám sát trực tiếp.',
    leader: 'Trưởng Ban',
    timeline: [
      { label: 'Ban hành Kế hoạch, Quyết định, đề cương', to: '2027-03-01' },
      { label: 'Triển khai giám sát trực tiếp', from: '2027-03-15', to: '2027-04-15' },
      { label: 'Xây dựng và ký ban hành báo cáo', to: '2027-05-15' },
    ]
  },
  // 2028
  {
    id: '2028-gs-1',
    year: 2028,
    type: 'Giám sát chuyên đề',
    title: 'Giám sát công tác quản lý tài sản công và hiệu quả sử dụng đất tại các đơn vị sự nghiệp công lập',
    content: 'Chủ trì: Lãnh đạo Ban. Đối tượng: Các sở, ngành và UBND cấp huyện.',
    leader: 'Trưởng Ban',
    timeline: [
      { label: 'Chuẩn bị kế hoạch', to: '2028-04-30' },
      { label: 'Giám sát thực địa', from: '2028-05-10', to: '2028-06-10' },
      { label: 'Kết luận giám sát', to: '2028-06-30' },
    ]
  },
  // 2029
  {
    id: '2029-ks-1',
    year: 2029,
    type: 'Khảo sát',
    title: 'Khảo sát việc thực hiện các dự án thuộc chương trình mục tiêu quốc gia xây dựng nông thôn mới nâng cao',
    content: 'Chủ trì: Lãnh đạo Ban. Đơn vị phối hợp: Văn phòng điều phối nông thôn mới tỉnh.',
    leader: 'Phó Trưởng Ban',
    timeline: [
      { label: 'Lập danh mục khảo sát', to: '2029-03-20' },
      { label: 'Khảo sát tại các xã', from: '2029-04-01', to: '2029-05-20' },
      { label: 'Báo cáo Thường trực HĐND', to: '2029-06-15' },
    ]
  },
  // 2030
  {
    id: '2030-gs-1',
    year: 2030,
    type: 'Giám sát chuyên đề',
    title: 'Giám sát kết quả thực hiện kế hoạch phát triển kinh tế - xã hội 5 năm (2026 - 2030)',
    content: 'Chủ trì: Trưởng Ban. Đơn vị phối hợp: Sở Kế hoạch và Đầu tư. Tổng kết đánh giá các chỉ tiêu kinh tế quan trọng.',
    leader: 'Trưởng Ban',
    timeline: [
      { label: 'Xây dựng đề cương đánh giá', to: '2030-08-15' },
      { label: 'Làm việc với các ngành tổng hợp', from: '2030-09-01', to: '2030-10-15' },
      { label: 'Báo cáo tổng kết nhiệm kỳ', to: '2030-11-30' },
    ]
  },
  // 2031
  {
    id: '2031-ks-1',
    year: 2031,
    type: 'Khảo sát',
    title: 'Khảo sát chuẩn bị các nội dung kinh tế cho nhiệm kỳ tiếp theo (2031 - 2036)',
    content: 'Chủ trì: Lãnh đạo Ban. Định hướng phát triển các khu kinh tế động lực.',
    leader: 'Lãnh đạo Ban',
    timeline: [
      { label: 'Tổ chức thảo luận chuyên gia', to: '2031-03-15' },
      { label: 'Khảo sát các vùng kinh tế trọng điểm', from: '2031-04-01', to: '2031-05-01' },
      { label: 'Hoàn thiện văn kiện kinh tế', to: '2031-05-20' },
    ]
  }
];

export function KTNSSchedule() {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>(2026);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = ktnsData.filter(item => {
    const matchesYear = selectedYear === 'all' || item.year === selectedYear;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Kế hoạch công tác Ban Kinh tế - Ngân sách</h2>
          <p className="text-slate-500 mt-2 text-lg">Chương trình công tác (Hệ thống dữ liệu 2024 - 2031)</p>
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
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất cả
          </button>
          {[2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                selectedYear === year 
                  ? 'bg-blue-600 text-white shadow-md' 
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
              className="group border border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50/50"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        item.type === 'Giám sát chuyên đề' ? 'bg-orange-100 text-orange-700' :
                        item.type === 'Khảo sát' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-xs font-bold text-slate-400">NĂM {item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-snug">
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
                      <div className="absolute left-0 top-3 w-3 h-3 rounded-full border-2 border-blue-500 bg-white" />
                      {idx < item.timeline.length - 1 && (
                        <div className="absolute left-1.5 top-6 bottom-0 w-0.5 bg-blue-100" />
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
