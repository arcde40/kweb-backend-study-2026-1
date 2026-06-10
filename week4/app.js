const { runQuery } = require('./database');

/**
 * 1. 학생의 이름을 받아 그 학생의 모든 성적을 출력하는 함수
 * @param {string} studentName - 학생 이름
 */
async function printStudentGrades(studentName) {
    console.log(`\n--- [${studentName}] 학생의 성적 목록 ---`);
    
    // JOIN을 이용해 학생 테이블, 수강 테이블, 과목 테이블을 연결합니다.
    const sql = `
        SELECT c.course_name, e.grade 
        FROM students s
        JOIN enrollments e ON s.student_id = e.student_id
        JOIN courses c ON e.course_id = c.course_id
        WHERE s.student_name = '${studentName}';
    `;
    
    try {
        const results = await runQuery(sql);
        if (results.length === 0) {
            console.log("해당 학생이 없거나 수강한 강좌가 없습니다.");
        } else {
            console.table(results); // 깔끔하게 표 형태로 출력
        }
    } catch (error) {
        console.error("오류 발생:", error.message);
    }
}

/**
 * 2. 강의 이름을 받아 그 강의를 들었던 학생 목록을 출력하는 함수
 * @param {string} courseName - 강의 이름
 */
async function printCourseStudents(courseName) {
    console.log(`\n--- [${courseName}] 강의 수강 학생 목록 ---`);
    
    // JOIN을 이용해 과목 테이블, 수강 테이블, 학생 테이블을 연결합니다.
    const sql = `
        SELECT s.student_id, s.student_name, s.major
        FROM courses c
        JOIN enrollments e ON c.course_id = e.course_id
        JOIN students s ON e.student_id = s.student_id
        WHERE c.course_name = '${courseName}';
    `;
    
    try {
        const results = await runQuery(sql);
        if (results.length === 0) {
            console.log("해당 강의가 없거나 수강 중인 학생이 없습니다.");
        } else {
            console.table(results);
        }
    } catch (error) {
        console.error("오류 발생:", error.message);
    }
}

/**
 * 3. 학생 ID와 강의 ID, 성적을 받아 학생이 강의를 수강하도록 하는 함수 (INSERT)
 * @param {number} studentId - 학생 ID
 * @param {number} courseId - 강의 ID
 * @param {string} grade - 성적 (예: 'A+', 'B0')
 */
async function registerEnrollment(studentId, courseId, grade) {
    console.log(`\n--- 수강 등록 시도: 학생 ID ${studentId} -> 강의 ID ${courseId} (${grade}) ---`);
    
    const sql = `
        INSERT INTO enrollments (student_id, course_id, grade)
        VALUES (${studentId}, ${courseId}, '${grade}');
    `;
    
    try {
        await runQuery(sql);
        console.log("👉 수강 등록이 성공적으로 완료되었습니다!");
    } catch (error) {
        // 이미 수강 중인 과목일 경우 PK 중복 에러 등이 발생합니다.
        console.error("👉 수강 등록 실패:", error.message);
    }
}


// 함수 실행 테스트를 위한 메인 흐름
(async () => {
    // 테스트 1: '가나다' 학생의 성적 출력해보기
    await printStudentGrades('가나다');

    // 테스트 2: '데이터베이스' 과목을 듣는 학생 목록 출력해보기
    await printCourseStudents('데이터베이스');

    // 테스트 3: 학생 ID 3번(사아자)이 강의 ID 4번(셰익스피어 읽기)을 A0 학점으로 수강 등록하기
    await registerEnrollment(3, 4, 'A0');

    // 수강 등록이 잘 되었는지 3번 학생 성적표를 다시 뽑아서 확인하기
    await printStudentGrades('사아자');
})();