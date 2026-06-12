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
    // 1. 게시글 존재 확인
    const post = await postRepository.findById(postId);
    if (!post) throw new Error('존재하지 않는 게시글입니다.');

    // 2. replyRepository.findByPostId() 호출 후 결과 반환
    return await replyRepository.findByPostId(postId);
}

/**
 * 댓글 작성
 */
async function createReply(content, postId, userId) {
    // 1. 입력 유효성 검사
    if (!content || content.trim() === "") {
        throw new Error('댓글 내용은 비어있을 수 없습니다.');
    }

    // 2. 게시글 존재 확인
    const post = await postRepository.findById(postId);
    if (!post) throw new Error('존재하지 않는 게시글입니다.');

    // 3. replyRepository.create() 호출
    const newReplyId = await replyRepository.create(content, postId, userId);

    // 4. 생성된 댓글 조회 및 반환
    return await replyRepository.findById(newReplyId);
}

/**
 * 댓글 삭제
 */
async function deleteReply(replyId, userId) {
    // 1. 댓글 존재 확인
    const reply = await replyRepository.findById(replyId);
    if (!reply) throw new Error('존재하지 않는 댓글입니다.');

    // 2. 작성자 확인
    const isOwner = await replyRepository.isOwner(replyId, userId);
    if (!isOwner) throw new Error('권한이 없습니다.');

    // 3. replyRepository.deleteById() 호출
    return await replyRepository.deleteById(replyId);
}

module.exports = {
    getRepliesByPostId,
    createReply,
    deleteReply
};
