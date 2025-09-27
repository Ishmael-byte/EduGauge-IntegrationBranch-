const sql = require('mssql');
const { getDbRequest } = require('../database');

// POST answer
async function submitAnswer(req, res) {
    const { ans_description } = req.body;
    const question_id = req.params.question_id;
    const stud_id = req.user?.stud_id;

    if (!stud_id) return res.status(403).json({ message: 'Only students can submit answers' });
    if (!ans_description) return res.status(400).json({ message: 'Answer required' });

    try {
        await getDbRequest()
            .input('question_id', sql.Int, question_id)
            .input('ans_description', sql.NVarChar(1000), ans_description)
            .query('INSERT INTO Answer (question_id, ans_description) VALUES (@question_id, @ans_description)');

        res.status(201).json({ message: 'Answer submitted' });

    } catch (err) {
        res.status(500).json({ message: 'Failed to submit answer' });
    }
}

module.exports = { submitAnswer };
