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

const getGradesByStudentName = async studentName => {
    const conn = await pool.getConnection();
    try {
        const sql = `
            SELECT s.student_id, s.student_name, c.course_id, c.course_name, e.grade
            FROM students s
            JOIN enrollments e ON s.student_id = e.student_id
            JOIN courses c ON e.course_id = c.course_id
            WHERE s.student_name = ?
            ORDER BY c.course_id
        `;
        const [rows] = await conn.execute(sql, [studentName]);
        return rows;
    } finally {
        conn.release();
    }
};

const getStudentsByCourseName = async courseName => {
    const conn = await pool.getConnection();
    try {
        const sql = `
            SELECT c.course_id, c.course_name, s.student_id, s.student_name, e.grade
            FROM courses c
            JOIN enrollments e ON c.course_id = e.course_id
            JOIN students s ON e.student_id = s.student_id
            WHERE c.course_name = ?
            ORDER BY s.student_id
        `;
        const [rows] = await conn.execute(sql, [courseName]);
        return rows;
    } finally {
        conn.release();
    }
};

const enrollStudentInCourse = async (studentId, courseId, grade) => {
    const conn = await pool.getConnection();
    try {
        const sql = `
            INSERT INTO enrollments (student_id, course_id, grade)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE grade = VALUES(grade)
        `;
        const [result] = await conn.execute(sql, [studentId, courseId, grade]);
        return result;
    } finally {
        conn.release();
    }
};

module.exports = {runQuery, getGradesByStudentName, getStudentsByCourseName, enrollStudentInCourse}