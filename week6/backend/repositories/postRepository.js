const { runQuery } = require('./database');

/**
 * Post Repository
 * 게시글 관련 데이터베이스 쿼리를 담당
 */

/**
 * 모든 게시글 조회 (작성자 정보, 댓글 수 포함)
 */
async function findAll() {
    // TODO: JOIN 쿼리 작성 (users, replies COUNT)
    throw new Error('Not implemented');
}

/**
 * ID로 게시글 조회 (작성자 정보, 댓글 수 포함)
 */
async function findById(id) {
    // TODO: JOIN 쿼리 작성
    throw new Error('Not implemented');
}

/**
 * 게시글 생성
 */
async function create(title, content, userId) {
    const result = await runQuery(
        'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
        [title, content, userId]
    );
    return result.insertId;
}

/**
 * 게시글 수정
 */
async function update(id, title, content) {
    const result = await runQuery(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
    );
    return result.affectedRows > 0;
}

/**
 * 게시글 삭제
 */
async function deleteById(id) {
    const result = await runQuery(
        'DELETE FROM posts WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
}

/**
 * 게시글 작성자 확인
 */
async function isOwner(postId, userId) {
    const rows = await runQuery(
        'SELECT user_id FROM posts WHERE id = ?',
        [postId]
    );
    return rows.length > 0 && rows[0].user_id === userId;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteById,
    isOwner
};
