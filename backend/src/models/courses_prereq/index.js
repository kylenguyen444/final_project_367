const sql = require('../db');
const { logger } = require('../../utils');

// +------------------+-------------+------+-----+---------+-------+
// | Field            | Type        | Null | Key | Default | Extra |
// +------------------+-------------+------+-----+---------+-------+
// | course_id        | varchar(15) | YES  | MUL | NULL    |       |
// | prereq_course_id | varchar(15) | YES  |     | NULL    |       |
// +------------------+-------------+------+-----+---------+-------+

const CoursesPrereq = function (courses_prereq) {
    this.course_id = courses_prereq.course_id;
    this.prereq_course_id = courses_prereq.prereq_course_id;
};

CoursesPrereq.getAll = (result) => {
    sql.query('SELECT * FROM courses_prereq', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('courses_prereq: ', res);
        result(null, res);
    });
};

module.exports = CoursesPrereq;
