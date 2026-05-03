# CivIQ Local Launch Script
# This script starts the backend and frontend for local testing.

Write-Host ">>> Starting CivIQ Local Environment..." -ForegroundColor Cyan

# 1. Start Backend
Write-Host "[1/2] Starting Backend (FastAPI)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; if (-not (Test-Path venv)) { python -m venv venv }; .\venv\Scripts\activate; pip install -r requirements.txt; python main.py" -WindowStyle Normal

# 2. Start Frontend
Write-Host "[2/2] Starting Frontend (Vite)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm install; npm run dev" -WindowStyle Normal

Write-Host "Success: Both servers are starting in separate windows." -ForegroundColor Yellow
Write-Host "Local URL (Backend): http://localhost:8000"
Write-Host "Local URL (Frontend): http://localhost:5173"
