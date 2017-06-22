const User = require('../models/user');
const Session = require('../models/session');

User.sync({ force: true });
Session.sync({ force: true });