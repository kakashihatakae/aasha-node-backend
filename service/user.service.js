const pool = require('../dbconfig');
const k = require('express');

const userLoginService = (req, res) => {
  res.status(200).json({
    message: 'login service started',
  });
};

const userSignupService = (req, res) => {
  res.status(200).json({
    message: 'user signup service started',
  });
};

const getUserDetailsService = (req, res) => {
  res.status(200).json({
    message: 'get user details service started',
  });
};

const editUserDetailsService = (req, res) => {
  res.json(req.body);
  console.log(req.body);
  // res.status(200).json({
  //   message: 'change user details service started',
  // });
};

const createUserDetailService = (req, res) => {
  try {
    const userInfo = req.body;
    // const newUser = pool.query(
    //   ' INSERT INTO user_profile \
    //     (firstname, lastname, company, jobrole, university, program_of_study, email, calendlylink, image) \
    //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    //   [
    //     userInfo.firstname,
    //     userInfo.lastname,
    //     userInfo.company,
    //     userInfo.jobrole,
    //     userInfo.university,
    //     userInfo.program_of_study,
    //     userInfo.email,
    //     userInfo.calendlylink,
    //     `http://localhost:6000/${req.file.path}`,
    //   ]
    // );
  } catch (e) {
    console.log(e);
  }
  res.json(req.body);
};

const getUserCardDetailService = async (req, res) => {
  try {
    const mentorListing = await pool.query(' SELECT * FROM user_profile ');
    console.log(mentorListing.rows);
    res.json(mentorListing.rows);
  } catch (e) {

    console.log(e);
  }
}

module.exports = {
  userLoginService,
  userSignupService,
  getUserDetailsService,
  editUserDetailsService,
  createUserDetailService,
  getUserCardDetailService
};
