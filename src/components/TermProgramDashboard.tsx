import { CalendarRange } from 'lucide-react';
import { EmbeddedApp } from './EmbeddedApp';

/**
 * Bảng điều hành Chương trình công tác toàn khóa HĐND tỉnh Thanh Hóa khóa XIX
 * (Nghị quyết 46/NQ-HĐND ngày 27/5/2026). Dashboard là trang HTML tĩnh đặt tại
 * public/toan-khoa-dashboard.html nên được phục vụ cùng tên miền với hệ thống.
 */
export function TermProgramDashboard() {
  return (
    <EmbeddedApp
      url="/toan-khoa-dashboard.html"
      title="Chương trình công tác toàn khóa HĐND tỉnh khóa XIX, nhiệm kỳ 2026 - 2031"
      icon={CalendarRange}
      toneClass="bg-indigo-50 text-indigo-700 border-indigo-200"
      note="Dữ liệu trích từ Phụ lục Nghị quyết số 46/NQ-HĐND ngày 27/5/2026 · bấm vào từng kỳ họp để xem nội dung trình."
    />
  );
}
