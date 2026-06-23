const { runQuery } = require('./database');

// 1. 학생 이름을 받아 그 학생의 모든 성적 출력
const getStudentGradesByName = async (studentName) => {
  const sql = `
    SELECT 
      s.student_name,
      c.course_name,
      e.grade
    FROM students s
    INNER JOIN enrollments e
      ON s.student_id = e.student_id
    INNER JOIN courses c
      ON e.course_id = c.course_id
    WHERE s.student_name = '${studentName}';
  `;

  const result = await runQuery(sql);
  console.log(`\n[학생 '${studentName}'의 성적 목록]`);
  console.log(result);
};

// 2. 강의 이름을 받아 그 강의를 들었던 학생 목록 출력
const getStudentsByCourseName = async (courseName) => {
  const sql = `
    SELECT
      c.course_name,
      s.student_name,
      e.grade
    FROM courses c
    INNER JOIN enrollments e
      ON c.course_id = e.course_id
    INNER JOIN students s
      ON e.student_id = s.student_id
    WHERE c.course_name = '${courseName}';
  `;

  const result = await runQuery(sql);
  console.log(`\n[강의 '${courseName}'을 수강한 학생 목록]`);
  console.log(result);
};

// 3. 학생 ID, 강의 ID, 성적을 받아 수강 등록
const enrollStudentToCourse = async (studentId, courseId, grade) => {
  const sql = `
    INSERT INTO enrollments (student_id, course_id, grade)
    VALUES (${studentId}, ${courseId}, '${grade}');
  `;

  const result = await runQuery(sql);
  console.log(`\n[수강 등록 완료] student_id=${studentId}, course_id=${courseId}, grade=${grade}`);
  console.log(result);
};