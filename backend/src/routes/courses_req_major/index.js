const courses_req_major = require('../../controllers/courses_req_major');

module.exports = (app) => {
    app.get('/courses_req_major', courses_req_major.getAll);
    app.post(
        '/courses_req_major/remaining_courses',
        courses_req_major.remainingCourses
    );
};
