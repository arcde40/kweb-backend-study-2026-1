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
    const result = postRepository.findAll();

    return result;
     
}

/**
 * 게시글 상세 조회
 */
async function getPostById(postId) {
    // TODO: Implement
    // postRepository.findById() 호출

    const result = postRepository.findById();

    if(!result){
        throw new Error('게시글이 없습니다!');
    }
    return result;

     
}

/**
 * 게시글 작성
 */
async function createPost(title, content, userId) {
    // TODO: Implement
    // 1. 입력 유효성 검사

    if(title == "" || content == ""){
        throw new Error('비어 있습니다!');
    }



    // 2. postRepository.create() 호출
    // 3. 생성된 게시글 조회 및 반환
    
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
    throw new Error('Not implemented');
}

/**
 * 게시글 삭제
 */
async function deletePost(postId, userId) {
    // TODO: Implement
    // 1. 게시글 존재 확인
    if(!getPostById(postId)){
        throw new Error('게시물이 없습니다');
    }


    // 2. 작성자 확인 (postRepository.isOwner)
    if(!postRepository.isOwner(postId, userId)){
        throw new Error('다른 사람이 만든 걸 지우시나요?');
    }



    // 3. postRepository.deleteById() 호출

    postRepository.deleteById();
    
    
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
