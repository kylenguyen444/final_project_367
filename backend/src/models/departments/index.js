const sql = require('../db');
const { logger } = require('../../utils');

// +-----------+--------------+------+-----+---------+-------+
// | Field     | Type         | Null | Key | Default | Extra |
// +-----------+--------------+------+-----+---------+-------+
// | dept_id   | int          | NO   | PRI | NULL    |       |
// | dept_name | varchar(200) | YES  |     | NULL    |       |
// +-----------+--------------+------+-----+---------+-------+

const Departments = function (departments) {
    this.dept_id = departments.dept_id;
    this.dept_name = departments.dept_name;
};

Departments.getAll = (result) => {
    sql.query('SELECT * FROM departments', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('departments: ', res);
        result(null, res);
    });
};

module.exports = Departments;
