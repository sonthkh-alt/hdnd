import { Department, Employee, Task, EventSchedule } from '../types';

export const mockDepartments: Department[] = [
  { id: 'd1', name: 'Lãnh đạo Văn phòng', description: 'Chỉ đạo chung mọi hoạt động của Văn phòng' },
  { id: 'd2', name: 'Phòng Công tác Quốc hội', description: 'Tham mưu, phục vụ hoạt động của Đoàn ĐBQH' },
  { id: 'd3', name: 'Phòng Công tác HĐND', description: 'Tham mưu, phục vụ hoạt động của HĐND' },
  { id: 'd4', name: 'Phòng Hành chính - Tổ chức - Quản trị', description: 'Công tác nghiệp vụ hành chính, tổ chức nhân sự' },
  { id: 'd5', name: 'Ban Kinh tế - Ngân sách', description: 'Tham mưu, giám sát các lĩnh vực kinh tế, tài chính, ngân sách' },
  { id: 'd6', name: 'Ban Văn hóa - Xã hội', description: 'Tham mưu, giám sát lĩnh vực giáo dục, y tế, văn hóa, xã hội' },
  { id: 'd7', name: 'Ban Dân tộc', description: 'Tham mưu, giám sát lĩnh vực công tác dân tộc' },
  { id: 'd8', name: 'Ban Pháp chế', description: 'Tham mưu, giám sát công tác thi hành pháp luật, tư pháp, an ninh, quốc phòng' },
  { id: 'd9', name: 'Phòng Tổng hợp - Thông tin - Dân nguyện', description: 'Công tác tổng hợp, thông tin và tiếp nhận, xử lý khiếu nại tố cáo, dân nguyện' },
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
    "id": "s2026-01-25",
    "title": "Họp phiên thường kỳ để đánh giá kết quả hoạt động tháng 01, thảo luận và triển khai nhiệm vụ trọng tâm tháng 02 năm 2026",
    "date": "2026-01-25",
    "time": "08:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Trưởng/Phó các Ban HĐND"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-01-20",
    "title": "Kiểm tra tình hình sản xuất, đời sống Nhân dân, thăm tặng quà các gia đình chính sách, các đơn vị theo sự phân công của Ban Thường vụ Tỉnh ủy",
    "date": "2026-01-20",
    "time": "08:30",
    "location": "Các địa phương trong tỉnh",
    "attendees": [
      "Thường trực HĐND"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-01-15",
    "title": "Thường trực HĐND tỉnh chỉ đạo, kiểm tra, giám sát công tác chuẩn bị bầu cử đại biểu Quốc hội...",
    "date": "2026-01-15",
    "time": "09:00",
    "location": "Các Tổ bầu cử",
    "attendees": [
      "Thường trực HĐND",
      "Ban Pháp chế"
    ],
    "type": "Giám sát chuyên đề"
  },
  {
    "id": "s2026-01-10",
    "title": "Đại biểu HĐND tỉnh tiếp công dân định kỳ tháng 1",
    "date": "2026-01-10",
    "time": "08:00",
    "location": "Trụ sở Tiếp công dân",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-02-25",
    "title": "Họp phiên thường kỳ để đánh giá kết quả hoạt động tháng 02, thảo luận và triển khai nhiệm vụ trọng tâm tháng 03 năm 2026",
    "date": "2026-02-25",
    "time": "08:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Trưởng/Phó các Ban HĐND"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-02-15",
    "title": "Đại biểu HĐND tỉnh tiếp công dân định kỳ tháng 2",
    "date": "2026-02-15",
    "time": "08:00",
    "location": "Trụ sở Tiếp công dân",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-02-10",
    "title": "Thường trực HĐND tỉnh chỉ đạo, kiểm tra, giám sát công tác chuẩn bị bầu cử...",
    "date": "2026-02-10",
    "time": "08:30",
    "location": "Các cơ quan bầu cử",
    "attendees": [
      "Thường trực HĐND"
    ],
    "type": "Giám sát chuyên đề"
  },
  {
    "id": "s2026-02-28",
    "title": "Tổ chức tổng kết nhiệm kỳ của HĐND tỉnh khóa XVIII nhiệm kỳ 2021 - 2026",
    "date": "2026-02-28",
    "time": "08:00",
    "location": "Hội trường HĐND tỉnh",
    "attendees": [
      "Đại biểu HĐND tỉnh Khóa XVIII",
      "Khách mời"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-03-25",
    "title": "Họp phiên thường kỳ để đánh giá kết quả hoạt động tháng 3, thảo luận và triển khai nhiệm vụ trọng tâm tháng 4 năm 2026",
    "date": "2026-03-25",
    "time": "08:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Trưởng/Phó các Ban HĐND"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-03-10",
    "title": "Thường trực HĐND tỉnh chỉ đạo, kiểm tra, giám sát công tác chuẩn bị bầu cử...",
    "date": "2026-03-10",
    "time": "08:30",
    "location": "Các cơ quan bầu cử",
    "attendees": [
      "Thường trực HĐND"
    ],
    "type": "Giám sát chuyên đề"
  },
  {
    "id": "s2026-03-15",
    "title": "Tổ chức kỳ họp thứ Nhất HĐND khóa XIX, nhiệm kỳ 2026 - 2031",
    "date": "2026-03-15",
    "time": "08:00",
    "location": "Hội trường HĐND tỉnh",
    "attendees": [
      "Đại biểu HĐND tỉnh Khóa XIX"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-03-20",
    "title": "Đại biểu HĐND tỉnh tiếp công dân định kỳ tháng 3",
    "date": "2026-03-20",
    "time": "08:00",
    "location": "Trụ sở Tiếp công dân",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-04-25",
    "title": "Họp phiên thường kỳ để đánh giá kết quả hoạt động tháng 4, thảo luận và triển khai nhiệm vụ trọng tâm tháng 5 năm 2026",
    "date": "2026-04-25",
    "time": "08:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Trưởng/Phó các Ban HĐND"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-04-10",
    "title": "Xây dựng Quy chế hoạt động của HĐND tỉnh khóa XIX, nhiệm kỳ 2026 - 2031...",
    "date": "2026-04-10",
    "time": "14:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Văn phòng HĐND"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-04-15",
    "title": "Đại biểu HĐND tỉnh tiếp công dân định kỳ tháng 4",
    "date": "2026-04-15",
    "time": "08:00",
    "location": "Trụ sở Tiếp công dân",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-04-20",
    "title": "Tổ chức tập huấn cho đại biểu HĐND các cấp nhiệm kỳ 2026 - 2031",
    "date": "2026-04-20",
    "time": "08:00",
    "location": "Trung tâm Hội nghị tỉnh",
    "attendees": [
      "Đại biểu HĐND các cấp",
      "Thường trực HĐND"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-05-25",
    "title": "Họp phiên thường kỳ để đánh giá kết quả hoạt động tháng 5, thảo luận và triển khai nhiệm vụ trọng tâm tháng 6 năm 2026...",
    "date": "2026-05-25",
    "time": "08:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Trưởng/Phó các Ban HĐND"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-05-15",
    "title": "Ban hành kế hoạch tiếp xúc cử tri trước kỳ họp thường lệ HĐND tỉnh giữa năm 2026",
    "date": "2026-05-15",
    "time": "14:00",
    "location": "Văn phòng HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Văn phòng HĐND"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-05-20",
    "title": "Đại biểu HĐND tỉnh tiếp công dân định kỳ tháng 5",
    "date": "2026-05-20",
    "time": "08:00",
    "location": "Trụ sở Tiếp công dân",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-06-25",
    "title": "Họp phiên thường kỳ để đánh giá kết quả hoạt động tháng 6, thảo luận và triển khai nhiệm vụ trọng tâm tháng 7 năm 2026...",
    "date": "2026-06-25",
    "time": "08:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Trưởng/Phó các Ban HĐND"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-06-10",
    "title": "Đại biểu HĐND tỉnh tiếp xúc cử tri trước kỳ họp HĐND tỉnh giữa năm 2026",
    "date": "2026-06-10",
    "time": "08:00",
    "location": "Các điểm tiếp xúc cử tri",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-06-15",
    "title": "Ban hành kế hoạch, đề cương và thành lập Đoàn giám sát chuyên đề của Thường trực HĐND...",
    "date": "2026-06-15",
    "time": "08:30",
    "location": "Phòng họp số 2",
    "attendees": [
      "Thường trực HĐND"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-06-20",
    "title": "Đại biểu HĐND tỉnh tiếp công dân định kỳ tháng 6",
    "date": "2026-06-20",
    "time": "08:00",
    "location": "Trụ sở Tiếp công dân",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-07-25",
    "title": "Họp phiên thường kỳ để đánh giá kết quả hoạt động 6 tháng đầu năm, nhiệm vụ trọng tâm 6 tháng cuối năm 2026...",
    "date": "2026-07-25",
    "time": "08:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Trưởng/Phó các Ban HĐND"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-07-20",
    "title": "Tổ chức kỳ họp thường lệ giữa năm HĐND tỉnh",
    "date": "2026-07-20",
    "time": "08:00",
    "location": "Hội trường HĐND tỉnh",
    "attendees": [
      "Đại biểu HĐND tỉnh",
      "Khách mời"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-07-15",
    "title": "Đại biểu HĐND tỉnh tiếp công dân định kỳ tháng 7",
    "date": "2026-07-15",
    "time": "08:00",
    "location": "Trụ sở Tiếp công dân",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-08-25",
    "title": "Họp phiên thường kỳ để đánh giá kết quả hoạt động tháng 8, thảo luận và triển khai nhiệm vụ trọng tâm tháng 9 năm 2026",
    "date": "2026-08-25",
    "time": "08:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Trưởng/Phó các Ban HĐND"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-08-10",
    "title": "Giám sát chuyên đề của Thường trực HĐND tỉnh việc thực hiện các quy định của pháp luật về tổ chức, hoạt động bộ máy sau sắp xếp...",
    "date": "2026-08-10",
    "time": "08:30",
    "location": "Các cơ quan/Đơn vị hành chính",
    "attendees": [
      "Đoàn giám sát"
    ],
    "type": "Giám sát chuyên đề"
  },
  {
    "id": "s2026-08-15",
    "title": "Tổ chức Hội nghị trao đổi kinh nghiệm hoạt động với Thường trực HĐND cấp xã, nhiệm kỳ 2026 - 2031",
    "date": "2026-08-15",
    "time": "08:00",
    "location": "Trung tâm Hội nghị tỉnh",
    "attendees": [
      "Thường trực HĐND tỉnh",
      "Thường trực HĐND cấp xã"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-08-20",
    "title": "Xây dựng dự thảo Kế hoạch, Quyết định thành lập các Đoàn giám sát chuyên đề của HĐND tỉnh năm 2027",
    "date": "2026-08-20",
    "time": "14:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Văn phòng HĐND"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-08-05",
    "title": "Đại biểu HĐND tỉnh tiếp công dân định kỳ tháng 8",
    "date": "2026-08-05",
    "time": "08:00",
    "location": "Trụ sở Tiếp công dân",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-09-25",
    "title": "Họp phiên thường kỳ để đánh giá kết quả hoạt động tháng 9, thảo luận và triển khai nhiệm vụ trọng tâm tháng 10 năm 2026...",
    "date": "2026-09-25",
    "time": "08:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Trưởng/Phó các Ban HĐND"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-09-15",
    "title": "Tổ chức kỳ họp chuyên đề HĐND tỉnh",
    "date": "2026-09-15",
    "time": "08:00",
    "location": "Hội trường HĐND tỉnh",
    "attendees": [
      "Đại biểu HĐND tỉnh",
      "Khách mời"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-09-10",
    "title": "Tiếp tục giám sát chuyên đề của Thường trực HĐND tỉnh việc thực hiện các quy định pháp luật về tổ chức, hoạt động bộ máy...",
    "date": "2026-09-10",
    "time": "08:30",
    "location": "Các cơ quan/Đơn vị",
    "attendees": [
      "Đoàn giám sát"
    ],
    "type": "Giám sát chuyên đề"
  },
  {
    "id": "s2026-09-20",
    "title": "Đại biểu HĐND tỉnh tiếp công dân định kỳ tháng 9",
    "date": "2026-09-20",
    "time": "08:00",
    "location": "Trụ sở Tiếp công dân",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-10-25",
    "title": "Họp phiên thường kỳ để đánh giá kết quả hoạt động tháng 10, thảo luận và triển khai nhiệm vụ trọng tâm tháng 11 năm 2026...",
    "date": "2026-10-25",
    "time": "08:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Trưởng/Phó các Ban HĐND"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-10-10",
    "title": "Tiếp tục giám sát chuyên đề của Thường trực HĐND tỉnh...",
    "date": "2026-10-10",
    "time": "08:30",
    "location": "Các cơ quan/Đơn vị",
    "attendees": [
      "Đoàn giám sát"
    ],
    "type": "Giám sát chuyên đề"
  },
  {
    "id": "s2026-10-05",
    "title": "Ban hành kế hoạch tiếp xúc cử tri trước kỳ họp thường lệ HĐND tỉnh cuối năm 2026",
    "date": "2026-10-05",
    "time": "14:00",
    "location": "Văn phòng HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Văn phòng"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-10-15",
    "title": "Chỉ đạo xây dựng Đề cương báo cáo giám sát chuyên đề của HĐND tỉnh năm 2027",
    "date": "2026-10-15",
    "time": "09:00",
    "location": "Phòng họp số 3",
    "attendees": [
      "Thường trực HĐND",
      "Lãnh đạo các Ban"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-10-20",
    "title": "Đại biểu HĐND tỉnh tiếp công dân định kỳ tháng 10",
    "date": "2026-10-20",
    "time": "08:00",
    "location": "Trụ sở Tiếp công dân",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-11-25",
    "title": "Họp phiên thường kỳ để đánh giá kết quả hoạt động tháng 11, thảo luận và triển khai nhiệm vụ trọng tâm tháng 12 năm 2026...",
    "date": "2026-11-25",
    "time": "08:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Trưởng/Phó các Ban HĐND"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-11-15",
    "title": "Đại biểu HĐND tỉnh tiếp xúc cử tri trước kỳ họp thường lệ HĐND tỉnh cuối năm 2026",
    "date": "2026-11-15",
    "time": "08:00",
    "location": "Các điểm tiếp xúc cử tri",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-11-20",
    "title": "Đại biểu HĐND tỉnh tiếp công dân định kỳ tháng 11",
    "date": "2026-11-20",
    "time": "08:00",
    "location": "Trụ sở Tiếp công dân",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-12-25",
    "title": "Họp phiên thường kỳ để đánh giá kết quả hoạt động năm 2026, nhiệm vụ trọng tâm năm 2027...",
    "date": "2026-12-25",
    "time": "08:00",
    "location": "Phòng họp Thường trực HĐND",
    "attendees": [
      "Thường trực HĐND",
      "Trưởng/Phó các Ban HĐND"
    ],
    "type": "Họp Thường trực"
  },
  {
    "id": "s2026-12-15",
    "title": "Tổ chức kỳ họp thường lệ HĐND tỉnh cuối năm 2026",
    "date": "2026-12-15",
    "time": "08:00",
    "location": "Hội trường HĐND tỉnh",
    "attendees": [
      "Đại biểu HĐND tỉnh",
      "Khách mời"
    ],
    "type": "Khác"
  },
  {
    "id": "s2026-12-20",
    "title": "Đại biểu HĐND tỉnh tiếp công dân định kỳ tháng 12",
    "date": "2026-12-20",
    "time": "08:00",
    "location": "Trụ sở Tiếp công dân",
    "attendees": [
      "Đại biểu HĐND tỉnh"
    ],
    "type": "Tiếp cử tri"
  },
  {
    "id": "s2026-12-30",
    "title": "Chỉ đạo công tác kiểm điểm, xếp loại, tổng kết năm 2026",
    "date": "2026-12-30",
    "time": "08:00",
    "location": "Hội trường HĐND tỉnh",
    "attendees": [
      "Thường trực HĐND"
    ],
    "type": "Khác"
  }
];
