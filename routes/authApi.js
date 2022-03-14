const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('basic-auth');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') })

//use sessions for tracking logins
router.use(session({
  secret: process.env.SESSIONSECRET,
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGOURL,
  })
}));

router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.json({
          message: 'Session ended.',
          severity: 'success',
        });
      }
    });
  }
});

router.post('/login', (req, res, next) => {

  //pull out credentials from header
  const credentials = auth(req);

  //authenticate credentials
  User.authenticate(credentials.name, credentials.pass, function(error, user){
    if (error || !user) {
      var err = new Error('Wrong username or password.');
      err.statusCode = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
      res.json({
        message: `${user.username} logged in.`,
        severity: 'success',
      })
    }
  });
});

router.post('/signup', (req, res, next) => {
  if (req.body.username && req.body.password) {

      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.statusCode = 400;
        return next(err);
      }

      // create object with form input
      var userData = {
        username: req.body.username,
        password: req.body.password
      };

      // use schema's `create` method to insert document into Mongo
      User.create(userData, function (error, user) {
        if (error) {
          if (error.code === 11000){
            var err = new Error(`Username "${error.keyValue.username}" already exists.`);
            err.statusCode = 400;
            return next(err);
          } else {
            return next(error);
          }
        } else {
          req.session.userId = user._id;
          return res.json({
            message: `User: ${userData.username} was created succesfully.`,
            severity: 'success',
          });
        }
      });

    } else {
      var err = new Error('All fields required.');
      err.statusCode = 400;
      return next(err);
    }
});

router.get('/isauthenticated', (req, res, next) => {
  if(req.session && req.session.userId) {
    res.json({
      authenticated: 'true'
    });
  } else {
    res.json({
      authenticated: 'false'
    });
  }
});

module.exports = router;