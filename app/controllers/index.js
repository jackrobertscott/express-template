var config = require('../../config');
var express = require('express');
var router = express.Router();
var Page = require('../models/page');

module.exports = function PageController(app) {
  app.use('/', router);
};

router.get('/', function(req, res, next) {
  Page.findBySite(config.firebase.siteId, function(err, pages) {
    if (err) return next(err);
    console.log(pages);
    res.render('index', {
      pages: pages
    });
  });
});
