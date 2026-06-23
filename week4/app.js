const {runQuery} = require('./database');

// 1. 학생의 이름을 받아 학생의 모든 성적 출력
const gradeprint = async (name)=> {
    const result = await runQuery(`
        select GROUP_CONCAT(co.course_name) from enrollments e
    inner join students s
        on e.student_id = s.student_id
    inner join courses co
        on e.course_id = co.course_id
    where s.student_name = '${name}'
    GROUP BY s.student_name
        `);
    console.log(`${name} 학생은 ${result[0]['GROUP_CONCAT(co.course_name)']} 과목을 수강 중입니다.`)
}
(async () => {
    gradeprint("가나다");
})();

// 2. 학생 ID, 강의 ID, 성적을 받아 학생이 강의를 수강하도록 하는 함수
const studentinsert = async (s_id, c_id, grade)=> {
    await runQuery(`
        INSERT INTO enrollments (student_id, course_id, grade) VALUES (${s_id},${c_id},'${grade}')
    `)
    const result = await runQuery(`
    select s.student_name, co.course_name, e.grade from enrollments e
    inner join students s
        on e.student_id = s.student_id
    inner join courses co
        on e.course_id = co.course_id
    where s.student_id = '${s_id}' 
    AND co.course_id = '${c_id}'  
    `);
    console.log(`${result[0].student_name} 학생은 ${result[0].course_name} 강의를 수강합니다.`)
}
(async () => {
    studentinsert(10, 6, 'A+');
})();