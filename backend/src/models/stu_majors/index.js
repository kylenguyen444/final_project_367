const sql = require('../db');
const { logger } = require('../../utils');

// +----------+--------+------+-----+---------+-------+
// | Field    | Type   | Null | Key | Default | Extra |
// +----------+--------+------+-----+---------+-------+
// | stu_id   | int    | YES  | MUL | NULL    |       |
// | major_id | int    | YES  | MUL | NULL    |       |
// | credits  | double | YES  |     | NULL    |       |
// +----------+--------+------+-----+---------+-------+

const StuMajors = function (stu_majors) {
    this.stu_id = stu_majors.stu_id;
    this.major_id = stu_majors.major_id;
    this.credits = stu_majors.credits;
};

StuMajors.getAll = (result) => {
    sql.query('SELECT * FROM stu_majors', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('stu_majors: ', res);
        result(null, res);
    });
};

module.exports = StuMajors;
