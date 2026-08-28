import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Database,
  ExternalLink,
  FlaskConical,
  Landmark,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Vote,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EmbeddedApp } from './EmbeddedApp';
import {
  KPI_PORTAL_URL,
  findKpiModule,
  kpiModuleUrl,
  kpiModules,
  type KpiModule,
  type KpiTone,
} from '../data/kpiModules';

const ICONS: Record<string, LucideIcon> = {
  Vote,
  Target,
  ShieldCheck,
  Landmark,
  Sparkles,
  ScanSearch,
  Database,
  CalendarDays,
  Users,
  BookOpen,
  FlaskConical,
};

const TONES: Record<KpiTone, string> = {
  red: 'bg-red-50 text-red-700 border-red-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-200',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  sky: 'bg-sky-50 text-sky-700 border-sky-200',
  violet: 'bg-violet-50 text-violet-700 border-violet-200',
};

interface KpiPortalProps {
  /** Hash route cần mở thẳng; bỏ trống để hiện danh mục phân hệ. */
  route?: string;
}

export function KpiPortal({ route }: KpiPortalProps) {
  const [openedRoute, setOpenedRoute] = useState<string | null>(route ?? null);

  // Điều hướng từ menu trái luôn thắng lựa chọn đang mở tại chỗ.
  useEffect(() => {
    setOpenedRoute(route ?? null);
  }, [route]);

  if (openedRoute) {
    return (
      <EmbeddedModule route={openedRoute} onBack={route ? undefined : () => setOpenedRoute(null)} />
    );
  }

  return <ModuleCatalogue onOpen={setOpenedRoute} />;
}

/* ------------------------------------------------------------------ */

function ModuleCatalogue({ onOpen }: { onOpen: (route: string) => void }) {
  const main = kpiModules.filter(m => m.group === 'main');
  const tools = kpiModules.filter(m => m.group === 'tool');

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8 animate-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
            Phần mềm nghiệp vụ dùng chung
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-500 md:text-base">
            Các phân hệ nghiệp vụ của Văn phòng Đoàn ĐBQH và HĐND tỉnh Thanh Hóa: đánh giá xếp
            loại cán bộ, kiểm điểm đảng viên, tiêu chí HĐND, biểu quyết tại kỳ họp và trợ lý AI.
          </p>
        </div>
        <a
          href={KPI_PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex shrink-0 items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-600 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-700"
        >
          Mở cổng ở tab mới
          <ExternalLink
            size={15}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      <Section title="Phân hệ nghiệp vụ" modules={main} onOpen={onOpen} />
      <Section title="Công cụ hỗ trợ" modules={tools} onOpen={onOpen} />
    </div>
  );
}

function Section({
  title,
  modules,
  onOpen,
}: {
  title: string;
  modules: KpiModule[];
  onOpen: (route: string) => void;
}) {
  return (
    <section className="space-y-3">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{title}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map(module => (
          <ModuleCard key={module.id} module={module} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function ModuleCard({
  module,
  onOpen,
}: {
  // Dự án không cài @types/react nên `key` phải được khai báo tường minh.
  key?: string;
  module: KpiModule;
  onOpen: (route: string) => void;
}) {
  const Icon = ICONS[module.icon] ?? Target;
  const isExternal = !!module.externalUrl;

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className={cn('rounded-xl border p-3', TONES[module.tone])}>
          <Icon size={22} />
        </div>
        <div className="flex items-center gap-2">
          {module.badge && (
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              {module.badge}
            </span>
          )}
          {isExternal ? (
            <ExternalLink size={16} className="text-slate-300 group-hover:text-slate-500" />
          ) : (
            <ArrowUpRight size={18} className="text-slate-300 group-hover:text-slate-500" />
          )}
        </div>
      </div>

      <h4 className="mt-4 font-bold leading-snug text-slate-800">{module.title}</h4>
      <p className="mt-2 line-clamp-4 text-[13px] leading-relaxed text-slate-500">{module.desc}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {module.tags.map(tag => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  const className =
    'group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:border-blue-300 hover:shadow-md';

  // Hệ thống riêng nằm ở tên miền khác — mở tab mới thay vì nhúng.
  if (isExternal) {
    return (
      <a href={module.externalUrl} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => onOpen(module.route)} className={className}>
      {body}
    </button>
  );
}

/* ------------------------------------------------------------------ */

function EmbeddedModule({ route, onBack }: { route: string; onBack?: () => void }) {
  const module = findKpiModule(route);
  const url = module ? kpiModuleUrl(module) : `${KPI_PORTAL_URL}/#/${route}`;
  const origin = module?.embedUrl ?? KPI_PORTAL_URL;

  return (
    <EmbeddedApp
      url={url}
      frameKey={route}
      title={module?.title ?? 'Phần mềm nghiệp vụ'}
      icon={module ? ICONS[module.icon] ?? Target : Target}
      toneClass={module ? TONES[module.tone] : undefined}
      onBack={onBack}
      note={`Nội dung được nhúng từ ${origin} · nếu phân hệ yêu cầu đăng nhập, hãy đăng nhập ngay trong khung hoặc mở ở tab mới.`}
    />
  );
}
