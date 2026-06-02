# ⚡ Quick Start - 5 Minute Setup

> Get AI Recruiter Pro running locally in Chrome in just 5 minutes!

## What You'll Need
- Node.js v14+ 
- MongoDB Atlas account (you already have: lastandfinal8899_db_user)
- Chrome browser

---

## 🚀 Start Local Testing NOW

### Terminal 1: Start Backend
```bash
cd d:\Ai-Recruiter Pro\backend
npm start
```

**Wait for:**
```
Server running on port 5000
MongoDB connected
```

### Terminal 2: Start Frontend  
```bash
cd d:\Ai-Recruiter Pro
npm install
npm run dev
```

**Wait for:**
```
Frontend:  http://localhost:3000
```

### Chrome: Open Signup Page
```
http://localhost:3000/pages/signup.html
```

✅ **You're ready to test!**

---

## 📝 Test Signup

1. **Fill the form:**
   - First Name: `John`
   - Last Name: `Developer`
   - Company: `Test Corp`
   - Email: `your-gmail@gmail.com` ⚠️ Must be Gmail!
   - Username: `johndeveloper`
   - Password: `Test123456!`

2. **Click "Create Account"**
   - Wait for success message
   - Loading spinner will appear

3. **Enter OTP Code**
   - Check backend terminal - OTP will print there
   - Or check your Gmail inbox
   - Example: `123456`
   - Enter all 6 digits

4. **Success!**
   - Redirects to dashboard
   - You're logged in! ✓

---

## 🔑 Test Login

1. **Go to:** `http://localhost:3000/pages/login.html`

2. **Enter credentials:**
   - Email: `your-gmail@gmail.com`
   - Password: `Test123456!`

3. **Enter OTP from backend console or email**

4. **Success!**
   - Dashboard loads
   - User data displays

---

## 🚀 Deploy to Production (5 Minutes)

### Step 1: Push to GitHub
```bash
cd d:\Ai-Recruiter Pro
git init
git add .
git commit -m "AI Recruiter Pro"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-recruiter-pro.git
git push -u origin main
```

### Step 2: Deploy to Railway
1. Go to **https://railway.app**
2. Sign up with GitHub (1 click)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your **ai-recruiter-pro** repository
6. Click **"Deploy"**

### Step 3: Set Environment Variables
In Railway dashboard:
- Go to **Settings** → **Environment Variables**
- Add these:
  ```
  PORT=5000
  NODE_ENV=production
  MONGODB_URI=mongodb+srv://lastandfinal8899_db_user:kX2Hviz2H7jV4Tj4@cluster0.ypoaqxs.mongodb.net/ai-recruiter-pro
  JWT_SECRET=your-secret-key-here
  ```

### Step 4: Get Your Live URL
- Railway generates URL like: `https://ai-recruiter-pro-production.railway.app`
- Your app is LIVE! 🎉

---

## ✅ Check It's Working

### In Browser Console (F12)
```javascript
// Should show:
API URL: http://localhost:5000/api
Environment: LOCAL
```

### Backend Terminal Should Show
```
✓ Server running on port 5000
✓ MongoDB connected
✓ Environment: development
```

### Test Signup Should
- [ ] Form submits without errors
- [ ] OTP appears in terminal
- [ ] Redirect to dashboard works
- [ ] No red errors in console

---

## 📋 Next Steps

### ✓ Done Local Testing?
1. Follow **Deploy to Production** steps above
2. Test signup on live URL
3. Test login on live URL
4. Everything works? 🎉

### ✓ Need More Info?
- **Local Testing Details:** See `LOCAL_TESTING_GUIDE.md`
- **Full Deployment Guide:** See `DEPLOYMENT_GUIDE.md`
- **Complete Documentation:** See `README.md`

### ✓ Troubleshooting?
```
Backend won't start?
→ npm install
→ Check .env file
→ Verify MongoDB connection

Frontend page blank?
→ Hard refresh: Ctrl+Shift+R
→ Check console for errors
→ Verify backend is running

API errors?
→ Make sure backend is on port 5000
→ Check environment variables
→ Test with: http://localhost:5000/api/health
```

---

## 🎯 Test Accounts Ready

```
Recruiter Account:
Email: sarah.recruiter@gmail.com
Password: SecurePass123!

Job Seeker Account:
Email: john.dev.seeker@gmail.com
Password: Test12345!
```

---

## 💡 Pro Tips

### Quick Dev Loop
1. Keep backend terminal open
2. Start new terminal for frontend
3. Both run simultaneously
4. Refresh browser to see changes

### Bypass Email (Development)
- OTP prints in backend terminal
- No need to check email
- Auto-copy from console

### Multiple Test Accounts
- Use different Gmail addresses
- Or Gmail aliases: john+test1@gmail.com
- Each counts as unique account

### Fast Restart
```bash
# Kill terminals with Ctrl+C
# Then restart both
npm start              # Backend
npm run dev            # Frontend
```

---

## 📊 Architecture Overview

```
Chrome Browser
      ↓
Frontend (localhost:3000)
      ↓
Backend API (localhost:5000)
      ↓
MongoDB Atlas
```

- **Frontend:** Vanilla HTML/CSS/JS
- **Backend:** Node.js + Express
- **Database:** MongoDB Cloud
- **Auth:** JWT tokens + OTP

---

## 🎉 You're All Set!

**Your AI Recruiter Pro is ready!**

1. ✅ Start backend (`npm start` in backend folder)
2. ✅ Start frontend (`npm run dev`)
3. ✅ Open `http://localhost:3000/pages/signup.html`
4. ✅ Test signup/login in Chrome
5. ✅ Deploy to Railway (5 minutes)
6. ✅ Go LIVE! 🚀

---

**Questions?** Check the guides or review error messages in Chrome console (F12).

**Ready?** Start the servers now! 👇

