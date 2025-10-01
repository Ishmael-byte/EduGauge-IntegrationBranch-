const express = require('express');
const feedbackRouter = express.Router();
const { submitFeedback, getStudentFeedback } = require('../controllers/FeedbackController');
const { authenticateToken } = require('../middleware/auth');

// Submit feedback and marks (Lecturer only)
feedbackRouter.post('/', authenticateToken, submitFeedback);

// View feedback and grades (Student only)
feedbackRouter.get('/', authenticateToken, getStudentFeedback);

module.exports = feedbackRouter;
