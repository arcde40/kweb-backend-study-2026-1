/** You need mysql2 package for this **/
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'db',
    port: 3306,
    user: 'kweb',
    database: 'kweb_db',
    password: '1q2w3e4r'
});


const runQuery = async (pstmt, data) => {
    const conn = await pool.getConnection();
    try {
        const sql = conn.format(pstmt, data);
        const [result] = await conn.query(sql);
        return result;
    } finally {
        conn.release();
    }
};

// Database Setup - You don't have to edit this
const initDB = async () => {
    const initQueries = [
        "DROP TABLE IF EXISTS users;",
        "DROP TABLE IF EXISTS comments;",
        `CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(100) NOT NULL
        );`,
        "INSERT INTO users (username, password) VALUES ('admin', 'supersecret123');",
        `CREATE TABLE comments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            content TEXT NOT NULL
        );`,
        "INSERT INTO comments (content) VALUES ('KWEB BE 스터디는 정말 즐거워! 🥕🥕');"
    ];

    try {
        for (const query of initQueries) {
            await runQuery(query);
        }
        console.log("Database has been set up!");
    } catch (err) {
        console.error("Error occured: ", err);
    }
};

module.exports = {runQuery, initDB};