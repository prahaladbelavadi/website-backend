const Resource = require('../models/resource.model');

exports.fetchAllResources = async (req, res, next) => {

  Resource.find({}, (err, resources) => {
    if (err) {
      return res.json({
        stauts: 'Error Occurred while searching for Resources'
      });
    }
    res.json(resources);
  });
};

exports.addNewResource = async (req, res, next) => {
  // Guard from empty object creations
  if (req.body === {} || req.body === null) {
    return res.json({ status: 400, message: 'Bad request' });
  } else {
    Resource.create(req.body).then((insertionStatus) => {
      res.json({ status: insertionStatus });
    });
  }
};

exports.fetchResource = async (req, res, next) => {
  Resource.findById(req.params.resourceId).then((resource) => {
    if (resource === null) {
      res.json({ status: 404, message: 'No such Resource exists' });
    } else {
      res.json(resource);
    }
  });
};

exports.updateResource = async (req, res, next) => {
  Resource.findByIdAndUpdate(req.params.resourceId, req.body.Resource)
    .then((updateStatus) => {
      res.json(updateStatus);
    })
    .catch((err) => {
      res.json({ err });
    });
};

exports.deleteAllResources = async (req, res, next) => {
  Resource.deleteMany({}).then((deleteStatus) => {
    res.json(deleteStatus);
  });
};

exports.deleteResource = async (req, res, next) => {
  Resource.findByIdAndDelete(req.params.resourceId).then((deleteStatus) => {
    res.json(deleteStatus);
  });
};
