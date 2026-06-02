#!/bin/bash

echo "======================================"
echo "AI Recruiter Pro - Quick Start Script"
echo "======================================"
echo ""

# Check Node.js
echo "Step 1: Checking if Node.js is installed..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please download from https://nodejs.org/"
    exit 1
else
    echo "✓ Node.js found:"
    node --version
fi

echo ""

# Check MongoDB
echo "Step 2: Checking if MongoDB is installed..."
if ! command -v mongod &> /dev/null; then
    echo "WARNING: MongoDB is not installed locally"
    echo "You can either:"
    echo "1. Install via Homebrew: brew install mongodb-community"
    echo "2. Download from https://www.mongodb.com/try/download/community"
    echo "3. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
else
    echo "✓ MongoDB found:"
    mongod --version
fi

echo ""
echo "Step 3: Installing backend dependencies..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing packages..."
    npm install
    echo "✓ Dependencies installed"
else
    echo "✓ Dependencies already installed"
fi

echo ""
echo "Step 4: Creating .env file..."
if [ ! -f ".env" ]; then
    echo "Creating .env from template..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit backend/.env file and add:"
    echo "   - MONGODB_URI: Your MongoDB connection string"
    echo "   - OPENAI_API_KEY: Your OpenAI API key"
    echo ""
else
    echo "✓ .env file already exists"
fi

echo ""
echo "======================================"
echo "Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env file with your credentials:"
echo "   - MONGODB_URI (MongoDB connection string)"
echo "   - OPENAI_API_KEY (from https://platform.openai.com/account/api-keys)"
echo ""
echo "2. Start MongoDB (if using local):"
echo "   mongod"
echo ""
echo "3. Start the backend server (from backend folder):"
echo "   npm start"
echo ""
echo "4. Open index.html in your browser"
echo ""
echo "5. Sign up and start using the platform!"
echo ""
echo "Documentation: See SETUP_GUIDE.md for detailed instructions"
echo ""
