var config = require('../../config');
var express = require('express');
var router = express.Router();
var Page = require('../models/page');
var _ = require('lodash');

module.exports = function PageController(app) {
  app.use('/', router);
};

router.get('/', function(req, res, next) {
  Page.findBySite(config.firebase.siteId, function(err, pages) {
    if (err) return next(err);

    res.render('index', {
      pages: pages
    });
  });
});

router.get('/:url', function(req, res, next) {
  Page.findBySite(config.firebase.siteId, function(err, pages) {
    if (err) return next(err);

    var page = _.find(pages, function(page) {
      return page.url === req.params.url;
    });
    if (!page) return next(err);

    res.render('page', {
      pages: pages,
      page: page
    });
  });
});
