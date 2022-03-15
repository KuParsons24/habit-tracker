const express = require('express');
const router = express.Router();
const User = require('../models/user');
const path = require('path');
const Habit = require('../models/habit');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

function isSession (req, res, next) {
  if (req.session && req.session.userId){
    next();
  } else {
    const err = new Error('ACCESS DENIED');
    err.statusCode = 401;
    next(err);
  }
}

router.route('/habits')
  .get(isSession, (req, res, next) => {
    Habit.getHabits(req.session.userId, function (error, habits){
      if (error) {
        next(error);
      }
      // console.log(habits);
      res.json(habits);
    });
  })

  .post(isSession, (req, res, next) => {
    const data = req.body;
    data.userId = req.session.userId;
    data.habitId = data.id;

    Habit.create(data, function (error, habit){
      if (error) {
        next(error);
      } else {
        res.json({
          message: 'Habit created.',
          severity: 'success',
        });
      }
    });
  })

  .put(isSession, (req, res, next) => {
    const data = req.body;
    data.userId = req.session.userId;
    data.habitId = data.id;

    Habit.editHabit(data.userId, data.habitId, data, function (error){
      if (error) {
        next(error);
      }
      res.json({
        message: 'Habit updated.',
        severity: 'success',
      });
    });
  })

  .delete(isSession, (req, res, next) => {
    const data = req.body;
    data.userId = req.session.userId;
    data.habitId = data.id;

    Habit.removeHabit(data.userId, data.habitId, function (error){
      if (error) {
        next(error);
      }
      res.json({
        message: 'Habit deleted.',
        severity: 'success',
      });
    });
  });

module.exports = router;