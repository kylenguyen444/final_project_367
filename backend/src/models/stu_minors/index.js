const sql = require('../db');
const { logger } = require('../../utils');

// +----------+--------+------+-----+---------+-------+
// | Field    | Type   | Null | Key | Default | Extra |
// +----------+--------+------+-----+---------+-------+
// | stu_id   | int    | YES  | MUL | NULL    |       |
// | major_id | int    | YES  | MUL | NULL    |       |
// | credits  | double | YES  |     | NULL    |       |
// +----------+--------+------+-----+---------+-------+

const StuMinors = function (stu_minors) {
    this.stu_id = stu_minors.stu_id;
    this.major_id = stu_minors.major_id;
    this.credits = stu_minors.credits;
};

StuMinors.getAll = (result) => {
    sql.query('SELECT * FROM stu_minors', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('stu_minors: ', res);
        result(null, res);
    });
};

module.exports = StuMinors;
