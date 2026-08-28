import { useEffect, useState } from 'react';
import {
  ExternalLink,
  Loader2,
  Maximize2,
  Minimize2,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface EmbeddedAppProps {
  /** Địa chỉ đầy đủ của hệ thống cần nhúng. */
  url: string;
  title: string;
  icon?: LucideIcon;
  /** Lớp màu cho ô icon, ví dụ 'bg-teal-50 text-teal-700 border-teal-200'. */
  toneClass?: string;
  /** Hiện nút quay lại danh mục khi có. */
  onBack?: () => void;
  /** Ghi chú hiển thị dưới khung. */
  note?: string;
  /**
   * Đổi giá trị này sẽ nạp lại khung — dùng khi cùng một địa chỉ gốc nhưng
   * khác màn hình (ví dụ hash route).
   */
  frameKey?: string;
}

/**
 * Khung nhúng dùng chung cho các hệ thống nghiệp vụ đặt ở tên miền khác
 * (chỉ dùng được với hệ thống không đặt X-Frame-Options / CSP frame-ancestors).
 */
export function EmbeddedApp({
  url,
  title,
  icon: Icon,
  toneClass,
  onBack,
  note,
  frameKey,
}: EmbeddedAppProps) {
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setLoading(true);
  }, [url, frameKey, reloadKey]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [fullscreen]);

  return (
    <div
      className={cn(
        'flex flex-col bg-slate-50',
        fullscreen ? 'fixed inset-0 z-[70] p-3' : 'h-full p-4 md:p-6',
      )}
    >
      {/* Thanh công cụ */}
      <div className="flex shrink-0 flex-wrap items-center gap-2 rounded-t-2xl border border-b-0 border-slate-200 bg-white px-3 py-2.5 md:px-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-[12.5px] font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            ← Danh mục
          </button>
        )}

        <div className="flex min-w-0 flex-1 items-center gap-2">
          {Icon && (
            <span className={cn('rounded-lg border p-1.5', toneClass)}>
              <Icon size={15} />
            </span>
          )}
          <span className="truncate text-[13.5px] font-bold text-slate-800">{title}</span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setReloadKey(k => k + 1)}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            title="Tải lại"
          >
            <RefreshCw size={16} />
          </button>
          <button
            type="button"
            onClick={() => setFullscreen(f => !f)}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            title={fullscreen ? 'Thoát toàn màn hình (Esc)' : 'Toàn màn hình'}
          >
            {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            title="Mở ở tab mới"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Khung nhúng */}
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-b-2xl border border-slate-200 bg-white">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white">
            <Loader2 size={28} className="animate-spin text-blue-600" />
            <p className="text-sm text-slate-500">Đang tải hệ thống...</p>
          </div>
        )}
        <iframe
          key={`${frameKey ?? url}-${reloadKey}`}
          src={url}
          title={title}
          onLoad={() => setLoading(false)}
          referrerPolicy="no-referrer-when-downgrade"
          allow="clipboard-write; microphone"
          className="h-full w-full border-0"
        />
      </div>

      {note && <p className="shrink-0 pt-2 text-center text-[11px] text-slate-400">{note}</p>}
    </div>
  );
}
