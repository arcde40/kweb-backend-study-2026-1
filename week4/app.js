const {runQuery} = require('./database');

const getgpa = async (name) =>{
    const queary = `select s.student_name, GROUP_CONCAT(co.course_name), GROUP_CONCAT(e.grade) from enrollments e
    inner join students s on e.student_id = s.student_id
    inner join courses co on e.course_id = co.course_id
    where s.student_name = '${name}'
    GROUP BY s.student_id;
    `

    const result = await runQuery(queary);
    /*console.log(result);*/
    console.log(`${name} 학생의 성적은 ${result[0]['GROUP_CONCAT(e.grade)']}입니다.`);
}

const getstudent = async (course) =>{
    const queary = `
    select GROUP_CONCAT(s.student_name), co.course_name, GROUP_CONCAT(e.grade) from enrollments e
    inner join students s on e.student_id = s.student_id
    inner join courses co on e.course_id = co.course_id
    where co.course_name = '자료구조'
    GROUP BY co.course_name;
    `

    const result = await runQuery(queary);
    /*console.log(result);*/
    console.log(`${course} 과목을 수강하는 학생은 ${result[0]['GROUP_CONCAT(s.student_name)']}입니다.`);
}


(async () => {
    getgpa('가나다');
    getstudent('자료구조');
})();
