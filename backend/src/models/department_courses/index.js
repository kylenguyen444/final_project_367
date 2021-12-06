const sql = require('../db');
const { logger } = require('../../utils');

// +--------------------+---------------+------+-----+---------+-------+
// | Field              | Type          | Null | Key | Default | Extra |
// +--------------------+---------------+------+-----+---------+-------+
// | course_id          | varchar(25)   | NO   | PRI | NULL    |       |
// | course_name        | varchar(127)  | YES  |     | NULL    |       |
// | dept_id            | int           | YES  | MUL | NULL    |       |
// | course_credit      | double        | YES  |     | NULL    |       |
// | course_description | varchar(5000) | YES  |     | NULL    |       |
// +--------------------+---------------+------+-----+---------+-------+

const DepartmentCourses = function (department_courses) {
    this.course_id = department_courses.course_id;
    this.course_name = department_courses.course_name;
    this.dept_id = department_courses.dept_id;
    this.course_credit = department_courses.course_credit;
    this.course_description = department_courses.course_description;
};

DepartmentCourses.getAll = (result) => {
    sql.query('SELECT * FROM department_courses', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('department_courses: ', res);
        result(null, res);
    });
};

DepartmentCourses.getCourseInfo = (req, result) => {
    const { course_id } = req.query;

    sql.query(
        `SELECT * FROM department_courses WHERE course_id = ?`,
        course_id,
        (err, res) => {
            if (err) {
                logger('error: ', err);
                result(null, err);
                return;
            }

            logger('department_courses: ', res);
            result(null, res);
        }
    );
};

module.exports = DepartmentCourses;
