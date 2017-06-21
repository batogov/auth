const Sequelize = require("sequelize");
const database = require('./../lib/dbconfig');

const User = database.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING
});

module.exports = User;