const Students = require('../../models/students');

exports.getAll = (req, res) => {
    Students.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving students.',
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
    const body = new Students({ ...req.body });
    Students.getProfile(body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving student profile.',
            });
        else {
            res.send(data);
        }
    });
};

exports.getMajorFromId = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }
    const body = new Students({ ...req.body });
    Students.getMajorFromId(body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving student major.',
            });
        else {
            res.send(data);
        }
    });
};

exports.getMinorFromId = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }
    const body = new Students({ ...req.body });
    Students.getMinorFromId(body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving student minor.',
            });
        else {
            res.send(data);
        }
    });
};
