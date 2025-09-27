const express = require('express');
const router = express.Router();
const { getAssessments, createAssessment, updateAssessment, deleteAssessment } = require('../controllers/AssessmentController');
const { authenticateToken } = require('../middleware/auth');

// Shared view: student sees all, lecturer sees own
router.get('/', authenticateToken, getAssessments);

// Lecturer-only actions
router.post('/', authenticateToken, createAssessment);
router.put('/:assessment_id', authenticateToken, updateAssessment);
router.delete('/:assessment_id', authenticateToken, deleteAssessment);

module.exports = router;
