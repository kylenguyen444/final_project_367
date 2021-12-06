const courses_prereq = require('../../controllers/courses_prereq');

module.exports = (app) => {
    app.get('/courses_prereq', courses_prereq.getAll);
};
