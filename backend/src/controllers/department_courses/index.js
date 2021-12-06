const DepartmentCourses = require('../../models/department_courses');

exports.getAll = (req, res) => {
    DepartmentCourses.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving department_courses.',
            });
        else {
            res.send(data);
        }
    });
};

exports.getCourseInfo = (req, res) => {
    DepartmentCourses.getCourseInfo(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving department_courses info.',
            });
        else {
            res.send(data);
        }
    });
};
