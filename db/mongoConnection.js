const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') })

function createMongoConnection() {
  // mongodb connection
  mongoose.connect(process.env.MONGOURL);
  var db = mongoose.connection;
  // mongo error
  db.on('error', console.error.bind(console, 'connection error:'));
  return db;
}

module.exports = createMongoConnection;