const grad_requirement = require('../../controllers/grad_requirement');

module.exports = (app) => {
    app.get('/grad_requirement', grad_requirement.getAll);
};
