CREATE TABLE Admin (
    admin_id INT IDENTITY(1,1) PRIMARY KEY, 
    Fname NVARCHAR(100) NOT NULL,                     
    email NVARCHAR(255) UNIQUE NOT NULL,    
    password NVARCHAR(255) NOT NULL        
);

ALTER TABLE dbo.Admin
DROP COLUMN Lname;

ALTER TABLE dbo.Lecturer
DROP COLUMN Lname;

CREATE TABLE Lecturer(
    lecturer_id INT IDENTITY(1,1) PRIMARY KEY,
    Fname NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    admin_id INT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);


CREATE TABLE Student (
    stud_id INT IDENTITY(1,1) PRIMARY KEY,     -- Auto increment unique ID
    Fname NVARCHAR(100) NOT NULL,             
    Lname NVARCHAR(100) NOT NULL,             
    email NVARCHAR(255) UNIQUE NOT NULL,       
    password NVARCHAR(255) NOT NULL,           
    admin_id INT NOT NULL,                     
    
    
    student_number AS (
        RIGHT('00' + CAST(stud_id AS VARCHAR(2)), 2)  
        + CONVERT(VARCHAR(8), GETDATE(), 112)        
    ) PERSISTED UNIQUE,                            
    
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
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
);


-- Inserting default admin and lecturer
INSERT INTO Admin (Fname, email, password) VALUES
('Admin', 'Admin@edu', 'Admin@123');

INSERT INTO Lecturer (Fname, email, password, admin_id) VALUES
('Lecture', 'lecturer1@edu', 'Lecturer@123', 2);