

//get student grades
ex.get('student/grades', authenticateToken, async (USerReq, DBresults) => {
    const studentId = USerReq.studentid;

    try {
        let result = await getDbRequest()
        .input('stud_id', sql.Int, sql.Int, studentId)
        .query('SELECT g.marks, g.feedback, a.description AS assessment_title, a.created_date FROM Grading g JOIN Assessment a ON g.assessment_id = a.assessment_id WHERE g.student_id = @stud_id ORDER BY a.created_date DESC');
    
        if (result.recordset.length === 0) {
            return DBresults.status(404).json({ message: 'No grades found for this student.'});
        }

         DBresults.json({
        message: 'Grades retrieved successfully',
        grades: result.recordset
    });
    }catch (err){
    console.error("Error fetching studdent grades:", err);
    DBresults.status(500).json({ message: 'Failed to retrieve grades' });
}
});;

//add assessment

ex.post('/assessment', authenticateToken, async (UserReq, DBresults) => {
    const description = UserReq.body.description;
    const lecturerId = UserReq.lecturerid;
    const created_date = new Date();

    if(!description){
        return DBresults.status(400).json({ message: 'Assessment Description is required' });
    }

    try {
        let result = await getDbRequest()
        .input('description', sql.NVarChar(255), description)
        .input('created_date', sql.DateTime, created_date)
        .input('lecturer_id', sql.Int, lecturerId)
        .query('INSERT INTO Assessment (description, created_date, lecturer_id) VALUES (@description, @created_date, @lecturer_id); SELECT SCOPE_IDENTITY() AS assessment_id;');

        DBresults.status(201).json({
            message: 'Assessment created successfully',
            assessmentId: result.recordset.assessment_id
        });
    }catch(err){
        console.error("Error creating assessment:", err);
        DBresults.status(500).json({ message: 'Failed to create assessment' });
    }

});


//update assessment
ex.put('/assessment/:id', authenticateToken, async (UserReq, DBresults) => { 
     const description = UserReq.body.description;
    const lecturerId = UserReq.lecturerid;
    const updated_date = new Date();

    if(!description){
        return DBresults.status(400).json({ message: 'Assessment Description is required' });
    }

    try{
        const result = await getDbRequest()
        .input('assessment_id', sql.Int, UserReq.params.id)
        .input('description', sql.NVarChar(255), description)
        .input('updated_date', sql.DateTime, updated_date)
        .input('lecturer_id', sql.Int, lecturerId)
        .query('UPDATE Assessment SET description = @description, updated_date = @updated_date WHERE assessment_id = @assessment_id AND lecturer_id = @lecturer_id');

        if(result.rowsAffected[0] === 0){
            return DBresults.status(404).json({ message: 'Assessment not found or you do not have permission to update it.' });
        }

        DBresults.json({ message: 'Assessment updated successfully' });

    }catch(err) {
        console.error("Error updating assessment:", err);
        DBresults.status(500).json({ message: 'Failed to update assessment' });
    }


});

//delete assessment
ex.delete('/assessment/:id', authenticateToken, async (UserReq, DBresults) => {
    const lecturerId = UserReq.lecturerid;

    try{
        const result = await getDbRequest()
        .input('assessment_id', sql.Int, UserReq.params.id)
        .input('lecturer_id', sql.Int, lecturerId)
        .query('DELETE FROM Assessment WHERE assessment_id = @assessment_id AND lecturer_id = @lecturer_id');

        if (result.rowsAffected[0] === 0){
            return DBresults.status(404).json({ message: 'Assessment not found or you do not have permission to delete it.' });
        }

        DBresults.json({ message: 'Assessment deleted successfully' });
    } catch (err) {
        console.error("Error deleting assessment:", err);
        DBresults.status(500).json({ message: 'Failed to delete assessment' });
    }

});




