// Basic Node.js backend setup for login
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change this if your MySQL username is different
    password:'mysql60024062@', // Change this if your MySQL password is not empty
    database: 'internship_project' // Change this if your schema name is different
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1); // Stop the server if DB connection fails
    }
    console.log('✅ Connected to MySQL database!');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { empno, password } = req.body;
    if (!empno || !password) {
        return res.json({ success: false, message: 'Please enter Employee Number and Password.' });
    }
    const query = 'SELECT * FROM users WHERE empno = ?';
    db.query(query, [empno], async (err, results) => {
        if (err) {
            return res.json({ success: false, message: 'Database error.' });
        }
        if (results.length > 0) {
            const user = results[0];
            try {
                // Try bcrypt compare first
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    return res.json({ success: true });
                }
            } catch (e) {
                console.warn('Bcrypt compare failed, falling back to plaintext:', e.message);
            }
            // Fallback: plain text compare for debugging
            if (password === user.password) {
                return res.json({ success: true });
            } else {
                return res.json({ success: false, message: 'Invalid credentials.' });
            }
        } else {
            return res.json({ success: false, message: 'Invalid credentials.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
