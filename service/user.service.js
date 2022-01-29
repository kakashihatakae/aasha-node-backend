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
  res.status(200).json({
    message: 'change user details service started',
  });
};
module.exports = {
  userLoginService,
  userSignupService,
  getUserDetailsService,
  editUserDetailsService,
};
