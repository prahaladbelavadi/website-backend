var express = require('express');
var router = express.Router();

// check authentication and route them to different place based on if authentication middleware returns true or false

router.get('/', function (req, res, next) {
  res.send({ status: 'We\'re Online!' });
});

module.exports = router;
