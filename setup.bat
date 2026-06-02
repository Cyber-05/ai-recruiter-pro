@echo off
echo ======================================
echo AI Recruiter Pro - Quick Start Script
echo ======================================
echo.

echo Step 1: Checking if Node.js is installed...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download and install from https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✓ Node.js found:
    node --version
)

echo.
echo Step 2: Checking if MongoDB is installed...
mongod --version >nul 2>&1
if errorlevel 1 (
    echo WARNING: MongoDB is not installed locally
    echo You can either:
    echo 1. Download from https://www.mongodb.com/try/download/community
    echo 2. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
) else (
    echo ✓ MongoDB found:
    mongod --version
)

echo.
echo Step 3: Installing backend dependencies...
cd backend
if not exist "node_modules" (
    echo Installing packages...
    npm install
    echo ✓ Dependencies installed
) else (
    echo ✓ Dependencies already installed
)

echo.
echo Step 4: Creating .env file...
if not exist ".env" (
    echo Creating .env from template...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Edit backend\.env file and add:
    echo    - MONGODB_URI: Your MongoDB connection string
    echo    - OPENAI_API_KEY: Your OpenAI API key (from https://platform.openai.com)
    echo.
    pause
) else (
    echo ✓ .env file already exists
)

echo.
echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo Next steps:
echo 1. Edit backend\.env file with your credentials:
echo    - MONGODB_URI (MongoDB local or Atlas connection string)
echo    - OPENAI_API_KEY (from https://platform.openai.com/account/api-keys)
echo.
echo 2. Start MongoDB (if using local):
echo    mongod
echo.
echo 3. Start the backend server (from backend folder):
echo    npm start
echo.
echo 4. Open index.html in your browser
echo.
echo 5. Sign up and start using the platform!
echo.
echo Documentation: See SETUP_GUIDE.md for detailed instructions
echo.
pause
