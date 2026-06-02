# 🎯 Quick Start Guide - Local Testing

## Prerequisites
- Node.js v14+ installed
- MongoDB Atlas account (you already have this)
- Google Chrome browser
- Internet connection

---

## 5-Minute Local Setup

### Step 1: Install Dependencies
```bash
cd d:\Ai-Recruiter Pro
npm install
cd backend
npm install
cd ..
```

Expected output:
```
added XXX packages, and audited XXX packages
```

### Step 2: Verify Backend Configuration
Check `backend/.env` has these values:
```
PORT=5000
MONGODB_URI=mongodb+srv://lastandfinal8899_db_user:kX2Hviz2H7jV4Tj4@cluster0.ypoaqxs.mongodb.net/ai-recruiter-pro?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-proj-xxxxx
NODE_ENV=development
```

### Step 3: Start Backend (Terminal 1)
```bash
cd d:\Ai-Recruiter Pro\backend
npm start
```

Expected output:
```
Server running on port 5000
MongoDB connected
Environment: development
```

### Step 4: Start Frontend Dev Server (Terminal 2)
```bash
cd d:\Ai-Recruiter Pro
npm run dev
```

Expected output:
```
🚀 AI Recruiter Pro - Development Server
Frontend:  http://localhost:3000
Backend:   http://localhost:5000/api
```

### Step 5: Open in Chrome
**Type this in Chrome address bar:**
```
http://localhost:3000/pages/signup.html
```

✅ You should see the signup page!

---

## Test Signup Flow

### 1. Fill Signup Form
```
First Name: John
Last Name: Tester
Company: Test Corp
Email: johntest@gmail.com  ⚠️ MUST BE GMAIL
Username: johntest123
Password: Test123456!
```

### 2. Click "Create Account"
- Form validates
- Loading spinner appears
- Should complete in 2-3 seconds

### 3. Enter OTP Code
- Check backend console for OTP (appears in development mode)
- Or check your Gmail inbox
- Example OTP: `123456`
- Enter all 6 digits
- Click "Verify Code"

### 4. Success!
- Should redirect to dashboard
- Welcome message appears
- You're logged in! ✓

---

## Test Login Flow

### 1. Go to Login Page
```
http://localhost:3000/pages/login.html
```

### 2. Enter Credentials
```
Email: johntest@gmail.com
Password: Test123456!
```

### 3. Click "Sign In"
- Form validates
- Loading spinner
- Completes in 1-2 seconds

### 4. Enter OTP
- Get OTP from backend console or email
- Enter 6 digits
- Click "Verify Code"

### 5. Success!
- Redirects to dashboard
- User data displays
- You're logged in! ✓

---

## Troubleshooting Local Setup

### ❌ Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process using port 5000
taskkill /PID <PID_NUMBER> /F

# Try starting again
cd backend && npm start
```

### ❌ "MongoDB connection error"
- Verify internet connection
- Check MONGODB_URI in .env
- Make sure IP is whitelisted in MongoDB Atlas
- Try connecting from MongoDB Compass to test

### ❌ "Cannot find module"
```bash
# Reinstall dependencies
rm -r node_modules backend/node_modules
npm install
cd backend && npm install
```

### ❌ Signup page shows blank
- Check browser console (F12)
- Verify backend is running
- Check if `frontend/config.js` exists
- Try hard refresh (Ctrl+Shift+R)

### ❌ OTP not appearing
- Check backend console log
- Verify SMTP settings if using email
- In dev mode, OTP appears in terminal
- Check MongoDB connection

### ❌ "CORS error"
- Make sure backend is running on port 5000
- Check `backend/server.js` has CORS enabled
- Try accessing API directly: `http://localhost:5000/api/health`

---

## What to Look For

### ✅ Working Signup
- [ ] Form submission succeeds
- [ ] No errors in console
- [ ] OTP received
- [ ] Login redirects to dashboard

### ✅ Working Login
- [ ] Credentials accepted
- [ ] OTP verification works
- [ ] Session stored in localStorage
- [ ] Dashboard loads

### ✅ Working Dashboard
- [ ] Shows welcome message
- [ ] Menu items visible (6 items)
- [ ] User profile displays
- [ ] No 404 errors

### ✅ Working Backend
- [ ] Terminal shows "MongoDB connected"
- [ ] No error logs
- [ ] OTP logs appear
- [ ] API responds to requests

---

## Browser Console Debugging

**Open DevTools:** F12 or Right-click → Inspect

### Check Console Tab
```javascript
// Should show:
API URL: http://localhost:5000/api
Environment: LOCAL

// And no errors (red messages)
```

### Check Network Tab
```
- POST /api/auth/signup → 200 OK
- POST /api/auth/verify-otp → 200 OK
- POST /api/auth/login → 200 OK
```

### Check Storage Tab
```
localStorage:
- token: eyJhbGciOiJIUzI1NiIs... (your JWT token)
- user: {"_id":"...", "email":"...", ...}
```

---

## Test Different Scenarios

### Scenario 1: Invalid Email
```
Input: notgmail@yahoo.com
Expected: "Only Gmail addresses are accepted"
✓ Validation working
```

### Scenario 2: Wrong Password
```
Email: johntest@gmail.com
Password: wrongpassword
Expected: Error message
✓ Auth working
```

### Scenario 3: Invalid OTP
```
Input: 000000 (wrong code)
Expected: Error message
✓ OTP validation working
```

### Scenario 4: Duplicate Email
```
Try signing up with same email twice
Expected: "Email already exists"
✓ Database validation working
```

---

## Next Steps After Successful Local Testing

### 1. Deploy to Production
See `DEPLOYMENT_GUIDE.md` for step-by-step deployment

### 2. Update Environment
- Change `NODE_ENV=production` in backend/.env
- Update API URLs for production domain
- Change JWT_SECRET to something secure

### 3. Test Deployed Version
- Signup at production URL
- Verify all features work
- Test on mobile
- Check performance

### 4. Monitor Production
- Check logs regularly
- Monitor database connection
- Track API performance
- Review error reports

---

## Useful Commands

```bash
# Start everything
npm run dev-full

# Just backend
npm start

# Just frontend
npm run dev

# Install fresh
npm run install-all

# Health check
curl http://localhost:5000/api/health

# Backend logs
cd backend && npm start

# Frontend logs
npm run dev
```

---

## Tips & Tricks

### 💡 Quick Dev Loop
1. Keep terminal with backend running
2. Start new terminal for frontend
3. Open Chrome to http://localhost:3000
4. Make code changes
5. Refresh browser (F5)
6. Changes appear immediately

### 💡 Testing Multiple Accounts
- Use multiple Gmail addresses (john1@gmail, john2@gmail, etc.)
- Or use Gmail aliases: john+test1@gmail.com
- Each counts as unique email

### 💡 View OTP in Backend
Backend logs show:
```
[OTP Service] Generated OTP: 123456 for testuser@gmail.com
```

### 💡 Clear Browser Cache
If seeing old pages:
```
Chrome → Settings → Clear browsing data
Or: Ctrl+Shift+Delete → Clear all time
```

### 💡 Debug API Calls
In browser console:
```javascript
// Manually test API
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## Production Deployment Checklist

Before deploying to public URL:

- [ ] All local tests pass
- [ ] Signup/login works
- [ ] OTP verification works
- [ ] No console errors
- [ ] Database connection stable
- [ ] API responds quickly
- [ ] All environment variables set
- [ ] Security measures implemented
- [ ] HTTPS enabled
- [ ] Monitoring configured

---

## Support

If you encounter issues:

1. **Check the console** (F12)
   - Look for red error messages
   - Note the exact error text

2. **Check backend logs**
   - Terminal running backend shows detailed logs
   - Look for MongoDB connection messages
   - Check for OTP generation

3. **Verify configuration**
   - Is backend running on port 5000?
   - Is frontend running on port 3000?
   - Is MongoDB connection string correct?
   - Are environment variables set?

4. **Common fixes**
   - Kill and restart servers
   - Clear browser cache
   - Check internet connection
   - Verify ports aren't blocked

---

## Ready to Deploy?

Once local testing is complete and working:

1. Follow `DEPLOYMENT_GUIDE.md`
2. Choose Railway, Render, or Heroku
3. Push to GitHub
4. Deploy in 5 minutes
5. Your app is LIVE! 🚀

---

**Your AI Recruiter Pro is ready for testing!**

Start local servers and test in Chrome now! 🎯

