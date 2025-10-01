const express = require('express');
const router = express.Router();
const { getQuestions, addQuestion } = require('../controllers/QuestionController');
const { authenticateToken } = require('../middleware/auth');

// Shared view
router.get('/:assessment_id', authenticateToken, getQuestions);

// Lecturer-only
router.post('/:assessment_id', authenticateToken, addQuestion);

module.exports = router;
