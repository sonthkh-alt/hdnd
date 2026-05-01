export type SystemRole = 'ADMIN' | 'MANAGER' | 'USER';

export interface AuthUser {
  username: string;
  role: SystemRole;
  employeeId?: string;
  name: string;
}

export type UserStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface RegistrationData {
  uid: string;
  email: string;
  name: string;
  dateOfBirth: string;
  departmentId: string;
  role: string;
  rank: string;
  education: string;
  isPartyMember: boolean;
  status: UserStatus;
  createdAt: number;
}

export type Priority = 'Hỏa tốc' | 'Thượng khẩn' | 'Khẩn' | 'Thường';

export interface Department {
  id: string;
  name: string;
  description: string;
}

export interface Employee {
  id: string;
  name: string;
  departmentId: string;
  role: string; // Chức vụ
  rank: string; // Ngạch bậc
  education: string; // Trình độ chuyên môn
  isPartyMember: boolean; // Đảng viên
  avatar?: string;
  dateOfBirth?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  deadline: string;
  status: 'Chờ xử lý' | 'Đang xử lý' | 'Hoàn thành' | 'Quá hạn';
  assigneeIds: string[];
  documentRef?: string; // Số/Ký hiệu văn bản liên quan
}

export interface EventSchedule {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: string[]; // Role hoặc name
  type: 'Tiếp cử tri' | 'Giám sát chuyên đề' | 'Họp Thường trực' | 'Khác';
}
