const { Configuration, OpenAIApi } = require('openai');
const Interview = require('../models/Interview');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateInterviewQuestions = async (req, res) => {
  try {
    const { jobRole, difficulty, count = 5, candidateName } = req.body;
    const userId = req.userId;

    const prompt = `
      Generate ${count} interview questions for a ${difficulty} level ${jobRole} position.
      
      For each question, provide:
      - The question itself
      - Type (technical, behavioral, coding, or system-design)
      - Expected answer key points (2-3 points)
      - Estimated time to answer (in minutes)
      
      Return as JSON array with objects containing: question, type, expectedAnswerKeyPoints, estimatedTime
      
      Make questions specific to ${jobRole} role and difficulty level: ${difficulty}
    `;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 2000
    });

    const responseText = response.data.choices[0].message.content;
    let questions = [];

    try {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      // Fallback questions
      questions = [
        {
          number: 1,
          question: `Tell me about your experience with ${jobRole} development.`,
          type: 'behavioral',
          expectedAnswerKeyPoints: ['Years of experience', 'Key projects', 'Technologies used'],
          estimatedTime: 5
        },
        {
          number: 2,
          question: `How do you approach problem-solving in ${jobRole}?`,
          type: 'technical',
          expectedAnswerKeyPoints: ['Analysis approach', 'Tools used', 'Testing methodology'],
          estimatedTime: 7
        },
        {
          number: 3,
          question: `Describe a challenging project you worked on and how you overcame it.`,
          type: 'behavioral',
          expectedAnswerKeyPoints: ['Challenge description', 'Actions taken', 'Results achieved'],
          estimatedTime: 8
        }
      ];

      questions = questions.map((q, i) => ({ ...q, number: i + 1 }));
    }

    // Create Interview document
    const interview = new Interview({
      userId,
      jobRole,
      difficulty,
      questions: questions.map((q, i) => ({
        number: i + 1,
        question: q.question,
        type: q.type || 'technical',
        expectedAnswerKeyPoints: q.expectedAnswerKeyPoints || [],
        estimatedTime: q.estimatedTime || 5
      })),
      duration: questions.reduce((sum, q) => sum + (q.estimatedTime || 5), 0)
    });

    await interview.save();

    res.status(201).json({
      success: true,
      interview: {
        id: interview._id,
        jobRole: interview.jobRole,
        difficulty: interview.difficulty,
        totalQuestions: questions.length,
        duration: interview.duration,
        questions: interview.questions
      }
    });
  } catch (error) {
    console.error('Interview generation error:', error);
    res.status(500).json({ error: error.message || 'Error generating interview questions' });
  }
};

const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateInterviewQuestions, getInterviews };
