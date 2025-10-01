const express = require('express');
const questionRouter = express.Router();
const { getQuestions, addQuestion } = require('../controllers/QuestionController');
const { authenticateToken } = require('../middleware/auth');

// Get questions for an assessment (shared view)
questionRouter.get('/:assessmentId', authenticateToken, getQuestions);

// Add a question to an assessment (lecturer-only)
questionRouter.post('/:assessmentId', authenticateToken, addQuestion);

module.exports = questionRouter;
