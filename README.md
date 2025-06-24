# Internship Project - Phase 1: Login Page

## Structure
- `frontend/`: HTML, CSS, JS for login UI
- `backend/`: Node.js server for authentication

## Setup Instructions

### Backend
1. Install dependencies:
   ```
   cd backend
   npm install
   ```
2. Set up MySQL database (see below).
3. Start backend:
   ```
   npm start
   ```

### Frontend
Open `frontend/index.html` in your browser.

### MySQL Setup
1. Open MySQL Workbench.
2. Run the following SQL to create the database and users table:
   ```sql
   CREATE DATABASE IF NOT EXISTS login_app;
   USE login_app;
   CREATE TABLE IF NOT EXISTS users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       empno VARCHAR(20) NOT NULL,
       name VARCHAR(100) NOT NULL,
       designation VARCHAR(100) NOT NULL,
       department VARCHAR(100) NOT NULL,
       password VARCHAR(255) NOT NULL,
       user_role VARCHAR(50) NOT NULL
   );
   INSERT INTO users (empno, name, designation, department, password, user_role) VALUES ('E001', 'John Doe', 'Manager', 'Sales', 'testpass', 'admin');
   ```
3. Update `backend/index.js` with your MySQL credentials if needed.

---

Let me know when you finish the above steps to proceed with testing or further development.
