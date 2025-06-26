# CodeWave Backend Stop Script for PowerShell

Write-Host "🛑 Stopping CodeWave Backend..." -ForegroundColor Yellow

# Stop Node.js processes
try {
    $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
    if ($nodeProcesses) {
        Write-Host "📋 Found Node.js processes:" -ForegroundColor Cyan
        $nodeProcesses | ForEach-Object {
            Write-Host "   - PID: $($_.Id), Name: $($_.ProcessName)" -ForegroundColor Gray
        }

        Write-Host "🔄 Stopping Node.js processes..." -ForegroundColor Yellow
        Stop-Process -Name "node" -Force
        Write-Host "✅ Node.js processes stopped" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  No Node.js processes found" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Error stopping Node.js processes: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "✅ Backend stopped successfully" -ForegroundColor Green
