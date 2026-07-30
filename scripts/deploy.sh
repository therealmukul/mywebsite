#!/usr/bin/env bash
#
# Deploy the built site to Hostinger over FTPS using lftp's delta mirror.
# Only changed files are uploaded; files deleted locally are removed remotely.
#
# Usage:  npm run deploy            (builds first, then syncs)
#         npm run deploy:nobuild    (skips the build; syncs existing dist/)
#
# Credentials are read from .env.deploy at the repo root (gitignored).

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# --- Load credentials ------------------------------------------------------
if [[ ! -f .env.deploy ]]; then
  echo "ERROR: .env.deploy not found. Copy .env.deploy.example to .env.deploy and fill it in." >&2
  exit 1
fi
# shellcheck disable=SC1091
set -a; source .env.deploy; set +a

: "${FTP_HOST:?FTP_HOST missing in .env.deploy}"
: "${FTP_USER:?FTP_USER missing in .env.deploy}"
: "${FTP_PASS:?FTP_PASS missing in .env.deploy}"
FTP_PORT="${FTP_PORT:-21}"
FTP_REMOTE_DIR="${FTP_REMOTE_DIR:-public_html}"

if ! command -v lftp >/dev/null 2>&1; then
  echo "ERROR: lftp is not installed. Run: brew install lftp" >&2
  exit 1
fi

# --- Build (unless skipped) ------------------------------------------------
if [[ "${1:-}" != "--no-build" ]]; then
  echo "==> Building site (npm run build)..."
  npm run build
fi

if [[ ! -f dist/index.html ]]; then
  echo "ERROR: dist/index.html not found. Build did not produce output; aborting." >&2
  exit 1
fi

# --- Sync via FTPS mirror --------------------------------------------------
# Two passes, because Astro rewrites every file's mtime on each build (so a
# time-based compare would re-upload the whole 140MB site every deploy):
#
#  Pass 1 (assets): mirror the full tree comparing by SIZE (--ignore-time) with
#    --delete. Assets under _astro/ are content-hashed, so size comparison is a
#    true delta and this pass also prunes stale remote files (old hashes, the
#    leftover zip, stray dev artifacts, removed pages).
#
#  Pass 2 (pages): re-upload every *.html unconditionally (default time compare;
#    post-build mtimes always differ). HTML is tiny (<1MB total) and this guards
#    the case size-only misses — a page whose referenced asset hash changed but
#    whose byte-length stayed identical (hash strings are equal length).
#
# Set FORCE=1 to skip the size optimisation in pass 1 and re-upload everything.
COMPARE="--ignore-time"
if [[ "${FORCE:-0}" == "1" ]]; then
  COMPARE=""
  echo "==> FORCE=1: re-uploading all files (no size shortcut)."
fi
echo "==> Syncing dist/ -> ${FTP_HOST}:${FTP_REMOTE_DIR} (FTPS)..."
lftp -c "
set ftp:ssl-force true;
set ftp:ssl-protect-data true;
set ssl:verify-certificate no;
open -u '${FTP_USER}','${FTP_PASS}' -p ${FTP_PORT} '${FTP_HOST}';
echo '-- pass 1: assets (size-delta + prune) --';
mirror -R --delete ${COMPARE} --parallel=4 --verbose \
  --exclude-glob .DS_Store \
  ./dist/ '/${FTP_REMOTE_DIR}/';
echo '-- pass 2: refresh all HTML pages --';
mirror -R --parallel=4 --verbose \
  -I '*.html' \
  ./dist/ '/${FTP_REMOTE_DIR}/';
bye
"

echo "==> Done. Live at your Hostinger domain."
