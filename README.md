# 🌊 CodeWave - Веб-студия разработки

Современный веб-сайт для компании по разработке веб-решений. Создан с использованием Next.js 14, TypeScript и Tailwind CSS.

## ✨ Особенности

- 🎨 **Современный дизайн** - Адаптивный интерфейс с плавными анимациями
- ⚡ **Высокая производительность** - Оптимизированный Next.js 14 с App Router
- 📱 **Мобильная адаптация** - Корректное отображение на всех устройствах
- 🔍 **SEO-оптимизация** - Настроенные метаданные и структурированные данные
- 🌐 **Интернационализация** - Готовность к многоязычности
- 📬 **Интеграция с Telegram** - Автоматическая отправка заказов в Telegram

## 🚀 Технологии

- **Framework:** Next.js 14 (App Router)
- **Язык:** TypeScript
- **Стилизация:** Tailwind CSS
- **Анимации:** Framer Motion
- **Слайдеры:** Swiper.js
- **Иконки:** React Icons
- **Формы:** React Hook Form
- **Шрифты:** Google Fonts (Ubuntu, JetBrains Mono)

## 📁 Структура проекта

```
codewave/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── components/        # React компоненты
│   │   ├── contacts/          # Страница контактов
│   │   ├── design/           # Страница дизайна
│   │   ├── order/            # Страница заказа
│   │   ├── privacy/          # Политика конфиденциальности
│   │   ├── reviews/          # Страница отзывов
│   │   ├── services/         # Страница услуг
│   │   └── terms/            # Пользовательское соглашение
│   ├── lib/                   # Утилиты
│   └── types/                 # TypeScript типы
├── data/                      # Статические данные
├── public/                    # Статические ресурсы
│   ├── icons/                # Иконки
│   └── images/               # Изображения
└── docs/                     # Документация
```

## 🔧 Установка и запуск

### Предварительные требования

- Node.js 18+
- npm, yarn или pnpm

### Локальная разработка

1. **Клонирование репозитория**

   ```bash
   git clone https://github.com/your-username/codewave.git
   cd codewave
   ```

2. **Установка зависимостей**

   ```bash
   npm install
   # или
   yarn install
   # или
   pnpm install
   ```

3. **Настройка переменных окружения**

   ```bash
   cp .env.example .env.local
   ```

4. **Запуск в режиме разработки**

   ```bash
   npm run dev
   # или
   yarn dev
   # или
   pnpm dev
   ```

5. **Открыть в браузере**
   - Сайт: http://localhost:3000

### Продакшн сборка

```bash
# Создание оптимизированной сборки
npm run build

# Запуск продакшн сервера
npm start
```

## 🌐 Страницы

- **Главная** (`/`) - Презентация компании и услуг
- **Услуги** (`/services`) - Подробное описание всех услуг
- **Портфолио** (`/portfolio`) - Примеры работ
- **Отзывы** (`/reviews`) - Отзывы клиентов
- **Контакты** (`/contacts`) - Контактная информация
- **Заказ** (`/order`) - Форма заказа проекта
- **Дизайн** (`/design`) - Услуги дизайна
- **Политика конфиденциальности** (`/privacy`)
- **Пользовательское соглашение** (`/terms`)

## 🎨 Компоненты

### Основные компоненты

- `Header` - Шапка сайта с навигацией
- `Footer` - Подвал сайта
- `Services` - Блок услуг с каруселью
- `Portfolio` - Галерея работ
- `Reviews` - Отзывы клиентов
- `Technologies` - Используемые технологии

### UI компоненты

- `Button` - Кнопки
- `Modal` - Модальные окна
- `Title` - Заголовки
- `StarrySky` - Анимированный фон
- `PulsingLoader` - Загрузчик

## 📡 API

### Эндпоинты

- `POST /api/send-order-telegram` - Отправка заказа в Telegram

### Настройка Telegram Bot

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## 🔒 Переменные окружения

```env
# Telegram интеграция
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# Настройки сайта
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📱 Адаптивность

Сайт полностью адаптирован для:

- 📱 Мобильные устройства (320px+)
- 📱 Планшеты (768px+)
- 💻 Десктопы (1024px+)
- 🖥️ Большие экраны (1440px+)

## 🚀 Деплой

### Vercel (Рекомендуется)

1. Подключить GitHub репозиторий к Vercel
2. Настроить переменные окружения
3. Деплой произойдет автоматически

### Другие платформы

- **Netlify** - Поддерживает Next.js
- **Railway** - Простой деплой
- **DigitalOcean** - App Platform

## 🛠️ Скрипты

```bash
# Разработка
npm run dev

# Сборка
npm run build

# Запуск продакшн
npm start

# Линтинг
npm run lint

# Проверка типов
npm run type-check
```

## 📝 Лицензия

Этот проект создан для компании CodeWave. Все права защищены.

## 🤝 Поддержка

Если у вас есть вопросы или предложения:

- 📧 Email: info@codewave.com
- 💬 Telegram: @codewave_support
- 🌐 Сайт: https://codewave.com

---

Создано с ❤️ командой CodeWave
