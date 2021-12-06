const StuMajors = require('../../models/stu_majors');

exports.getAll = (req, res) => {
    StuMajors.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving stu_majors.',
            });
        else {
            res.send(data);
        }
    });
};
