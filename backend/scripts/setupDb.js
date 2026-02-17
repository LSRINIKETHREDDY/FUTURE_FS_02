const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

async function setup() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            port: process.env.DB_PORT || 3306,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database '${process.env.DB_NAME}' created or already exists.`);
        await connection.end();
    } catch (error) {
        console.error('Error creating database:', error.message);
        process.exit(1);
    }
}

setup();
