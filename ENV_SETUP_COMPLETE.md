# 🔧 Complete Environment Setup Guide

## ✅ .env File Created

Your `.backend/.env` file is now configured with:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-recruiter-pro
JWT_SECRET=your-super-secret-jwt-key-change-in-production-12345
OPENAI_API_KEY=sk-your-openai-key-here
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
```

---

## 🚨 Fix Fetch Error - 3 Things Required

### 1️⃣ Start MongoDB

**Windows:**
```powershell
# Open a NEW terminal and run:
mongod
```

Expected output:
```
[initandlisten] waiting for connections on port 27017
```

**macOS/Linux:**
```bash
brew services start mongodb-community
# or
sudo systemctl start mongod
```

---

### 2️⃣ Update .env with Your Gmail

Edit `backend/.env`:

```
SMTP_USER=your-actual-gmail@gmail.com
SMTP_PASS=your-gmail-password-or-app-password
```

**Options:**
- Use your Gmail password directly
- **OR** use App Password (more secure):
  - Go: https://myaccount.google.com/security
  - Turn on "Less secure app access"
  - Use your regular Gmail password

---

### 3️⃣ Update Frontend API URL

Edit `frontend/pages/signup.html` and search for:

```javascript
const API_URL = 'http://localhost:5000/api';
```

Make sure it says `localhost:5000` (not 3000 or any other port)

---

## ▶️ How to Start Everything

**Terminal 1 - Start MongoDB:**
```powershell
mongod
```

**Terminal 2 - Start Backend:**
```powershell
cd "d:\Ai-Recruiter Pro\backend"
npm start
```

You should see:
```
✓ Server running on port 5000
✓ MongoDB connected
```

**Terminal 3 - Open Frontend:**
```
Open browser to: file:///D:/Ai-Recruiter%20Pro/frontend/pages/signup.html
```

---

## 📋 Checklist Before Testing

- [ ] MongoDB is running (Terminal 1)
- [ ] Backend is running (Terminal 2) 
- [ ] .env file has Gmail credentials
- [ ] Frontend API_URL is correct
- [ ] Trying signup with @gmail.com email

---

## 🐛 If Still Getting Fetch Error

Check these in order:

### 1. Is Backend Running?
```powershell
# In a new terminal:
curl http://localhost:5000/api
```

Should show some response (not "Connection refused")

### 2. Is MongoDB Running?
```powershell
# In a new terminal:
mongo
```

Should connect successfully

### 3. Check Browser Console
Open browser → F12 → Console tab → Look for exact error message

### 4. Check Backend Console
Look for errors in Terminal 2 (backend terminal)

---

## 📝 Required Environment Variables Explained

| Variable | What It Is | Example |
|----------|-----------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | Database connection | mongodb://localhost:27017/ai-recruiter-pro |
| JWT_SECRET | Auth encryption key | any-random-string-here |
| OPENAI_API_KEY | GPT API key | sk-... (from platform.openai.com) |
| SMTP_USER | Gmail address | your@gmail.com |
| SMTP_PASS | Gmail password | your-password |
| NODE_ENV | Environment | development |

---

## 🎯 Quick Test Steps

1. Make sure all 3 terminals show ✓ running
2. Open signup page
3. Use real Gmail: `test@gmail.com`
4. Fill form → Click "Create Account"
5. Should see: "Check email for OTP code"
6. Check Gmail inbox (or spam folder) for OTP

---

## ⚠️ Common Errors

| Error | Fix |
|-------|-----|
| Cannot connect to MongoDB | Start `mongod` in Terminal 1 |
| "Only Gmail accepted" | You used non-Gmail email |
| "Email already exists" | Use different Gmail |
| Fetch error on signup | Backend not running (Terminal 2) |
| OTP not received | Check SMTP_USER/SMTP_PASS in .env |

---

Done! Follow these steps and test signup again. 🚀
