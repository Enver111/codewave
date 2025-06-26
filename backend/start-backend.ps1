# CodeWave Backend Startup Script for PowerShell

Write-Host "🚀 Starting CodeWave Backend..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found. Creating from template..." -ForegroundColor Yellow
    if (Test-Path "env.example") {
        Copy-Item "env.example" ".env"
        Write-Host "✅ .env file created from template" -ForegroundColor Green
        Write-Host "⚠️  Please edit .env file with your configuration" -ForegroundColor Yellow
    } else {
        Write-Host "❌ env.example file not found" -ForegroundColor Red
        exit 1
    }
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
}

# Generate Prisma client
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma client" -ForegroundColor Red
    exit 1
}

# Push database schema
Write-Host "🗄️  Pushing database schema..." -ForegroundColor Yellow
npx prisma db push
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push database schema" -ForegroundColor Red
    Write-Host "⚠️  Make sure your database is running and DATABASE_URL is correct" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Database schema updated" -ForegroundColor Green

# Start the server
Write-Host "🌐 Starting backend server..." -ForegroundColor Green
Write-Host "📡 Backend will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📡 API Health check: http://localhost:5000/api/health" -ForegroundColor Cyan
Write-Host ""

npm run dev
