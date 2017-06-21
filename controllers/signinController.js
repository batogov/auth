const User = require('../models/user');
const md5 = require('md5');

const signinController = function(req, res) {
    let error = true;

    User.findOne({ 
        where: { username: req.body.username } 
    }).then(user => {
        if (user !== null) {
            const salt = user.salt;
            const hashedPassword = md5(md5(req.body.password) + salt);

            if (hashedPassword === user.password) {
                res.status(200).end();
                error = false;
            } 
        }

        if (error) { 
            res.status(403).end();
        }
    });
}

module.exports = signinController;

