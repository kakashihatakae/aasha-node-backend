var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var app = require('express').Router();

var LINKEDIN_CLIENT_ID = '771crk0ic4glq3';
var LINKEDIN_CLIENT_SECRET = 'BEokph4RSsHndbTf';
var Linkedin = require('node-linkedin')(
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new LinkedInStrategy(
    {
      clientID: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:8080/auth/linkedin/callback',
      scope: ['r_emailaddress', 'r_basicprofile', 'rw_company_admin'],
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
      req.session.accessToken = accessToken;
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

app.get(
  '',
  passport.authenticate('linkedin', { state: 'SOME STATE' }),
  function (req, res) {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  }
);

// for callback

app.get(
  '/callback',
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  }
);

module.exports = app;
