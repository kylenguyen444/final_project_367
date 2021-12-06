const CoursesReqMinor = require('../../models/courses_req_minor');

exports.getAll = (req, res) => {
    CoursesReqMinor.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving courses_req_minor.',
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
    const body = new CoursesReqMinor({ ...req.body });
    CoursesReqMinor.remainingCourses(body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving CoursesReqMinor.',
            });
        else {
            res.send(data);
        }
    });
};
