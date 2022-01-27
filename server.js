const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// const routerIndex = require('./routes/index')
const passport = require('passport');

app.use(bodyParser.json());



let session = require('express-session');
const cookieParser = require("cookie-parser");
const cookieTime = 60000 * 60 * 24;
//session middleware
app.use(session({
  secret: 'secret',
  resave:true,
  saveUninitialized: false,
  cookie: {
    maxAge: cookieTime
  }
}))
app.use(passport.session())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));


require('dotenv').config() //loads the dotenv package
require('./config')
require('./db/database')
const router = require('./routes/routes')
app.use('/', router)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
