const express = require('express');
const userRoute = require('./routes/user.routes');
const authLinkedin = require('./auth/auth.linkedin');
const authGoogle = require('./auth/auth.google');
const userProfileRoute = require('./routes/userProfile.routes')

const app = express();
const path = require('path');
const multer = require('multer');

// const logger = require('./logger');

// CORS
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/api/user', userRoute);
app.use('/user/profile', userProfileRoute);

app.use('/auth/linkedin', authLinkedin);
app.use('/auth/google', authGoogle);
app.use('/images', express.static('images'));

app.listen(8080, () => {
  console.log('Server started on PORT 8080');
});

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

module.exports = upload;

/*
create table user_profile( id SERIAL PRIMARY KEY, 
  firstname varchar(255) not null, 
  lastname varchar(255) not null, 
  company varchar(100), 
  jobrole varchar(100), 
  university varchar(255), 
  program_of_study varchar(255), 
  email VARCHAR ( 255 ) UNIQUE NOT NULL,  
  calendlylink text,
  image text);
*/