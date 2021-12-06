const sql = require('../db');
const { logger } = require('../../utils');

// +---------------+--------------+------+-----+---------+-------+
// | Field         | Type         | Null | Key | Default | Extra |
// +---------------+--------------+------+-----+---------+-------+
// | stu_id        | int          | NO   | PRI | NULL    |       |
// | stu_firstname | varchar(255) | NO   |     | NULL    |       |
// | stu_lastname  | varchar(255) | NO   |     | NULL    |       |
// | stu_email     | varchar(255) | YES  |     | NULL    |       |
// | adv_id        | int          | YES  | MUL | NULL    |       |
// | stu_password  | varchar(8)   | YES  |     | NULL    |       |
// +---------------+--------------+------+-----+---------+-------+

const Students = function (student) {
    this.stu_id = student.stu_id;
    this.stu_firstname = student.stu_firstname;
    this.stu_lastname = student.stu_lastname;
    this.stu_email = student.stu_email;
    this.adv_id = student.adv_id;
    this.stu_password = student.stu_password;
};

Students.getAll = (result) => {
    sql.query('SELECT * FROM students', (err, res) => {
        if (err) {
            logger('error: ', err);
            result(null, err);
            return;
        }

        logger('student: ', res);
        result(null, res);
    });
};

Students.getProfile = (body, result) => {
    const { stu_email } = body;
    sql.query(
        `
        select
            students.stu_id,
            students.stu_firstname,
            students.stu_lastname,
            students.stu_email,
            advisor.adv_firstname,
            advisor.adv_lastname,
            advisor.adv_email,
            stu_grades_credits.gpa,
            stu_grades_credits.credits
        from
            students
        inner join
            advisor
        on
            advisor.adv_id = students.adv_id
        inner join
			stu_grades_credits
		on
			stu_grades_credits.stu_id = students.stu_id
        where
            students.stu_email = ?;`,
        stu_email,
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

Students.getMajorFromId = (body, result) => {
    const { stu_id } = body;
    sql.query(
        `
        select 
            majors_and_minors.major_name as "major",
            majors_and_minors.major_id
        from 
            majors_and_minors
        where	
            majors_and_minors.major_id
        in
            (select major_id from stu_majors where stu_id = ?);`,
        stu_id,
        (err, res) => {
            if (err) {
                logger('error', err);
                result(err, null);
                return;
            }
            if (res.length) {
                logger('found student major: ', res);
                result(null, res);
                return;
            }
            result({ kind: 'not_found' }, null);
        }
    );
};

Students.getMinorFromId = (body, result) => {
    const { stu_id } = body;
    sql.query(
        `
        select 
            majors_and_minors.major_name as "minor",
            majors_and_minors.major_id
        from 
            majors_and_minors
        where	
            majors_and_minors.major_id
        in
            (select major_id from stu_minors where stu_id = ?);`,
        stu_id,
        (err, res) => {
            if (err) {
                logger('error', err);
                result(err, null);
                return;
            }
            if (res.length) {
                logger('found student major: ', res);
                result(null, res);
                return;
            }
            result({ kind: 'not_found' }, null);
        }
    );
};

module.exports = Students;
