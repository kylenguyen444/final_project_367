const majors_and_minors = require('../../controllers/majors_and_minors');

module.exports = (app) => {
    app.get('/majors_and_minors', majors_and_minors.getAll);
};
