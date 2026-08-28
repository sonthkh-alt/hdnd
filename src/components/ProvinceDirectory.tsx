import { useMemo, useState } from 'react';
import {
  Building,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Phone,
  Search,
  Users,
  X,
} from 'lucide-react';
import { cn, normalizeVN } from '../lib/utils';
import {
  PROVINCE_DIRECTORY_SOURCE,
  PROVINCE_DIRECTORY_UPDATED_AT,
  provinceDirectory,
  provinceDirectoryCategories,
  type ProvinceContact,
} from '../data/provinceDirectory';

/** Search index built once — 1023 contacts, matched without diacritics. */
const SEARCH_INDEX = provinceDirectory.map(c => ({
  contact: c,
  haystack: normalizeVN(`${c.name} ${c.position} ${c.unit} ${c.phones.join(' ')}`),
}));

const formatPhone = (phone: string) =>
  phone.length === 10 ? `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}` : phone;

interface UnitGroup {
  unit: string;
  category: string;
  contacts: ProvinceContact[];
}

export function ProvinceDirectory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const term = normalizeVN(query.trim());

  const groups = useMemo<UnitGroup[]>(() => {
    const byUnit = new Map<string, UnitGroup>();

    for (const entry of SEARCH_INDEX) {
      const { contact } = entry;
      if (category !== 'all' && contact.category !== category) continue;
      if (term && !entry.haystack.includes(term)) continue;

      let group = byUnit.get(contact.unit);
      if (!group) {
        group = { unit: contact.unit, category: contact.category, contacts: [] };
        byUnit.set(contact.unit, group);
      }
      group.contacts.push(contact);
    }

    return [...byUnit.values()];
  }, [term, category]);

  const totalResults = groups.reduce((sum, g) => sum + g.contacts.length, 0);
  // While searching every matching unit is opened so hits are immediately visible.
  const isSearching = term.length > 0;

  const copyPhone = async (phone: string) => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(phone);
      setTimeout(() => setCopied(current => (current === phone ? null : current)), 1600);
    } catch (e) {
      /* clipboard unavailable — the tel: link still works */
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-7xl flex-col gap-5 p-4 md:p-8 animate-in">
      {/* Heading */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-2.5 text-blue-700">
            <Phone size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
              Danh bạ điện thoại tỉnh Thanh Hóa
            </h2>
            <p className="mt-1 text-sm text-slate-500 md:text-base">
              Lãnh đạo các cơ quan cấp tỉnh và {provinceDirectoryCategories.length > 1 ? '166 phường, xã' : 'các đơn vị'}
              {' · '}
              <span className="font-semibold text-slate-600">{provinceDirectory.length}</span> liên hệ /{' '}
              <span className="font-semibold text-slate-600">
                {new Set(provinceDirectory.map(c => c.unit)).size}
              </span>{' '}
              đơn vị
            </p>
          </div>
        </div>

        <a
          href={PROVINCE_DIRECTORY_SOURCE}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex shrink-0 items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-600 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-700"
          title={`Nguồn dữ liệu · cập nhật ${PROVINCE_DIRECTORY_UPDATED_AT}`}
        >
          Cổng thông tin tỉnh
          <ExternalLink
            size={15}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1 lg:max-w-lg">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm theo tên, chức vụ, đơn vị, xã, phường, số điện thoại..."
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm shadow-sm transition-shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              title="Xóa tìm kiếm"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {['all', ...provinceDirectoryCategories].map(value => (
            <button
              key={value}
              type="button"
              onClick={() => setCategory(value)}
              className={cn(
                'rounded-lg border px-3 py-2 text-[12.5px] font-semibold transition-colors',
                category === value
                  ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900',
              )}
            >
              {value === 'all' ? 'Tất cả' : value}
            </button>
          ))}
        </div>
      </div>

      {/* Result summary */}
      <p className="text-[13px] text-slate-500">
        <span className="font-bold text-slate-700">{totalResults}</span> liên hệ thuộc{' '}
        <span className="font-bold text-slate-700">{groups.length}</span> đơn vị
        {isSearching && (
          <>
            {' '}
            khớp với “<span className="font-semibold text-slate-700">{query.trim()}</span>”
          </>
        )}
      </p>

      {/* Unit list */}
      <div className="hdnd-scroll min-h-0 flex-1 space-y-3 overflow-y-auto pb-2 pr-1">
        {groups.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="font-medium text-slate-500">Không tìm thấy liên hệ phù hợp.</p>
            <p className="mt-1 text-sm text-slate-400">
              Thử bỏ bớt từ khóa hoặc chọn lại nhóm cơ quan.
            </p>
          </div>
        )}

        {groups.map(group => {
          const expanded = isSearching || !!openUnits[group.unit];
          return (
            <section
              key={group.unit}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenUnits(prev => ({ ...prev, [group.unit]: !prev[group.unit] }))
                }
                aria-expanded={expanded}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50 md:px-5"
              >
                <ChevronRight
                  size={17}
                  className={cn(
                    'shrink-0 text-slate-400 transition-transform duration-200',
                    expanded && 'rotate-90',
                  )}
                />
                <Building size={17} className="shrink-0 text-slate-400" />
                <h3 className="min-w-0 flex-1 truncate text-[14px] font-bold text-slate-800">
                  {group.unit}
                </h3>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
                  <Users size={12} />
                  {group.contacts.length}
                </span>
              </button>

              {expanded && (
                <ul className="divide-y divide-slate-100 border-t border-slate-100">
                  {group.contacts.map((contact, index) => (
                    <li
                      key={`${contact.name}-${contact.phones[0] ?? ''}-${index}`}
                      className="flex flex-col gap-2 px-4 py-3 transition-colors hover:bg-blue-50/40 sm:flex-row sm:items-center sm:gap-4 md:px-5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-blue-900">{contact.name}</p>
                        <p className="mt-0.5 text-[13px] text-slate-500">{contact.position}</p>
                      </div>

                      {contact.phones.length > 0 ? (
                        <div className="flex shrink-0 flex-wrap items-center gap-1">
                          {contact.phones.map(phone => (
                            <div key={phone} className="flex items-center gap-0.5">
                              <a
                                href={`tel:${phone}`}
                                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 font-mono text-[13px] font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                                title="Gọi"
                              >
                                <Phone size={13} className="text-slate-400" />
                                {formatPhone(phone)}
                              </a>
                              <button
                                type="button"
                                onClick={() => copyPhone(phone)}
                                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                                title="Sao chép số"
                              >
                                {copied === phone ? (
                                  <Check size={15} className="text-emerald-600" />
                                ) : (
                                  <Copy size={15} />
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="shrink-0 text-[13px] italic text-slate-400">
                          Chưa có số
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <p className="shrink-0 text-center text-[11px] text-slate-400">
        Nguồn: Cổng thông tin điện tử tỉnh Thanh Hóa · dữ liệu cập nhật ngày{' '}
        {PROVINCE_DIRECTORY_UPDATED_AT}
      </p>
    </div>
  );
}
