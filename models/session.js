const Sequelize = require("sequelize");
const database = require('../lib/dbconfig');

const Session = database.define('session', {
    username: Sequelize.STRING,
    sessionId: Sequelize.STRING
});

module.exports = Session;