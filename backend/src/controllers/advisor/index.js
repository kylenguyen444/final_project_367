const Advisor = require('../../models/advisor');

exports.getAll = (req, res) => {
    Advisor.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving advisor.',
            });
        else {
            res.send(data);
        }
    });
};

exports.getProfile = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }
    const body = new Advisor({ ...req.body });
    Advisor.getProfile(body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving advisor profile.',
            });
        else {
            res.send(data);
        }
    });
};
