const postRepository = require('../repositories/postRepository');
const { post } = require('../routes/auth');

/**
 * Post Service
 * 게시글 관련 비즈니스 로직을 담당
 */

/**
 * 모든 게시글 조회
 */
async function getAllPosts() {
    return await postRepository.findAll();
}

/**
 * 게시글 상세 조회
 */
async function getPostById(postId) {
    return await postRepository.findById(postId);
}

/**
 * 게시글 작성
 */
async function createPost(title, content, userId) {
    // TODO: Implement
    // 1. 입력 유효성 검사
    // 2. postRepository.create() 호출
    // 3. 생성된 게시글 조회 및 반환

    if(title==="" || content ==="")
        throw new Error("제목과 내용은 비어있을 수 없습니다.");

    const newId = await postRepository.create(title, content, userId);
    const createdPost = await postRepository.findById(newId);
    return createPost;
}

/**
 * 게시글 수정
 */
async function updatePost(postId, title, content, userId) {
    if(title==="" || content ==="")
        throw new Error("제목과 내용은 비어있을 수 없습니다.");
    
    const post = await postRepository.findById(postId);
    if (!post) throw new Error("존재하지 않는 게시글입니다.");
    
    const isOwner = await postRepository.isOwner(postId, userId);
    if (!isOwner) throw new Error("권한이 없습니다.");

    await postRepository.update(postId, title, content);

    const newpost = await postRepository.findById(postId);
    return newpost;
}

/**
 * 게시글 삭제
 */
async function deletePost(postId, userId) {
    const post = await postRepository.findById(postId);
    if(!post) throw new Error("존재하지 않는 게시글입니다.");
    
    const isOwner = await postRepository.isOwner(postId, userId);
    if (!isOwner) throw new Error("권한이 없습니다.");

    await postRepository.deleteById(postId);
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};