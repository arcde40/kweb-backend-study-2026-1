const {runQuery, getGradesByStudentName, getStudentsByCourseName, enrollStudentInCourse} = require('./database');

(async () => {
    console.log('All students sample:', await runQuery('select * from students limit 5;'));

    console.log('\nGrades for student name "가나다":');
    console.log(await getGradesByStudentName('가나다'));

    console.log('\nStudents who took course "데이터베이스":');
    console.log(await getStudentsByCourseName('데이터베이스'));

    console.log('\nEnroll student 1 into course 2 with grade B+ (upserts if exists):');
    console.log(await enrollStudentInCourse(1, 2, 'B+'));

    console.log('\nGrades for student name "가나다" after enrollment:');
    console.log(await getGradesByStudentName('가나다'));
})();