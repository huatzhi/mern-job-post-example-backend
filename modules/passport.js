const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Collections = require("../collections/collections");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    console.log("jwt_payload", jwt_payload)
    let recruiter = await Collections.Recruiter.findById(jwt_payload._id).lean();
    if (recruiter) {
      return done(null, { _id: recruiter._id, name: recruiter.name, email: recruiter.email });
    }
    return done(null, false);
  } catch (e) {
    console.error("JwtStrategy failure", e);
    return Promise.reject(e);
  }
});

module.exports = passport => {
  passport.use(strategy);
};