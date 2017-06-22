const User = require('../models/user');
const Session = require('../models/session');
const generateSalt = require('../lib/generateSalt');
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
                error = false;

                const sessionId = md5(user.username + generateSalt());
                const sessionData = {
                    username: user.username,
                    sessionId: sessionId   
                };

                Session.create(sessionData).then(user => {
                    res.status(200);
                    res.cookie('sessionId', sessionId, { maxAge: 900000, httpOnly: true });
                    res.end();
                });
            } 
        }

        if (error) { 
            res.status(403).end();
        }
    });
}

module.exports = signinController;

