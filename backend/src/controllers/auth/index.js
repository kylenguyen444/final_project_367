const Auth = require('../../models/auth');

exports.login = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }
    const auth = new Auth({ ...req.body });
    Auth.login(auth, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving auth info.',
            });
        else {
            res.send(data);
        }
    });
};
