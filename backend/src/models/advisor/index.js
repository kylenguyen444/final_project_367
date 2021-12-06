const sql = require('../db');
const { logger } = require('../../utils');

// +---------------+--------------+------+-----+---------+-------+
// | Field         | Type         | Null | Key | Default | Extra |
// +---------------+--------------+------+-----+---------+-------+
// | adv_id        | int          | NO   | PRI | NULL    |       |
// | adv_firstname | varchar(255) | NO   |     | NULL    |       |
// | adv_lastname  | varchar(255) | NO   |     | NULL    |       |
// | adv_email     | varchar(200) | YES  |     | NULL    |       |
// | phone_number  | mediumtext   | YES  |     | NULL    |       |
// | dept_id       | int          | YES  | MUL | NULL    |       |
// | adv_password  | varchar(8)   | YES  |     | NULL    |       |
// +---------------+--------------+------+-----+---------+-------+

const Advisor = function (advisor) {
    this.adv_id = advisor.adv_id;
    this.adv_firstname = advisor.adv_firstname;
    this.adv_lastname = advisor.adv_lastname;
    this.adv_email = advisor.adv_email;
    this.phone_number = advisor.phone_number;
    this.dept_id = advisor.dept_id;
    this.adv_password = advisor.adv_password;
};

Advisor.getAll = (result) => {
    sql.query('SELECT * FROM advisor', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('advisor: ', res);
        result(null, res);
    });
};

Advisor.getProfile = (body, result) => {
    const { adv_email } = body;
    sql.query(
        `select
            advisor.adv_id,
            advisor.adv_firstname, 
            advisor.adv_lastname, 
            advisor.adv_email, 
            advisor.phone_number, 
            departments.dept_name 
        from 
            advisor 
        inner join
            departments
        on
            departments.dept_id = advisor.dept_id
        where
            advisor.adv_email = ?;`,
        adv_email,
        (err, res) => {
            if (err) {
                logger('error', err);
                result(err, null);
                return;
            }
            if (res.length) {
                logger('found student: ', res[0]);
                result(null, res[0]);
                return;
            }
            result({ kind: 'not_found' }, null);
        }
    );
};

module.exports = Advisor;
