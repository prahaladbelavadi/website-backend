require('dotenv').config()
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// check authentication and route them to different place based on if authentication middleware returns true or false

// connect to mongodb to persist data store
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}?retryWrites=true&w=majority"`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err, connection) => {

  if (err) console.error(err);
  if (connection) console.log('Successfully connected! \n');


  const db = client.db("test");

  db.collection('keys').find({}).toArray((err, rec) => {
    router.get('/', function (req, res, next) {
      res.send({ status: 'We\'re Online!', rec });
    });
  })

});

module.exports = router;
