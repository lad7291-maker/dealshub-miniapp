#!/bin/bash
# Обновление фидов для Яндекса

DATE=$(date -R)
YML_DATE=$(date +%Y-%m-%d\ %H:%M)

# Обновляем дату в turbo.xml
sed -i "s|<pubDate>.*</pubDate>|<pubDate>${DATE}</pubDate>|" /var/www/dealshub-miniapp/turbo.xml

# Обновляем дату в yandex-market.yml
sed -i "s|date=\".*\"|date=\"${YML_DATE}\"|" /var/www/dealshub-miniapp/yandex-market.yml

echo "Фиды обновлены: ${YML_DATE}"
