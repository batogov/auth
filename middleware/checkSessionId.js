const Session = require('../models/session');

const checkSessionId = function (req, res, next) {
    console.log("Middleware!");
    next();
};

module.exports = checkSessionId;