-- SQL Schema for Internship Project (MySQL / Railway MySQL)

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empno VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS delays (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shopCode VARCHAR(50) NOT NULL,
    eqptCode VARCHAR(50) NOT NULL,
    subequip VARCHAR(50) NOT NULL,
    delayFrom VARCHAR(50) NOT NULL,
    delayUpto VARCHAR(50) NOT NULL,
    delayDesc TEXT NOT NULL,
    username VARCHAR(100) NOT NULL,
    empno VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Demo Admin User (empno: E001, password: testpass / hashed bcrypt)
INSERT INTO users (empno, name, designation, department, password, user_role) 
VALUES ('E001', 'John Doe', 'Manager', 'Sales', 'testpass', 'admin')
ON DUPLICATE KEY UPDATE empno=empno;
