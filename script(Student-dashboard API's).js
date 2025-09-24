const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const ex = express(); 
ex.use(express.json()); 
const dbConfig = {
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_SERVER,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.Database_port || 1433),
    options: {
        encrypt: true,
        trustServerCertificate: false 
    }
};


let dbPool; 

async function testDbConnection() {
    try {
        dbPool = await sql.connect(dbConfig); 
        console.log("Database connected successfully");
        return dbPool;
    } catch (err) {
        console.error("Database connection failed: ", err);
        throw err;
    }
}

testDbConnection();

function getDbRequest() {
    return dbPool.request();
}

function authenticateToken(UserReq, DBresults, next) {
    const authHeader = UserReq.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // 

    if (!token) return DBresults.status(401).json({ error: 'Access token required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return DBresults.status(403).json({ error: 'Invalid token' });
        UserReq.user = user;
        next();
    });
}

//get student grades
ex.get('student/grades', authenticateToken, async (USerReq, DBresults) => {
    const studentId = USerReq.studentid;

    try {
        let result = await getDbRequest()
        .input('stud_id', sql.Int, studentId)
        .query('SELECT g.marks, g.feedback, a.description AS assignment_title, a.due_date FROM Grading g JOIN Assessment a ON g.assessment_id = a.assessment_id WHERE g.student_id = @stud_id ORDER BY a.due_date DESC');
    
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

ex.get('student/courses', authenticateToken, async(UserReq, DBresults) => {
    let results = await get().input('stud_id', sql.Int, UserReq.studentid).query('SELECT c.course_idd, c.course_name, c.description, c.credits, l.Fname AS lecturer_Fname, l.name AS lecturer_Lname ')
});




