const stu_minors = require('../../controllers/stu_minors');

module.exports = (app) => {
    app.get('/stu_minors', stu_minors.getAll);
};
