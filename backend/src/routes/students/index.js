const students = require('../../controllers/students');

module.exports = (app) => {
    app.get('/students', students.getAll);
    app.post('/students/profile', students.getProfile);
    app.post('/students/majors', students.getMajorFromId);
    app.post('/students/minors', students.getMinorFromId);
};
