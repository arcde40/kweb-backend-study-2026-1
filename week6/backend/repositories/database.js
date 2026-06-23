const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'simple_board',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
}

testConnection();

const runQuery = async (sql, data) => {
    const conn = await pool.getConnection();
    try {
        const psql = conn.format(sql, data);
        const [result] = await conn.query(psql);
        return result;
    } finally {
        conn.release();
    }
};

module.exports = {runQuery}
