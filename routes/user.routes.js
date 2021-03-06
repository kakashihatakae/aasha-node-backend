const express = require('express');
const router = express.Router();

const {
  userLoginService,
  userSignupService,
  getUserDetailsService,
  editUserDetailsService,
  createUserDetailService,
  getUserCardDetailService,
} = require('../service/user.service');

const upload = require('../server');

// @route    POST api/user/login
// @desc     User Loginin
// @access   Private
router.post('/login', (req, res) => userLoginService(req, res));

// @route    POST api/user/signin
// @desc     User Signin
// @access   Private
router.post('/signup', (req, res) => userSignupService(req, res));

// @route    GET api/user/details
// @desc     Get User details
// @access   Private
router.get('/details', (req, res) => getUserDetailsService(req, res));

// @route    POST api/user/signin
// @desc     Change user details
// @access   Private
router.post('/details', (req, res) => editUserDetailsService(req, res));

module.exports = router;