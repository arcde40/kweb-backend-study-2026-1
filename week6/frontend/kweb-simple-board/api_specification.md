# API 명세서 (API Specification)

이 문서는 Simple Board 애플리케이션의 백엔드 API 명세서입니다.

## 1. 인증 (Authentication)

### 1.1 로그인

- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: 사용자를 인증하고 세션을 시작합니다.
- **Request Body**:
  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "id": 1,
      "username": "user1"
    }
    ```

### 1.2 회원가입

- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: 새로운 사용자를 등록합니다.
- **Request Body**:
  ```json
  {
    "username": "newuser",
    "password": "password123"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "id": 2,
      "username": "newuser"
    }
    ```

### 1.3 로그아웃

- **URL**: `/auth/logout`
- **Method**: `POST`
- **Description**: 현재 사용자의 세션을 종료합니다.
- **Response**:
  - **200 OK**

### 1.4 현재 사용자 정보 조회

- **URL**: `/auth/me`
- **Method**: `GET`
- **Description**: 현재 로그인된 사용자의 정보를 조회합니다.
- **Response**:
  - **200 OK**:
    ```json
    {
      "id": 1,
      "username": "user1"
    }
    ```

## 2. 게시글 (Posts)

### 2.1 게시글 목록 조회

- **URL**: `/posts`
- **Method**: `GET`
- **Description**: 모든 게시글을 조회합니다.
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "id": 1,
        "title": "게시글 제목",
        "content": "게시글 내용",
        "userId": 1,
        "username": "user1",
        "createdAt": "2023-10-27T10:00:00Z",
        "reply_count": 5
      }
    ]
    ```

### 2.2 게시글 상세 조회

- **URL**: `/posts/:id`
- **Method**: `GET`
- **Description**: 특정 ID의 게시글을 조회합니다.
- **Response**:
  - **200 OK**:
    ```json
    {
      "id": 1,
      "title": "게시글 제목",
      "content": "게시글 내용",
      "userId": 1,
      "username": "user1",
      "createdAt": "2023-10-27T10:00:00Z",
      "reply_count": 5
    }
    ```

### 2.3 게시글 작성

- **URL**: `/posts`
- **Method**: `POST`
- **Description**: 새로운 게시글을 작성합니다.
- **Request Body**:
  ```json
  {
    "title": "새 게시글",
    "content": "내용입니다."
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "id": 2,
      "title": "새 게시글",
      "content": "내용입니다.",
      "userId": 1,
      "username": "user1",
      "createdAt": "2023-10-27T12:00:00Z"
    }
    ```

### 2.4 게시글 수정

- **URL**: `/posts/:id`
- **Method**: `PUT`
- **Description**: 기존 게시글을 수정합니다.
- **Request Body**:
  ```json
  {
    "title": "수정된 제목",
    "content": "수정된 내용"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "id": 1,
      "title": "수정된 제목",
      "content": "수정된 내용",
      ...
    }
    ```

### 2.5 게시글 삭제

- **URL**: `/posts/:id`
- **Method**: `DELETE`
- **Description**: 특정 게시글을 삭제합니다.
- **Response**:
  - **200 OK**

## 3. 댓글 (Replies)

### 3.1 댓글 목록 조회

- **URL**: `/posts/:postId/replies`
- **Method**: `GET`
- **Description**: 특정 게시글에 달린 댓글 목록을 조회합니다.
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "id": 1,
        "content": "댓글 내용",
        "postId": 1,
        "userId": 2,
        "username": "user2",
        "createdAt": "2023-10-27T11:00:00Z"
      }
    ]
    ```

### 3.2 댓글 작성

- **URL**: `/posts/:postId/replies`
- **Method**: `POST`
- **Description**: 특정 게시글에 댓글을 작성합니다.
- **Request Body**:
  ```json
  {
    "content": "댓글 내용입니다."
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "id": 3,
      "content": "댓글 내용입니다.",
      "postId": 1,
      "userId": 1,
      "username": "user1",
      "createdAt": "2023-10-27T13:00:00Z"
    }
    ```

### 3.3 댓글 삭제

- **URL**: `/replies/:replyId`
- **Method**: `DELETE`
- **Description**: 특정 댓글을 삭제합니다.
- **Response**:
  - **200 OK**
