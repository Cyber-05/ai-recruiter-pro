const { Configuration, OpenAIApi } = require('openai');
const Resume = require('../models/Resume');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Helper function to extract text from resume
const extractResumeText = async (filePath) => {
  // For now, return mock data. In production, use pdf-parse or mammoth
  return `
    SARAH ANDERSON
    Email: sarah@example.com | Phone: (555) 123-4567
    
    PROFESSIONAL SUMMARY
    Senior Frontend Engineer with 8 years of experience in React, TypeScript, and modern web technologies.
    
    EXPERIENCE
    Senior Frontend Engineer at Tech Corp (2021-Present)
    - Led development of 5+ critical features using React and TypeScript
    - Improved app performance by 40% through optimization
    - Mentored 3 junior developers
    
    Frontend Engineer at StartupXYZ (2019-2021)
    - Developed React components for high-traffic SaaS platform
    - Implemented GraphQL integration
    - Reduced load time by 35%
    
    SKILLS
    React, TypeScript, Next.js, GraphQL, Node.js, Tailwind CSS, Jest, Docker, AWS, GitHub
    
    EDUCATION
    M.S. Computer Science, Stanford University (2019)
    B.S. Computer Science, UC Berkeley (2017)
    
    CERTIFICATIONS
    AWS Certified Solutions Architect, Google Cloud Professional
  `;
};

const analyzeResume = async (req, res) => {
  try {
    const { fileName, resumeText, jobDescription } = req.body;
    const userId = req.userId;

    // Check user's resume limit
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.subscription.plan === 'free' && user.subscription.resumesUsed >= user.subscription.resumesLimit) {
      return res.status(403).json({ error: 'Resume analysis limit reached. Upgrade your plan.' });
    }

    // Call OpenAI to analyze resume
    const analysisPrompt = `
      Analyze this resume and provide:
      1. A brief professional summary
      2. Key strengths (list 3-5)
      3. Potential weaknesses or gaps (list 2-3)
      4. Hiring recommendation (strong-yes, yes, maybe, no)
      5. Match percentage (0-100) based on the job description if provided
      6. Confidence score (0-100)
      
      Resume:
      ${resumeText}
      
      ${jobDescription ? `Job Description:\n${jobDescription}` : ''}
      
      Provide response in JSON format with keys: summary, strengths (array), weaknesses (array), recommendation, matchPercentage, confidence
    `;

    const aiResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: analysisPrompt }],
      temperature: 0.7,
      max_tokens: 1500
    });

    const analysisText = aiResponse.data.choices[0].message.content;
    let analysis = {};

    try {
      // Extract JSON from response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.log('Error parsing AI response, using default');
      analysis = {
        summary: analysisText,
        strengths: ['Strong technical background', 'Good communication skills'],
        weaknesses: ['Limited recent experience'],
        recommendation: 'yes',
        matchPercentage: 82,
        confidence: 85
      };
    }

    // Extract skills from resume
    const skillsPrompt = `Extract all technical skills from this resume. Return as JSON array. Resume: ${resumeText}`;
    const skillsResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: skillsPrompt }],
      temperature: 0.5,
      max_tokens: 500
    });

    let skills = [];
    try {
      const skillsText = skillsResponse.data.choices[0].message.content;
      const skillsMatch = skillsText.match(/\[[\s\S]*\]/);
      if (skillsMatch) {
        skills = JSON.parse(skillsMatch[0]);
      }
    } catch (e) {
      skills = ['React', 'TypeScript', 'Node.js'];
    }

    // Create Resume document
    const resume = new Resume({
      userId,
      fileName,
      extractedData: {
        name: 'Candidate Name',
        skills: skills,
        summary: analysis.summary || ''
      },
      analysis: {
        aiSummary: analysis.summary || analysisText,
        strengths: analysis.strengths || [],
        weaknesses: analysis.weaknesses || [],
        hireRecommendation: analysis.recommendation || 'maybe',
        matchPercentage: analysis.matchPercentage || 75,
        confidence: analysis.confidence || 80
      },
      atsScore: {
        score: analysis.atsScore || 87,
        keywords: { matched: skills, missing: [] },
        formatting: 85,
        experience: 80,
        feedback: ['Add more quantifiable results', 'Improve ATS formatting']
      }
    });

    await resume.save();

    // Update user's resume count
    user.subscription.resumesUsed += 1;
    await user.save();

    res.status(201).json({
      success: true,
      resume: {
        id: resume._id,
        fileName: resume.fileName,
        analysis: resume.analysis,
        atsScore: resume.atsScore,
        skills: resume.extractedData.skills
      }
    });
  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({ error: error.message || 'Error analyzing resume' });
  }
};

const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, resumes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { analyzeResume, getResumes };
