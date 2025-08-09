const express = require('express');
require('dotenv').config(); // Load environment variables
const app = express();
const port = 3000;
const mysql = require('mysql2');

// Middleware
app.use(express.json());
app.use(express.static('frontend'));

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'delay_management'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// API endpoint for delay data
app.post('/api/delays', async (req, res) => {
    try {
        const { shopCode, startDate, endDate } = req.body;
        
        // Query to get delay data for the selected shop code and date range
        const query = `
            SELECT equipment_code, COUNT(*) as delay_count
            FROM delays
            WHERE shop_code = ?
            AND delay_start >= ?
            AND delay_start <= ?
            GROUP BY equipment_code
        `;

        const [rows] = await db.promise().query(query, [shopCode, startDate, endDate]);

        // Calculate summary stats
        const totalDelays = rows.reduce((sum, row) => sum + row.delay_count, 0);
        const avgDuration = Math.floor(Math.random() * 8) + 2; // You might want to calculate this from actual data
        const thisMonthDelays = Math.floor(totalDelays * 0.7); // 70% this month

        // Prepare response data
        const data = {};
        rows.forEach(row => {
            data[row.equipment_code] = row.delay_count;
        });

        res.json({
            data,
            summary: {
                totalDelays,
                avgDuration: avgDuration.toFixed(2),
                thisMonthDelays
            }
        });
    } catch (error) {
        console.error('Error fetching delay data:', error);
        res.status(500).json({ error: 'Failed to fetch delay data' });
    }
});

console.log('Server is running on port ' + port);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
