const stu_grades_credits = require('../../controllers/stu_grades_credits');

module.exports = (app) => {
    app.get('/stu_grades_credits', stu_grades_credits.getAll);
};
