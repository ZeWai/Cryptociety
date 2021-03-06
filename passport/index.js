const passport = require("passport");

const googleStrategy = require("./google").google;
const facebookStrategy = require("./facebook").facebook;
const loginStrategy = require("./loginStrategy.js");
const signupStrategy = require("./signupStrategy.js");
const serializeUser = require("./serializeDeserialize")
  .serializeUser;
const deserializeUser = require("./serializeDeserialize")
  .deserializeUser;

passport.use("google", googleStrategy);
passport.use("facebook", facebookStrategy);
passport.use("local-login", loginStrategy);
passport.use("local-signup", signupStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
module.exports = passport;