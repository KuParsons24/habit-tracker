var mongoose = require('mongoose');
var HabitSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: false,
  },
  habitId: {
    type: Number,
    required: true,
    unique: false,
  },
  title: {
    type: String,
    required: true,
  },
  frequency: {
    type: [Boolean],
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  days: {
    type: [Boolean],
    required: true,
  }
});

HabitSchema.statics.getHabits = function(userId, callback) {
  Habit.find({ userId: userId }, 'habitId title frequency startDate days')
    .exec((error, habits) => {
      if (habits){
        return callback(null, habits);
      } else if (error) {
        return callback(error);
      }
    });
}

HabitSchema.statics.editHabit = function(userId, habitId, habit, callback) {
  Habit.findOneAndUpdate({ userId: userId, habitId: habitId }, habit)
    .exec((error, habit) => {
      if(error) {
        return callback(error);
      } else {
        return callback();
      }
    })
}

HabitSchema.statics.removeHabit = function(userId, habitId, callback) {
  Habit.findOneAndRemove({ userId: userId, habitId: habitId })
    .exec((error, habit) => {
      if(error) {
        return callback(error);
      } else {
        return callback();
      }
    })
}

var Habit = mongoose.model('Habit', HabitSchema);
module.exports = Habit;