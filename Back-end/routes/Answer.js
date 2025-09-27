const express = require('express');
const router = express.Router();
const { submitAnswer } = require('../controllers/AnswerController');
const { authenticateToken } = require('../middleware/auth');

// Student-only
router.post('/:question_id', authenticateToken, submitAnswer);

module.exports = router;
