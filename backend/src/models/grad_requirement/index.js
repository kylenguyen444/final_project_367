const sql = require('../db');
const { logger } = require('../../utils');

// +---------------------+--------------+------+-----+---------+-------+
// | Field               | Type         | Null | Key | Default | Extra |
// +---------------------+--------------+------+-----+---------+-------+
// | requirement         | varchar(25)  | NO   | PRI | NULL    |       |
// | req_details         | varchar(511) | YES  |     | NULL    |       |
// | num_course_required | int          | YES  |     | NULL    |       |
// +---------------------+--------------+------+-----+---------+-------+

const GradRequirement = function (grad_requirement) {
    this.requirement = grad_requirement.requirement;
    this.req_details = grad_requirement.req_details;
    this.num_course_required = grad_requirement.num_course_required;
};

GradRequirement.getAll = (result) => {
    sql.query('SELECT * FROM grad_requirement', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('grad_requirement: ', res);
        result(null, res);
    });
};

module.exports = GradRequirement;
