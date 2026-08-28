/**
 * Danh mục phân hệ của Cổng phần mềm nghiệp vụ dùng chung
 * https://hdndthkpi.vercel.app  (Văn phòng Đoàn ĐBQH và HĐND tỉnh Thanh Hóa)
 *
 * Cổng đó điều hướng bằng hash route (`#/bieuquyet`, `#/okr`, ...), nên mỗi
 * phân hệ ở đây mở thẳng được vào đúng màn hình tương ứng. Một số phân hệ là
 * hệ thống riêng đặt ở tên miền khác — chúng mở ở tab mới thay vì nhúng.
 */

export const KPI_PORTAL_URL = 'https://hdndthkpi.vercel.app';

/** Hệ thống Lịch công tác tuần — tên miền riêng nhưng cho phép nhúng. */
export const WEEKLY_CALENDAR_URL = 'https://calendar-beta-lac.vercel.app';

export type KpiTone =
  | 'red'
  | 'emerald'
  | 'rose'
  | 'indigo'
  | 'cyan'
  | 'slate'
  | 'orange'
  | 'teal'
  | 'amber'
  | 'sky'
  | 'violet';

export interface KpiModule {
  id: string;
  /** Hash route trên cổng nguồn: https://hdndthkpi.vercel.app/#/<route> */
  route: string;
  /** 'main' = phân hệ nghiệp vụ, 'tool' = công cụ hỗ trợ */
  group: 'main' | 'tool';
  title: string;
  short: string;
  desc: string;
  tags: string[];
  /** Tên icon trong lucide-react */
  icon: string;
  tone: KpiTone;
  badge?: string;
  /** Hệ thống riêng ở tên miền khác và chặn nhúng — mở ở tab mới. */
  externalUrl?: string;
  /** Hệ thống riêng ở tên miền khác nhưng cho phép nhúng — mở ngay trong khung. */
  embedUrl?: string;
}

export const kpiModules: KpiModule[] = [
  {
    id: 'bieuquyet',
    route: 'bieuquyet',
    group: 'main',
    title: 'Biểu quyết Online',
    short: 'Biểu quyết',
    desc: 'Biểu quyết trực tuyến tại kỳ họp HĐND tỉnh: chọn kỳ họp, đại biểu bấm Đồng ý · Không đồng ý · Có ý kiến khác cho từng nghị quyết hoặc một lần cho tất cả nghị quyết của kỳ họp; hệ thống kiểm phiếu ngay trên tổng số 82 đại biểu.',
    tags: ['Theo kỳ họp', '82 đại biểu', 'Biên bản Word'],
    icon: 'Vote',
    tone: 'red',
    badge: 'Trung tâm',
  },
  {
    id: 'okr',
    route: 'okr',
    group: 'main',
    title: 'Đánh giá OKR / KPI cán bộ, công chức',
    short: 'OKR / KPI',
    desc: 'Đánh giá, xếp loại cán bộ, công chức, người lao động hằng tháng theo OKR/KPI: Nhóm I tiêu chí chung (30đ) và Nhóm II kết quả nhiệm vụ (70đ) chấm theo Số lượng - Chất lượng - Tiến độ.',
    tags: ['Nghị định 335/2025/NĐ-CP', 'Hằng tháng', 'Danh mục sản phẩm công việc'],
    icon: 'Target',
    tone: 'emerald',
  },
  {
    id: 'kiemdiem',
    route: 'kiemdiem',
    group: 'main',
    title: 'Kiểm điểm, đánh giá, xếp loại đảng viên',
    short: 'Kiểm điểm đảng viên',
    desc: 'Kiểm điểm, đánh giá, xếp loại chất lượng hằng quý đối với cán bộ diện Ban Thường vụ Tỉnh ủy quản lý: Nhóm A tiêu chí chung (30đ) và Nhóm B kết quả 6 trục công tác (70đ).',
    tags: ['HD 03-HD/TU', 'Hằng quý', 'Phụ lục 3A · 4'],
    icon: 'ShieldCheck',
    tone: 'rose',
  },
  {
    id: 'tieuchi',
    route: 'tieuchi',
    group: 'main',
    title: 'Đánh giá tiêu chí HĐND tỉnh, xã, phường',
    short: 'Tiêu chí HĐND',
    desc: 'HĐND cấp tỉnh và HĐND các xã, phường đăng nhập để tự đánh giá, tự chấm điểm theo Khung tiêu chí nhiệm kỳ 2026 - 2031; Thường trực HĐND tỉnh thẩm định, bình xét và xếp loại.',
    tags: ['Khung tiêu chí 2026-2031', 'Phụ lục I · II', 'Đơn vị tự đăng nhập'],
    icon: 'Landmark',
    tone: 'indigo',
    badge: 'Mới',
  },
  {
    id: 'troly',
    route: 'troly',
    group: 'main',
    title: 'Trợ lý AI nghiệp vụ dân cử',
    short: 'Trợ lý AI',
    desc: 'Trợ lý kỳ họp (phân tích tài liệu, gợi ý chất vấn), soạn thảo văn bản chuẩn Nghị định 30, soạn bài phát biểu, soát xét văn bản, thẩm tra dự thảo nghị quyết, theo dõi kiến nghị cử tri và hỏi đáp.',
    tags: ['Chuẩn NĐ 30/2020', 'Xuất Word', 'Khách thử 1 lượt/ngày'],
    icon: 'Sparkles',
    tone: 'cyan',
    badge: 'Mới',
  },
  {
    id: 'giamsat',
    route: 'giamsat',
    group: 'main',
    title: 'Giám sát số Thanh Hóa',
    short: 'Giám sát số',
    desc: 'Quản lý hoạt động giám sát của cơ quan dân cử theo 12 nhóm nghiệp vụ GS-01 đến GS-12: kho nghị quyết cấp xã, danh mục rà soát hằng tháng, thẩm định, giải trình và theo dõi thực hiện kết luận sau giám sát.',
    tags: ['Luật 121/2025/QH15', '12 nhóm nghiệp vụ', 'Hệ thống riêng'],
    icon: 'ScanSearch',
    tone: 'slate',
    badge: 'Mới',
    externalUrl: 'https://sonthkh-alt.github.io/giamsat/',
  },
  {
    id: 'onedata',
    route: 'onedata',
    group: 'main',
    title: 'Một dữ liệu – Không báo cáo lại',
    short: 'Một dữ liệu',
    desc: 'Kho dữ liệu dùng chung hai lớp (kho văn bản, tri thức số + chỉ tiêu có cấu trúc): máy trích xuất số liệu ngay từ văn bản vừa phát hành, công chức chỉ xác nhận; máy soạn báo cáo chuẩn NĐ 30. Lần mở đầu có thể chậm 30 - 60 giây do máy chủ miễn phí "ngủ".',
    tags: ['QĐ 2053 · 2176/QĐ-UBND', 'Dữ liệu mở', 'Hệ thống riêng'],
    icon: 'Database',
    tone: 'orange',
    badge: 'Mới',
    externalUrl: 'https://onedata-thanhhoa.onrender.com',
  },
  {
    id: 'lichcongtac',
    route: 'lichcongtac',
    group: 'main',
    title: 'Quản lý lịch công tác tuần',
    short: 'Lịch công tác',
    desc: 'Lịch công tác tuần của Thường trực HĐND tỉnh và lãnh đạo các Ban: Văn phòng nhập lịch tuần sau, lãnh đạo duyệt hoặc điều chỉnh, Văn phòng điều xe và in lịch tuần.',
    tags: ['Hằng tuần', 'Duyệt lịch · điều xe', 'Hệ thống riêng'],
    icon: 'CalendarDays',
    tone: 'teal',
    badge: 'Mới',
    embedUrl: WEEKLY_CALENDAR_URL,
  },
  {
    id: 'hr',
    route: 'canbo',
    group: 'tool',
    title: 'Quản lý cán bộ (hồ sơ 2C)',
    short: 'Quản lý cán bộ',
    desc: 'Hồ sơ cán bộ theo Mẫu 2C/TCTW-98, nhắc việc nhân sự (nâng lương, nghỉ hưu, hợp đồng, sinh nhật) và theo dõi biên chế.',
    tags: ['Chỉ Quản trị'],
    icon: 'Users',
    tone: 'amber',
  },
  {
    id: 'guide',
    route: 'hotro',
    group: 'tool',
    title: 'Hướng dẫn & hỗ trợ sử dụng',
    short: 'Hướng dẫn',
    desc: 'Hướng dẫn toàn hệ thống: các phân hệ, tài khoản và phân quyền, cách tính điểm - xếp loại, quy trình và mốc thời gian, cơ sở pháp lý, câu hỏi thường gặp và kênh hỗ trợ.',
    tags: ['Bắt đầu nhanh', 'Cơ sở pháp lý', 'Hỏi đáp'],
    icon: 'BookOpen',
    tone: 'sky',
  },
  {
    id: 'lab',
    route: 'thunghiem',
    group: 'tool',
    title: 'Phòng thử nghiệm bộ tiêu chí',
    short: 'Thử nghiệm',
    desc: 'Các phiên bản bộ tiêu chí đang nghiên cứu, thử nghiệm (Cổ điển theo QĐ 1053, Cải tiến, mô hình khu vực công Singapore).',
    tags: ['Nghiên cứu', 'So sánh mô hình'],
    icon: 'FlaskConical',
    tone: 'violet',
  },
];

export const findKpiModule = (route: string) =>
  kpiModules.find(m => m.route === route) ?? null;

/** Địa chỉ đầy đủ của một phân hệ (hệ thống riêng trả về tên miền của nó). */
export const kpiModuleUrl = (module: KpiModule) =>
  module.externalUrl ?? module.embedUrl ?? `${KPI_PORTAL_URL}/#/${module.route}`;
