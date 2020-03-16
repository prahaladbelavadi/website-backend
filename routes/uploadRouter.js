const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/');
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const FileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(pdf|doc)$/)) {
    return cb(new Error('You can upload only PDF and Doc files!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: FileFilter });

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/').post(upload.single('File'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(req.file);
});

uploadRouter.route('/').get((req, res) => {
  // show a list of all files from directory
  fs.readdir('./public/', (err, files) => {
    res.json(files);
  });
});

module.exports = uploadRouter;
