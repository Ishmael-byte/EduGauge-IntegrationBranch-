const sql = require('mssql');
const { getDbRequest } = require('../database');

// Submit an answer to a question (Student only)
async function submitAnswer(req, res) {
    const { ansDescription } = req.body;
    const questionId = req.params.questionId;
    const studentId = req.user?.studentId;

    if (!studentId) {
        return res.status(403).json({ message: 'Only students can submit answers' });
    }

    if (!ansDescription) {
        return res.status(400).json({ message: 'Answer description is required' });
    }

    try {
        await getDbRequest()
            .input('question_id', sql.Int, questionId)
            .input('ans_description', sql.NVarChar(1000), ansDescription)
            .input('student_id', sql.Int, studentId)
            .query(`
                INSERT INTO Answer (question_id, ans_description, student_id)
                VALUES (@question_id, @ans_description, @student_id)
            `);

        res.status(201).json({ message: 'Answer submitted successfully' });
    } catch (err) {
        console.error('Error submitting answer:', err);
        res.status(500).json({ message: 'Failed to submit answer' });
    }
}

module.exports = { submitAnswer };
