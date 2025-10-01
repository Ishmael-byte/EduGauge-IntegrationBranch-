const sql = require('mssql');
const { getDbRequest } = require('../database');

// Lecturer submits feedback and grading
async function submitFeedback(req, res) {
    const { assessmentId, studentId, marks, feedback } = req.body;
    const lecturerId = req.user?.lecturerId;
    const adminId = 1; // Static admin ID

    if (!lecturerId) {
        return res.status(403).json({ message: 'Only lecturers can submit feedback' });
    }

    if (!assessmentId || !studentId || !marks) {
        return res.status(400).json({ message: 'Assessment ID, Student ID, and Marks are required' });
    }

    try {
        await getDbRequest()
            .input('assessment_id', sql.Int, assessmentId)
            .input('student_id', sql.Int, studentId)
            .input('lecturer_id', sql.Int, lecturerId)
            .input('admin_id', sql.Int, adminId)
            .input('marks', sql.Decimal(5, 2), marks)
            .input('feedback', sql.NVarChar(1000), feedback || '')
            .query(`
                INSERT INTO Grading (assessment_id, stud_id, lecturer_id, admin_id, marks, feedback)
                VALUES (@assessment_id, @student_id, @lecturer_id, @admin_id, @marks, @feedback)
            `);

        res.status(201).json({ message: 'Feedback submitted successfully' });

    } catch (err) {
        console.error('Error submitting feedback:', err);
        res.status(500).json({ message: 'Failed to submit feedback' });
    }
}

// Student views their feedback and grades
async function getStudentFeedback(req, res) {
    const studentId = req.user?.studentId;

    if (!studentId) {
        return res.status(403).json({ message: 'Only students can view feedback' });
    }

    try {
        const result = await getDbRequest()
            .input('student_id', sql.Int, studentId)
            .query(`
                SELECT g.marks, g.feedback, a.description AS assessmentTitle, a.created_date
                FROM Grading g
                JOIN Assessment a ON g.assessment_id = a.assessment_id
                WHERE g.stud_id = @student_id
                ORDER BY a.created_date DESC
            `);

        res.json({ feedback: result.recordset });

    } catch (err) {
        console.error('Error retrieving feedback:', err);
        res.status(500).json({ message: 'Failed to retrieve feedback' });
    }
}

module.exports = { submitFeedback, getStudentFeedback };
