const sql = require('../db');
const { logger } = require('../../utils');

// +-------------+-------------+------+-----+---------+-------+
// | Field       | Type        | Null | Key | Default | Extra |
// +-------------+-------------+------+-----+---------+-------+
// | course_id   | varchar(25) | YES  | MUL | NULL    |       |
// | requirement | varchar(25) | YES  | MUL | NULL    |       |
// +-------------+-------------+------+-----+---------+-------+

const CourseGradRequirement = function (course_grad_requirement) {
    this.course_id = course_grad_requirement.course_id;
    this.requirement = course_grad_requirement.requirement;
};

CourseGradRequirement.getAll = (result) => {
    sql.query('SELECT * FROM course_grad_requirement', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('course_grad_requirement: ', res);
        result(null, res);
    });
};

module.exports = CourseGradRequirement;
