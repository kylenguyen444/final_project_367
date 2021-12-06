const sql = require('../db');
const { logger } = require('../../utils');

// +-----------+-------------+------+-----+---------+-------+
// | Field     | Type        | Null | Key | Default | Extra |
// +-----------+-------------+------+-----+---------+-------+
// | stu_id    | int         | YES  | MUL | NULL    |       |
// | course_id | varchar(15) | YES  | MUL | NULL    |       |
// | grade     | double      | YES  |     | NULL    |       |
// +-----------+-------------+------+-----+---------+-------+

const StuCourseTaken = function (stu_course_taken) {
    this.stu_id = stu_course_taken.stu_id;
    this.course_id = stu_course_taken.course_id;
    this.grade = stu_course_taken.grade;
};

StuCourseTaken.getAll = (result) => {
    sql.query('SELECT * FROM stu_course_taken', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('stu_course_taken: ', res);
        result(null, res);
    });
};

StuCourseTaken.getTakenCourses = (body, result) => {
    const { stu_id } = body;
    sql.query(
        `
        select
            stu_course_taken.stu_id,
            stu_course_taken.course_id,
            course_grad_requirement.requirement
        from 
            stu_course_taken
        inner join
            course_grad_requirement
        on
            stu_course_taken.course_id = course_grad_requirement.course_id
        where stu_id = ?;`,
        stu_id,
        (err, res) => {
            if (err) {
                logger('error', err);
                result(err, null);
                return;
            }
            if (res.length) {
                logger('found StuCourseTaken: ', res);
                result(null, res);
                return;
            }
            result({ kind: 'not_found' }, null);
        }
    );
};
// get courses info from department_courses
StuCourseTaken.getCoursesFromId = (body, result) => {
    const { stu_id } = body;
    sql.query(
        `
        select
            stu_course_taken.course_id,
            stu_course_taken.grade,
            department_courses.course_name, 
            department_courses.dept_id,
            department_courses.course_credit,
            departments.dept_name
        from 
            stu_course_taken
        inner join
            department_courses
        on
            department_courses.course_id = stu_course_taken.course_id
        inner join
            departments
        on
            departments.dept_id = department_courses.dept_id
        where 
            stu_id = ?;`,
        stu_id,
        (err, res) => {
            if (err) {
                logger('error', err);
                result(err, null);
                return;
            }
            if (res.length) {
                logger('found StuCourseTaken: ', res);
                result(null, res);
                return;
            }
            result({ kind: 'not_found' }, null);
        }
    );
};

module.exports = StuCourseTaken;
