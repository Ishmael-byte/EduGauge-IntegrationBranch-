const express = require('express');
const answerRouter = express.Router();
const { submitAnswer } = require('../controllers/AnswerController');
const { authenticateToken } = require('../middleware/auth');

// Submit an answer to a question (Student only)
answerRouter.post('/:questionId', authenticateToken, submitAnswer);

module.exports = answerRouter;
