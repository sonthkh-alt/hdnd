import { Department, Employee, Task, EventSchedule } from '../types';

export const mockDepartments: Department[] = [
  { id: 'd1', name: 'Lãnh đạo Văn phòng', description: 'Chỉ đạo chung mọi hoạt động của Văn phòng' },
  { id: 'd2', name: 'Phòng Công tác Quốc hội', description: 'Tham mưu, phục vụ hoạt động của Đoàn ĐBQH' },
  { id: 'd3', name: 'Phòng Công tác HĐND', description: 'Tham mưu, phục vụ hoạt động của HĐND' },
  { id: 'd4', name: 'Phòng Hành chính - Tổ chức - Quản trị', description: 'Công tác nghiệp vụ hành chính, tổ chức nhân sự' },
];

export const mockEmployees: Employee[] = [
  {
    id: 'e1',
    name: 'Nguyễn Văn A',
    departmentId: 'd1',
    role: 'Chánh Văn phòng',
    rank: 'Chuyên viên cao cấp',
    education: 'Thạc sĩ Quản lý công',
    isPartyMember: true,
    dateOfBirth: '1975-05-12'
  },
  {
    id: 'e2',
    name: 'Trần Thị B',
    departmentId: 'd2',
    role: 'Trưởng phòng',
    rank: 'Chuyên viên chính',
    education: 'Cử nhân Luật',
    isPartyMember: true,
    dateOfBirth: '1982-10-22'
  },
  {
    id: 'e3',
    name: 'Lê Văn C',
    departmentId: 'd3',
    role: 'Phó Trưởng phòng',
    rank: 'Chuyên viên chính',
    education: 'Thạc sĩ Kinh tế',
    isPartyMember: true,
    dateOfBirth: '1985-03-15'
  },
  {
    id: 'e4',
    name: 'Phạm Thị D',
    departmentId: 'd4',
    role: 'Chuyên viên',
    rank: 'Chuyên viên',
    education: 'Cử nhân Hành chính',
    isPartyMember: false,
    dateOfBirth: '1992-08-08'
  }
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Chuẩn bị tài liệu kỳ họp thứ 15 HĐND tỉnh',
    description: 'Tổng hợp báo cáo thẩm tra của các Ban HĐND, dự thảo Nghị quyết.',
    priority: 'Thượng khẩn',
    deadline: '2024-05-20',
    status: 'Đang xử lý',
    assigneeIds: ['e1', 'e3'],
    documentRef: 'KH-123/HĐND'
  },
  {
    id: 't2',
    title: 'Trình duyệt báo cáo tổng hợp kiến nghị cử tri',
    description: 'Sau đợt tiếp xúc cử tri trước kỳ họp.',
    priority: 'Hỏa tốc',
    deadline: '2024-05-15',
    status: 'Chờ xử lý',
    assigneeIds: ['e2'],
    documentRef: 'BC-45/ĐBQH'
  },
  {
    id: 't3',
    title: 'Lập danh sách khen thưởng thi đua quý II',
    description: 'Tổng hợp hồ sơ từ các phòng ban.',
    priority: 'Thường',
    deadline: '2024-06-10',
    status: 'Đang xử lý',
    assigneeIds: ['e4']
  }
];

export const mockSchedules: EventSchedule[] = [
  {
    id: 's1',
    title: 'Tiếp xúc cử tri chuyên đề',
    date: '2024-05-18',
    time: '08:00',
    location: 'Hội trường UBND Huyện X',
    attendees: ['Đoàn ĐBQH', 'Lãnh đạo UBND'],
    type: 'Tiếp cử tri'
  },
  {
    id: 's2',
    title: 'Họp Thường trực HĐND tháng 5',
    date: '2024-05-25',
    time: '14:00',
    location: 'Phòng họp số 1',
    attendees: ['Thường trực HĐND', 'Trưởng/Phó các Ban'],
    type: 'Họp Thường trực'
  }
];
