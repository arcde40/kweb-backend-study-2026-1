const {runQuery} = require('./database');


const getStudentCourse = async (name) => {
    const query = `select s.student_name, co.course_name from enrollments e 
    inner join students s
        on e.student_id = s.student_id
    inner join courses co
        on e.course_id = co.course_id
    where s.student_name = '${name}'`;
    const result = await runQuery(query);
    console.log(`${name} 학생은 ${result[0].course_name} 과목을 수강하고 있습니다!`);
}

(async () => {
    getStudentCourse("가나다");
    getStudentCourse("신사임당");
})();
