const fs = require('fs');
const { parse } = require('node-html-parser');

// 1. Read HTML and parse contacts
const html = fs.readFileSync('thanhhoa.html', 'utf8');
const root = parse(html);
const ccs = root.querySelectorAll('.cc');
const contacts = [];

for (const cc of ccs) {
    const data = cc.getAttribute('data-v');
    if (!data) continue;
    const parts = data.split('|');
    const name = (parts[1] + ' ' + parts[0]).trim();
    let phone = parts[2] ? parts[2].trim() : '';
    if (phone.startsWith('+84')) phone = '0' + phone.substring(3);
    const pos = parts[3].trim();
    const org = parts[4].trim();
    
    contacts.push({ name, phone, pos, org });
}

console.log('Extracted ' + contacts.length + ' contacts from HTML.');

// 2. Read rawCommuneData
let rawTs = fs.readFileSync('src/data/communeDirectory.ts', 'utf8');
const regex = /export const rawCommuneData = `([\s\S]*?)`;/;
const match = rawTs.match(regex);
if (!match) {
    console.log("Could not find rawCommuneData");
    process.exit(1);
}

const lines = match[1].split('\n');
const newLines = [];

for (const line of lines) {
    if (line.trim() === '') {
        newLines.push(line);
        continue;
    }
    const parts = line.split('\t');
    if (parts.length < 5) {
        newLines.push(line);
        continue;
    }
    
    const district = parts[0].trim();
    const orgRaw = parts[1].trim();
    const oldName = parts[2].trim();
    const oldPos = parts[3].trim();
    const oldPhone = parts[4].trim();
    const oldEmail = parts[5] ? parts[5].trim() : '';
    
    // Normalize org to match contacts org (usually uppercase in contacts)
    const orgUpper = orgRaw.toUpperCase();
    const orgContacts = contacts.filter(c => c.org === orgUpper);
    
    let bestMatch = null;
    
    // Attempt matching based on position keywords
    if (oldPos.includes('Phó Bí thư Thường trực')) {
        bestMatch = orgContacts.find(c => c.pos.includes('Phó Bí thư Thường trực'));
    } else if (oldPos.includes('Chủ tịch UBND')) {
        bestMatch = orgContacts.find(c => c.pos.includes('Chủ tịch UBND'));
    } else if (oldPos.includes('Bí thư Đảng ủy')) {
        bestMatch = orgContacts.find(c => c.pos.includes('Bí thư Đảng ủy') && !c.pos.includes('Phó Bí thư'));
    }
    
    // Fallback: match by name if not found by position
    if (!bestMatch) {
       bestMatch = orgContacts.find(c => c.name.toLowerCase() === oldName.toLowerCase());
    }
    
    if (bestMatch) {
        let isChanged = false;
        if (bestMatch.name !== oldName || bestMatch.pos !== oldPos || bestMatch.phone !== oldPhone) {
            isChanged = true;
        }
        
        const newEmail = isChanged ? '' : oldEmail;
        newLines.push([district, orgRaw, bestMatch.name, bestMatch.pos, bestMatch.phone, newEmail].join('\t'));
    } else {
        newLines.push(line);
    }
}

const newRaw = "export const rawCommuneData = `\n" + newLines.join('\n') + "\n`;";
const newContent = rawTs.replace(regex, newRaw);

fs.writeFileSync('src/data/communeDirectory.ts', newContent);
console.log("Updated src/data/communeDirectory.ts");
