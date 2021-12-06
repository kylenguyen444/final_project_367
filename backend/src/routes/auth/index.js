const auth = require('../../controllers/auth');

module.exports = (app) => {
    app.post('/student-login', auth.login);
};
