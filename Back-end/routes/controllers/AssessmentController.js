const sql = require('mssql');
const { getDbRequest } = require('../database');

// GET assessments
async function getAssessments(req, res) {
    const lecturerId = req.user?.lecturerId;
    const studentId = req.user?.studentId;

    try {
        let query;
        const request = getDbRequest();

        if (lecturerId) {
            query = `
                SELECT assessment_id, description, created_date
                FROM Assessment
                WHERE lecturer_id = @lecturerId
                ORDER BY created_date DESC
            `;
            request.input('lecturerId', sql.Int, lecturerId);
        } else if (studentId) {
            query = `
                SELECT a.assessment_id, a.description, a.created_date, l.Fname AS lecturerFirstName
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
        console.error('Error fetching assessments:', err);
        res.status(500).json({ message: 'Failed to fetch assessments' });
    }
}

// POST assessment
async function createAssessment(req, res) {
    const { description } = req.body;
    const lecturerId = req.user?.lecturerId;
    const createdDate = new Date();

    if (!description) {
        return res.status(400).json({ message: 'Description is required' });
    }

    try {
        const result = await getDbRequest()
            .input('description', sql.NVarChar(500), description)
            .input('createdDate', sql.DateTime, createdDate)
            .input('lecturerId', sql.Int, lecturerId)
            .query(`
                INSERT INTO Assessment (description, created_date, lecturer_id)
                VALUES (@description, @createdDate, @lecturerId);
                SELECT SCOPE_IDENTITY() AS assessmentId
            `);

        res.status(201).json({
            message: 'Assessment created successfully',
            assessmentId: result.recordset[0].assessmentId
        });

    } catch (err) {
        console.error('Error creating assessment:', err);
        res.status(500).json({ message: 'Failed to create assessment' });
    }
}

// PUT assessment
async function updateAssessment(req, res) {
    const { description } = req.body;
    const lecturerId = req.user?.lecturerId;
    const assessmentId = req.params.assessmentId;
    const updatedDate = new Date();

    if (!description) {
        return res.status(400).json({ message: 'Description is required' });
    }

    try {
        const result = await getDbRequest()
            .input('assessmentId', sql.Int, assessmentId)
            .input('description', sql.NVarChar(500), description)
            .input('updatedDate', sql.DateTime, updatedDate)
            .input('lecturerId', sql.Int, lecturerId)
            .query(`
                UPDATE Assessment
                SET description = @description, updated_date = @updatedDate
                WHERE assessment_id = @assessmentId AND lecturer_id = @lecturerId
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Assessment not found or unauthorized' });
        }

        res.json({ message: 'Assessment updated successfully' });

    } catch (err) {
        console.error('Error updating assessment:', err);
        res.status(500).json({ message: 'Failed to update assessment' });
    }
}

// DELETE assessment
async function deleteAssessment(req, res) {
    const lecturerId = req.user?.lecturerId;
    const assessmentId = req.params.assessmentId;

    try {
        const result = await getDbRequest()
            .input('assessmentId', sql.Int, assessmentId)
            .input('lecturerId', sql.Int, lecturerId)
            .query(`
                DELETE FROM Assessment
                WHERE assessment_id = @assessmentId AND lecturer_id = @lecturerId
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Assessment not found or unauthorized' });
        }

        res.json({ message: 'Assessment deleted successfully' });

    } catch (err) {
        console.error('Error deleting assessment:', err);
        res.status(500).json({ message: 'Failed to delete assessment' });
    }
}

module.exports = {
    getAssessments,
    createAssessment,
    updateAssessment,
    deleteAssessment
};
