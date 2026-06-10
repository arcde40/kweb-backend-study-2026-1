/** You need mysql2 package for this **/
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'db',
    port: 3306,
    user: 'kweb',
    database: 'kweb_db',
    password: '1q2w3e4r'
});


const runQuery = async sql => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(sql);
        return result;
    } finally {
        conn.release();
    }
};

module.exports = {runQuery}