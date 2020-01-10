require('dotenv').config();
const express = require('express');

const router = express.Router();
const { MongoClient } = require('mongodb');

// check authentication and route them to different place based on if authentication middleware returns true or false

// connect to mongodb to persist data store
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}?retryWrites=true&w=majority"`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err, connection) => {
  if (err) return console.error(err);
  if (connection) console.log('Successfully connected! \n');


  const db = client.db('test');

  router.get('/', (req, res) => {
    db.collection('keys').find({}).toArray((err, rec) => {
      res.send({ status: 'We\'re Online!', rec });
    });
  });

  router.get('/notes', (req, res) => {
    db.collection('notes').find({}).toArray((err, notes) => {
      res.send({ notes });
    })
  })

  router.post('/notes', (req, res) => {
    db.collection('notes').insertOne(req.body, (err, resp) => {

      if (err) return res.json({ status: 500, err });

      res.json({ message: 'insert successful', status: 201 })

    })
  })

  router.put('/notes', (req, res) => {

    // db.collection('notes').findOneAndUpdate(req.body._id,)
    res.json({ message: 'note updated' })
  })
});

module.exports = router;
