# 🐳 Деплой CodeWave через Docker

## 📋 Требования

- Docker 20.10+
- Docker Compose 1.29+
- Git
- 2GB RAM на сервере
- Домен (опционально)

## 🚀 Быстрый старт

### 1. Клонируем репозиторий

```bash
git clone https://github.com/yourusername/codewave.git
cd codewave
```

### 2. Настраиваем переменные окружения

```bash
cp .env.example .env
nano .env
```

Заполните:

```env
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=-1002450052067
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. Запускаем деплой

```bash
chmod +x docker-deploy.sh
./docker-deploy.sh
```

## 🎯 Варианты деплоя

### Вариант 1: Только Next.js (простой)

```bash
docker-compose -f docker-compose.simple.yml up -d --build
```

### Вариант 2: С Nginx (рекомендуется)

```bash
docker-compose up -d --build
```

## 🔧 Управление контейнерами

### Просмотр логов

```bash
docker-compose logs -f codewave
```

### Перезапуск

```bash
docker-compose restart codewave
```

### Остановка

```bash
docker-compose down
```

### Подключение к контейнеру

```bash
docker-compose exec codewave sh
```

## 🌐 Настройка домена

### 1. Настройка DNS

Добавьте A-запись:

```
yourdomain.com -> IP_вашего_сервера
```

### 2. Получение SSL сертификата

```bash
# Установите certbot
sudo apt install certbot

# Получите сертификат
sudo certbot certonly --standalone -d yourdomain.com

# Скопируйте сертификаты
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/key.pem
```

### 3. Обновите nginx.conf

```nginx
server_name yourdomain.com;
```

## 📊 Мониторинг

### Проверка состояния

```bash
docker-compose ps
```

### Использование ресурсов

```bash
docker stats codewave-app
```

### Проверка доступности

```bash
curl -f http://localhost:3000/api/health || echo "Сервис недоступен"
```

## 🔒 Безопасность

### Firewall

```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### Обновления

```bash
# Обновление образа
docker-compose pull
docker-compose up -d --build

# Очистка старых образов
docker image prune -f
```

## 🐛 Отладка

### Проблемы с сборкой

```bash
# Очистка кэша Docker
docker system prune -a

# Пересборка без кэша
docker-compose build --no-cache
```

### Проблемы с Telegram

```bash
# Проверка переменных окружения
docker-compose exec codewave printenv | grep TELEGRAM

# Тест API
curl -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -d "chat_id=$TELEGRAM_CHAT_ID" \
  -d "text=Test message"
```

## 📈 Производительность

### Рекомендуемые настройки VPS

- **CPU**: 1-2 ядра
- **RAM**: 2-4 GB
- **Диск**: 20-50 GB SSD
- **Сеть**: 100 Mbps+

### Оптимизация

```bash
# Ограничение памяти для контейнера
docker-compose exec codewave sh -c "echo 'memory.limit_in_bytes=1073741824' > /sys/fs/cgroup/memory/memory.limit_in_bytes"
```

## 🎉 Готово!

Ваше приложение доступно по адресу:

- **HTTP**: http://your-server-ip:3000
- **HTTPS**: https://yourdomain.com (с nginx)

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи: `docker-compose logs -f`
2. Убедитесь что порты открыты: `netstat -tlnp`
3. Проверьте .env файл
4. Перезапустите контейнеры: `docker-compose restart`
