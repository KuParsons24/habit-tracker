const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const errorMid = require('./middleware/errorHandling');
const mongoConnection = require('./db/mongoConnection');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authApi = require('./routes/authApi');
const dataApi = require('./routes/dataApi');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '/.env') });

const PORT = process.env.PORT || 5000;

const db = mongoConnection();

app.use(cors({
  origin: ['http://localhost:3000', 'http://kuparsons24.ddnsfree.com']
}));

//use sessions for tracking logins
app.use(session({
  secret: process.env.SESSIONSECRET,
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGOURL,
  })
}));

app
  .use('/habit-tracker', express.static(path.join(__dirname, '/client/build')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// Authorization routes
app.use('/habit-tracker/auth', authApi);
// api routes
app.use('/habit-tracker/api', dataApi);

app.get('/habit-tracker/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Error handling
app.use(errorMid.notFound);
app.use(errorMid.errHandling);