const sql = require('mssql');
const { getDbRequest } = require('../database');

// Get questions for a specific assessment
async function getQuestions(req, res) {
    const assessmentId = req.params.assessmentId;

    try {
        const result = await getDbRequest()
            .input('assessment_id', sql.Int, assessmentId)
            .query(`
                SELECT question_id, description
                FROM Question
                WHERE assessment_id = @assessment_id
            `);

        res.json({ questions: result.recordset });

    } catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).json({ message: 'Failed to fetch questions' });
    }
}

// Add a question to an assessment (Lecturer only)
async function addQuestion(req, res) {
    const { description } = req.body;
    const assessmentId = req.params.assessmentId;
    const lecturerId = req.user?.lecturerId;

    if (!lecturerId) {
        return res.status(403).json({ message: 'Only lecturers can add questions' });
    }

    if (!description) {
        return res.status(400).json({ message: 'Description is required' });
    }

    try {
        await getDbRequest()
            .input('assessment_id', sql.Int, assessmentId)
            .input('description', sql.NVarChar(1000), description)
            .query(`
                INSERT INTO Question (assessment_id, description)
                VALUES (@assessment_id, @description)
            `);

        res.status(201).json({ message: 'Question added successfully' });

    } catch (err) {
        console.error('Error adding question:', err);
        res.status(500).json({ message: 'Failed to add question' });
    }
}

module.exports = { getQuestions, addQuestion };
