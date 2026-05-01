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
  dateOfBirth?: string;
  departmentId: string;
  role?: string;
  rank?: string;
  gender?: string;
  nationality?: string;
  ethnicity?: string;
  religion?: string;
  hometown?: string;
  currentResidence?: string;
  education?: string;
  profession?: string;
  degree?: string;
  politicalTheory?: string;
  foreignLanguage?: string;
  isPartyMember?: boolean;
  partyDate?: string;
  status: UserStatus;
  createdAt: number;
}

export interface Deputy {
  id: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  ethnicity: string;
  religion: string;
  hometown: string;
  currentResidence: string;
  education: string;
  profession: string;
  degree: string;
  politicalTheory: string;
  foreignLanguage: string;
  jobTitle: string;
  workplace: string;
  partyDate: string;
  councilRole: string;
  reelected: string;
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
  education: string; // GD Phổ thông
  profession?: string; // Chuyên môn, nghiệp vụ
  degree?: string; // Học hàm, học vị
  politicalTheory?: string; // Lý luận chính trị
  foreignLanguage?: string; // Ngoại ngữ
  isPartyMember: boolean; // Đảng viên
  partyDate?: string; // Ngày vào Đảng
  gender?: string;
  nationality?: string;
  ethnicity?: string;
  religion?: string;
  hometown?: string;
  currentResidence?: string;
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
