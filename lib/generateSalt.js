const generateSalt = function() {
    let salt = '';
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 10; i++) {
        salt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return salt;
}

module.exports = generateSalt;