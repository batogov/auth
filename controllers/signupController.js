const User = require('../models/user');
const md5 = require('md5');

const signupController = function(req, res) {

    function generateSalt() {
        let salt = '';
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 10; i++) {
            salt += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return salt;
    }

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
            errors.password = 'Password does not match the confirm password';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0 ? true : false
        }
    }

    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
        res.status(403).json(errors);
    } else {
        const salt = generateSalt()
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
}

module.exports = signupController;