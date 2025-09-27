const sql = require('mssql');
const { getDbRequest } = require('../database');

// Lecturer submits feedback and grading
async function submitFeedback(UserReq, DBresults) {
    const { assessment_id, stud_id, marks, feedback } = UserReq.body;
    const lecturer_id = UserReq.lecturerid;
    const admin_id = 1; // Static admin ID

    if (!lecturer_id) return DBresults.status(403).json({ message: 'Only lecturers can submit feedback' });
    if (!assessment_id || !stud_id || !marks) {
        return DBresults.status(400).json({ message: 'Assessment ID, Student ID, and Marks are required' });
    }

    try {
        await getDbRequest()
            .input('assessment_id', sql.Int, assessment_id)
            .input('stud_id', sql.Int, stud_id)
            .input('lecturer_id', sql.Int, lecturer_id)
            .input('admin_id', sql.Int, admin_id)
            .input('marks', sql.Decimal(5,2), marks)
            .input('feedback', sql.NVarChar(1000), feedback || '')
            .query(`
                INSERT INTO Grading (assessment_id, stud_id, lecturer_id, admin_id, marks, feedback)
                VALUES (@assessment_id, @stud_id, @lecturer_id, @admin_id, @marks, @feedback)
            `);

        DBresults.status(201).json({ message: 'Feedback submitted successfully' });

    } catch (err) {
        console.error("Error submitting feedback:", err);
        DBresults.status(500).json({ message: 'Failed to submit feedback' });
    }
}

// Student views their feedback and grades
async function getStudentFeedback(UserReq, DBresults) {
    const stud_id = UserReq.user?.stud_id;

    if (!stud_id) return DBresults.status(403).json({ message: 'Only students can view feedback' });

    try {
        const result = await getDbRequest()
            .input('stud_id', sql.Int, stud_id)
            .query(`
                SELECT g.marks, g.feedback, a.description AS assessment_title, a.created_date
                FROM Grading g
                JOIN Assessment a ON g.assessment_id = a.assessment_id
                WHERE g.stud_id = @stud_id
                ORDER BY a.created_date DESC
            `);

        DBresults.json({ feedback: result.recordset });

    } catch (err) {
        console.error("Error retrieving feedback:", err);
        DBresults.status(500).json({ message: 'Failed to retrieve feedback' });
    }
}

module.exports = { submitFeedback, getStudentFeedback };
