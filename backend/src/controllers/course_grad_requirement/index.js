const CourseGradRequirement = require('../../models/course_grad_requirement');

exports.getAll = (req, res) => {
    CourseGradRequirement.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving course_grad_requirement.',
            });
        else {
            res.send(data);
        }
    });
};
