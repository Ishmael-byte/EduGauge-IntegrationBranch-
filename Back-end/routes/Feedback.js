const express = require('express');
const router = express.Router();
const { submitFeedback, getStudentFeedback } = require('../controllers/FeedbackController');
const { authenticateToken } = require('../middleware/auth');

// Lecturers submits the feedback and marks
router.post('/', authenticateToken, submitFeedback);

// Student views their feedback and grades
router.get('/', authenticateToken, getStudentFeedback);

module.exports = router;
