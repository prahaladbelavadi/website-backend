const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.login = async (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user === null) {
          res.json({ message: 'No such user exists. Kindly Signup' });
        }
        if (user.password == req.body.password) {
          const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, name: user.name },
            process.env.JWT_KEY,
            { expiresIn: 43200, issuer: `${process.env.JWT_ISSUER}` }
          );
          res.json({ user, jwtToken });
        } else {
          res.status(401);
          res.json({ message: 'password incorrect' });
        }
      })
      .catch((err) => {
        res.status(500);
        res.json({ err });
      });
  } else {
    res.status(400);
    res.send('Bad Request');
  }
};

exports.signup = async (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user === null) {
          User.create(req.body)
            .then((user) => {
              res.status(201);
              res.json({ status: 'User created', user });
            })
            .catch((err) => {
              res.json({ status: 'An error occured', Details: err });
            });
        } else {
          res.json({ message: 'User already exists. Kindly Login' });
        }
      })
      .catch((err) => {
        res.json({ status: 500, message: 'Error', err });
      });
  } else {
    res.status(400);
    res.send('Bad Request');
  }
};

exports.fetchAllUsers = async (req, res, next) => {
  User.find({}).then((users) => {
    res.json(users);
  });
};

exports.googleSSO = async (req, res, next) => {
  if (req.body.email) {
    if (req.body.email.split('@')[1] === `${process.env.EMAIL_DOMAIN}`) {
      User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) {
          res.status(500);
          res.json({ err });
        }
        if (existingUser === null) {
          User.create({ name: req.body.name, email: req.body.email }).then(
            (user) => {
              const jwtToken = jwt.sign(
                { email: user.email, _id: user._id, name: user.name },
                process.env.JWT_KEY,
                { expiresIn: 43200, issuer: `${process.env.JWT_ISSUER}` }
              );
              res.json({ user, jwtToken });
            }
          );
        } else {
          const jwtToken = jwt.sign(
            {
              email: existingUser.email,
              _id: existingUser._id,
              name: existingUser.name
            },
            process.env.JWT_KEY,
            { expiresIn: 43200, issuer: `${process.env.JWT_ISSUER}` }
          );
          res.json({ user: existingUser, jwtToken });
        }
      });
    } else {
      res.json({ status: 'Unauthorized' });
    }
  } else {
    res.status(400);
    res.send('Bad Request');
  }
};
