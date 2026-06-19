#!/bin/bash
# Обновление фидов для Яндекса

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(dirname "$SCRIPT_DIR")"

DATE=$(date -R)
YML_DATE=$(date +%Y-%m-%d\ %H:%M)

# Обновляем дату в turbo.xml
sed -i "s|<pubDate>.*</pubDate>|<pubDate>${DATE}</pubDate>|" "${BASE_DIR}/turbo.xml"

# Обновляем дату в yandex-market.yml
sed -i "s|date=\".*\"|date=\"${YML_DATE}\"|" "${BASE_DIR}/yandex-market.yml"

echo "Фиды обновлены: ${YML_DATE}"
