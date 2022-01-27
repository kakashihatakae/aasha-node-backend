const express = require('express');
const app = express();
const pool = require('./dbconfig');
const path = require('path')
const multer = require('multer');

const listener = app.listen(6000, () => {
  // better handeling than console.log duh !! 
  console.log(`started app: ${listener.address().port}`)
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now().toString() + path.extname(file.originalname))
  }
})

const upload = multer({storage: imageStorage})

app.use(express.json());
app.use('/images', express.static('images'));

app.post("/user", upload.single('image') , (req, res) => {

  try {
    const userInfo = req.body;
    const newUser = pool.query(" INSERT INTO user_profile \
        (firstname, lastname, company, jobrole, university, program_of_study, email, calendlylink, image) \
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", 
    [userInfo.firstname, userInfo.lastname, 
      userInfo.company, userInfo.jobrole, userInfo.university, 
      userInfo.program_of_study,  userInfo.email, userInfo.calendlylink, `http://localhost:6000/${req.file.path}`]);
    
      // console.log(`${'http://localhost:6000'}/req.file.path`);
  } catch(e){
    console.log(e)
  }
  res.json(req.body);
})

app.get("/user", async (req, res) => {
  try {
    const mentorListing = await pool.query(" SELECT * FROM user_profile ");
    console.log(mentorListing.rows);
    res.json(mentorListing.rows)
  } catch(e) {
    console.log(e);
  }
});


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