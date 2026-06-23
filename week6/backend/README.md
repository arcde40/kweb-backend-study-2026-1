# Simple Board Backend

Express.js + MariaDB 기반 게시판 백엔드 API

## 프로젝트 구조

```
backend/
├── app.js                      # 메인 서버 파일
├── config/
│   └── database.js            # DB 연결 설정
├── routes/                     # HTTP 요청/응답 처리
│   ├── auth.js                # 인증 라우트
│   ├── posts.js               # 게시글 라우트
│   └── replies.js             # 댓글 라우트
├── services/                   # 비즈니스 로직
│   ├── authService.js         # 인증 서비스
│   ├── postService.js         # 게시글 서비스
│   └── replyService.js        # 댓글 서비스
├── repositories/               # 데이터베이스 쿼리
│   ├── userRepository.js      # 사용자 Repository
│   ├── postRepository.js      # 게시글 Repository
│   └── replyRepository.js     # 댓글 Repository
├── middleware/
│   └── auth.js                # 인증 미들웨어
├── utils/
│   ├── password.js            # bcrypt 비밀번호 해싱 유틸
│   └── password.example.js    # 사용 예제
└── schema.sql                 # DB 스키마
```

## 레이어드 아키텍처

이 프로젝트는 **3-Layer Architecture**를 사용합니다:

```
Routes (Controller) → Services (Business Logic) → Repositories (Data Access)
```

**각 레이어의 역할:**

- **Routes**: HTTP 요청 처리, 응답 반환, 상태 코드 관리
- **Services**: 비즈니스 로직, 유효성 검사, 여러 Repository 조합
- **Repositories**: 데이터베이스 쿼리 실행

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

```bash
cp .env.example .env
```

`.env` 파일을 열어 DB 정보를 수정하세요.

### 3. 데이터베이스 설정

```bash
mysql -u kweb -p kweb_db < schema.sql
```

### 4. 서버 실행

```bash
npm run dev
```

서버는 `http://localhost:3000`에서 실행됩니다.

## API 엔드포인트

### 인증

- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 조회

### 게시글

- `GET /api/posts` - 게시글 목록
- `GET /api/posts/:id` - 게시글 상세
- `POST /api/posts` - 게시글 작성 (인증 필요)
- `PUT /api/posts/:id` - 게시글 수정 (인증 필요)
- `DELETE /api/posts/:id` - 게시글 삭제 (인증 필요)

### 댓글

- `GET /api/posts/:postId/replies` - 댓글 목록
- `POST /api/posts/:postId/replies` - 댓글 작성 (인증 필요)
- `DELETE /api/replies/:replyId` - 댓글 삭제 (인증 필요)

## 데이터베이스 스키마

**users** - 사용자

- `id`, `username` (unique), `password` (bcrypt 해시), `created_at`

**posts** - 게시글

- `id`, `title`, `content`, `user_id` (FK), `created_at`, `updated_at`

**replies** - 댓글

- `id`, `content`, `post_id` (FK), `user_id` (FK), `created_at`

## 구현 가이드

### 1. Repository Layer (데이터 접근)

데이터베이스 쿼리만 담당합니다.

```javascript
// repositories/userRepository.js
async function findByUsername(username) {
  // TODO: SELECT 쿼리 작성
}
```

### 2. Service Layer (비즈니스 로직)

유효성 검사, Repository 호출, 데이터 가공을 담당합니다.

```javascript
// services/authService.js
async function register(username, password) {
  // 1. 유효성 검사
  // 2. userRepository.existsByUsername() 호출
  // 3. 비밀번호 해싱
  // 4. userRepository.create() 호출
  // 5. 결과 반환
}
```

### 3. Route Layer (컨트롤러)

HTTP 요청 처리, Service 호출, 응답 반환을 담당합니다.

```javascript
// routes/auth.js
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.register(username, password);
  res.status(200).json(user);
});
```

## 비밀번호 해싱

`utils/password.js`에서 bcrypt 헬퍼 함수 제공:

```javascript
const {hashPassword, comparePassword} = require('./utils/password');

// 회원가입 시
const hashedPassword = await hashPassword(password);

// 로그인 시
const isValid = await comparePassword(password, user.password);
```

**예제 실행:**

```bash
node utils/password.example.js
```

## 보안 참고사항

- 비밀번호는 반드시 해싱하여 저장
- API 응답에 비밀번호 포함 금지
- Parameterized Query 사용 (SQL Injection 방지)

### Disclaimer

- 이 프로젝트에는 AI로 작성한 코드가 포함되어 있습니다.