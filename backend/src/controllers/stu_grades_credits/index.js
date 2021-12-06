const StuGradesCredits = require('../../models/stu_grades_credits');

exports.getAll = (req, res) => {
    StuGradesCredits.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving stu_grades_credits.',
            });
        else {
            res.send(data);
        }
    });
};
