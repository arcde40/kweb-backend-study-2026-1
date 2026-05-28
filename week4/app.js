const {runQuery} = require('./database');


(async () => {
    console.log(await runQuery('select * from students;'));
})();

// 1. 학생의 이름을 받아 그 학생의 모든 성적을 출력하는 함수
async function getGradesByStudentName(studentName) {
    const query = `
        SELECT c.course_name, e.grade
        FROM Students s
        JOIN Enrollments e ON s.student_id = e.student_id
        JOIN Courses c ON e.course_id = c.course_id
        WHERE s.student_name = ?;
    `;
    // runQuery가 두 번째 인자로 파라미터 배열을 받는다고 가정 (SQL Injection 방지)
    const result = await runQuery(query, [studentName]);
    console.log(`\n[${studentName} 학생의 성적 목록]`);
    console.log(result);
    return result;
}

// 2. 강의 이름을 받아 그 강의를 들었던 학생 목록을 출력하는 함수
async function getStudentsByCourseName(courseName) {
    const query = `
        SELECT s.student_id, s.student_name, s.major, e.grade
        FROM Courses c
        JOIN Enrollments e ON c.course_id = e.course_id
        JOIN Students s ON e.student_id = s.student_id
        WHERE c.course_name = ?;
    `;
    const result = await runQuery(query, [courseName]);
    console.log(`\n[${courseName} 수강생 목록]`);
    console.log(result);
    return result;
}

// 3. 학생 ID와 강의 ID, 성적을 받아 학생이 강의를 수강하도록 하는 함수 (INSERT)
async function enrollStudent(studentId, courseId, grade) {
    const query = `
        INSERT INTO Enrollments (student_id, course_id, grade)
        VALUES (?, ?, ?);
    `;
    try {
        const result = await runQuery(query, [studentId, courseId, grade]);
        console.log(`\n[수강 신청 성공] 학생 ID: ${studentId}, 강의 ID: ${courseId}, 성적: ${grade}`);
        return result;
    } catch (error) {
        // 이미 수강 중이거나(PK 중복), 없는 학생/강의 ID(FK 제약조건 위배)일 경우 에러 처리
        console.error(`\n[수강 신청 실패]`, error.message);
    }
}

// 실행 및 테스트 블록
(async () => {
    // 0. 전체 학생 확인 (기존 코드)
    console.log('--- 전체 학생 목록 ---');
    console.log(await runQuery('SELECT * FROM Students;'));

    // 테스트를 위해 DB에 실제로 존재하는 데이터(이름, 강의명, ID 등)를 입력해야 정상 작동합니다.

    // 1번 함수 실행 (예: 이름이 '홍길동'인 학생)
    await getGradesByStudentName('홍길동'); 

    // 2번 함수 실행 (예: 강의명이 '데이터베이스'인 강의)
    await getStudentsByCourseName('데이터베이스'); 

    // 3번 함수 실행 (예: student_id 1번이 course_id 2번을 'A+' 성적으로 수강)
    await enrollStudent(1, 2, 'A+'); 
})();