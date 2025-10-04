/*CREATE TABLE Admin (
    admin_id INT IDENTITY(1,1) PRIMARY KEY, 
    Fname NVARCHAR(100) NOT NULL,                     
    email NVARCHAR(255) UNIQUE NOT NULL,    
    password NVARCHAR(255) NOT NULL        
);

CREATE TABLE Lecturer(
    lecturer_id INT IDENTITY(1,1) PRIMARY KEY,
    Fname NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    admin_id INT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);


CREATE TABLE Student (
    stud_id INT IDENTITY(1,1) PRIMARY KEY,    
    Fname NVARCHAR(100) NOT NULL,             
    Lname NVARCHAR(100) NOT NULL,             
    email NVARCHAR(255) UNIQUE NOT NULL,       
    password NVARCHAR(255) NOT NULL,                             
    
    
    student_number AS (
        RIGHT('00' + CAST(stud_id AS VARCHAR(2)), 2)  
        + CONVERT(VARCHAR(8), GETDATE(), 112)        
    ) PERSISTED UNIQUE,                            
    registration_date DATE DEFAULT GETDATE()
);


CREATE TABLE Assessment (
    assessment_id INT IDENTITY(1,1) PRIMARY KEY,
    lecturer_id INT NOT NULL,
    description NVARCHAR(500),
    created_date DATE DEFAULT GETDATE(),
    FOREIGN KEY (lecturer_id) REFERENCES Lecturer(lecturer_id)
);


CREATE TABLE Question (
    question_id INT IDENTITY(1,1) PRIMARY KEY,
    assessment_id INT NOT NULL,
    description NVARCHAR(1000) NOT NULL,  -- The question text
    FOREIGN KEY (assessment_id) REFERENCES Assessment(assessment_id)
);


CREATE TABLE Answer (
    ans_id INT IDENTITY(1,1) PRIMARY KEY,
    question_id INT NOT NULL,
    ans_description NVARCHAR(1000) NOT NULL, -- The answer text
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
);


CREATE TABLE Grading (
    grade_id INT IDENTITY(1,1) PRIMARY KEY,
    assessment_id INT NOT NULL,
    stud_id INT NOT NULL,
    lecturer_id INT NOT NULL,
    admin_id INT NOT NULL,
    marks DECIMAL(5,2) NOT NULL,      
    feedback NVARCHAR(1000),
    FOREIGN KEY (assessment_id) REFERENCES Assessment(assessment_id),
    FOREIGN KEY (stud_id) REFERENCES Student(stud_id),
    FOREIGN KEY (lecturer_id) REFERENCES Lecturer(lecturer_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);


CREATE TABLE Resource (
    resource_id INT IDENTITY(1,1) PRIMARY KEY,
    resource_name NVARCHAR(255) NOT NULL,
    description NVARCHAR(500),
    url NVARCHAR(500),
    date DATE DEFAULT GETDATE()
);*/

----------------------------Dropping Lname from Admin and Lecturer tables--------------------------------

ALTER TABLE dbo.Admin
DROP COLUMN Lname;

ALTER TABLE dbo.Lecturer
DROP COLUMN Lname;
----------------------------End of dropping Lname-----------------------------------------------------


--------------------------------Inserting default admin and lecturer---------------------------------
INSERT INTO Admin (Fname, email, password) VALUES
('Admin', 'Admin@edu', 'Admin@123');

INSERT INTO Lecturer (Fname, email, password, admin_id) VALUES
('Lecture', 'lecturer1@edu', 'Lecturer@123', 2);
--------------------------------------Ebd of insertion---------------------------------------------


---------------Verifying foreign key constraints and removing admin_id from Student table------------------
SELECT 
    OBJECT_NAME(parent_object_id) AS TableName,
    name AS ConstraintName,
    type_desc AS ConstraintType
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('dbo.Student')
AND referenced_object_id = OBJECT_ID('dbo.Admin');

ALTER TABLE dbo.Student
DROP CONSTRAINT FK__Student__admin_i__66603565;


ALTER TABLE dbo.Student
DROP COLUMN admin_id;


--------------------------------End of script-----------------------------------------------------------
SELECT * FROM Student;

-- 1. Drop Grading (references Student, Lecturer, Admin)
DROP TABLE IF EXISTS dbo.Grading;

-- 2. Drop Answer (references Student)
DROP TABLE IF EXISTS dbo.Answer;

-- 3. Now you can drop Student
DROP TABLE IF EXISTS dbo.Student;

CREATE TABLE dbo.Student (
    student_number NVARCHAR(20) PRIMARY KEY,  
    Fname NVARCHAR(100) NOT NULL,
    Lname NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    registration_date DATE DEFAULT GETDATE()
);

CREATE TABLE dbo.Answer (
    ans_id INT IDENTITY(1,1) PRIMARY KEY,
    question_id INT NOT NULL,
    stud_id NVARCHAR(20) NOT NULL,  
    ans_description NVARCHAR(1000) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES Question(question_id),
    FOREIGN KEY (stud_id) REFERENCES Student(student_number)  
);


CREATE TABLE dbo.Grading (
    grade_id INT IDENTITY(1,1) PRIMARY KEY,
    assessment_id INT NOT NULL,
    stud_id NVARCHAR(20) NOT NULL,  
    lecturer_id INT NOT NULL,
    admin_id INT NOT NULL,
    marks DECIMAL(5,2) NOT NULL,
    feedback NVARCHAR(1000),
    FOREIGN KEY (assessment_id) REFERENCES Assessment(assessment_id),
    FOREIGN KEY (stud_id) REFERENCES Student(student_number),  
    FOREIGN KEY (lecturer_id) REFERENCES Lecturer(lecturer_id),
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);
SELECT * FROM Resource;




