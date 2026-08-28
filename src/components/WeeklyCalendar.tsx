import { CalendarDays } from 'lucide-react';
import { EmbeddedApp } from './EmbeddedApp';
import { WEEKLY_CALENDAR_URL } from '../data/kpiModules';

/**
 * Hệ thống Lịch công tác tuần của Văn phòng Đoàn ĐBQH và HĐND tỉnh Thanh Hóa:
 * Văn phòng nhập lịch tuần sau, lãnh đạo duyệt hoặc điều chỉnh, Văn phòng
 * điều xe và in lịch tuần. Hệ thống đặt ở tên miền riêng nhưng không chặn
 * nhúng nên dùng ngay trong khung.
 */
export function WeeklyCalendar() {
  return (
    <EmbeddedApp
      url={WEEKLY_CALENDAR_URL}
      title="Lịch công tác tuần — Thường trực HĐND tỉnh và lãnh đạo các Ban"
      icon={CalendarDays}
      toneClass="bg-teal-50 text-teal-700 border-teal-200"
      note={`Nội dung được nhúng từ ${WEEKLY_CALENDAR_URL} · nếu cần đăng nhập, hãy đăng nhập ngay trong khung hoặc mở ở tab mới.`}
    />
  );
}
