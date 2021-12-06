const StuCourseTaken = require('../../models/stu_course_taken');

exports.getAll = (req, res) => {
    StuCourseTaken.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving stu_course_taken.',
            });
        else {
            res.send(data);
        }
    });
};

exports.getTakenCourses = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }
    const body = new StuCourseTaken({ ...req.body });
    StuCourseTaken.getTakenCourses(body, (err, data) => {
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

exports.getCoursesFromId = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }
    const body = new StuCourseTaken({ ...req.body });
    StuCourseTaken.getCoursesFromId(body, (err, data) => {
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
