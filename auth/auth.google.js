const router = require('express').Router();
const passport = require('passport');
require('https').globalAgent.options.rejectUnauthorized = false;

var GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID =
  '42313400255-f5efp48nj9gr4fbflq6mna72q7q0uds6.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:8080/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile.photos[0].value);
    }
  )
);

router.get('', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router;
