import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to VN standard
export function formatDateVN(dateStr: string) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

// Calculate generic task status color
export function getPriorityColor(priority: string) {
  switch (priority) {
    case 'Hỏa tốc':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Thượng khẩn':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Khẩn':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Thường':
    default:
      return 'bg-blue-100 text-blue-800 border-blue-200';
  }
}
