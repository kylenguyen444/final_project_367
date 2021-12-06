const CoursesPrereq = require('../../models/courses_prereq');

exports.getAll = (req, res) => {
    CoursesPrereq.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving courses_prereq.',
            });
        else {
            res.send(data);
        }
    });
};
