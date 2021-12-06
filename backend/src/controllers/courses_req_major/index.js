const CoursesReqMajor = require('../../models/courses_req_major');

exports.getAll = (req, res) => {
    CoursesReqMajor.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving courses_req_major.',
            });
        else {
            res.send(data);
        }
    });
};

exports.remainingCourses = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }
    const body = new CoursesReqMajor({ ...req.body });
    CoursesReqMajor.remainingCourses(body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving CoursesReqMajor.',
            });
        else {
            res.send(data);
        }
    });
};
