const crypto = require("crypto");
const passport = require("passport");

const authHelper = {
  hash: (password) => {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString("hex")

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(salt + ":" + derivedKey.toString('hex'))
      });
    });
  },

  verify: (password, hash) => {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(":")
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key === derivedKey.toString('hex'))
      });
    });
  },

  // middleware
  authenticateRecruiter: passport.authenticate('jwt', { session: false }),
}

module.exports = authHelper;
