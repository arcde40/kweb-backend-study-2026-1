const replyRepository = require('../repositories/replyRepository');
const postRepository = require('../repositories/postRepository');
const { post } = require('../routes/auth');

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
    const post = await postRepository.findById(postId);
    if (!post) throw new Error('게시글이 존재하지 않습니다.');

    const result = await replyRepository.findByPostId(postId);
    
    //console.log(result);
    return result;
}

/**
 * 댓글 작성
 */
async function createReply(content, postId, userId) {
    if (content === "") throw new Error('댓글은 비어있을 수 없습니다.');

    const post = await postRepository.findById(postId);
    if (!post) throw new Error('게시글이 존재하지 않습니다.');

    const newId = await replyRepository.create(content, postId, userId);

    const createdreply = await replyRepository.findById(newId);
    return createdreply;
}

/**
 * 댓글 삭제
 */
async function deleteReply(replyId, userId) {
    const reply = await replyRepository.findById(replyId);
    if (!reply) throw new Error('댓글이 존재하지 않습니다.');

    const isOwner = await replyRepository.isOwner(replyId, userId);
    if (!isOwner) throw new Error('댓글 작성자만 삭제할 수 있습니다.');

    await replyRepository.deleteById(replyId);
}

module.exports = {
    getRepliesByPostId,
    createReply,
    deleteReply
};
