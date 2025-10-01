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

// Test & Initialize DB Connection (Your function name)

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


// Registering a Student 
ex.post('/register', async (UserReq, DBresults) => {
    const { Fname, Lname, email, password } = UserReq.body;
    if (!Fname || !Lname || !email || !password) {
        return DBresults.status(400).json({ error: 'All fields are required' });
    }
    try {
        // Check if student exists
        let existing = await getDbRequest()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Student WHERE email = @email');
        if (existing.recordset.length > 0) {
            return DBresults.status(400).json({ error: 'Student already exists' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert student 
        await getDbRequest()
            .input('Fname', sql.NVarChar, Fname)
            .input('Lname', sql.NVarChar, Lname)
            .input('email', sql.NVarChar, email)
            .input('hashedPassword', sql.NVarChar, hashedPassword)
            .input('admin_id', sql.Int, 1)
            .query(`
                INSERT INTO Student (Fname, Lname, email, password, admin_id)
                VALUES (@Fname, @Lname, @email, @hashedPassword, @admin_id)
            `);

        DBresults.status(201).json({ message: 'Registered successfully' });

    } catch (err) {
        console.error("Error registering user: ", err);
        DBresults.status(500).json({ error: 'Failed to register user' });
    }
});


//USER LOGIN but as a Student 
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
                stud_id: student.stud_id, 
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


//ADMIN LOGIN but they dont need to register they just login 
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

// Forgot password - Student
ex.post('/forgot-password', async (UserReq, DBresults) => {
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
            .query('SELECT stud_id, Fname, Lname, email, student_number FROM Student WHERE student_number = @student_number');

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

ex.put('/profile/:student_number', async (UserReq, DBresults) => {
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