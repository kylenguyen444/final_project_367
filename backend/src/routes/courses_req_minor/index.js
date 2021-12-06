const courses_req_minor = require('../../controllers/courses_req_minor');

module.exports = (app) => {
    app.get('/courses_req_minor', courses_req_minor.getAll);
    app.post(
        '/courses_req_minor/remaining_courses',
        courses_req_minor.remainingCourses
    );
};
