const express = require('express');

const ResourceController = require('../controllers/resource.controller');

const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('', 
// authenticate.who,
ResourceController.fetchAllResources);

router.post('', ResourceController.addNewResource);

router.delete('', ResourceController.deleteAllResources);

router.get(
  '/:resourceId',
  // authenticate.who,
  ResourceController.fetchResource
);

router.put(
  '/:resourceId',
  // authenticate.who,
  ResourceController.updateResource
);

router.delete(
  '/:resourceId',
  // authenticate.who,
  ResourceController.deleteResource
);

module.exports = router;
