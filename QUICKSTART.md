# CodeWave Quick Start Guide

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Environment Setup

```bash
# Copy environment files
cp backend/env.example backend/.env
cp .env.example .env
```

### 3. Database Setup

```bash
# Navigate to backend
cd backend

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Return to root
cd ..
```

### 4. Start Development Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

## 🌐 Access Points

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## 📁 Project Structure

```
codewave/
├── src/               # Next.js frontend application
├── backend/           # Express.js backend API (TypeScript)
├── database/          # Database migrations and schemas
├── scripts/           # Utility scripts
├── public/            # Static assets
└── data/             # Static data files
```

## 🔧 Available Scripts

### Frontend (Root Directory)
- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm start` - Start frontend production server

### Backend (backend/ Directory)
- `npm run dev` - Start backend development server
- `npm run build` - Build backend for production
- `npm start` - Start backend production server

## 🛠️ Development Tools

- **Prisma Studio** - Database GUI
  ```bash
  cd backend
  npx prisma studio
  ```

- **Database Reset** - Clear and recreate database
  ```bash
  cd backend
  npx prisma migrate reset
  ```

## 🔒 Environment Variables

Make sure to configure these in your `.env` files:

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/codewave
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change PORT in backend/.env
   - Or kill process using the port

2. **Database connection failed**
   - Check DATABASE_URL in backend/.env
   - Ensure PostgreSQL is running

3. **Prisma client not generated**
   - Run `npx prisma generate` in backend directory

4. **Frontend can't connect to backend**
   - Check NEXT_PUBLIC_API_URL in .env
   - Ensure backend is running on correct port

---

**Готово!** 🎉 Приложение запущено и готово к использованию.
