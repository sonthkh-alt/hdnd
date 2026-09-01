import { BookOpenText, Flag, TreeDeciduous, type LucideIcon } from 'lucide-react';
import { EmbeddedApp } from './EmbeddedApp';

export type PersonalSiteId = 'giapha' | 'golf' | 'english';

interface SiteConfig {
  url: string;
  title: string;
  icon: LucideIcon;
  toneClass: string;
}

const SITES: Record<PersonalSiteId, SiteConfig> = {
  giapha: {
    url: 'https://sonthkh-alt.github.io/giaphaclaude/',
    title: 'Gia phả dòng họ',
    icon: TreeDeciduous,
    toneClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  golf: {
    url: 'https://sonthkh-alt.github.io/Golf/',
    title: 'Golf',
    icon: Flag,
    toneClass: 'bg-lime-50 text-lime-700 border-lime-200',
  },
  english: {
    url: 'https://sonthkh-alt.github.io/english-defense/',
    title: 'English Defense',
    icon: BookOpenText,
    toneClass: 'bg-sky-50 text-sky-700 border-sky-200',
  },
};

/** Các trang web cá nhân (GitHub Pages) — chỉ hiển thị cho tài khoản ADMIN. */
export function PersonalSite({ site }: { site: PersonalSiteId }) {
  const cfg = SITES[site];
  return (
    <EmbeddedApp
      url={cfg.url}
      title={cfg.title}
      icon={cfg.icon}
      toneClass={cfg.toneClass}
      note={`Nội dung được nhúng từ ${cfg.url}`}
    />
  );
}
