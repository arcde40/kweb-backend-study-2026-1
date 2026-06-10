const {runQuery} = require('./database');

const getAllGradeFromAStudent = async (name) => {
    const result = await runQuery('select grade from enrollments join students on enrollments.student_id = students.student_id join courses on enrollments.course_id = courses.course_id where students.student_name = "' + name + '"');
    console.log(result);
}

const getAllStudentsFromACourse = async (courseName) => {
    const result = await runQuery('select student_name from students join enrollments on students.student_id = enrollments.student_id join courses on enrollments.course_id = courses.course_id where courses.course_name = "' + courseName + '"');
    console.log(result);
}

const hell = async (student_id, course_id, grade) => {
    return runQuery('insert into enrollments values (' + student_id + ',' + course_id + ',"' + grade + '")');
}

(() => {
    getAllGradeFromAStudent("가나다");
    getAllStudentsFromACourse("데이터베이스");
    hell(1, 2, "A+");
})();