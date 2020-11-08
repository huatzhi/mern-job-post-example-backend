const jwt = require("jsonwebtoken");

const jwtHelper = {
  sign: payload => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 10 * 24 * 60 * 60 }),

  verify: token => jwt.verify(token, process.env.JWT_SECRET),
}

module.exports = jwtHelper;