const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createUserDetailService, getUserCardDetailService } = require('../service/user.service');

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now().toString() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: imageStorage });

// @route    POST api/user/
// @desc     Create user profile
// @access   Private
router.post('/', upload.single('image'), (req, res) => createUserDetailService(req, res));

// @route    GET api/user/
// @desc     Retreive mentor card details
// @access   Private
router.get('/', (req, res) => getUserCardDetailService(req, res));


module.exports = router;