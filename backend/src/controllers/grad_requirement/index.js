const GradRequirement = require('../../models/grad_requirement');

exports.getAll = (req, res) => {
    GradRequirement.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving grad_requirement.',
            });
        else {
            res.send(data);
        }
    });
};
