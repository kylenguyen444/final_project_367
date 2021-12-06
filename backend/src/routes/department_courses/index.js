const department_courses = require('../../controllers/department_courses');

module.exports = (app) => {
    app.get('/department_courses', department_courses.getAll);
    app.get('/department_courses/info', department_courses.getCourseInfo);
};
