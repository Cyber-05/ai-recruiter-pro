# 🚀 AI Recruiter Pro - Deployment Helper (Windows PowerShell)
# This script prepares your code for Railway.app deployment

$REPO_PATH = "d:\Ai-Recruiter Pro"

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🚀 AI Recruiter Pro - Deployment Helper (Windows)        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify Git is ready
Write-Host "[1/5] Checking Git setup..." -ForegroundColor Blue
cd $REPO_PATH
$gitTest = git status 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Git repository ready" -ForegroundColor Green
} else {
    Write-Host "✗ Git not initialized" -ForegroundColor Red
    Write-Host "Run: git init"
    exit 1
}

# Step 2: Check if GitHub remote exists
Write-Host "[2/5] Checking GitHub remote..." -ForegroundColor Blue
$remoteUrl = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0 -and $remoteUrl -like "https://github.com/*") {
    Write-Host "✓ GitHub remote configured: $remoteUrl" -ForegroundColor Green
} else {
    Write-Host "⚠ No GitHub remote configured yet" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "REQUIRED: Create GitHub repository first!" -ForegroundColor Red
    Write-Host "1. Go to: https://github.com/new"
    Write-Host "2. Create repository: ai-recruiter-pro"
    Write-Host "3. Then run these commands:"
    Write-Host ""
    Write-Host "git remote add origin https://github.com/YOUR_USERNAME/ai-recruiter-pro.git"
    Write-Host "git branch -M main"
    Write-Host "git push -u origin main"
    Write-Host ""
    exit 1
}

# Step 3: Check uncommitted changes
Write-Host "[3/5] Checking for uncommitted changes..." -ForegroundColor Blue
$uncommitted = git status --porcelain 2>&1
if ($uncommitted.Length -eq 0) {
    Write-Host "✓ All changes committed" -ForegroundColor Green
} else {
    Write-Host "⚠ Uncommitted changes found:" -ForegroundColor Yellow
    Write-Host $uncommitted
    Write-Host ""
    Write-Host "Run: git add . && git commit -m 'Update before deployment'"
    exit 1
}

# Step 4: Push to GitHub
Write-Host "[4/5] Pushing to GitHub..." -ForegroundColor Blue
git push -u origin main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully pushed to GitHub" -ForegroundColor Green
} else {
    Write-Host "✗ Push failed - check error above" -ForegroundColor Red
    exit 1
}

# Step 5: Deployment instructions
Write-Host "[5/5] Next steps for deployment..." -ForegroundColor Blue
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  NEXT STEPS: Deploy to Railway.app (5 MINUTES!)           ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "STEP 1: Create Railway Project"
Write-Host "  1. Go to: https://railway.app"
Write-Host "  2. Sign up with GitHub (if needed)"
Write-Host "  3. Click: 'New Project'"
Write-Host "  4. Select: 'Deploy from GitHub repo'"
Write-Host "  5. Choose: 'ai-recruiter-pro'"
Write-Host ""

Write-Host "STEP 2: Add Environment Variables"
Write-Host "  In Railway → Settings → Environment Variables, add:"
Write-Host ""
Write-Host "  PORT=5000"
Write-Host "  NODE_ENV=production"
Write-Host "  MONGODB_URI=mongodb+srv://lastandfinal8899_db_user:kX2Hviz2H7jV4Tj4@cluster0.ypoaqxs.mongodb.net/ai-recruiter-pro"
Write-Host "  JWT_SECRET=your-secret-key-here"
Write-Host "  JWT_EXPIRE=7d"
Write-Host "  OPENAI_API_KEY=sk-proj-xxxxx"
Write-Host "  SMTP_HOST=smtp.gmail.com"
Write-Host "  SMTP_PORT=587"
Write-Host "  SMTP_USER=your-email@gmail.com"
Write-Host "  SMTP_PASSWORD=your-app-password"
Write-Host ""

Write-Host "STEP 3: Deploy!"
Write-Host "  Click: 'Deploy' button in Railway"
Write-Host "  Wait: 2-3 minutes for deployment"
Write-Host ""

Write-Host "STEP 4: Get Your Public URL"
Write-Host "  In Railway → Deployments → Copy your domain"
Write-Host "  Example: https://ai-recruiter-pro-production.railway.app"
Write-Host ""

Write-Host "✅ YOUR APP IS NOW LIVE!" -ForegroundColor Green
Write-Host ""
Write-Host "Test signup/login at:"
Write-Host "  https://your-app.railway.app/pages/signup.html"
Write-Host ""
Write-Host "🎉 Congratulations! Your AI Recruiter Pro is deployed!" -ForegroundColor Green
Write-Host ""
