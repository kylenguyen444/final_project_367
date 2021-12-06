const StuMinors = require('../../models/stu_minors');

exports.getAll = (req, res) => {
    StuMinors.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving stu_minors.',
            });
        else {
            res.send(data);
        }
    });
};
