const express = require('express');

const BlogController = require('../controllers/blog.controller');

const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// Create a blog post
    // From the website
    // From Quora
    // From Medium

    // Paginate
    // Original source of where the blog post was made
    // Filter based on date, source and tags

router.get('', 
// authenticate.who,
BlogController.fetchAllBlogposts);

router.post('', BlogController.addNewBlogpost);

router.delete('', BlogController.deleteAllBlogposts);

router.get(
  '/:blogpostId',
//   authenticate.who,
  BlogController.fetchBlogpost
);

router.put(
  '/:blogpostId',
  // authenticate.who,
  BlogController.updateBlogpost
);

router.delete(
  '/:blogpostId',
  // authenticate.who,
  BlogController.deleteBlogpost
);

module.exports = router;
