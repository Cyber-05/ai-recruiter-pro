# 🎯 AI-Powered Candidate Matching System

## Overview

The **Candidate Matching System** helps recruiters find the best candidates for job openings using AI-powered analysis. It:

✅ Analyzes job requirements
✅ Scores candidates based on fit
✅ Provides AI reasoning for matches
✅ Highlights strengths and gaps
✅ Ranks by best match first

---

## Features

### 1. **AI Candidate Matching**
- Post job requirements
- AI analyzes all verified candidates
- Scores each candidate (0-100%)
- Returns top 20 matches ranked by fit

### 2. **Match Scoring Includes**
- Overall match percentage
- AI reasoning explanation
- 2-3 key strengths
- 2-3 areas to improve

### 3. **Search & Filter**
- Find by job title
- Filter by skills
- Filter by experience level
- Filter by location
- Filter by education

### 4. **Candidate Profiles**
- View full candidate info
- See their resumes
- Check ATS scores
- View extracted skills

---

## How It Works

### Step 1: Recruiter Posts Job Requirements
```
Job Title: Senior Frontend Engineer
Required Skills: React, TypeScript, Node.js
Experience: 5+ years
Location: Remote
Education: Bachelor's in CS
```

### Step 2: AI Analyzes All Candidates
- Compares job requirements to each candidate's profile
- Uses GPT-3.5-turbo for intelligent matching
- Scores based on skill alignment, experience fit, education match

### Step 3: Results Ranked by Best Match
```
1. John Smith - 92% Match ⭐⭐⭐
2. Jane Doe - 88% Match ⭐⭐
3. Bob Johnson - 75% Match ⭐
```

### Step 4: AI Provides Details for Each Match
- ✓ Strengths: "8+ years experience, Full-stack capable"
- ⚠ Gaps: "Limited cloud architecture experience"
- 🤖 Reasoning: "Strong technical fit with good leadership..."

---

## Using the Feature

### Access Candidate Finder
Open: `http://localhost:3000/frontend/pages/find-candidates.html`

Or add link to dashboard navigation

### Search for Candidates

1. **Enter Job Title** (Required)
   - Example: "Senior Frontend Engineer"

2. **Add Required Skills** (Optional)
   - Comma-separated: React, TypeScript, Node.js

3. **Set Experience Level** (Optional)
   - Years required: 5

4. **Set Location** (Optional)
   - Remote, San Francisco, New York, etc.

5. **Set Education** (Optional)
   - Bachelor's, Master's, etc.

6. **Click "Find Matching Candidates"**

### View Results

Each candidate card shows:
- ✨ Name and company
- 📊 Match score (color-coded: green >70%, yellow 50-70%, red <50%)
- 🤖 AI explanation
- ✓ Strengths (what they excel at)
- ⚠ Gaps (areas to improve)
- 👁 View Profile button
- 📧 Contact button

### Contact Candidates

Click "Contact" to:
- Send email directly
- Schedule interview
- Add to pipeline
- (Future: LinkedIn messaging)

---

## API Endpoints

### Find Candidates by Job Requirements
```bash
POST /api/candidate-match/find
Authorization: Bearer {token}

Body:
{
  "jobTitle": "Senior Frontend Engineer",
  "skills": ["React", "TypeScript"],
  "experience": 5,
  "location": "Remote",
  "education": "Bachelor's"
}

Response:
{
  "success": true,
  "jobRequirements": {...},
  "candidates": [
    {
      "_id": "...",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john@example.com",
      "matchScore": 92,
      "reasoning": "Strong match for Senior Frontend role",
      "strengths": ["8+ years React experience", "Full-stack capable"],
      "gaps": ["Limited AWS experience"],
      "company": "Tech Corp"
    }
  ],
  "totalMatches": 15
}
```

### Search by Skills
```bash
POST /api/candidate-match/search-by-skills
Authorization: Bearer {token}

Body:
{
  "skills": ["React", "TypeScript"],
  "limit": 10
}
```

### Get Candidate Profile
```bash
GET /api/candidate-match/:candidateId
Authorization: Bearer {token}

Response:
{
  "success": true,
  "candidate": {...},
  "resumes": [
    {
      "id": "...",
      "fileName": "resume.pdf",
      "skills": ["React", "Node.js", ...],
      "atsScore": 85
    }
  ]
}
```

### Get Top Candidates
```bash
GET /api/candidate-match?limit=10
Authorization: Bearer {token}
```

---

## AI Scoring Algorithm

The AI evaluates candidates based on:

1. **Skill Match** (40%)
   - How many required skills do they have?
   - How relevant are their skills?

2. **Experience Level** (30%)
   - Do they meet the minimum years?
   - Is their experience in the right area?

3. **Education** (15%)
   - Do they meet education requirements?

4. **Overall Fit** (15%)
   - Does their profile match the role overall?
   - Any red flags or standout qualities?

Result: **0-100% Match Score**

---

## Best Practices

### For Recruiters

1. **Be Specific with Requirements**
   - More specific = better matches
   - Include must-have skills
   - Set realistic experience level

2. **Review Reasoning**
   - Read the AI explanation
   - Check strengths and gaps
   - Verify score makes sense

3. **Follow Up Quickly**
   - Contact high-match candidates immediately
   - They're likely in other pipelines

4. **Provide Feedback**
   - Tell system which matches were good/bad
   - Improves future recommendations

### For Candidates

1. **Complete Profile**
   - Add all relevant skills
   - Upload multiple resumes
   - Keep info up-to-date

2. **Get Analyzed**
   - System works best with complete profiles
   - More data = better matching

---

## Future Enhancements

🔄 **Planned Features:**
- LinkedIn profile import/sync
- Resume parsing and skill extraction
- Interview scheduling
- Feedback and ranking system
- Batch candidate search
- Email notification alerts
- Candidate pipeline management
- Video interview integration
- Assessment scores integration

---

## Troubleshooting

### "No candidates found"
- Check MongoDB is connected
- Verify candidates are verified (isVerified: true)
- Try different search criteria

### "401 Unauthorized"
- Check token is valid
- Ensure you're logged in
- Token may have expired

### "500 Error"
- Check OpenAI API key is valid
- Verify API has credits
- Check backend logs

---

## Configuration

### Environment Variables Required
```
OPENAI_API_KEY=sk-... (must be valid)
MONGODB_URI=... (connected and working)
JWT_SECRET=... (for authentication)
```

### Backend Port
```
PORT=5000 (default, configurable)
```

---

## Example Workflow

1. Recruiter opens **Find Candidates** page
2. Enters job details:
   - Title: "Full Stack Developer"
   - Skills: "React, Node.js, MongoDB"
   - Experience: 3 years
3. System:
   - Fetches all verified candidates
   - Scores each against requirements
   - Returns top 20 ranked by match %
4. Recruiter:
   - Reviews top candidates
   - Checks AI reasoning
   - Contacts best fits
   - Schedules interviews

---

## Success Metrics

Track these to measure effectiveness:

- ✅ Candidates contacted per search
- ✅ Interview conversion rate
- ✅ Time to hire reduction
- ✅ Quality of matches (feedback)
- ✅ Candidate satisfaction
- ✅ Hiring manager satisfaction

---

## Support & Questions

For issues or feature requests:
1. Check backend logs for errors
2. Verify all environment variables set
3. Test API endpoints with cURL
4. Check candidate profiles are complete
5. Ensure OpenAI API is working

---

**Happy recruiting! 🚀**
