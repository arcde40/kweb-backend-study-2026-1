const postRepository = require('../repositories/postRepository');

/**
 * Post Service
 * 게시글 관련 비즈니스 로직을 담당
 */

/**
 * 모든 게시글 조회
 */
async function getAllPosts() {
    // TODO: Implement
    // postRepository.findAll() 호출
    return await postRepository.findAll();
}

/**
 * 게시글 상세 조회
 */
async function getPostById(postId) {
    // TODO: Implement
    // postRepository.findById() 호출
    const post = await postRepository.findById();
    // 게시글이 없으면 적절한 에러 처리
    if (!post) throw new Error('존재하지 않는 게시글입니다.');
    return post;
}

/**
 * 게시글 작성
 */
async function createPost(title, content, userId) {
    // TODO: Implement
    // 1. 입력 유효성 검사
    // 2. postRepository.create() 호출
    // 3. 생성된 게시글 조회 및 반환
    if (title === "" || content === ""){
        throw new Error("제목과 내용은 비어있을 수 없습니다!");
    }
    const newId = await postRepository.create(title, content,userId);
    const createdPost = await postRepository.findById(newId);
    return createdPost;
}

/**
 * 게시글 수정
 */
async function updatePost(postId, title, content, userId) {
    // TODO: Implement
    // 1. 입력 유효성 검사
    // 2. 게시글 존재 확인
    // 3. 작성자 확인 (postRepository.isOwner)
    // 4. postRepository.update() 호출
    // 5. 수정된 게시글 조회 및 반환
    if (title ==="" || content === "")
        throw new Error("제목과 내용은 비어있을 수 없습니다.");
    const post = await postRepository.findById(postId);
    if(!post) throw new Error("존재하지 않는 게시글입니다.");
    const isOwner = await postRepository.isOwner(postId, userId);
    if(!isOwner) throw new Error("권한이 없습니다.");

    await postRepository.update(postId, title, content);
    const newPost = await postRepository.findById(postId);
    return newPost;
}

/**
 * 게시글 삭제
 */
async function deletePost(postId, userId) {
    // TODO: Implement
    // 1. 게시글 존재 확인
    // 2. 작성자 확인 (postRepository.isOwner)
    // 3. postRepository.deleteById() 호출
    const post = await postRepository.findById(postId);
    if(!post) throw new Error("존재하지 않는 게시글입니다!");
    const isOwner = await postRepository.isOwner(postId, userId);
    if (!isOwner) throw new Error("권한이 없습니다!");
    
    await postRepository.deleteById(postId);
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
