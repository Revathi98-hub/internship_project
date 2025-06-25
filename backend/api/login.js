const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Create a MySQL connection pool (recommended for serverless)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Change if needed
    password: 'mysql60024062@', // Change if needed
    database: 'internship_project', // Change if needed
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://internshipproject-beta-six.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
        return;
    }

    const { empno, password } = req.body;
    if (!empno || !password) {
        res.status(400).json({ success: false, message: 'Please enter Employee Number and Password.' });
        return;
    }

    try {
        const [results] = await pool.query('SELECT * FROM users WHERE empno = ?', [empno]);
        if (results.length > 0) {
            const user = results[0];
            let passwordMatch = false;
            try {
                passwordMatch = await bcrypt.compare(password, user.password);
            } catch (e) {
                // Fallback to plain text compare for debugging
                passwordMatch = password === user.password;
            }
            if (passwordMatch) {
                res.json({ success: true });
                return;
            } else {
                res.json({ success: false, message: 'Invalid credentials.' });
                return;
            }
        } else {
            res.json({ success: false, message: 'Invalid credentials.' });
            return;
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Database error.', error: err.message });
    }
};
