const { hash } = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const { hashPassword, comparePassword } = require('../utils/password');
const { findById } = require('../repositories/postRepository');

/**
 * Auth Service
 * 인증 관련 비즈니스 로직을 담당
 */

/**
 * 회원가입
 */
async function register(username, password) {
    // TODO: Implement
    // 1. 입력 유효성 검사
    if(username == "" || password == ""){
        throw new Error("값이 비어있습니다!");
    }
    
    // 2. 중복 사용자 확인 (userRepository.existsByUsername)

    if(userRepository.existsByUsername(username)) throw new Error("이미 가입한 사용자입니다.");

     
    // 3. 비밀번호 해싱 (hashPassword)

    const hashedPassword = await hashPassword(password);


    // 4. 사용자 생성 (userRepository.create)

    userRepository.create(username, hashedPassword);
    const result = await userRepository.create(username, hashedPassword);
    return result;





    // 5. 사용자 정보 반환 (비밀번호 제외)
    throw new Error('Not implemented');
}

/**
 * 로그인
 */
async function login(username, password) {
    // TODO: Implement
    // 1. 입력 유효성 검사
    if(username == "" || password == ""){
        throw new Error("값이 비어있습니다!");
    }

    const user = userRepository.findByUsername(username);

    if(!user) throw new Error('아이디/비밀번호를 확인해주세요.')


    // 2. 사용자 조회 (userRepository.findByUsername)

    if(!(await comparePassword(password, user.password))) {
        throw new Error('아이디/비밀번호를 확인해주세요.');
    }


    //return user; // 하면 큰일납니다

    return {id:user.id, username:user.username, createdAt:user.createdAt};

    // 3. 비밀번호 확인 (comparePassword)
    // 4. 사용자 정보 반환 (비밀번호 제외)

    


    
}

/**
 * 현재 사용자 조회
 */
async function getCurrentUser(userId) {
    // TODO: Implement
    // 1. 사용자 조회 (userRepository.findById)
    const user = await userRepository.findById(userId)
    // 2. 사용자 정보 반환 (비밀번호 제외)
    if(!user) throw new Error('없는 유저입니다!');
    user.password = undefined;
    return user;
}

module.exports = {
    register,
    login,
    getCurrentUser
};
