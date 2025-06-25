const mysql = require('mysql2/promise');

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

    const { shopCode, eqptCode, subequip, delayFrom, delayUpto, delayDesc } = req.body;
    if (!shopCode || !eqptCode || !subequip || !delayFrom || !delayUpto || !delayDesc) {
        res.status(400).json({ success: false, message: 'All fields are required.' });
        return;
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO delays (shopCode, eqptCode, subequip, delayFrom, delayUpto, delayDesc) VALUES (?, ?, ?, ?, ?, ?)',
            [shopCode, eqptCode, subequip, delayFrom, delayUpto, delayDesc]
        );
        res.json({ success: true, message: 'Delay entry saved.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Database error.', error: err.message });
    }
};
