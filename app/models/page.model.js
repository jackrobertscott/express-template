var config = require('../../config');
var Firebase = require('firebase');

var ref = (new Firebase(config.firebase.url)).child('pages');

module.exports = {
  find: find,
  findBySite: findBySite,
  findById: findById
};

function find(cb) {
  ref.once('value', function(snapshot) {
    var pages = snapshot.map(function(page) {
      return page.val();
    });
    cb(null, pages);
  }, cb);
}

function findBySite(siteId, cb) {
  if (!siteId) return;

  ref.orderByChild('siteId')
    .equalTo(siteId)
    .once('value', function(snapshot) {
      var pages = snapshot.map(function(page) {
        return page.val();
      });
      cb(null, pages);
    }, cb);
}

function findById(pageId, cb) {
  if (!pageId) return;

  ref.child(pageId)
    .once('value', function(snapshot) {
      var page = snapshot.val();
      cb(null, page);
    }, cb);
}
