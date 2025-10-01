const express = require('express');
const assessmentRouter = express.Router();
const {
  getAssessments,
  createAssessment,
  updateAssessment,
  deleteAssessment
} = require('../controllers/AssessmentController');
const { authenticateToken } = require('../middleware/auth');

// Get assessments (shared view): students see all, lecturers see their own
assessmentRouter.get('/', authenticateToken, getAssessments);

// Lecturer-only actions
assessmentRouter.post('/', authenticateToken, createAssessment);
assessmentRouter.put('/:assessmentId', authenticateToken, updateAssessment);
assessmentRouter.delete('/:assessmentId', authenticateToken, deleteAssessment);

module.exports = assessmentRouter;
