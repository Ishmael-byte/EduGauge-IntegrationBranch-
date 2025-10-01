const express = require('express');  // Express framework for APIs
const sql = require('mssql');       // Connecting to the SQL Server client
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT tokens
require('dotenv').config();         // Hide our database credentials

const ex = express(); // Initialize express application — Gents, we will be using "ex" to refer to express
ex.use(express.json()); // Allow express to read JSON data

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
function authenticateToken(UserReq, DBresults, next) {
    const authHeader = UserReq.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

    if (!token) return DBresults.status(401).json({ error: 'Access token required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return DBresults.status(403).json({ error: 'Invalid token' });
        UserReq.user = user;
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
    const { email, newPassword } = UserReq.body;
    if (!email || !newPassword) {
        return DBresults.status(400).json({ error: 'Email and new password required' });
    }
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        let result = await getDbRequest()
            .input('email', sql.NVarChar, email)
            .input('hashedPassword', sql.NVarChar, hashedPassword)
            .query('UPDATE Student SET password = @hashedPassword WHERE email = @email');

        if (result.rowsAffected[0] > 0) {
            DBresults.status(200).json({ message: 'Password updated successfully' });
        } else {
            DBresults.status(404).json({ error: 'Email not found' });
        }
    } catch (err) {
        console.error("Error updating password: ", err);
        DBresults.status(500).json({ error: 'Failed to update password' });
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

//================================================= End of Admin API=================================================//


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


// Get at-risk students (average marks below 50)
ex.get('/at-risk', authenticateToken, async (UserReq, DBresults) => {
    try {
        let result = await getDbRequest()
            .query(`
                SELECT s.stud_id, s.Fname, s.Lname, AVG(g.marks) AS avg_marks
                FROM Student s
                JOIN Grading g ON s.stud_id = g.stud_id
                GROUP BY s.stud_id, s.Fname, s.Lname
                HAVING AVG(g.marks) < 50
            `);

        DBresults.json({
            message: 'At-risk students retrieved',
            atRiskStudents: result.recordset
        });

    } catch (err) {
        console.error(`Error fetching at-risk students:`, err);
        DBresults.status(500).json({ error: 'Failed to retrieve at-risk data' });
    }
});


// Get student risk profile (detailed)
ex.get('/students/:id/risk-profile', authenticateToken, async (UserReq, DBresults) => {
    const studentId = UserReq.params.id;

    try {
        let result = await getDbRequest()
            .input('stud_id', sql.Int, studentId)
            .query(`
                SELECT s.stud_id, s.Fname, s.Lname, s.email,
                       AVG(g.marks) AS avg_marks,
                       COUNT(g.grade_id) AS total_assessments,
                       MAX(g.feedback) AS latest_feedback
                FROM Student s
                LEFT JOIN Grading g ON s.stud_id = g.stud_id
                WHERE s.stud_id = @stud_id
                GROUP BY s.stud_id, s.Fname, s.Lname, s.email
            `);

        if (result.recordset.length === 0) {
            return DBresults.status(404).json({ error: 'Student not found or no grading data' });
        }

        DBresults.json({
            message: 'Risk profile retrieved',
            profile: result.recordset[0]
        });

    } catch (err) {
        console.error(`Error fetching risk profile:`, err);
        DBresults.status(500).json({ error: 'Failed to retrieve risk profile' });
    }
});


//================================================= END Lecture API=================================================//


//================================================= ASSESSMENT API=================================================//
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

//================================================= END OF ASSESSMENT API=================================================//


// Home route uses authenticate middleware

ex.get('/home', authenticateToken, (UserReq, DBresults) => {
    DBresults.json({
        message: `Welcome back, user ID: ${UserReq.user.stud_id || UserReq.user.admin_id || UserReq.user.lecturer_id}!`,
        status: 'success'
    });
});


// start server 
const PORT = process.env.PORT || 5000;
ex.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
