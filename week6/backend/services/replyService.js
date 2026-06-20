const replyRepository = require('../repositories/replyRepository');
const postRepository = require('../repositories/postRepository');

/**
 * Reply Service
 * 댓글 관련 비즈니스 로직을 담당
 */

/**
 * 특정 게시글의 댓글 목록 조회
 */
async function getRepliesByPostId(postId) {
    // TODO: Implement
    // 1. 게시글 존재 확인 (postRepository.findById)
    // 2. replyRepository.findByPostId() 호출
    throw new Error('Not implemented');
}

/**
 * 댓글 작성
 */
async function createReply(content, postId, userId) {
    // TODO: Implement
    // 1. 입력 유효성 검사
    // 2. 게시글 존재 확인 (postRepository.findById)
    // 3. replyRepository.create() 호출
    // 4. 생성된 댓글 조회 및 반환
    throw new Error('Not implemented');
}

/**
 * 댓글 삭제
 */
async function deleteReply(replyId, userId) {
    // TODO: Implement
    // 1. 댓글 존재 확인 (replyRepository.findById)
    // 2. 작성자 확인 (replyRepository.isOwner)
    // 3. replyRepository.deleteById() 호출
    throw new Error('Not implemented');
}

module.exports = {
    getRepliesByPostId,
    createReply,
    deleteReply
};
