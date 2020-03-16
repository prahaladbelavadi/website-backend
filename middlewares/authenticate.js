const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY;

const User = require('../models/user.model');

exports.who = (req, res, next) => {
  const email = req.body.email;
  //   const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (user === null) {
        return res.json({ Status: 'Unauthorized' });
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      res.json({ status: 500, err });
    });    
};

