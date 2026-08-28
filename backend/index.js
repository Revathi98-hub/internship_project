// Express backend setup supporting local & Railway MySQL
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Trust reverse proxies (Render, Railway, Heroku, Cloudflare)
if (process.env.NODE_ENV === 'production' || process.env.MYSQLHOST || process.env.RAILWAY_ENVIRONMENT) {
  app.set('trust proxy', 1);
}

// Dynamic CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:8080', 'http://localhost:8000', 'http://localhost:3000', 'http://localhost:5000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or same-origin static requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*') || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in dev/deploy preview
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static frontend files directly from Express (for unified single-service deployment)
app.use(express.static(path.join(__dirname, '../frontend')));

// --- Database Connection Pool Setup (Supports local MySQL & Railway MySQL) ---
let poolConfig;

if (process.env.MYSQL_URL || process.env.DATABASE_URL) {
  const connectionUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;
  poolConfig = {
    uri: connectionUrl,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: (process.env.DB_SSL === 'true' || connectionUrl.includes('railway')) ? { rejectUnauthorized: false } : undefined
  };
} else {
  poolConfig = {
    host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.MYSQLPORT || process.env.DB_PORT || '3306', 10),
    user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQLDATABASE || process.env.DB_NAME || process.env.DB_DATABASE || 'internship_project',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: (process.env.DB_SSL === 'true' || process.env.MYSQLHOST) ? { rejectUnauthorized: false } : undefined
  };
}

const pool = mysql.createPool(poolConfig);
const db = pool; // MySQL pool compatible with callback interface (db.query)

// Initialize Session Store using MySQL Pool
const sessionStore = new MySQLStore({
  expiration: 86400000,
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
}, pool);

const isProd = process.env.NODE_ENV === 'production';
app.use(session({
  key: 'session_cookie_name',
  secret: process.env.SESSION_SECRET || 'internship_project_secret_key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProd && !process.env.DISABLE_SECURE_COOKIE,
    sameSite: isProd ? 'lax' : 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Function to auto-create tables if missing
function initializeDatabaseSchema() {
  const createUsers = `
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
  `;
  const createDelays = `
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
  `;

  db.query(createUsers, (err) => {
    if (err) console.error('⚠️ Warning: Error ensuring users table:', err.message);
    else console.log('✅ Users table ready.');
  });
  db.query(createDelays, (err) => {
    if (err) console.error('⚠️ Warning: Error ensuring delays table:', err.message);
    else console.log('✅ Delays table ready.');
  });

  // Seed default admin user if table is empty
  db.query('SELECT COUNT(*) as count FROM users', (err, results) => {
    if (!err && results[0].count === 0) {
      db.query(
        `INSERT INTO users (empno, name, designation, department, password, user_role) VALUES (?, ?, ?, ?, ?, ?)`,
        ['E001', 'John Doe', 'Manager', 'Sales', 'testpass', 'admin'],
        (seedErr) => {
          if (!seedErr) console.log('🌱 Seeded default user (E001 / testpass)');
        }
      );
    }
  });
}

// Test DB Connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Successfully connected to MySQL database pool.');
    connection.release();
    initializeDatabaseSchema();
  }
});

// --- API ENDPOINTS ---

// Session check endpoint
app.get('/api/session', (req, res) => {
  if (req.session && req.session.username) {
    return res.json({ loggedIn: true, username: req.session.username, name: req.session.name });
  } else {
    return res.json({ loggedIn: false });
  }
});

// Current user info endpoint
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
      console.error('Login DB Error:', err);
      return res.json({ success: false, message: 'Database error.' });
    }
    if (results.length > 0) {
      const user = results[0];
      try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          req.session.username = empno;
          req.session.name = user.name;
          req.session.user = { empno: user.empno, name: user.name, designation: user.designation, department: user.department, user_role: user.user_role };
          console.log('Login success (bcrypt), session:', req.session.username);
          return res.json({ success: true });
        }
      } catch (e) {
        console.warn('Bcrypt compare failed, checking plaintext:', e.message);
      }
      if (password === user.password) {
        req.session.username = empno;
        req.session.name = user.name;
        req.session.user = { empno: user.empno, name: user.name, designation: user.designation, department: user.department, user_role: user.user_role };
        console.log('Login success (plaintext), session:', req.session.username);
        return res.json({ success: true });
      } else {
        return res.json({ success: false, message: 'Invalid credentials.' });
      }
    } else {
      return res.json({ success: false, message: 'Invalid credentials.' });
    }
  });
});

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ success: false, message: 'Could not log out' });
    }
    res.clearCookie('session_cookie_name');
    return res.json({ success: true, message: 'Logged out successfully' });
  });
});

// Save delay entry endpoint
app.post('/api/delay', (req, res) => {
  const username = req.session.username;
  if (!username) {
    return res.status(401).json({ success: false, message: 'Not logged in.' });
  }
  const { shopCode, eqptCode, subequip, delayFrom, delayUpto, delayDesc } = req.body;
  
  const parseCustomDate = (str) => {
    if (!str) return null;
    const parts = str.split(' ');
    if (parts.length !== 4) return new Date(str);
    const [dd, MM, YYYY, time] = parts;
    return new Date(`${YYYY}-${MM}-${dd}T${time}:00`);
  };
  const startDate = parseCustomDate(delayFrom);
  const endDate = parseCustomDate(delayUpto);
  
  if (!startDate || !endDate || isNaN(startDate) || isNaN(endDate) || (endDate - startDate) < 60 * 60 * 1000) {
    return res.status(400).json({ success: false, message: 'Duration must be at least 1 hour' });
  }
  if (!shopCode || !eqptCode || !subequip || !delayFrom || !delayUpto || !delayDesc) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const query = `INSERT INTO delays (shopCode, eqptCode, subequip, delayFrom, delayUpto, delayDesc, username, empno) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [shopCode, eqptCode, subequip, delayFrom, delayUpto, delayDesc, req.session.name || username, username], (err, result) => {
    if (err) {
      console.error('Error inserting delay:', err);
      return res.status(500).json({ success: false, message: 'Database error.' });
    }
    return res.json({ success: true, message: 'Delay entry saved.' });
  });
});

// Get filtered delay records endpoint
app.get('/api/delays', (req, res) => {
  const { shopCode, fromDate, toDate } = req.query;
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
  }

  query += ' ORDER BY id DESC';

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('/api/delays error:', err);
      return res.json({ success: false, message: 'Database error.' });
    }
    res.json({ success: true, delays: results });
  });
});

// Serve index.html for root route fallback
app.get('*', (req, res) => {
  if (req.path.startsWith('/api') || req.path === '/login' || req.path === '/logout') {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Backend server listening on port ${port}`);
});
