const Session = require('../models/session');

const signoutController = function(req, res) {
    Session.destroy({
        where: { sessionId: req.cookies.sessionId }
    }).then(() => {
        res.clearCookie('sessionId');
        res.status(200).end();
    });
}

module.exports = signoutController;