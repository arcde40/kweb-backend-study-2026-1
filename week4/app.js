const { runQuery } = require('./database');

async function getGrades(studentName) {
    const query = `
        SELECT c.course_name, e.grade FROM students s
        JOIN enrollments e ON s.student_id = e.student_id
        JOIN courses c ON e.course_id = c.course_id
        WHERE s.student_name = '${studentName}';
    `;
    
    const result = await runQuery(query);
    
    console.log(`${studentName} 학생의 성적 목록`);
    console.log(result);
}

async function getStudents(courseName) {
    const query = `
        SELECT s.student_name, s.major, e.grade FROM courses c
        JOIN enrollments e ON c.course_id = e.course_id
        JOIN students s ON e.student_id = s.student_id
        WHERE c.course_name = '${courseName}';
    `;
    
    const result = await runQuery(query);
    
    console.log(`${courseName} 강의 수강 학생 목록`);
    console.log(result);
}

(async () => {
    await getGrades('가나다');
    await getStudents('데이터베이스');
})();