const {runQuery} = require('./database');

(async () => {
    const result = await runQuery(`select s.student_name, co.course_name, e.grade from enrollments e
    inner join students s
        on e.student_id = s.student_id
    inner join courses co
        on e.course_id = co.course_id
    group by e.course_id
    ORDER BY e.grade asc`);
    const first_student_name = result[0].student_name;
    const first_student_course = result[0].course_name;
    
    console.log(`최우수 학생은 ${first_student_name}를 수강하는 ${first_student_course}학생입니다.`);
})();
const getStudentCourse = async (name) =>{
    const query = `select s.student_name, co.course_name from enrollments e
    inner join students s
        on e.student_id = s.student_id
    inner join courses co
        on e.course_id = co.course_id
    where s.student_name = '${name}'`;
    const result = await runQuery(query);
    console.log(`${name}학생은 ${result[0].course_name} 과목을 수강하고 있습니다.`);
};
const getStudentGrade = async (name) =>{
    const query = `select e.grade from enrollments e
    inner join students s
        on e.student_id = s.student_id
    inner join courses co
        on e.course_id = co.course_id
    where student_name = '${name}'`;
    const result = await runQuery(query);
    console.log(`${name}학생의 성적:`, result);
};
const getStudentList = async (course) =>{
    const query = `select s.student_name from enrollments e
    inner join students s
        on e.student_id = s.student_id
    inner join courses co
        on e.course_id = co.course_id
    where course_name = '${course}'`;
    const result = await runQuery(query);
    console.log(`${course}과목의 수강생:`, result);
};
(async()=>{
    getStudentCourse("가나다");
    getStudentCourse("신사임당");
    getStudentGrade("가나다");
    getStudentList("데이터베이스");
})();