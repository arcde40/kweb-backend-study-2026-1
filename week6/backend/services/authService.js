const userRepository = require('../repositories/userRepository');
const { hashPassword, comparePassword } = require('../utils/password');

/**
 * Auth Service
 * 인증 관련 비즈니스 로직을 담당
 */

/**
 * 회원가입
 */
async function register(username, password) {
    if (username == "" || password == ""){
        throw new Error('값이 비어있습니다.');
    }
    
    if (await userRepository.existsByUsername(username)){
        throw new Error('해당 이름이 이미 존재합니다.');
    }

    const hashedPassword = await hashPassword(password);
    const result = await userRepository.create(username, hashedPassword)

    return result;
}

/**
 * 로그인
 */
async function login(username, password) {
    if (username == "" || password == ""){
        throw new Error('값이 비어있습니다.');
    }

    const user = await userRepository.findByUsername(username);
    if (!user){
        throw new Error('아이디/비밀번호를 확인해주세요.');
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if(!isPasswordCorrect) throw new Error('아이디/비밀번호를 확인해주세요.');

    return {id: user.id, username: user.username, createdAt: user.createdAt};
}

/**
 * 현재 사용자 조회
 */
async function getCurrentUser(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error('없는 유저입니다!');
    user.password = undefined;
    return user;
}

module.exports = {
    register,
    login,
    getCurrentUser
};
