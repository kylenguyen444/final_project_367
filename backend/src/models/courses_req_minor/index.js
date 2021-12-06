const sql = require('../db');
const { logger } = require('../../utils');

// +-----------------+-------------+------+-----+---------+-------+
// | Field           | Type        | Null | Key | Default | Extra |
// +-----------------+-------------+------+-----+---------+-------+
// | course_id       | varchar(25) | NO   |     | NULL    |       |
// | dept_id         | int         | YES  | MUL | NULL    |       |
// | major_minor_req | int         | YES  | MUL | NULL    |       |
// +-----------------+-------------+------+-----+---------+-------+

const CoursesMinorReq = function (courses_req_minor) {
    this.course_id = courses_req_minor.course_id;
    this.dept_id = courses_req_minor.dept_id;
    this.major_minor_req = courses_req_minor.major_minor_req;
    this.major_id = courses_req_minor.major_id;
    this.stu_email = courses_req_minor.stu_email;
};

CoursesMinorReq.getAll = (result) => {
    sql.query('SELECT * FROM courses_req_minor', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('courses_req_minor: ', res);
        result(null, res);
    });
};

CoursesMinorReq.remainingCourses = (body, result) => {
    const { major_id, stu_email } = body;
    sql.query(
        `select
            courses_req_minor.course_id,
            department_courses.course_name
        from 
            courses_req_minor
        inner join
            department_courses
        on
            courses_req_minor.course_id = department_courses.course_id
        where
            courses_req_minor.major_minor_req 
        in 
            (select major_id from majors_and_minors where major_id = ? and credits_to_minor != 0) 
        and 
            courses_req_minor.course_id 
        not in 
            (select course_id from stu_course_taken where stu_id in (select stu_id from students where stu_email = ?));
        `,
        [major_id, stu_email],
        (err, res) => {
            if (err) {
                logger('error', err);
                result(err, null);
                return;
            }
            if (res.length) {
                logger('found CoursesMinorReq: ', res);
                result(null, res);
                return;
            }
            result({ kind: 'not_found' }, null);
        }
    );
};

module.exports = CoursesMinorReq;
