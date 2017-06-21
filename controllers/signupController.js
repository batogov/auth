const User = require('../models/user');
const generateSalt = require('../lib/generateSalt');
const md5 = require('md5');

function validateInput(data) {
    let errors = {};

    const usernameRegExp = /^[A-z0-9]+$/;
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (data.username.length < 4 || data.username.length > 20) {
        errors.username = 'Username must contain 4-20 characters';
    }

    if (!usernameRegExp.test(data.username)) {
        errors.username = 'Username can only contain letters and digits';
    }

    if (!emailRegExp.test(data.email)) {
        errors.email = 'Email must be valid';
    }

    if (data.password !== data.confirmPassword) {
        errors.password = true;
        errors.confirmPassword = 'Password does not match the confirm password';
    }

    return errors;
}

const signupController = function(req, res) {
    let errors = {};

    const checkUsername = User.findOne({ 
        where: { username: req.body.username } 
    }).then(user => {
        if (user !== null) {
            errors.username = 'Sorry, that username is already taken';
        }
    });

    const checkEmail = User.findOne({ 
        where: { email: req.body.email } 
    }).then(user => {
        if (user !== null) {
            errors.email = 'Sorry, that email is already taken';
        }
    });

    errors = Object.assign(validateInput(req.body), errors);

    Promise.all([checkUsername, checkEmail]).then(() => {
        if (Object.keys(errors).length !== 0) {
            res.status(403).json(errors);
        } else {
            const salt = generateSalt();
            const hashedPassword = md5(md5(req.body.password) + salt);

            const userData = {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                salt: salt
            }

            User.create(userData).then(user => {
                res.status(200).end();
            });
        }
    })
}

module.exports = signupController;