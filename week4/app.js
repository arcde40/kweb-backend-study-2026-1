const {runQuery} = require('./database');


const getTable = async ()=> {
    const query = `select s.student_name, co.course_name, e.grade from enrollments e inner join students s 
    on e.student_id = s.student_id 
    inner join courses co 
    on e.course_id = co.course_id`;
    const result = await runQuery(query);
    console.log(result);
}

const getGrade = async(name) => {
    const query = `select s.student_name, co.course_name, e.grade from enrollments e inner join students s 
    on e.student_id = s.student_id 
    inner join courses co 
    on e.course_id = co.course_id
    where s.student_name = '${name}';`
    const result = await runQuery(query);
    console.log(`${name}의 성적은 다음과 같습니다.`);
    for(const enrol of result){
        console.log(`${enrol.course_name} : ${enrol.grade}`);
    }
}

const getStudentofCourse = async(course) =>{
    const query = `select s.student_name, co.course_name, e.grade from enrollments e inner join students s 
    on e.student_id = s.student_id 
    inner join courses co 
    on e.course_id = co.course_id
    where co.course_name = '${course}';`
    const result = await runQuery(query);
    console.log(`${course}를 수강하는 학생들은 다음과 같습니다.`);
    for (const enrol of result){
        console.log(enrol.student_name);
    }
}

const makeEnrollment = async(student_id, course_id, grade) =>{
    const query = `INSERT INTO enrollments VALUES (${student_id}, ${course_id},'${grade}');`;
    await runQuery(query);
}

(async() =>{
    getGrade("이순신");
    getStudentofCourse("데이터베이스");
    makeEnrollment(1,4,"A+");
    getTable();
})();