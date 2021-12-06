const advisor = require('../../controllers/advisor');

module.exports = (app) => {
    app.get('/advisor', advisor.getAll);
    app.post('/advisor/profile', advisor.getProfile);
};
