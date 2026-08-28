/*
 * Regenerates src/data/provinceDirectory.ts from the official provincial
 * phone book published at https://thanhhoa.gov.vn/danh-ba-dien-thoai.html
 *
 *   node scripts/fetch-province-directory.cjs                # download the page
 *   node scripts/fetch-province-directory.cjs page.html      # use a saved copy
 *
 * The published page stores every contact in a `.cc` element:
 *   data-v="<tên>|<họ và đệm>|<điện thoại>|<chức vụ>|<đơn vị>|<email>"
 * grouped into `.dept` blocks inside two `.cat` blocks (tỉnh / xã, phường).
 * The `data-ph` attribute holds a base64 portrait — deliberately skipped,
 * it accounts for ~59MB of the source page.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SOURCE_URL = 'https://thanhhoa.gov.vn/danh-ba-dien-thoai.html';
const OUT_FILE = path.join(__dirname, '..', 'src', 'data', 'provinceDirectory.ts');

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
          },
        },
        res => {
          if (res.statusCode !== 200) {
            reject(new Error('HTTP ' + res.statusCode));
            return;
          }
          const chunks = [];
          res.on('data', c => chunks.push(c));
          res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        },
      )
      .on('error', reject);
  });
}

const decodeEntities = s =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();

/** +84913266738 -> 0913266738; keeps anything that is not a VN mobile as-is. */
function normalisePhone(raw) {
  let phone = (raw || '').replace(/[\s.]/g, '').trim();
  if (phone.startsWith('+84')) phone = '0' + phone.slice(3);
  else if (phone.startsWith('84') && phone.length > 10) phone = '0' + phone.slice(2);
  return phone;
}

/** A few records carry two numbers separated by `~` (or `/`, `,`). */
function normalisePhones(raw) {
  return (raw || '')
    .split(/[~/,;]/)
    .map(normalisePhone)
    .filter(Boolean);
}

function parse(html) {
  const contacts = [];
  // Each category block owns every contact that follows it up to the next one.
  const catBlocks = html.split('<div class="cat" ').slice(1);

  for (const block of catBlocks) {
    const titleMatch = block.match(/<div class="cat-ttl">([\s\S]*?)<\/div>/);
    const category = titleMatch ? decodeEntities(titleMatch[1]) : 'KHÁC';

    const records = block.match(/data-v="[^"]*"/g) || [];
    for (const record of records) {
      const value = decodeEntities(record.slice(8, -1));
      const parts = value.split('|');
      if (parts.length < 5) continue;

      const givenName = parts[0].trim();
      const familyName = parts[1].trim();
      const name = (familyName + ' ' + givenName).replace(/\s+/g, ' ').trim();
      const position = parts[3].trim();
      const unit = parts[4].trim();
      if (!name || !unit) continue;

      contacts.push({
        name,
        position,
        unit,
        phones: normalisePhones(parts[2]),
        email: (parts[5] || '').trim(),
        category,
      });
    }
  }

  return contacts;
}

const esc = s => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

function render(contacts, fetchedAt) {
  const rows = contacts
    .map(
      c =>
        `  { name: '${esc(c.name)}', position: '${esc(c.position)}', unit: '${esc(
          c.unit,
        )}', phones: [${c.phones.map(p => `'${esc(p)}'`).join(', ')}], email: '${esc(
          c.email,
        )}', category: '${esc(c.category)}' },`,
    )
    .join('\n');

  const categories = [...new Set(contacts.map(c => c.category))];

  return `/**
 * Danh bạ điện thoại lãnh đạo các cơ quan tỉnh Thanh Hóa.
 *
 * TỆP NÀY ĐƯỢC SINH TỰ ĐỘNG — không sửa tay.
 * Nguồn : ${SOURCE_URL}
 * Cập nhật: ${fetchedAt}
 * Sinh lại: node scripts/fetch-province-directory.cjs
 */

export interface ProvinceContact {
  /** Họ và tên đầy đủ */
  name: string;
  /** Chức vụ */
  position: string;
  /** Đơn vị công tác */
  unit: string;
  /** Các số điện thoại đã chuẩn hóa về dạng 0xxxxxxxxx (một số người có 2 số) */
  phones: string[];
  email: string;
  /** Nhóm cơ quan trên trang nguồn */
  category: string;
}

export const PROVINCE_DIRECTORY_SOURCE = '${SOURCE_URL}';
export const PROVINCE_DIRECTORY_UPDATED_AT = '${fetchedAt}';

export const provinceDirectoryCategories: string[] = [
${categories.map(c => `  '${esc(c)}',`).join('\n')}
];

export const provinceDirectory: ProvinceContact[] = [
${rows}
];
`;
}

(async () => {
  const localCopy = process.argv[2];
  const html = localCopy
    ? fs.readFileSync(localCopy, 'utf8')
    : await download(SOURCE_URL);

  const contacts = parse(html);
  if (!contacts.length) {
    console.error('Không trích xuất được liên hệ nào — trang nguồn có thể đã đổi cấu trúc.');
    process.exit(1);
  }

  const units = new Set(contacts.map(c => c.unit));
  const fetchedAt = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(OUT_FILE, render(contacts, fetchedAt), 'utf8');

  console.log(
    `Đã ghi ${contacts.length} liên hệ / ${units.size} đơn vị vào ${path.relative(
      process.cwd(),
      OUT_FILE,
    )}`,
  );
})().catch(err => {
  console.error(err);
  process.exit(1);
});
