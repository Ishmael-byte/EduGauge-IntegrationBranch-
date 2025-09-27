const sql = require('mssql');
const { getDbRequest } = require('../database');

// GET assessments
async function getAssessments(req, res) {
    const lecturer_id = req.lecturerid;
    const stud_id = req.user?.stud_id;

    try {
        let query;
        let request = getDbRequest();

        if (lecturer_id) {
            query = 'SELECT * FROM Assessment WHERE lecturer_id = @lecturer_id ORDER BY created_date DESC';
            request.input('lecturer_id', sql.Int, lecturer_id);
        } else if (stud_id) {
            query = `
                SELECT a.assessment_id, a.description, a.created_date, l.Fname AS lecturer_name
                FROM Assessment a
                JOIN Lecturer l ON a.lecturer_id = l.lecturer_id
                ORDER BY a.created_date DESC
            `;
        } else {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const result = await request.query(query);
        res.json({ assessments: result.recordset });

    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch assessments' });
    }
}

// POST assessment
async function createAssessment(req, res) {
    const { description } = req.body;
    const lecturer_id = req.lecturerid;
    const created_date = new Date();

    if (!description) return res.status(400).json({ message: 'Description required' });

    try {
        const result = await getDbRequest()
            .input('description', sql.NVarChar(500), description)
            .input('created_date', sql.DateTime, created_date)
            .input('lecturer_id', sql.Int, lecturer_id)
            .query('INSERT INTO Assessment (description, created_date, lecturer_id) VALUES (@description, @created_date, @lecturer_id); SELECT SCOPE_IDENTITY() AS assessment_id');

        res.status(201).json({ message: 'Assessment created', assessmentId: result.recordset[0].assessment_id });

    } catch (err) {
        res.status(500).json({ message: 'Failed to create assessment' });
    }
}

// PUT assessment
async function updateAssessment(req, res) {
    const { description } = req.body;
    const lecturer_id = req.lecturerid;
    const assessment_id = req.params.assessment_id;
    const updated_date = new Date();

    if (!description) return res.status(400).json({ message: 'Description required' });

    try {
        const result = await getDbRequest()
            .input('assessment_id', sql.Int, assessment_id)
            .input('description', sql.NVarChar(500), description)
            .input('updated_date', sql.DateTime, updated_date)
            .input('lecturer_id', sql.Int, lecturer_id)
            .query('UPDATE Assessment SET description = @description, updated_date = @updated_date WHERE assessment_id = @assessment_id AND lecturer_id = @lecturer_id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Assessment not found or unauthorized' });
        }

        res.json({ message: 'Assessment updated' });

    } catch (err) {
        res.status(500).json({ message: 'Failed to update assessment' });
    }
}

// DELETE assessment
async function deleteAssessment(req, res) {
    const lecturer_id = req.lecturerid;
    const assessment_id = req.params.assessment_id;

    try {
        const result = await getDbRequest()
            .input('assessment_id', sql.Int, assessment_id)
            .input('lecturer_id', sql.Int, lecturer_id)
            .query('DELETE FROM Assessment WHERE assessment_id = @assessment_id AND lecturer_id = @lecturer_id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Assessment not found or unauthorized' });
        }

        res.json({ message: 'Assessment deleted' });

    } catch (err) {
        res.status(500).json({ message: 'Failed to delete assessment' });
    }
}

module.exports = { getAssessments, createAssessment, updateAssessment, deleteAssessment };
