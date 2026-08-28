require('dotenv').config();
const mysql = require('mysql2/promise');

async function seed() {
  console.log('🌱 Connecting to database to seed tables...');
  
  let connectionConfig;
  if (process.env.MYSQL_URL || process.env.DATABASE_URL) {
    connectionConfig = process.env.MYSQL_URL || process.env.DATABASE_URL;
  } else {
    connectionConfig = {
      host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.MYSQLPORT || process.env.DB_PORT || '3306', 10),
      user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
      password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
      database: process.env.MYSQLDATABASE || process.env.DB_NAME || process.env.DB_DATABASE || 'internship_project',
      ssl: (process.env.DB_SSL === 'true' || process.env.MYSQLHOST) ? { rejectUnauthorized: false } : undefined
    };
  }

  let db;
  try {
    if (typeof connectionConfig === 'string') {
      db = await mysql.createConnection(connectionConfig);
    } else {
      db = await mysql.createConnection(connectionConfig);
    }
    console.log('✅ Connected to database successfully.');

    // Create users table
    await db.query(`
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
    `);
    console.log('✅ Users table ensured.');

    // Create delays table
    await db.query(`
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
    `);
    console.log('✅ Delays table ensured.');

    // Insert demo user if not exists
    const [rows] = await db.query('SELECT * FROM users WHERE empno = ?', ['E001']);
    if (rows.length === 0) {
      await db.query(
        `INSERT INTO users (empno, name, designation, department, password, user_role) VALUES (?, ?, ?, ?, ?, ?)`,
        ['E001', 'John Doe', 'Manager', 'Sales', 'testpass', 'admin']
      );
      console.log('✅ Seeded demo user: E001 / testpass');
    } else {
      console.log('ℹ️ Demo user E001 already exists.');
    }

    console.log('🎉 Seeding completed successfully!');
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
  } finally {
    if (db) await db.end();
  }
}

seed();
