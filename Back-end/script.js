const express = require('express');  // Express framework for APIs
const sql = require('mssql');       // Connecting to the SQL Server client
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT tokens
require('dotenv').config(); // Hide our database credentials
const path = require('path'); // Resource kat  
const fs = require('fs');   
const multer = require('multer');//Resource 
const crypto = require('crypto'); //  Resource

const ex = express(); // Initialize express application — Gents, we will be using "ex" to refer to express
ex.use(express.json()); // Allow express to read JSON data
ex.get('/hello', (req, res) => {
    res.send('Hello! Routes are working.');
});

<<<<<<< HEAD
const ex = express(); // Initialize express application — Gents, we will be using "ex" to refer to express
ex.use(express.json()); // Allow express to read JSON data

<<<<<<< HEAD

ex.get('/hello', (UserReq, DBresults) => {
    DBresult.send('Hello! Routes are working.');
});
=======
const path = require('path'); // Resource kat  
const fs = require('fs');   
const multer = require('multer');//Resource 
const crypto = require('crypto'); //  Resource
>>>>>>> e0c0dd0f63e05eb4683b1955fdffe89f132943e7
=======
const path = require('path'); // Resource kat  
const fs = require('fs');   
const multer = require('multer');//Resource 
const crypto = require('crypto'); //Resource
>>>>>>> 3f222adfc1f6ce2b9d051f965fbc5d0cdf118bf9


const cors = require('cors');
ex.use(cors());

// Database Configuration

const dbConfig = {
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_SERVER,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.Database_port || 1433),
    options: {
        encrypt: true,
        trustServerCertificate: false // Change to true for local dev — this is for security reasons
    }
};

// Test & Initialize DB Connection 

let dbPool; // We'll store the pool globally 

async function testDbConnection() {
    try {
        dbPool = await sql.connect(dbConfig); // Create a connection pool to avoid multiple connections
        console.log("Database connected successfully");
        return dbPool;
    } catch (err) {
        console.error("Database connection failed: ", err);
        throw err;
    }
}

// Call the function to test the connection
testDbConnection();


//Helper to get database request
function getDbRequest() {
    return dbPool.request();
}


//Verify JWT Token (Jet Web Token)
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access token required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user; // ✅ Now available as req.user in ALL routes
        next();
    });
}

//================================================= Student API=================================================//
// Registering a Student 
ex.post('/register', async (UserReq, DBresults) => {
    const { Fname, Lname, email, password } = UserReq.body;

    if (!Fname || !Lname || !email || !password) {
        return DBresults.status(400).json({ error: 'All fields are required' });
    }

   
    try {
        // Check if student exists (by email)
        const existing = await getDbRequest()
            .input('email', sql.NVarChar, email)
            .query('SELECT email FROM Student WHERE email = @email');
        if (existing.recordset.length > 0) {
            return DBresults.status(400).json({ error: 'Student already exists' });
        }

        // create student_number: 2-digit sequence and date that uses this format YYYYMMDD
         const today = new Date();
        const datePart = today.getFullYear() + 
                         String(today.getMonth() + 1).padStart(2, '0') + 
                         String(today.getDate()).padStart(2, '0'); 

        // Get next sequence number count of students registered TODAY + 1
        const countResult = await getDbRequest()
            .query(`
                SELECT COUNT(*) AS total 
                FROM Student 
                WHERE registration_date = CAST(GETDATE() AS DATE)
            `);
        const seq = countResult.recordset[0].total + 1;
        const seqPart = String(seq).padStart(2, '0'); 

        const student_number = seqPart + datePart; 

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //insert with student_number as PK
        await getDbRequest()
            .input('student_number', sql.NVarChar, student_number)
            .input('Fname', sql.NVarChar, Fname)
            .input('Lname', sql.NVarChar, Lname)
            .input('email', sql.NVarChar, email)
            .input('hashedPassword', sql.NVarChar, hashedPassword)
            .query(`
                INSERT INTO Student (student_number, Fname, Lname, email, password)
                VALUES (@student_number, @Fname, @Lname, @email, @hashedPassword)
            `);


        // Return student_number and this will be the students login username
        DBresults.status(201).json({ 
            message: 'Registered successfully',
            student_number 
        });

    } catch (err) {
        console.error("Error registering user: ", err);
        DBresults.status(500).json({ error: 'Failed to register user' });
    }
});

//User login but as a Student 
ex.post('/login', async (UserReq, DBresults) => {
    const { student_number, password } = UserReq.body; 

    if (!student_number || !password) {
        return DBresults.status(400).json({ error: 'Student number and password required' });
    }

    try {
        // Find student by student_number
        let result = await getDbRequest()
            .input('student_number', sql.NVarChar, student_number)
            .query('SELECT * FROM Student WHERE student_number = @student_number');

        const student = result.recordset[0];
        if (!student) {
            return DBresults.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return DBresults.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token and the student_number is now included in the payload
        // This will help us identify the student in protected routes
        const token = jwt.sign(
            { 
                student_number: student.student_number, 
                email: student.email 
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Remove password from response 
        const { password: _, ...studentInfo } = student; 

        DBresults.json({
            message: 'Login successful',
            token,
            student: studentInfo 
        });

    } catch (err) {
        console.error("Error during login: ", err);
        DBresults.status(500).json({ error: 'Login failed' });
    }
});

// Forgot password: Student
ex.post('/forgotPassword', async (UserReq, DBresults) => {
    const { email, studentNumber, newPassword } = UserReq.body;

    if (!email || !studentNumber || !newPassword) {
        return DBresults.status(400).json({ error: 'Email, student number, and new password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const request = getDbRequest();
        const result = await request
            .input('email', sql.NVarChar, email)
            .input('studentNumber', sql.NVarChar, studentNumber) // or sql.Int if it's numeric
            .input('hashedPassword', sql.NVarChar, hashedPassword)
            .query(`
                UPDATE Student 
                SET password = @hashedPassword 
                WHERE email = @email 
                AND student_number = @studentNumber
            `);

        if (result.rowsAffected[0] > 0) {
            DBresults.status(200).json({ message: 'Password updated successfully!' });
        } else {
            DBresults.status(404).json({ 
                error: 'No account found with the provided email and student number.' 
            });
        }
    } catch (err) {
        console.error("Error updating password:", err);
        DBresults.status(500).json({ error: 'Failed to update password. Please try again later.' });
    }
});


//  Get the profile of the student 
ex.get('/profile/:student_number', async (UserReq, DBresults) => {
    const { student_number } = UserReq.params;
    try {
        let result = await getDbRequest()
            .input('student_number', sql.NVarChar, student_number)
            .query('SELECT Fname, Lname, email, student_number FROM Student WHERE student_number = @student_number');

        if (result.recordset.length === 0) {
            return DBresults.status(404).json({ error: 'Student not found' });
        }

        DBresults.json(result.recordset[0]);

    } catch (err) {
        console.error("Error fetching profile: ", err);
        DBresults.status(500).json({ error: 'Failed to fetch profile' });
    }
});


// Update user profile 
ex.put('/UpdateProfile/:student_number', async (UserReq, DBresults) => {
    const { student_number } = UserReq.params;
    const { Fname, Lname, email, newPassword } = UserReq.body;

    try {
        let request = getDbRequest()
            .input('student_number', sql.NVarChar, student_number);

        let updates = [];
        if (Fname) {
            updates.push('Fname = @Fname');
            request.input('Fname', sql.NVarChar, Fname);
        }
        if (Lname) {
            updates.push('Lname = @Lname');
            request.input('Lname', sql.NVarChar, Lname);
        }
        if (email) {
            updates.push('email = @email');
            request.input('email', sql.NVarChar, email);
        }
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updates.push('password = @hashedPassword');
            request.input('hashedPassword', sql.NVarChar, hashedPassword);
        }

        if (updates.length === 0) {
            return DBresults.status(400).json({ error: 'No fields to update' });
        }

        const query = `UPDATE Student SET ${updates.join(', ')} WHERE student_number = @student_number`;
        let result = await request.query(query);

        if (result.rowsAffected[0] > 0) {
            DBresults.json({ message: 'Profile updated successfully' });
        } else {
            DBresults.status(404).json({ error: 'Student not found or no changes made' });
        }
            
    } catch (err) {
        console.error("Failed to update profile: ", err);
        DBresults.status(500).json({ error: 'Failed to update profile' });
    }
});

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
//================================================= End of student API=================================================//


//================================================= Admin API=================================================//

//Admin login but they dont need to register they just login 
ex.post('/login/admin', async (UserReq, DBresults) => {
    const { email, password } = UserReq.body;

    if (!email || !password) {
        return DBresults.status(400).json({ error: 'Email and password required' });
    }

    try {
        let result = await getDbRequest()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Admin WHERE email = @email');

        const admin = result.recordset[0];
        if (!admin) {
            return DBresults.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return DBresults.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { admin_id: admin.admin_id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } //Token duration 
        );

        const { password: _, ...adminInfo } = admin;

        DBresults.json({
            message: 'Admin login successful',
            token,
            admin: adminInfo
        });

    } catch (err) {
        console.error("Error during admin login: ", err);
        DBresults.status(500).json({ error: 'Login failed' });
    }
});

//create new student or lecturer
ex.post('/create-user', authenticateToken, async (UserReq, DBresults) => {
    const { role, Fname, Lname, email, password } = UserReq.body;

    if (!role || !Fname || !Lname || !email || !password) {
        return DBresults.status(400).json({ message: 'All required fields must be provided' });
    }

    let query;
    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 10);

        if (role.toLowerCase() === 'student') {
            query = 'INSERT INTO Student (stud_Fname, stud_Lname, email, password) VALUES (@Fname, @Lname, @email, @password)';
        } else if (role.toLowerCase() === 'lecturer') {
            query = 'INSERT INTO Lecturer (Fname, Lname, email, password) VALUES (@Fname, @Lname, @email, @password)';
        } else {
            return DBresults.status(400).json({ message: 'Invalid role specified. Must be either "student" or "lecturer".' });
        }

        await getDbRequest()
            .input('Fname', sql.NVarChar(30), Fname)
            .input('Lname', sql.NVarChar(30), Lname)
            .input('email', sql.NVarChar(50), email)
            .input('password', sql.NVarChar(255), hashedPassword)
            .query(query);

        DBresults.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error creating user:', { role }, err);

        if (err.message.includes('Violation of UNIQUE KEY constraint')) {
            return DBresults.status(409).json({ message: 'Email already in use' });
        }
        DBresults.status(500).json({ message: 'Failed to create user account' });
    }
});

//delete user
ex.delete('/user/:id', authenticateToken, async (UserReq, DBresults) => {
    const {role, id} = UserReq.params;
    const table = '';

    try {
        if (role.toLowerCase() === 'student') {
            table = 'Student';
            const result = await getDbRequest()
            .input('student_id', sql.Int, id)
            .query('DELETE FROM Student WHERE stud_id = @student_id');
        }
        else if (role.toLowerCase() === 'lecturer') {
            table = 'Lecturer';
            const result = await getDbRequest()
            .input('lecturer_id', sql.Int, id)
            .query('DELETE FROM Lecturer WHERE lecturer_id = @lecturer_id');
        }else{
            return DBresults.status(400).json({ message: 'Invalid role specified. Must be either "student" or "lecturer".' });
        }

        const result = await getDbRequest().input('id', sql.Int, id).query('DELETE FROM ' + table + ' WHERE id = @id');

        if (result.rowsAffected[0] === 0) {
            return DBresults.status(404).json({ message: 'User '+ id + ' not found' });
        }
        DBresults.json({ message: 'User '+ id + ' deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', { role, id }, err);
        DBresults.status(500).json({ message: 'Failed to delete user' });
    }
});


//================================================= Lecture API=================================================//

// Lecture login same with admin no need to register
ex.post('/login/lecturer', async (UserReq, DBresults) => {
    const { email, password } = UserReq.body;
    if (!email || !password) {
        return DBresults.status(400).json({ error: 'Email and password required' });
    }
    try {
        let result = await getDbRequest()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Lecturer WHERE email = @email');

        const lecturer = result.recordset[0];
        if (!lecturer) {
            return DBresults.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, lecturer.password);
        if (!isMatch) {
            return DBresults.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { lecturer_id: lecturer.lecturer_id, email: lecturer.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } //Token duration
        );

        const { password: _, ...lecturerInfo } = lecturer;

        DBresults.json({
            message: 'Lecturer login successful',
            token,
            lecturer: lecturerInfo
        });

    } catch (err) {
        console.error("Error during lecturer login: ", err);
        DBresults.status(500).json({ error: 'Login failed' });
    }
});

// Lectuer-dashboard (get lecturer profile)
ex.get('/lecturer/:id', authenticateToken, async (UserReq, DBresults) => {
    const lecturerId = UserReq.params.id; //input for lecturer id

    try {
        let result = await getDbRequest() //wait for db request and store in result
            .input('lecturer_id', sql.Int, lecturerId)
            .query('SELECT lecturer_id, Fname, email FROM Lecturer WHERE lecturer_id = @lecturer_id');

        if (result.recordset.length === 0) {
            return DBresults.status(404).json({ error: 'Lecturer not found' });
        }

        DBresults.json({
            message: 'Lecturer profile retrieved',
            lecturer: result.recordset[0]
        });

    } catch (err) {
        console.error(`Error fetching lecturer profile:`, err);
        DBresults.status(500).json({ error: 'Failed to retrieve lecturer profile' });
    }
});


// Get all resources (for lectuer dashboard)
ex.get('/resources', authenticateToken, async (UserReq, DBresults) => {
    try {
        let result = await getDbRequest()
            .query('SELECT resource_id, resource_name, description, url, date FROM Resource');

        DBresults.json({
            message: 'Resources retrieved successfully',
            resources: result.recordset
        });

    } catch (err) {
        console.error(`Error fetching resources:`, err);
        DBresults.status(500).json({ error: 'Failed to retrieve resources' });
    }
});


// Upload a new resource (for lecturer)
ex.post('/resources', authenticateToken, async (UserReq, DBresults) => {
    const { resource_name, description, url } = UserReq.body;

    if (!resource_name || !url) {
        return DBresults.status(400).json({ error: 'Resource name and URL are required' });
    }

    try {
        await getDbRequest()
            .input('resource_name', sql.NVarChar, resource_name)
            .input('description', sql.NVarChar, description || '')
            .input('url', sql.NVarChar, url)
            .query(`
                INSERT INTO Resource (resource_name, description, url)
                VALUES (@resource_name, @description, @url)
            `);

        DBresults.status(201).json({ message: 'Resource uploaded successfully' });

    } catch (err) {
        console.error(` Error uploading resource:`, err);
        DBresults.status(500).json({ error: 'Failed to upload resource' });
    }
});

// Delete a resource (for lecturer)
ex.delete('/resources/:id', authenticateToken, async (UserReq, DBresults) => {
    const resourceId = UserReq.params.id;

    try {
        let result = await getDbRequest()
            .input('resource_id', sql.Int, resourceId)
            .query('DELETE FROM Resource WHERE resource_id = @resource_id');

        if (result.rowsAffected[0] === 0) {
            return DBresults.status(404).json({ error: 'Resource not found or already deleted' });
        }

        DBresults.json({ message: `Resource with ID ${resourceId} deleted successfully` });

    } catch (err) {
        console.error(` Error deleting resource:`, err);
        DBresults.status(500).json({ error: 'Failed to delete resource' });
    }
});

// Get grades for a lecturer's students (Overview)
ex.get('/lecturer/:id/grades', authenticateToken, async (UserReq, DBresults) => {
    const lecturerId = UserReq.params.id;
    try {
        const result = await getDbRequest()
            .input('lecturer_id', sql.Int, lecturerId)
            .query(`
                SELECT g.grade_id, s.Fname + ' ' + s.Lname AS student_name,
                       a.description AS assessment_title, g.marks, g.feedback
                FROM Grading g
                JOIN Student s ON g.stud_id = s.stud_id
                JOIN Assessment a ON g.assessment_id = a.assessment_id
                WHERE g.lecturer_id = @lecturer_id
                ORDER BY g.grade_id DESC
            `);

        DBresults.json({
            message: 'Grades retrieved successfully',
            grades: result.recordset
        });

    } catch (err) {
        console.error(` Error fetching grades:`, err);
        DBresults.status(500).json({ error: 'Failed to retrieve grades' });
    }
});


//================================================= END Lecture API=================================================//
<<<<<<< HEAD



//================================================= End of Admin API=================================================//



=======
>>>>>>> e0c0dd0f63e05eb4683b1955fdffe89f132943e7
//================================================= ASSESSMENT API=================================================//

// POST: Create assessment — Admins only
ex.post('/assessment', authenticateToken, async (UserReq, DBresults) => {
    if (!UserReq.user.admin_id) {
        return DBresults.status(403).json({ message: 'Only admins can create assessments' });
    }

    const { description, lecturer_id } = UserReq.body;
    if (!description || !lecturer_id) {
        return DBresults.status(400).json({ message: 'Description and lecturer_id are required' });
    }

    try {
        const result = await getDbRequest()
            .input('description', sql.NVarChar(255), description)
            .input('created_date', sql.DateTime, new Date())
            .input('lecturer_id', sql.Int, lecturer_id)
            .query(`
                INSERT INTO Assessment (description, created_date, lecturer_id) 
                OUTPUT INSERTED.assessment_id
                VALUES (@description, @created_date, @lecturer_id)
            `);

        DBresults.status(201).json({
            message: 'Assessment created successfully',
            assessmentId: result.recordset[0].assessment_id
        });
    } catch (err) {
        console.error("Error creating assessment:", err);
        DBresults.status(500).json({ message: 'Failed to create assessment' });
    }
});

// PUT: Update assessment — Admins only
ex.put('/assessment/:id', authenticateToken, async (UserReq, DBresults) => {
    if (!UserReq.user.admin_id) {
        return DBresults.status(403).json({ message: 'Only admins can update assessments' });
    }

    const { description } = UserReq.body;
    const { id } = UserReq.params;

    if (!description) {
        return DBresults.status(400).json({ message: 'Assessment description is required' });
    }

    try {
        const result = await getDbRequest()
            .input('assessment_id', sql.Int, id)
            .input('description', sql.NVarChar(255), description)
            .query(`
                UPDATE Assessment 
                SET description = @description, updated_date = GETDATE() 
                WHERE assessment_id = @assessment_id
            `);

        if (result.rowsAffected[0] === 0) {
            return DBresults.status(404).json({ message: 'Assessment not found' });
        }
        DBresults.json({ message: 'Assessment updated successfully' });
    } catch (err) {
        console.error("Error updating assessment:", err);
        DBresults.status(500).json({ message: 'Failed to update assessment' });
    }
});

// DELETE: Delete assessment — Admins only
ex.delete('/assessment/:id', authenticateToken, async (UserReq, DBresults) => {
    if (!UserReq.user.admin_id) {
        return DBresults.status(403).json({ message: 'Only admins can delete assessments' });
    }

    const { id } = UserReq.params;

    try {
        const result = await getDbRequest()
            .input('assessment_id', sql.Int, id)
            .query('DELETE FROM Assessment WHERE assessment_id = @assessment_id');

        if (result.rowsAffected[0] === 0) {
            return DBresults.status(404).json({ message: 'Assessment not found' });
        }
        DBresults.json({ message: 'Assessment deleted successfully' });
    } catch (err) {
        console.error("Error deleting assessment:", err);
        DBresults.status(500).json({ message: 'Failed to delete assessment' });
    }
});

//================================================= END OF ASSESSMENT API=================================================//

//================================================= ANSWER API =================================================//
ex.post('/answer/:questionId', authenticateToken, async (UserReq, DBresults) => {
    const answerDescription = UserReq.body.answerDescription;
    const questionId = UserReq.params.questionId;
    const studentId = UserReq.user?.studentId;

    if (!studentId) {
        return DBresults.status(403).json({ message: 'Only students can submit answers' });
    }

    if (!answerDescription) {
        return DBresults.status(400).json({ message: 'Answer description is required' });
    }

    try {
        await getDbRequest()
            .input('question_id', sql.Int, questionId)
            .input('ans_description', sql.NVarChar(1000), answerDescription)
            .input('student_id', sql.Int, studentId)
            .query('INSERT INTO Answer (question_id, ans_description, student_id) VALUES (@question_id, @ans_description, @student_id)');

        DBresults.status(201).json({ message: 'Answer submitted successfully' });
    } catch (err) {
        console.error("Error submitting answer:", err);
        DBresults.status(500).json({ message: 'Failed to submit answer' });
    }
});
//================================================= END OF ANSWER API ==========================================//


//================================================= FEEDBACK API=================================================//

ex.post('/feedback', authenticateToken, async (UserReq, DBresults) => {
    const { feedbackText, grade, assessmentId, studentId } = UserReq.body;
    const lecturerId = UserReq.lecturerid;

    if (!lecturerId) {
        return DBresults.status(403).json({ message: 'Only lecturers can submit feedback' });
    }

    if (!feedbackText || !grade || !assessmentId || !studentId) {
        return DBresults.status(400).json({ message: 'All fields are required' });
    }

    try {
        await getDbRequest()
            .input('feedback_text', sql.NVarChar(1000), feedbackText)
            .input('grade', sql.Int, grade)
            .input('assessment_id', sql.Int, assessmentId)
            .input('student_id', sql.Int, studentId)
            .input('lecturer_id', sql.Int, lecturerId)
            .query('INSERT INTO Feedback (feedback_text, grade, assessment_id, student_id, lecturer_id) VALUES (@feedback_text, @grade, @assessment_id, @student_id, @lecturer_id)');

        DBresults.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (err) {
        console.error("Error submitting feedback:", err);
        DBresults.status(500).json({ message: 'Failed to submit feedback' });
    }
});

ex.get('/feedback', authenticateToken, async (UserReq, DBresults) => {
    const studentId = UserReq.user?.studentId;

    if (!studentId) {
        return DBresults.status(403).json({ message: 'Only students can view feedback' });
    }

    try {
        const result = await getDbRequest()
            .input('student_id', sql.Int, studentId)
            .query('SELECT feedback_text, grade, assessment_id FROM Feedback WHERE student_id = @student_id');

        DBresults.json({ feedback: result.recordset });
    } catch (err) {
        console.error("Error fetching feedback:", err);
        DBresults.status(500).json({ message: 'Failed to fetch feedback' });
    }
});

//================================================= END OF FEEDBACK API=================================================//

//================================================= QUESTION API ===============================================//
ex.get('/question/:assessmentId', authenticateToken, async (UserReq, DBresults) => {
    const assessmentId = UserReq.params.assessmentId;

    try {
        const result = await getDbRequest()
            .input('assessment_id', sql.Int, assessmentId)
            .query('SELECT question_id, description FROM Question WHERE assessment_id = @assessment_id');

        DBresults.json({ questions: result.recordset });
    } catch (err) {
        console.error("Error fetching questions:", err);
        DBresults.status(500).json({ message: 'Failed to fetch questions' });
    }
});

ex.post('/question/:assessmentId', authenticateToken, async (UserReq, DBresults) => {
    // ✅ Only admins can add questions
    if (!UserReq.user.admin_id) {
        return DBresults.status(403).json({ message: 'Only admins can add questions' });
    }

    const { description } = UserReq.body;
    const { assessmentId } = UserReq.params;

    if (!description) {
        return DBresults.status(400).json({ message: 'Question description is required' });
    }

    try {
        await getDbRequest()
            .input('assessment_id', sql.Int, assessmentId)
            .input('description', sql.NVarChar(1000), description)
            .query('INSERT INTO Question (assessment_id, description) VALUES (@assessment_id, @description)');
        
        DBresults.status(201).json({ message: 'Question added successfully' });
    } catch (err) {
        console.error("Error adding question:", err);
        DBresults.status(500).json({ message: 'Failed to add question' });
    }
});

//================================================= END OF QUESTION API=================================================//
// Home route uses authenticate middleware

ex.get('/home', authenticateToken, (UserReq, DBresults) => {
    DBresults.json({
        message: `Welcome back, user ID: ${UserReq.user.stud_id || UserReq.user.admin_id || UserReq.user.lecturer_id}!`,
        status: 'success'
    });
});

// ==================== Resource API with File Upload ===================
// ex.post('/test-upload', (req, res) => {
//     res.json({ ok: true, message: 'Route is working!' });
// });
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
<<<<<<< HEAD
=======

// Multer storage config (uses 'req' internally — that's OK, Multer controls it)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(8).toString('hex');
        cb(null, `resource-${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|txt|mp4|zip/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images, PDFs, docs, text, MP4, and ZIP files are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }
});

// Public: Get all resources
ex.get("/resources", async (UserReq, DBresults) => {
    try {
        const result = await getDbRequest().query('SELECT * FROM Resource');
        DBresults.json(result.recordset);
    } catch (err) {
        console.error("Error fetching resources:", err);
        DBresults.status(500).json({ error: 'Failed to fetch resources' });
    }
});

// Public: Get resource by ID
ex.get("/resources/:id", async (UserReq, DBresults) => {
    const id = parseInt(UserReq.params.id);
    if (isNaN(id)) return DBresults.status(400).json({ error: "Invalid ID" });

    try {
        const result = await getDbRequest()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Resource WHERE resource_id = @id');
        if (result.recordset.length === 0) {
            return DBresults.status(404).json({ error: "Resource not found" });
        }
        DBresults.json(result.recordset[0]);
    } catch (err) {
        console.error("Error fetching resource:", err);
        DBresults.status(500).json({ error: 'Failed to fetch resource' });
    }
});

// Protected: Upload a file and create a resource (Admin or Lecturer)
ex.post("/resources/upload", authenticateToken, upload.single('file'), async (UserReq, DBresults) => {
    if (!UserReq.user.admin_id && !UserReq.user.lecturer_id) {
        if (UserReq.file) fs.unlinkSync(UserReq.file.path);
        return DBresults.status(403).json({ error: 'Only admins or lecturers can upload resources' });
    }

    const { resource_name, description } = UserReq.body;
    if (!resource_name) {
        if (UserReq.file) fs.unlinkSync(UserReq.file.path);
        return DBresults.status(400).json({ error: 'resource_name is required' });
    }

    try {
        const filename = UserReq.file?.filename;
        const url = filename ? `/resources/file/${filename}` : null;

        const result = await getDbRequest()
            .input('name', sql.NVarChar, resource_name)
            .input('desc', sql.NVarChar, description || null)
            .input('url', sql.NVarChar, url)
            .input('date', sql.DateTime, new Date())
            .query(`
                INSERT INTO Resource (resource_name, description, url, date)
                OUTPUT INSERTED.*
                VALUES (@name, @desc, @url, @date)
            `);

        DBresults.status(201).json({
            ...result.recordset[0],
            message: "Resource uploaded successfully"
        });

    } catch (err) {
        if (UserReq.file) fs.unlinkSync(UserReq.file.path);
        console.error("Upload error:", err);
        DBresults.status(500).json({ error: 'Failed to save resource' });
    }
});

// Protected: Create resource WITHOUT file
ex.post("/resources", authenticateToken, async (UserReq, DBresults) => {
    if (!UserReq.user.admin_id && !UserReq.user.lecturer_id) {
        return DBresults.status(403).json({ error: 'Admin or lecturer access required' });
    }

    const { resource_name, description, url } = UserReq.body;
    if (!resource_name) {
        return DBresults.status(400).json({ error: 'resource_name is required' });
    }

    try {
        const result = await getDbRequest()
            .input('name', sql.NVarChar, resource_name)
            .input('desc', sql.NVarChar, description || null)
            .input('url', sql.NVarChar, url || null)
            .input('date', sql.DateTime, new Date())
            .query(`
                INSERT INTO Resource (resource_name, description, url, date)
                OUTPUT INSERTED.*
                VALUES (@name, @desc, @url, @date)
            `);
        DBresults.status(201).json({ ...result.recordset[0], message: "Resource created successfully" });
    } catch (err) {
        console.error("Error creating resource:", err);
        DBresults.status(500).json({ error: 'Failed to create resource' });
    }
});

// Protected: Update resource
ex.put("/resources/:id", authenticateToken, async (UserReq, DBresults) => {
    if (!UserReq.user.admin_id && !UserReq.user.lecturer_id) {
        return DBresults.status(403).json({ error: 'Admin or lecturer access required' });
    }

    const id = parseInt(UserReq.params.id);
    if (isNaN(id)) return DBresults.status(400).json({ error: "Invalid ID" });

    const { resource_name, description, url } = UserReq.body;
    if (!resource_name) return DBresults.status(400).json({ error: 'resource_name is required' });

    try {
        const result = await getDbRequest()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar, resource_name)
            .input('desc', sql.NVarChar, description || null)
            .input('url', sql.NVarChar, url || null)
            .query(`
                UPDATE Resource
                SET resource_name = @name,
                    description = @desc,
                    url = @url
                WHERE resource_id = @id;

                SELECT * FROM Resource WHERE resource_id = @id;
            `);

        if (result.recordset.length === 0) {
            return DBresults.status(404).json({ error: "Resource not found" });
        }
        DBresults.json({ ...result.recordset[0], message: "Resource updated successfully" });
    } catch (err) {
        console.error("Error updating resource:", err);
        DBresults.status(500).json({ error: 'Failed to update resource' });
    }
});

// Protected: Delete resource (and file if exists)
ex.delete("/resources/:id", authenticateToken, async (UserReq, DBresults) => {
    if (!UserReq.user.admin_id && !UserReq.user.lecturer_id) {
        return DBresults.status(403).json({ error: 'Admin or lecturer access required' });
    }

    const id = parseInt(UserReq.params.id);
    if (isNaN(id)) return DBresults.status(400).json({ error: "Invalid ID" });

    try {
        const existing = await getDbRequest()
            .input('id', sql.Int, id)
            .query('SELECT url FROM Resource WHERE resource_id = @id');

        if (existing.recordset.length === 0) {
            return DBresults.status(404).json({ error: "Resource not found" });
        }

        const url = existing.recordset[0].url;
        if (url && url.startsWith('/resources/file/')) {
            const filename = path.basename(url);
            const filePath = path.join(uploadDir, filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        const result = await getDbRequest()
            .input('id', sql.Int, id)
            .query('DELETE FROM Resource WHERE resource_id = @id');

        DBresults.json({ message: "Resource deleted successfully" });
    } catch (err) {
        console.error("Error deleting resource:", err);
        DBresults.status(500).json({ error: 'Failed to delete resource' });
    }
});

// Protected: Download file
ex.get("/resources/file/:filename", authenticateToken, (UserReq, DBresults) => {
    const filename = UserReq.params.filename;
    if (filename.includes('..') || filename.includes('/')) {
        return DBresults.status(400).json({ error: 'Invalid filename' });
    }

    const filePath = path.join(uploadDir, filename);
    if (!fs.existsSync(filePath)) {
        return DBresults.status(404).json({ error: "File not found" });
    }
    DBresults.download(filePath);
});
//===============end of resourceAPI====================================================

>>>>>>> 3f222adfc1f6ce2b9d051f965fbc5d0cdf118bf9

// Multer storage config (uses 'req' internally — that's OK, Multer controls it)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(8).toString('hex');
        cb(null, `resource-${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|txt|mp4|zip/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images, PDFs, docs, text, MP4, and ZIP files are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }
});

// Public: Get all resources
ex.get("/resources", async (UserReq, DBresults) => {
    try {
        const result = await getDbRequest().query('SELECT * FROM Resource');
        DBresults.json(result.recordset);
    } catch (err) {
        console.error("Error fetching resources:", err);
        DBresults.status(500).json({ error: 'Failed to fetch resources' });
    }
});

// Public: Get resource by ID
ex.get("/resources/:id", async (UserReq, DBresults) => {
    const id = parseInt(UserReq.params.id);
    if (isNaN(id)) return DBresults.status(400).json({ error: "Invalid ID" });

    try {
        const result = await getDbRequest()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Resource WHERE resource_id = @id');
        if (result.recordset.length === 0) {
            return DBresults.status(404).json({ error: "Resource not found" });
        }
        DBresults.json(result.recordset[0]);
    } catch (err) {
        console.error("Error fetching resource:", err);
        DBresults.status(500).json({ error: 'Failed to fetch resource' });
    }
});

// Protected: Upload a file and create a resource (Admin or Lecturer)
ex.post("/resources/upload", authenticateToken, upload.single('file'), async (UserReq, DBresults) => {
    if (!UserReq.user.admin_id && !UserReq.user.lecturer_id) {
        if (UserReq.file) fs.unlinkSync(UserReq.file.path);
        return DBresults.status(403).json({ error: 'Only admins or lecturers can upload resources' });
    }

    const { resource_name, description } = UserReq.body;
    if (!resource_name) {
        if (UserReq.file) fs.unlinkSync(UserReq.file.path);
        return DBresults.status(400).json({ error: 'resource_name is required' });
    }

    try {
        const filename = UserReq.file?.filename;
        const url = filename ? `/resources/file/${filename}` : null;

        const result = await getDbRequest()
            .input('name', sql.NVarChar, resource_name)
            .input('desc', sql.NVarChar, description || null)
            .input('url', sql.NVarChar, url)
            .input('date', sql.DateTime, new Date())
            .query(`
                INSERT INTO Resource (resource_name, description, url, date)
                OUTPUT INSERTED.*
                VALUES (@name, @desc, @url, @date)
            `);

        DBresults.status(201).json({
            ...result.recordset[0],
            message: "Resource uploaded successfully"
        });

    } catch (err) {
        if (UserReq.file) fs.unlinkSync(UserReq.file.path);
        console.error("Upload error:", err);
        DBresults.status(500).json({ error: 'Failed to save resource' });
    }
});

// Protected: Create resource WITHOUT file
ex.post("/resources", authenticateToken, async (UserReq, DBresults) => {
    if (!UserReq.user.admin_id && !UserReq.user.lecturer_id) {
        return DBresults.status(403).json({ error: 'Admin or lecturer access required' });
    }

    const { resource_name, description, url } = UserReq.body;
    if (!resource_name) {
        return DBresults.status(400).json({ error: 'resource_name is required' });
    }

    try {
        const result = await getDbRequest()
            .input('name', sql.NVarChar, resource_name)
            .input('desc', sql.NVarChar, description || null)
            .input('url', sql.NVarChar, url || null)
            .input('date', sql.DateTime, new Date())
            .query(`
                INSERT INTO Resource (resource_name, description, url, date)
                OUTPUT INSERTED.*
                VALUES (@name, @desc, @url, @date)
            `);
        DBresults.status(201).json({ ...result.recordset[0], message: "Resource created successfully" });
    } catch (err) {
        console.error("Error creating resource:", err);
        DBresults.status(500).json({ error: 'Failed to create resource' });
    }
});

// Protected: Update resource
ex.put("/resources/:id", authenticateToken, async (UserReq, DBresults) => {
    if (!UserReq.user.admin_id && !UserReq.user.lecturer_id) {
        return DBresults.status(403).json({ error: 'Admin or lecturer access required' });
    }

    const id = parseInt(UserReq.params.id);
    if (isNaN(id)) return DBresults.status(400).json({ error: "Invalid ID" });

    const { resource_name, description, url } = UserReq.body;
    if (!resource_name) return DBresults.status(400).json({ error: 'resource_name is required' });

    try {
        const result = await getDbRequest()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar, resource_name)
            .input('desc', sql.NVarChar, description || null)
            .input('url', sql.NVarChar, url || null)
            .query(`
                UPDATE Resource
                SET resource_name = @name,
                    description = @desc,
                    url = @url
                WHERE resource_id = @id;

                SELECT * FROM Resource WHERE resource_id = @id;
            `);

        if (result.recordset.length === 0) {
            return DBresults.status(404).json({ error: "Resource not found" });
        }
        DBresults.json({ ...result.recordset[0], message: "Resource updated successfully" });
    } catch (err) {
        console.error("Error updating resource:", err);
        DBresults.status(500).json({ error: 'Failed to update resource' });
    }
});

// Protected: Delete resource (and file if exists)
ex.delete("/resources/:id", authenticateToken, async (UserReq, DBresults) => {
    if (!UserReq.user.admin_id && !UserReq.user.lecturer_id) {
        return DBresults.status(403).json({ error: 'Admin or lecturer access required' });
    }

    const id = parseInt(UserReq.params.id);
    if (isNaN(id)) return DBresults.status(400).json({ error: "Invalid ID" });

    try {
        const existing = await getDbRequest()
            .input('id', sql.Int, id)
            .query('SELECT url FROM Resource WHERE resource_id = @id');

        if (existing.recordset.length === 0) {
            return DBresults.status(404).json({ error: "Resource not found" });
        }

        const url = existing.recordset[0].url;
        if (url && url.startsWith('/resources/file/')) {
            const filename = path.basename(url);
            const filePath = path.join(uploadDir, filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        const result = await getDbRequest()
            .input('id', sql.Int, id)
            .query('DELETE FROM Resource WHERE resource_id = @id');

        DBresults.json({ message: "Resource deleted successfully" });
    } catch (err) {
        console.error("Error deleting resource:", err);
        DBresults.status(500).json({ error: 'Failed to delete resource' });
    }
});

// Protected: Download file
ex.get("/resources/file/:filename", authenticateToken, (UserReq, DBresults) => {
    const filename = UserReq.params.filename;
    if (filename.includes('..') || filename.includes('/')) {
        return DBresults.status(400).json({ error: 'Invalid filename' });
    }

    const filePath = path.join(uploadDir, filename);
    if (!fs.existsSync(filePath)) {
        return DBresults.status(404).json({ error: "File not found" });
    }
    DBresults.download(filePath);
});
//===============end of resourceAPI====================================================





ex.use((req, res) => {
  console.log(`Unhandled route: ${req.method} ${req.url}`);
  res.status(404).send('Big Error: Route not found');
});
// start server 
const PORT = process.env.PORT || 5000;
testDbConnection()
  .then(() => {
    ex.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);

      

        

    });
  })
  .catch(err => {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  });

