DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS professors;

CREATE TABLE professors (
    prof_id INT AUTO_INCREMENT PRIMARY KEY,
    prof_name VARCHAR(100) NOT NULL,
    department VARCHAR(100)
);

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    major VARCHAR(100),
    gpa DECIMAL(3, 2) DEFAULT 0.00
);

CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL UNIQUE,
    credits INT,
    prof_id INT,
    FOREIGN KEY (prof_id) REFERENCES professors(prof_id)
);

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO professors (prof_name, department) VALUES
('김철수', '컴퓨터공학과'),
('이영희', '경영학과'),
('박지성', '영문학과'),
('최동원', '전자공학과'),
('안현수', '경제학과');

INSERT INTO students (student_name, major, gpa) VALUES
('가나다', '컴퓨터공학과', 3.50),
('라마바', '경영학과', 4.10),
('사아자', '컴퓨터공학과', 2.80),
('차카타', '영문학과', 3.90),
('파하', '경영학과', 3.20),
('홍길동', '전자공학과', 3.75),
('김연아', '경제학과', 4.20),
('박찬호', '컴퓨터공학과', 3.10),
('이순신', '경제학과', 3.80),
('신사임당', '영문학과', 4.00);

INSERT INTO courses (course_name, credits, prof_id) VALUES
('데이터베이스', 3, 1),
('마케팅원론', 3, 2),
('자료구조', 3, 1),
('셰익스피어 읽기', 2, 3),
('경영전략', 3, 2),
('회로이론', 3, 4),
('미시경제학', 3, 5),
('운영체제', 3, 1),
('재무관리', 3, 2),
('거시경제학', 3, 5);

INSERT INTO enrollments (student_id, course_id, grade) VALUES
(1, 1, 'A+'),
(1, 3, 'B0'),
(1, 8, 'A0'),
(2, 2, 'A0'),
(2, 5, 'A+'),
(2, 9, 'B+'),
(3, 1, 'C+'),
(3, 3, 'B+'),
(3, 8, 'B0'),
(4, 4, 'A0'),
(4, 10, 'A+'),
(5, 2, 'B+'),
(5, 5, 'B0'),
(5, 9, 'C+'),
(6, 6, 'A0'),
(6, 8, 'B+'),
(7, 7, 'A+'),
(7, 10, 'A0'),
(8, 1, 'B+'),
(8, 3, 'A0'),
(9, 7, 'B+'),
(9, 10, 'A0'),
(10, 4, 'A-');

COMMIT;