const Departments = require('../../models/departments');

exports.getAll = (req, res) => {
    Departments.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving departments.',
            });
        else {
            res.send(data);
        }
    });
};
