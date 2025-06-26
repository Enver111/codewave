# CodeWave - Full Stack Application

A modern full-stack application built with TypeScript, Next.js, Express, and Prisma.

## 🏗️ Project Structure

```
codewave/
├── src/               # Next.js frontend application
├── backend/           # Express.js backend API (TypeScript)
├── database/          # Database migrations and schemas
├── scripts/           # Utility scripts
├── public/            # Static assets
└── data/             # Static data files
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd codewave
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp backend/env.example backend/.env
   cp .env.example .env
   ```

4. **Set up database**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   cd ..
   ```

### Development

**Start frontend:**
```bash
npm run dev
```

**Start backend (in separate terminal):**
```bash
cd backend
npm run dev
```

### Production

**Build frontend:**
```bash
npm run build
```

**Start production server:**
```bash
npm start
```

## 📁 Project Components

### Frontend (`/src`)
- **Framework:** Next.js 14 with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** React hooks + Context API
- **Real-time:** Socket.io client

### Backend (`/backend`)
- **Framework:** Express.js with TypeScript
- **Database:** Prisma ORM with PostgreSQL
- **Authentication:** JWT tokens
- **Real-time:** Socket.io server
- **Validation:** express-validator

### Database (`/database`)
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Migrations:** Automatic schema migrations

## 🌐 Access Points

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/:id` - Delete user (admin)

### Conversations
- `GET /api/conversations` - Get user conversations
- `GET /api/conversations/:id` - Get conversation by ID
- `POST /api/conversations` - Create new conversation
- `PUT /api/conversations/:id` - Update conversation
- `DELETE /api/conversations/:id` - Delete conversation

### Messages
- `GET /api/messages/conversation/:conversationId` - Get messages for conversation
- `POST /api/messages` - Create new message
- `PUT /api/messages/:id` - Update message
- `DELETE /api/messages/:id` - Delete message

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get review by ID
- `POST /api/reviews` - Create new review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## 🔒 Environment Variables

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

## 🛠️ Development Tools

- **TypeScript** - Type safety across the stack
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Prisma Studio** - Database GUI
- **Socket.io** - Real-time communication

## 📦 Dependencies

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Socket.io client

### Backend
- Express.js
- TypeScript
- Prisma
- Socket.io
- JWT
