var config = require('../../../config/config');
var express = require('express');
var router = express.Router();
var Post = require('../models/post.model');
var _ = require('lodash');

module.exports = function BlogController(app) {
  app.use('/blog', router);
};

router.get('/', function(req, res, next) {
  Post.findBySite(config.firebase.siteId, function(err, posts) {
    if (err) return next(err);

    res.render('blog', {
      posts: posts
    });
  });
});

router.get('/:url', function(req, res, next) {
  Post.findBySite(config.firebase.siteId, function(err, posts) {
    if (err) return next(err);

    var post = _.find(posts, function(post) {
      return post.url === req.params.url;
    });
    if (!post) return next(err);

    res.render('post', {
      posts: posts,
      post: post
    });
  });
});
