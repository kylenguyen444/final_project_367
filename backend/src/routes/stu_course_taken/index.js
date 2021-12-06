const stu_course_taken = require('../../controllers/stu_course_taken');

module.exports = (app) => {
    app.get('/stu_course_taken', stu_course_taken.getAll);
    app.post('/stu_course_taken', stu_course_taken.getTakenCourses);
    app.post(
        '/stu_course_taken/get_from_id',
        stu_course_taken.getCoursesFromId
    );
};
