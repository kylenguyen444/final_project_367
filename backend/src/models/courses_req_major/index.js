const sql = require('../db');
const { logger } = require('../../utils');

// +-----------------+-------------+------+-----+---------+-------+
// | Field           | Type        | Null | Key | Default | Extra |
// +-----------------+-------------+------+-----+---------+-------+
// | course_id       | varchar(25) | NO   |     | NULL    |       |
// | dept_id         | int         | YES  | MUL | NULL    |       |
// | major_major_req | int         | YES  | MUL | NULL    |       |
// +-----------------+-------------+------+-----+---------+-------+

const CoursesMajorReq = function (courses_req_major) {
    this.course_id = courses_req_major.course_id;
    this.dept_id = courses_req_major.dept_id;
    this.major_major_req = courses_req_major.major_major_req;
    this.major_id = courses_req_major.major_id;
    this.stu_email = courses_req_major.stu_email;
};

CoursesMajorReq.getAll = (result) => {
    sql.query('SELECT * FROM courses_req_major', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('courses_req_major: ', res);
        result(null, res);
    });
};

CoursesMajorReq.remainingCourses = (body, result) => {
    const { major_id, stu_email } = body;

    sql.query(
        `
        select 
            courses_req_major.course_id,
            department_courses.course_name
        from 
            courses_req_major
        inner join
            department_courses
        on
            department_courses.course_id = courses_req_major.course_id
        where 
            courses_req_major.major_major_req 
        in 
            (select major_id from majors_and_minors where major_id = ?)
        and 
            courses_req_major.course_id 
        not in 
        (select course_id from stu_course_taken where stu_id IN (select stu_id from students where stu_email = ?));
        `,
        [major_id, stu_email],
        (err, res) => {
            if (err) {
                logger('error', err);
                result(err, null);
                return;
            }
            if (res.length) {
                logger('found CoursesMajorReq: ', res);
                result(null, res);
                return;
            }
            result({ kind: 'not_found' }, null);
        }
    );
};

module.exports = CoursesMajorReq;
