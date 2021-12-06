const stu_majors = require('../../controllers/stu_majors');

module.exports = (app) => {
    app.get('/stu_majors', stu_majors.getAll);
};
