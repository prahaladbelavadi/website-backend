const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const userRouter = require('./routes/users.route');
const resourceRouter = require('./routes/resources.route');
const uploadRouter = require('./routes/uploadRouter');

const app = express();

// handle cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logging only for testing
app.use(function(req, res, next) {
  console.log(
    `URL: ${JSON.stringify(req.url)} \n Body: ${JSON.stringify(
      req.body
    )} \n Params: ${JSON.stringify(req.params)} \n `
  );
  next();
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_ATLAS_PW}@${process.env.MONGO_ATLAS_CLUSTER}/${process.env.DB_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.get('/', (req, res) => res.send('Server is up and running!'));

app.use('/users', userRouter);
app.use('/resources', resourceRouter);
app.use('/upload', uploadRouter);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server is listening on: ${port}`);
});
