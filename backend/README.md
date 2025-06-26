# CodeWave Backend API

Backend API сервер для приложения CodeWave, построенный на Express.js с Prisma ORM.

## 🚀 Быстрый старт

### Предварительные требования

- Node.js (версия 18 или выше)
- PostgreSQL база данных
- npm или yarn

### Установка

1. **Клонируйте репозиторий и перейдите в папку backend:**
   ```bash
   cd backend
   ```

2. **Установите зависимости:**
   ```bash
   npm install
   ```

3. **Настройте переменные окружения:**
   ```bash
   cp env.example .env
   ```

   Отредактируйте `.env` файл с вашими настройками:
   - `DATABASE_URL` - URL подключения к PostgreSQL
   - `JWT_SECRET` - секретный ключ для JWT токенов
   - `BACKEND_PORT` - порт для сервера (по умолчанию 5000)
   - `FRONTEND_URL` - URL фронтенда для CORS

4. **Настройте базу данных:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Запустите сервер:**
   ```bash
   # Режим разработки
   npm run dev

   # Продакшн режим
   npm start
   ```

## 📡 API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация пользователя
- `POST /api/auth/login` - Вход в систему
- `GET /api/auth/me` - Получить текущего пользователя
- `POST /api/auth/logout` - Выход из системы

### Пользователи
- `GET /api/users` - Получить всех пользователей (только админ)
- `GET /api/users/:id` - Получить пользователя по ID
- `PUT /api/users/profile` - Обновить профиль
- `DELETE /api/users/:id` - Удалить пользователя (только админ)

### Разговоры
- `GET /api/conversations` - Получить все разговоры пользователя
- `GET /api/conversations/:id` - Получить разговор по ID
- `POST /api/conversations` - Создать новый разговор
- `PATCH /api/conversations/:id/close` - Закрыть разговор

### Сообщения
- `GET /api/messages/conversation/:conversationId` - Получить сообщения разговора
- `POST /api/messages` - Отправить сообщение
- `PUT /api/messages/:id` - Редактировать сообщение
- `DELETE /api/messages/:id` - Удалить сообщение

### Отзывы
- `GET /api/reviews` - Получить все отзывы
- `GET /api/reviews/:id` - Получить отзыв по ID
- `POST /api/reviews` - Создать отзыв
- `PUT /api/reviews/:id` - Обновить отзыв
- `DELETE /api/reviews/:id` - Удалить отзыв
- `GET /api/reviews/stats/overview` - Статистика отзывов (только админ)

## 🔧 Технологии

- **Express.js** - веб-фреймворк
- **Prisma** - ORM для работы с базой данных
- **PostgreSQL** - база данных
- **JWT** - аутентификация
- **Socket.io** - real-time сообщения
- **bcrypt** - хеширование паролей
- **express-validator** - валидация данных

## 📁 Структура проекта

```
backend/
├── src/
│   ├── config/
│   │   └── database.js      # Конфигурация базы данных
│   ├── controllers/         # Контроллеры (будущие)
│   ├── middleware/
│   │   └── auth.js         # Middleware аутентификации
│   ├── routes/
│   │   ├── auth.js         # Роуты аутентификации
│   │   ├── users.js        # Роуты пользователей
│   │   ├── conversations.js # Роуты разговоров
│   │   ├── messages.js     # Роуты сообщений
│   │   └── reviews.js      # Роуты отзывов
│   └── utils/              # Утилиты (будущие)
├── server.js               # Основной сервер
├── package.json
└── README.md
```

## 🔒 Безопасность

- JWT токены для аутентификации
- Хеширование паролей с bcrypt
- CORS настройки
- Rate limiting
- Helmet для защиты заголовков
- Валидация входных данных

## 🚀 Развертывание

### Локальное развертывание
```bash
npm run dev
```

### Продакшн развертывание
```bash
npm run build
npm start
```

### Docker (будущее)
```bash
docker build -t codewave-backend .
docker run -p 5000:5000 codewave-backend
```

## 📝 Логи

Сервер выводит логи в консоль:
- Подключения к базе данных
- HTTP запросы
- Socket.io события
- Ошибки

## 🤝 Интеграция с фронтендом

Бэкенд настроен для работы с фронтендом на порту 3000. Убедитесь, что в `.env` файле правильно указан `FRONTEND_URL`.

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи сервера
2. Убедитесь, что база данных запущена
3. Проверьте настройки в `.env` файле
4. Убедитесь, что все зависимости установлены
