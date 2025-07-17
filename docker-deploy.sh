#!/bin/bash

# Деплой CodeWave через Docker
# Запуск: chmod +x docker-deploy.sh && ./docker-deploy.sh

set -e

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🐳 Деплой CodeWave через Docker${NC}"
echo "========================================"

# Функция для проверки команды
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ $1 не найден! Установите $1${NC}"
        exit 1
    fi
}

# Проверка зависимостей
echo -e "${YELLOW}🔍 Проверяем зависимости...${NC}"
check_command "docker"
check_command "docker-compose"

# Проверка .env файла
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env файл не найден!${NC}"
    echo -e "${YELLOW}Создаем .env файл...${NC}"
    cat > .env << EOF
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
EOF
    echo -e "${YELLOW}📝 Отредактируйте .env файл с вашими данными${NC}"
    exit 1
fi

# Создание папки для логов
mkdir -p logs

# Остановка старых контейнеров
echo -e "${YELLOW}🛑 Останавливаем старые контейнеры...${NC}"
docker-compose down --remove-orphans

# Очистка старых образов (опционально)
read -p "Очистить старые Docker образы? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🧹 Очищаем старые образы...${NC}"
    docker image prune -f
fi

# Сборка и запуск
echo -e "${YELLOW}🔨 Собираем и запускаем контейнеры...${NC}"
docker-compose up -d --build

# Проверка статуса
echo -e "${YELLOW}⏳ Ждем запуска приложения...${NC}"
sleep 10

# Проверка работы контейнера
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Приложение успешно запущено!${NC}"
    echo -e "${GREEN}🌐 Доступно по адресу: http://localhost:3000${NC}"

    # Показываем логи
    echo -e "${YELLOW}📋 Последние логи:${NC}"
    docker-compose logs --tail=20 codewave
else
    echo -e "${RED}❌ Ошибка запуска приложения${NC}"
    echo -e "${YELLOW}📋 Логи ошибок:${NC}"
    docker-compose logs codewave
    exit 1
fi

echo ""
echo -e "${BLUE}📋 Полезные команды:${NC}"
echo "docker-compose logs -f codewave    # Просмотр логов"
echo "docker-compose restart codewave    # Перезапуск"
echo "docker-compose down                # Остановка"
echo "docker-compose exec codewave sh    # Подключение к контейнеру"
echo "docker-compose ps                  # Статус контейнеров"

# Создание самоподписанного SSL сертификата (если нужно)
if [ ! -d "./ssl" ]; then
    read -p "Создать самоподписанный SSL сертификат? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}🔒 Создаем SSL сертификат...${NC}"
        mkdir -p ssl
        openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/C=RU/ST=Moscow/L=Moscow/O=CodeWave/CN=localhost"
        echo -e "${GREEN}✅ SSL сертификат создан${NC}"
    fi
fi

echo ""
echo -e "${GREEN}🎉 Деплой завершен успешно!${NC}"
