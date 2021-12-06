const sql = require('../db');
const { logger } = require('../../utils');

// +------------------+--------------+------+-----+---------+-------+
// | Field            | Type         | Null | Key | Default | Extra |
// +------------------+--------------+------+-----+---------+-------+
// | major_name       | varchar(200) | YES  |     | NULL    |       |
// | major_id         | int          | NO   | PRI | NULL    |       |
// | credits_to_major | double       | YES  |     | NULL    |       |
// | credits_to_minor | double       | YES  |     | NULL    |       |
// | dept_id          | int          | YES  | MUL | NULL    |       |
// +------------------+--------------+------+-----+---------+-------+

const MajorsAndMinors = function (majors_and_minors) {
    this.major_name = majors_and_minors.major_name;
    this.major_id = majors_and_minors.major_id;
    this.credits_to_major = majors_and_minors.credits_to_major;
    this.credits_to_minor = majors_and_minors.credits_to_minor;
    this.dept_id = majors_and_minors.dept_id;
};

MajorsAndMinors.getAll = (result) => {
    sql.query('SELECT * FROM majors_and_minors', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('majors_and_minors: ', res);
        result(null, res);
    });
};

module.exports = MajorsAndMinors;
