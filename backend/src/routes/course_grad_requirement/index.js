const course_grad_requirement = require('../../controllers/course_grad_requirement');

module.exports = (app) => {
    app.get('/course_grad_requirement', course_grad_requirement.getAll);
};
