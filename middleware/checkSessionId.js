const Session = require('../models/session');

const checkSessionId = function (req, res, next) {

    req.isLoggedin = false;
    let sessionId = req.cookies.sessionId;

    if (sessionId !== undefined) {
        Session.findOne({ 
            where: { sessionId: sessionId } 
        }).then(session => {
            if (session !== null) {
                req.isLoggedin = true;
                req.user = {
                    username: session.username
                }
            }
            next();
        });
    } else {
        next();
    }

};

module.exports = checkSessionId;