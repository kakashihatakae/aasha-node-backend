const express = require('express');
const userRoute = require('./routes/user.routes');
const authLinkedin = require('./auth/auth.linkedin');
const authGoogle = require('./auth/auth.google');
const app = express();
// const logger = require('./logger');

app.use('/api/user', userRoute);
app.use('/auth/linkedin', authLinkedin);
app.use('/auth/google', authGoogle);

app.listen(8080, () => {
  console.log('Server started on PORT 8080');
});

/*
    request life cycle
    server -> controllers -> service -> dao -> 

*/
