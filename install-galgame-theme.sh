#!/usr/bin/env bash
set -euo pipefail

# ══════════════════════════════════════════════════════════════════════════
# OMP Web — Galgame / Eroge Visual Novel Theme One-Click Installer
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/yisallu/omp-web-galgame/main/install-galgame-theme.sh | bash -s -- /path/to/omp-web
# ══════════════════════════════════════════════════════════════════════════

TARGET_DIR="${1:-.}"
REPO_URL="https://github.com/yisallu/omp-web-galgame.git"

if [ ! -f "$TARGET_DIR/package.json" ] || [ ! -d "$TARGET_DIR/app" ]; then
  echo "Error: '$TARGET_DIR' does not look like an omp-web directory (missing package.json or app/)."
  echo "Usage: $0 [/path/to/omp-web]"
  exit 1
fi

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

echo "🌸 Downloading OMP Web Galgame / Eroge Visual Novel Theme..."
git clone --depth 1 "$REPO_URL" "$TMP_DIR/repo" >/dev/null 2>&1

echo "♥ Applying Galgame theme files to $TARGET_DIR..."
mkdir -p "$TARGET_DIR/public/galgame"
cp -f "$TMP_DIR/repo/public/galgame/"* "$TARGET_DIR/public/galgame/"
cp -f "$TMP_DIR/repo/app/galgame.css" "$TARGET_DIR/app/galgame.css"
cp -f "$TMP_DIR/repo/components/GalgameStage.tsx" "$TARGET_DIR/components/GalgameStage.tsx"
cp -f "$TMP_DIR/repo/hooks/useTheme.ts" "$TARGET_DIR/hooks/useTheme.ts"
cp -f "$TMP_DIR/repo/hooks/useCodeTheme.ts" "$TARGET_DIR/hooks/useCodeTheme.ts"
cp -f "$TMP_DIR/repo/components/ThemePicker.tsx" "$TARGET_DIR/components/ThemePicker.tsx"
cp -f "$TMP_DIR/repo/components/AppShell.tsx" "$TARGET_DIR/components/AppShell.tsx"
cp -f "$TMP_DIR/repo/components/SessionSidebar.tsx" "$TARGET_DIR/components/SessionSidebar.tsx"
cp -f "$TMP_DIR/repo/components/MessageView.tsx" "$TARGET_DIR/components/MessageView.tsx"
cp -f "$TMP_DIR/repo/components/ChatInput.tsx" "$TARGET_DIR/components/ChatInput.tsx"
cp -f "$TMP_DIR/repo/components/ChatWindow.tsx" "$TARGET_DIR/components/ChatWindow.tsx"
cp -f "$TMP_DIR/repo/hooks/useAgentSession.ts" "$TARGET_DIR/hooks/useAgentSession.ts"
cp -f "$TMP_DIR/repo/lib/rpc-manager.ts" "$TARGET_DIR/lib/rpc-manager.ts"
cp -f "$TMP_DIR/repo/app/api/agent/[id]/events/route.ts" "$TARGET_DIR/app/api/agent/[id]/events/route.ts"
cp -f "$TMP_DIR/repo/app/layout.tsx" "$TARGET_DIR/app/layout.tsx"

echo "✨ Galgame theme installed! Now run inside $TARGET_DIR:"
echo "   npm run build && npm start"
