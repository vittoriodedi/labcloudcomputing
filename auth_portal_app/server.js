//Import necessary modules
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let connection; // MySQL connection configuration variable

// MySQL connection configuration
const dbConfig = {
    host: process.env.MYSQL_HOST || 'mysql_database',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

// MySQL connection function and initialization
async function connectToDb() {
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected successfully to MySQL database');
        await initDb();
    } catch (err) {
        console.error('Connection Error:', err.message);
        setTimeout(connectToDb, 5000);
    }
}

// MySQL database data initialization function
async function initDb() {
    try {
        // Create users table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        const hashedPassword = await bcrypt.hash('testpassword', 10);

        //Create a test user
        await connection.execute(
            'INSERT IGNORE INTO users (username, password) VALUES (?, ?)',
            ['testuser', hashedPassword]
        );
        
        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Error, Database was not initialized:', err.message);
    }
}

// Endpoint for user login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        // Check if the user exists
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).send('Not valid credentials.');
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            res.status(200).send('Login successful!');
        } else {
            res.status(401).send('Not valid credentials.');
        }

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Server error.');
    }
});

//Start connection to the database
connectToDb();

//Start the server
app.listen(3000, () => {
    console.log('Auth Portal listens on port 3000');
});