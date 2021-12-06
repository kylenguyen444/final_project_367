const departments = require('../../controllers/departments');

module.exports = (app) => {
    app.get('/departments', departments.getAll);
};
