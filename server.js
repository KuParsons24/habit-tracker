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
require('dotenv').config({ path: path.join(__dirname, '/.env') });

const PORT = process.env.PORT || 5000;

const db = mongoConnection();

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
  .use(express.static(path.join(__dirname, '/client/build')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Authorization routes
app.use('/auth', authApi);
// api routes
app.use('/api', dataApi);

// Error handling
app.use(errorMid.notFound);
app.use(errorMid.errHandling);