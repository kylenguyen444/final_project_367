const MajorsAndMinors = require('../../models/majors_and_minors');

exports.getAll = (req, res) => {
    MajorsAndMinors.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving majors_and_minors.',
            });
        else {
            res.send(data);
        }
    });
};
