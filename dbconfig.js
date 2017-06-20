const Sequelize = require("sequelize");

const database = new Sequelize({
    'dialect': 'sqlite',
    'storage': './db/database.sqlite'
});

module.exports = database;