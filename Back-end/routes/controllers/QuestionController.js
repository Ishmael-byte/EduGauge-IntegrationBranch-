const sql = require('mssql');
const { getDbRequest } = require('../database');

// GET questions
async function getQuestions(req, res) {
    const assessment_id = req.params.assessment_id;

    try {
        const result = await getDbRequest()
            .input('assessment_id', sql.Int, assessment_id)
            .query('SELECT question_id, description FROM Question WHERE assessment_id = @assessment_id');

        res.json({ questions: result.recordset });

    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch questions' });
    }
}

// POST question
async function addQuestion(req, res) {
    const { description } = req.body;
    const assessment_id = req.params.assessment_id;
    const lecturer_id = req.lecturerid;

    if (!lecturer_id) return res.status(403).json({ message: 'Only lecturers can add questions' });
    if (!description) return res.status(400).json({ message: 'Description required' });

    try {
        await getDbRequest()
            .input('assessment_id', sql.Int, assessment_id)
            .input('description', sql.NVarChar(1000), description)
            .query('INSERT INTO Question (assessment_id, description) VALUES (@assessment_id, @description)');

        res.status(201).json({ message: 'Question added' });

    } catch (err) {
        res.status(500).json({ message: 'Failed to add question' });
    }
}

module.exports = { getQuestions, addQuestion };
