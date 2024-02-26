const { scrypt , randomBytes } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);

exports.PasswordManager = class {
    static async hash(password) {
        const salt = randomBytes(8).toString('hex');
        const buffer = await scryptAsync(password.trim(), salt, 64);

        return `${buffer.toString('hex')}.${salt}`;
    }

    static async compare(password, storedPassword) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buffer = await scryptAsync(password.trim(), salt, 64);

        if (buffer.toString('hex') !== hashedPassword) {
            throw new Error('not valid login credentials');
        }
    }
};
