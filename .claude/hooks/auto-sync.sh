#!/usr/bin/env bash
# Tu dong dong bo voi GitHub: commit thay doi -> pull ban moi -> push len origin/main
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

# Khong co thay doi nao thi thoi
if [ -z "$(git status --porcelain)" ]; then
  exit 0
fi

git add -A
git commit -q -m "Auto-sync: cap nhat code $(date '+%Y-%m-%d %H:%M')" || exit 0
git pull --rebase -q origin main 2>/dev/null || true
git push -q origin main 2>/dev/null || {
  echo '{"systemMessage": "Auto-sync: commit OK nhung push len GitHub that bai - kiem tra mang/quyen truy cap"}'
  exit 0
}
echo '{"systemMessage": "Auto-sync: da commit va push code len GitHub (sonthkh-alt/hdnd)"}'
