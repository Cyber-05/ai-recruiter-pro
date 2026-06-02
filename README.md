# 🚀 AI Recruiter Pro - Full Stack AI Recruitment Platform

Transform your hiring process with AI-powered resume analysis, interview generation, and candidate ranking. A complete, production-ready platform built with modern web technologies.

Website is Live on - https://ai-recruiter-pro-qlig.onrender.com/

## ✨ Features

### 🎯 Core Features
- **Resume Analyzer** - AI-powered resume analysis with skills extraction
- **Interview Generator** - Auto-generate custom interview questions for any role
- **ATS Score Checker** - Real-time ATS-friendly scoring and recommendations
- **Job Description Generator** - Professional JD creation
- **Candidate Ranking** - AI-based candidate comparison and scoring
- **Team Collaboration** - Share resumes and collaborate on hiring
- **Dashboard Analytics** - Real-time hiring metrics and insights

### 🔐 Authentication & Security
- User registration with email verification
- JWT-based authentication
- Password hashing with bcryptjs
- Secure API endpoints
- Rate limiting (ready for production)

### 💰 Monetization Ready
- **Freemium Model** - Free + Pro + Enterprise tiers
- **Stripe Integration** - Payment processing and subscriptions
- **Usage Tracking** - Track feature usage per user
- **Subscription Management** - Manage plans and billing

### 🎨 Beautiful UI/UX
- Modern glassmorphic design
- Smooth animations and transitions
- Responsive design (mobile, tablet, desktop)
- Dark mode by default
- Professional color scheme

## 🏗️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT + bcryptjs
- **AI**: OpenAI API (GPT-3.5-turbo)
- **Payments**: Stripe API
- **File Handling**: Multer, PDF-Parse, Mammoth

### Frontend
- **HTML5, CSS3, Vanilla JavaScript**
- **Responsive Design**
- **No build tools required** (can be served directly)
- **Beautiful animations**
- **Real-time feedback**

### Infrastructure
- **Deployment**: Heroku, Railway, Render (backend)
- **Database**: MongoDB Atlas (cloud)
- **File Storage**: AWS S3 (optional, for scale)
- **CDN**: Cloudflare (optional)

## 📦 Project Structure

```
d:\Ai-Recruiter Pro\
├── 📄 index.html (Landing page)
├── 📋 SETUP_GUIDE.md (Detailed setup)
├── 📖 README.md (This file)
├── setup.bat (Windows setup)
├── setup.sh (Mac/Linux setup)
│
├── backend/
│   ├── server.js (Main server)
│   ├── package.json (Dependencies)
│   ├── .env.example (Environment template)
│   │
│   ├── models/
│   │   ├── User.js (User schema)
│   │   ├── Resume.js (Resume schema)
│   │   ├── Interview.js (Interview schema)
│   │   ├── Candidate.js (Candidate schema)
│   │   └── Job.js (Job posting schema)
│   │
│   ├── controllers/
│   │   ├── authController.js (Auth logic)
│   │   ├── resumeController.js (Resume analysis)
│   │   ├── interviewController.js (Interview generation)
│   │   └── jobController.js (Job management)
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── resumes.js
│   │   ├── interviews.js
│   │   ├── jobs.js
│   │   ├── candidates.js
│   │   ├── users.js
│   │   ├── dashboard.js
│   │   └── payments.js
│   │
│   └── middleware/
│       └── auth.js (JWT verification)
│
└── frontend/
    └── pages/
        ├── signup.html (Registration page)
        ├── login.html (Login page)
        └── dashboard.html (Main dashboard)
```

## ⚡ Quick Start

### 1️⃣ Windows Setup
```bash
# Double-click setup.bat
# Or run from PowerShell:
.\setup.bat
```

### 2️⃣ Mac/Linux Setup
```bash
# Make script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

### 3️⃣ Manual Setup
```bash
# Install dependencies
cd backend
npm install

# Create environment file
copy .env.example .env

# Add your credentials to .env:
# - MONGODB_URI
# - OPENAI_API_KEY
# - JWT_SECRET

# Start server
npm start
```

## 🔑 Required API Keys

### OpenAI API Key
1. Go to https://platform.openai.com/account/api-keys
2. Create new secret key
3. Add to `.env`: `OPENAI_API_KEY=sk_...`

### MongoDB Connection String
**Local Option:**
```
MONGODB_URI=mongodb://localhost:27017/ai-recruiter-pro
```

**Cloud Option (MongoDB Atlas):**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add to `.env`: `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db`

### Stripe Keys (Optional, for payments)
1. Create account at https://stripe.com
2. Get API keys from dashboard
3. Add to `.env`: `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`

## 📖 Usage

### Starting the Application

```bash
# Terminal 1: Start MongoDB (if using local)
mongod

# Terminal 2: Start Backend Server
cd backend
npm start
# Server running on http://localhost:5000

# Terminal 3: Open Frontend
# Open index.html in browser
# Or use: npx http-server (if installed)
```

### Using the Platform

1. **Visit Landing Page** - Open `index.html` in browser
2. **Sign Up** - Click "Start Free" → Create account
3. **Login** - Enter credentials
4. **Dashboard** - Access all features
5. **Analyze Resume** - Paste resume content, get AI analysis
6. **Generate Interview** - Select role and difficulty, get questions
7. **View Stats** - Track usage and insights

## 🎯 API Endpoints

### Authentication
```
POST   /api/auth/signup          - Create account
POST   /api/auth/login           - Sign in
POST   /api/auth/logout          - Sign out
```

### Resumes
```
POST   /api/resumes/analyze      - Analyze resume (requires token)
GET    /api/resumes              - Get all resumes (requires token)
```

### Interviews
```
POST   /api/interviews/generate  - Generate questions (requires token)
GET    /api/interviews           - Get all interviews (requires token)
```

### Dashboard
```
GET    /api/dashboard/stats      - Get user statistics (requires token)
```

### Users
```
GET    /api/users/profile        - Get profile (requires token)
PUT    /api/users/profile        - Update profile (requires token)
```

## 🧪 Testing API with cURL

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","firstName":"John","lastName":"Doe"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Analyze Resume (replace TOKEN)
curl -X POST http://localhost:5000/api/resumes/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"resumeText":"Your resume content here","fileName":"resume.pdf"}'
```

## 📊 Database Models

### User
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  company: String,
  subscription: {
    plan: 'free' | 'pro' | 'enterprise',
    status: 'active' | 'inactive' | 'cancelled',
    stripeCustomerId: String,
    resumesUsed: Number,
    resumesLimit: Number
  },
  features: {
    resumeAnalyzer: Boolean,
    atsChecker: Boolean,
    interviewGenerator: Boolean,
    // ... more features
  },
  apiKey: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Resume
```javascript
{
  userId: ObjectId (ref: User),
  fileName: String,
  extractedData: {
    name: String,
    skills: [String],
    experience: [{ title, company, duration }],
    education: [{ school, degree, field }]
  },
  analysis: {
    aiSummary: String,
    strengths: [String],
    weaknesses: [String],
    hireRecommendation: String,
    matchPercentage: Number,
    confidence: Number
  },
  atsScore: {
    score: Number,
    keywords: { matched: [String], missing: [String] },
    formatting: Number,
    experience: Number
  }
}
```

## 🔄 Authentication Flow

1. **User Signup** → Password hashed with bcryptjs → User created
2. **User Login** → Password compared → JWT token generated
3. **API Request** → Bearer token in Authorization header
4. **Server** → Verifies JWT → Allows access to protected routes

## 💰 Revenue Model

### Subscription Plans

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Resume Analysis | 10/month | Unlimited | Unlimited |
| Interview Generator | ✗ | ✓ | ✓ |
| ATS Checker | ✗ | ✓ | ✓ |
| Team Collaboration | ✗ | Limited | ✓ |
| API Access | ✗ | ✗ | ✓ |
| Support | Email | Priority | Dedicated |
| **Price** | **Free** | **$49/mo** | **Custom** |

### Implementation Ready
- Stripe payment processing
- Automatic billing cycles
- Usage tracking and limits
- Plan upgrade/downgrade

## 🚀 Deployment Guide

### Backend Deployment (Heroku Example)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create ai-recruiter-pro

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set OPENAI_API_KEY=your_openai_key
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Connect repo to Vercel
3. Deploy automatically

## ⚙️ Advanced Configuration

### Environment Variables
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-recruiter-pro
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
OPENAI_API_KEY=sk_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Rate Limiting (Express middleware)
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 🔒 Security Best Practices

✅ **Implemented:**
- Password hashing with bcryptjs
- JWT token verification
- Protected API routes
- CORS configuration
- Environment variables for secrets

⚠️ **To Add:**
- Rate limiting on production
- Email verification
- Password reset flow
- Two-factor authentication
- API key rotation
- Input validation middleware

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check MongoDB is running
mongod

# Or verify Atlas connection string format
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### OpenAI API Errors
- Verify API key is correct
- Check account has credits
- Rate limits apply (60 requests/minute)
- Wait 60 seconds if rate limited

### CORS Issues
- Backend CORS is configured
- Frontend API_URL must match backend URL
- Check browser console for errors

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup instructions
- **[Express Docs](https://expressjs.com)** - Backend framework
- **[MongoDB Docs](https://docs.mongodb.com)** - Database
- **[OpenAI Docs](https://platform.openai.com/docs)** - AI API
- **[Stripe Docs](https://stripe.com/docs)** - Payments

## 📈 Future Enhancements

1. **Email Verification** - Verify emails on signup
2. **Password Reset** - Forgotten password flow
3. **Social Auth** - Google, LinkedIn login
4. **PDF Export** - Download resumes, interviews, reports
5. **Video Interviews** - Record and analyze interviews
6. **ATS Integrations** - Connect with Workday, Greenhouse, etc
7. **Slack Bot** - Post candidates to Slack
8. **Mobile App** - React Native companion app
9. **Advanced Analytics** - Deep hiring insights
10. **ML Pipeline** - Continuous model improvement

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary. All rights reserved.

## 💬 Support & Contact

- **Documentation**: See SETUP_GUIDE.md
- **Issues**: Check MongoDB/OpenAI/Stripe credentials
- **Questions**: Review API documentation

## 🎯 Success Metrics

After implementation, you should see:

✅ Users can sign up and login
✅ Resumes analyzed with AI insights
✅ Interview questions generated
✅ Dashboard shows analytics
✅ Payment processing working
✅ Multiple subscription tiers active
✅ Revenue generation beginning

## 🙌 Acknowledgments

Built with:
- OpenAI for AI capabilities
- Stripe for payments
- MongoDB for data persistence
- Express for backend framework

---

## 📞 Quick Help

**Can't start the backend?**
1. Ensure MongoDB is running: `mongod`
2. Check .env file has all required keys
3. Run `npm install` in backend folder
4. Check port 5000 is not in use

**Resume analysis not working?**
1. Verify OpenAI API key is correct
2. Ensure API key has credits
3. Check network connection
4. Try again (may be rate limited)

**Dashboard not loading?**
1. Ensure backend is running on http://localhost:5000
2. Check browser console for errors
3. Verify authentication token is valid
4. Try logout and login again

---

**Ready to transform your hiring process?** 🚀 Start with quick setup and begin analyzing resumes with AI!

**Happy recruiting!** 🎉
