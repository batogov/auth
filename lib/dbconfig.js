const path = require('path');
const Sequelize = require("sequelize");

const database = new Sequelize({
    'dialect': 'sqlite',
    'storage': path.resolve(__dirname, '../db/database.sqlite')
});

module.exports = database;