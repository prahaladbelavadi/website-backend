const Blogpostpost = require('../models/blog.model');

exports.fetchAllBlogposts = async (req, res, next) => {

  Blogpost.find({}, (err, blogs) => {
    if (err) {
      return res.json({
        stauts: 'Error Occurred while searching for Blogposts'
      });
    }
    res.json(resources);
  });
};

exports.addNewBlogpost = async (req, res, next) => {
  // Guard from empty object creations
  if (req.body === {} || req.body === null) {
    return res.json({ status: 400, message: 'Bad request' });
  } else {
    Blogpost.create(req.body).then((insertionStatus) => {
      res.json({ status: insertionStatus });
    });
  }
};

exports.fetchBlogpost = async (req, res, next) => {
  Blogpost.findById(req.params.blogpostId).then((blog) => {
    if (blog === null) {
      res.json({ status: 404, message: 'No such Blogpost exists' });
    } else {
      res.json(blog);
    }
  });
};

exports.updateBlogpost = async (req, res, next) => {
  Blogpost.findByIdAndUpdate(req.params.blogpostId, req.body.Blogpost)
    .then((updateStatus) => {
      res.json(updateStatus);
    })
    .catch((err) => {
      res.json({ err });
    });
};

exports.deleteAllBlogposts = async (req, res, next) => {
  Blogpost.deleteMany({}).then((deleteStatus) => {
    res.json(deleteStatus);
  });
};

exports.deleteBlogpost = async (req, res, next) => {
  Blogpost.findByIdAndDelete(req.params.blogpostId).then((deleteStatus) => {
    res.json(deleteStatus);
  });
};
