// Basic Node.js backend setup for login
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const port = 5000;

// CORS middleware must be first
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:8000'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

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

// Session check endpoint
app.get('/api/session', (req, res) => {
    if (req.session && req.session.username) {
        return res.json({ loggedIn: true, username: req.session.username, name: req.session.name });
    } else {
        return res.json({ loggedIn: false });
    }
});

// Endpoint to get current user info
app.get('/api/current-user', (req, res) => {
    if (req.session && req.session.user) {
        return res.json({ loggedIn: true, user: req.session.user });
    } else {
        return res.status(401).json({ loggedIn: false, user: null });
    }
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
                    req.session.username = empno;
                    req.session.name = user.name;
                    req.session.user = { empno: user.empno, name: user.name, designation: user.designation, department: user.department, user_role: user.user_role };
                    console.log('Login success, session:', req.session);
                    return res.json({ success: true });
                }
            } catch (e) {
                console.warn('Bcrypt compare failed, falling back to plaintext:', e.message);
            }
            // Fallback: plain text compare for debugging
            if (password === user.password) {
                req.session.username = empno;
                req.session.name = user.name;
                req.session.user = { empno: user.empno, name: user.name, designation: user.designation, department: user.department, user_role: user.user_role };
                console.log('Login success (plaintext), session:', req.session);
                return res.json({ success: true });
            } else {
                return res.json({ success: false, message: 'Invalid credentials.' });
            }
        } else {
            return res.json({ success: false, message: 'Invalid credentials.' });
        }
    });
});

// Endpoint to save delay data
app.post('/api/delay', (req, res) => {
    const username = req.session.username;
    console.log('Delay submission, session:', req.session);
    if (!username) {
        return res.status(401).json({ success: false, message: 'Not logged in.' });
    }
    const { shopCode, eqptCode, subequip, delayFrom, delayUpto, delayDesc } = req.body;
    // --- Validate duration: must be at least 1 hour ---
    const parseCustomDate = (str)=>{
        // Expecting format "DD MM YYYY HH:mm" (from flatpickr d m Y H:i)
        const parts = str.split(' ');
        if(parts.length !== 4) return null;
        const [dd, MM, YYYY, time] = parts;
        return new Date(`${YYYY}-${MM}-${dd}T${time}:00`);
    };
    const startDate = parseCustomDate(delayFrom);
    const endDate   = parseCustomDate(delayUpto);
    if(!startDate || !endDate || isNaN(startDate) || isNaN(endDate) || (endDate - startDate) < 60*60*1000){
        return res.status(400).json({success:false, message:'Duration must be at least 1 hour'});
    }
    if (!shopCode || !eqptCode || !subequip || !delayFrom || !delayUpto || !delayDesc) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const query = `INSERT INTO delays (shopCode, eqptCode, subequip, delayFrom, delayUpto, delayDesc, username, empno) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [shopCode, eqptCode, subequip, delayFrom, delayUpto, delayDesc, req.session.name, req.session.username], (err, result) => {
        if (err) {
            console.error('Error inserting delay:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }
        return res.json({ success: true, message: 'Delay entry saved.' });
    });
});

// Enhanced endpoint to get filtered delay records
app.get('/api/delays', (req, res) => {
    const { shopCode, fromDate, toDate } = req.query;
    console.log('[DEBUG] /api/delays HIT:', { shopCode, fromDate, toDate });
    let query = 'SELECT * FROM delays';
    const params = [];
    const filters = [];

    if (shopCode) {
        filters.push('LOWER(shopCode) = ?');
        params.push(shopCode.trim().toLowerCase());
    }
    if (fromDate) {
        filters.push('LEFT(delayFrom, 10) >= ?');
        params.push(fromDate);
    }
    if (toDate) {
        filters.push('LEFT(delayUpto, 10) <= ?');
        params.push(toDate);
    }
    if (filters.length > 0) {
        query += ' WHERE ' + filters.join(' AND ');
        console.log('[DEBUG] /api/delays SQL:', query);
        console.log('[DEBUG] /api/delays params:', params);
        db.query(query, params, (err, results) => {
            if (err) {
                console.error('[DEBUG] /api/delays error:', err);
                return res.json({ success: false, message: 'Database error.' });
            }
            console.log('[DEBUG] /api/delays results:', results);
            res.json({ success: true, delays: results });
        });
    } else {
        // No filters: return all records and log
        db.query('SELECT * FROM delays', (err, results) => {
            if (err) {
                console.error('[DEBUG] /api/delays (no filter) error:', err);
                return res.json({ success: false, message: 'Database error.' });
            }
            console.log('[DEBUG] /api/delays (no filter) results:', results);
            res.json({ success: true, delays: results });
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
