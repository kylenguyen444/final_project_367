const sql = require('../db');
const { logger } = require('../../utils');

const Auth = function (auth) {
    this.stu_email = auth.stu_email;
    this.stu_password = auth.stu_password;
};

Auth.login = (auth, result) => {
    const { stu_email, stu_password } = auth;
    sql.query(
        'SELECT * FROM students WHERE stu_email = ?',
        stu_email,
        (err, res) => {
            if (err) {
                logger('error', err);
                result(err, null);
                return;
            }

            if (res.length) {
                if (res[0].stu_password === stu_password) {
                    result(null, res[0]);
                    return;
                }
            }

            result({ kind: 'not_found' }, null);
        }
    );
};

module.exports = Auth;
