import React, { useState } from 'react';
import { 
  Zap, 
  Cpu, 
  BookOpen, 
  MessageSquare, 
  FileSearch, 
  ShieldCheck, 
  Lightbulb, 
  ArrowRight,
  Monitor,
  PenTool,
  Users,
  X,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GuideStep {
  title: string;
  description: string;
  detailedContent: string[];
  icon: any;
  image: string;
  color: string;
}

const guideSteps: GuideStep[] = [
  {
    title: 'Lộ trình Chuyển đổi số HĐND',
    description: 'Xây dựng cơ quan điện tử, tối ưu hóa quy trình làm việc bằng công nghệ số và tự động hóa báo cáo.',
    detailedContent: [
      'Giai đoạn 1 (2024): Hoàn thiện hệ hạ tầng số và số hóa 100% hồ sơ đại biểu.',
      'Giai đoạn 2 (2025): Vận hành hệ thống điều hành thông minh (IOC) và họp không giấy tờ đồng bộ.',
      'Giai đoạn 3 (2026+): Ứng dụng AI chuyên sâu trong dự báo kinh tế - xã hội và hỗ trợ ra quyết định.',
      'Trọng tâm: Trục liên thông văn bản quốc gia và cơ sở dữ liệu dùng chung tỉnh Thanh Hóa.'
    ],
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-blue-500'
  },
  {
    title: 'Tổng quan về Trí tuệ Nhân tạo (AI)',
    description: 'Hiểu về cách AI hỗ trợ phân tích dữ liệu, tóm tắt văn bản và đưa ra các gợi ý chính xác cho cán bộ.',
    detailedContent: [
      'AI không thay thế con người mà là "Trợ lý ảo" tăng cường năng lực xử lý khối lượng lớn dữ liệu.',
      'Công cụ hỗ trợ tóm tắt các kỳ họp kéo dài hàng ngày thành các điểm tin 5 phút.',
      'Hỗ trợ dự thảo các tờ trình, nghị quyết dựa trên các mẫu chuẩn hành chính.',
      'Phân tích nhanh xu hướng kiến nghị của cử tri qua các kỳ tiếp xúc.'
    ],
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-purple-500'
  },
  {
    title: 'Google Gemini trong Công vụ',
    description: 'Sử dụng Gemini để soạn thảo văn bản, lập kế hoạch công tác và tra cứu thông tin nhanh chóng.',
    detailedContent: [
      'Soạn thảo nhanh: Tạo khung đề cương báo cáo, diễn văn khai mạc chỉ trong vài giây.',
      'Lập lịch thông minh: Tự động sắp xếp thứ tự ưu tiên các đầu việc trong tuần từ nội dung email.',
      'Tra cứu đa nguồn: Hệ thống hóa các quy định pháp luật liên quan đến một vấn đề cụ thể.',
      'Dịch thuật và hiệu đính: Kiểm tra lỗi chính tả và chuẩn hóa văn phong hành chính.'
    ],
    icon: MessageSquare,
    image: 'https://images.unsplash.com/photo-1676299081847-82ae12386991?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-orange-500'
  },
  {
    title: 'Kỹ năng Đặt câu lệnh (Prompt)',
    description: 'Cách viết câu lệnh hiệu quả theo công thức: Bối cảnh + Nhiệm vụ + Định dạng để có kết quả tốt nhất.',
    detailedContent: [
      'Công thức CLEAR: Context (Bối cảnh) - Lead (Dẫn dắt) - Evidence (Dữ liệu) - Action (Hành động) - Result (Kết quả).',
      'Cung cấp vai trò: "Bạn là chuyên gia pháp chế của HĐND..." giúp AI trả lời sát chuyên môn.',
      'Giới hạn phạm vi: Chỉ rõ độ dài văn bản, tone giọng (trang trọng, khách quan).',
      'Lặp lại và tinh chỉnh: Không hài lòng kết quả đầu tiên? Hãy đưa thêm phản hồi để AI sửa lại.'
    ],
    icon: PenTool,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-emerald-500'
  },
  {
    title: 'Phân tích văn bản với NotebookLM',
    description: 'Công cụ chuyên sâu giúp đọc hiểu hàng ngàn trang tài liệu, nghị quyết và trả lời dựa trên kho tri thức riêng.',
    detailedContent: [
      'Nguồn dữ liệu tin cậy: AI chỉ trả lời dựa trên tệp tài liệu bạn tải lên, giảm thiểu sai lệch.',
      'Hỏi đáp theo ngữ cảnh: "Đối chiếu số liệu thu ngân sách giữa năm 2023 và 2024 trong báo cáo này".',
      'Tự động ghi chú: NotebookLM giúp trích xuất các ý chính và sắp xếp chúng thành một bản tóm tắt logic.',
      'Phù hợp cho các bộ hồ sơ kỳ họp dày hàng trăm trang PDF.'
    ],
    icon: FileSearch,
    image: 'https://images.unsplash.com/photo-1454165833762-02651d548e36?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-indigo-500'
  },
  {
    title: 'Bảo mật và Đạo đức AI',
    description: 'Quy tắc sử dụng AI an toàn: Không nhập dữ liệu mật và luôn kiểm chứng thông tin cuối cùng.',
    detailedContent: [
      'Ưu tiên bảo mật: Tuyệt đối không đưa văn bản thuộc danh mục Mật, Tối mật lên các nền tảng AI công cộng.',
      'Nguyên tắc "Người kiểm chứng": AI có thể cung cấp thông tin sai lệch (ảo giác), cán bộ phải là người chịu trách nhiệm cuối cùng.',
      'Minh bạch: Ghi chú "Sử dụng hỗ trợ từ AI" đối với các dự thảo do AI soạn thảo phần lớn.',
      'Bảo vệ quyền riêng tư cá nhân khi xử lý dữ liệu đại biểu và cử tri.'
    ],
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-red-500'
  },
  {
    title: 'Số hóa Cơ sở dữ liệu Đại biểu',
    description: 'Quản lý thông tin, quá trình hoạt động của Đại biểu HĐND các cấp trên nền tảng số tập trung.',
    detailedContent: [
      'Hệ thống quản lý vòng đời đại biểu: Từ khi trúng cử đến hết nhiệm kỳ.',
      'Theo dõi hoạt động tiếp xúc cử tri: Ghi nhận trực tiếp các kiến nghị và kết quả xử lý.',
      'Báo cáo hiệu quả hoạt động: Thống kê số lượt phát biểu, số lượng kiến nghị đã đề xuất.',
      'Trục kết nối thông tin giữa các ban của HĐND và tổ đại biểu tại địa phương.'
    ],
    icon: Users,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-amber-500'
  },
  {
    title: 'Hệ thống Quản lý văn bản 4.0',
    description: 'Quy trình ký số, luân chuyển văn bản không giấy tờ giữa các phòng ban và địa phương.',
    detailedContent: [
      'Ký số mọi lúc mọi nơi: Phê duyệt văn bản ngay trên thiết bị di động với độ bảo mật cao.',
      'Luồng văn bản tự động: Giảm thiểu thời gian chờ đợi giữa các bộ phận chuyên môn.',
      'Tra cứu thần tốc: Tìm kiếm văn bản cũ theo từ khóa, ngày ban hành hoặc cơ quan ký.',
      'Liên thông 4 cấp: Kết nối từ Trung ương đến cấp xã thông suốt.'
    ],
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-cyan-500'
  },
  {
    title: 'Kỹ năng Làm việc nhóm số',
    description: 'Sử dụng các công cụ cộng tác trực tuyến để tối ưu hóa việc hội chẩn báo cáo pháp chế.',
    detailedContent: [
      'Làm việc đồng thời: Nhiều cán bộ cùng soạn thảo một báo cáo qua Google Docs/Sheets.',
      'Nhóm chat chuyên trách: Theo dõi tiến độ công việc theo từng dự án hoặc kỳ họp.',
      'Họp trực tuyến chất lượng cao: Kết nối các đại biểu ở xa qua các nền tảng Meet/Teams.',
      'Kho lưu trữ đám mây dùng chung: Truy cập dữ liệu mọi lúc, giảm phụ thuộc vào USB/Ổ cứng.'
    ],
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-rose-500'
  },
  {
    title: 'Tương lai Công nghệ HĐND',
    description: 'Hướng tới một HĐND số hiện đại, tương tác đa kênh và minh bạch hơn với cử tri Thanh Hóa.',
    detailedContent: [
      'Hệ thống AI dự báo: Phân tích tác động kinh tế - xã hội của các dự thảo nghị quyết trước khi ban hành.',
      'Tương tác cử tri 24/7: Hệ thống Chatbot trả lời tự động các thắc mắc phổ biến của người dân.',
      'Blockchain trong bầu cử: Nghiên cứu ứng dụng công nghệ chuỗi khối để đảm bảo tính minh bạch tuyệt đối.',
      'Dữ liệu mở (Open Data): Công khai hóa các chỉ tiêu phát triển tỉnh để người dân cùng giám sát.'
    ],
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-teal-500'
  }
];

export function DigitalTransformation() {
  const [selectedStep, setSelectedStep] = useState<GuideStep | null>(null);
  const [showRegForm, setShowRegForm] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regData, setRegData] = useState({ name: '', department: '', phone: '', reason: '' });

  const handleDownload = () => {
    alert("Đề nghị liên hệ với Hà Ngọc Sơn, PCVP Đoàn ĐBQH và HĐND tỉnh để biết thêm chi tiết");
  };

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit to sonthkh@gmail.com:", regData);
    setRegSuccess(true);
    setTimeout(() => {
      setShowRegForm(false);
      setRegSuccess(false);
      setRegData({ name: '', department: '', phone: '', reason: '' });
    }, 3000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold tracking-tight">
            <Zap size={16} />
            HĐND TỈNH THANH HÓA
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
            Cẩm nang <span className="text-amber-500">Chuyển đổi số</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            Hướng dẫn dành riêng cho cán bộ, đại biểu về lộ trình chuyển đổi số và ứng dụng 
            Trí tuệ nhân tạo (Google Gemini, NotebookLM) trong hoạt động nghị trường.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8">
        {guideSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row hover:-translate-y-1"
          >
            <div className="w-full md:w-56 h-56 md:h-auto overflow-hidden relative shrink-0">
              <img 
                src={step.image} 
                alt={step.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <button 
                onClick={() => setSelectedStep(step)}
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
              >
                 <span className="text-white text-xs font-bold uppercase tracking-wider bg-amber-600 px-3 py-1 rounded-full">Xem chi tiết</span>
              </button>
            </div>
            
            <div className="p-8 flex flex-col justify-center flex-1">
              <div className={`w-12 h-12 rounded-2xl ${step.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <step.icon size={24} className={`text-${step.color.split('-')[1]}-600`} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {step.description}
              </p>
              <button 
                onClick={() => setSelectedStep(step)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-amber-600 transition-colors uppercase tracking-widest"
              >
                Tìm hiểu thêm <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-md mb-4">
            <Cpu size={48} className="text-amber-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Cùng kiến tạo một HĐND số hiện đại</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Chuyển đổi số không chỉ là công cụ, mà là thay đổi tư duy và cách chúng ta phục vụ cử tri. 
            Hãy bắt đầu từ những bước nhỏ nhất để tạo nên thay đổi lớn.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => setShowRegForm(true)}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-2xl font-black transition-all hover:scale-105"
            >
              Đăng ký đào tạo kỹ năng AI
            </button>
            <button 
              onClick={handleDownload}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold backdrop-blur-md transition-all"
            >
              Tải tài liệu hướng dẫn (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStep && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStep(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="h-64 relative">
                <img src={selectedStep.image} className="w-full h-full object-cover" />
                <div className={`absolute top-6 left-6 p-4 rounded-3xl ${selectedStep.color} text-white shadow-lg`}>
                  <selectedStep.icon size={32} />
                </div>
                <button 
                  onClick={() => setSelectedStep(null)}
                  className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-10 space-y-6">
                <h2 className="text-3xl font-black text-slate-800">{selectedStep.title}</h2>
                <p className="text-slate-500 font-medium italic">"{selectedStep.description}"</p>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Chi tiết triển khai</h4>
                  <ul className="space-y-3">
                    {selectedStep.detailedContent.map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-700 leading-relaxed">
                        <div className="mt-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6">
                  <button 
                    onClick={() => setSelectedStep(null)}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors"
                  >
                    Đã hiểu, tiếp tục khám phá
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Registration Form Modal */}
      <AnimatePresence>
        {showRegForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !regSuccess && setShowRegForm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 md:p-10"
            >
              {regSuccess ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-800">Đăng ký thành công!</h2>
                  <p className="text-slate-500">
                    Thông tin của đồng chí đã được gửi tới <b>Hà Ngọc Sơn</b> (sonthkh@gmail.com).<br />
                    Chúng tôi sẽ liên hệ lại với đồng chí sớm nhất.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-3xl font-black text-slate-800 tracking-tight">Đăng ký Đào tạo</h2>
                      <p className="text-slate-500 mt-1">Lớp kỹ năng AI & Công cụ số văn phòng</p>
                    </div>
                    <button onClick={() => setShowRegForm(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <form onSubmit={handleRegSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Họ và tên</label>
                      <input 
                        required
                        type="text" 
                        placeholder="VD: Nguyễn Văn A"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        value={regData.name}
                        onChange={e => setRegData({...regData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Phòng ban / Đơn vị</label>
                      <input 
                        required
                        type="text" 
                        placeholder="VD: Ban Pháp chế"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        value={regData.department}
                        onChange={e => setRegData({...regData, department: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Số điện thoại</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="VD: 098xxxxxxx"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        value={regData.phone}
                        onChange={e => setRegData({...regData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nhu cầu đào tạo cụ thể</label>
                      <textarea 
                        rows={3} 
                        placeholder="VD: Muốn học cách tóm tắt báo cáo bằng NotebookLM..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                        value={regData.reason}
                        onChange={e => setRegData({...regData, reason: e.target.value})}
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-2xl font-black text-lg shadow-xl shadow-amber-200/50 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                      <span>Gửi thông tin đăng ký</span>
                      <Send size={20} />
                    </button>
                  </form>
                  
                  <div className="mt-6 flex items-start gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                    <AlertCircle size={20} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Thông tin này sẽ được chuyển trực tiếp đến bộ phận phụ trách Công tác Chuyển đổi số của Văn phòng Đoàn ĐBQH & HĐND tỉnh.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
