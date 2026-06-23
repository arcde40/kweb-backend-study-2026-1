const { runQuery } = require('./database');

/**
 * User Repository
 * 사용자 관련 데이터베이스 쿼리를 담당
 */

/**
 * username으로 사용자 조회
 */
async function findByUsername(username) {
    const rows = await runQuery(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );
    return rows[0];
}

/**
 * id로 사용자 조회
 */
async function findById(id) {
    const rows = await runQuery(
        'SELECT id, username, created_at FROM users WHERE id = ?',
        [id]
    );
    return rows[0];
}

/**
 * 새로운 사용자 생성
 */
async function create(username, hashedPassword) {
    const result = await runQuery(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
    );
    return { id: result.insertId, username };
}

/**
 * username 존재 여부 확인
 */
async function existsByUsername(username) {
    const rows = await runQuery(
        'SELECT COUNT(*) as count FROM users WHERE username = ?',
        [username]
    );
    return rows[0].count > 0;
}

module.exports = {
    findByUsername,
    findById,
    create,
    existsByUsername
};
