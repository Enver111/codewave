# Используем Node.js 18 Alpine для меньшего размера
FROM node:18-alpine AS base

# Устанавливаем зависимости только если они нужны
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Установка зависимостей
FROM base AS deps
# Копируем файлы зависимостей
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Сборка приложения
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Отключаем телеметрию Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Собираем приложение
RUN npm run build

# Продакшен образ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем необходимые файлы из builder
COPY --from=builder /app/public ./public

# Автоматически используем output файлы если доступны
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Запускаем приложение
CMD ["node", "server.js"]
