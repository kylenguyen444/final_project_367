const sql = require('../db');
const { logger } = require('../../utils');

// +---------+--------+------+-----+---------+-------+
// | Field   | Type   | Null | Key | Default | Extra |
// +---------+--------+------+-----+---------+-------+
// | stu_id  | int    | NO   | PRI | NULL    |       |
// | gpa     | double | YES  |     | NULL    |       |
// | credits | double | YES  |     | NULL    |       |
// +---------+--------+------+-----+---------+-------+

const StuGradesCredits = function (stu_grades_credits) {
    this.stu_id = stu_grades_credits.stu_id;
    this.gpa = stu_grades_credits.gpa;
    this.credits = stu_grades_credits.credits;
};

StuGradesCredits.getAll = (result) => {
    sql.query('SELECT * FROM stu_grades_credits', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('stu_grades_credits: ', res);
        result(null, res);
    });
};

module.exports = StuGradesCredits;
