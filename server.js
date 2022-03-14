const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const errorMid = require('./middleware/errorHandling');
const mongoConnection = require('./db/mongoConnection');
const authApi = require('./routes/authApi');
require('dotenv').config({ path: path.join(__dirname, '/.env') });

const PORT = process.env.PORT || 5000;

const db = mongoConnection();

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

// Error handling
app.use(errorMid.notFound);
app.use(errorMid.errHandling);