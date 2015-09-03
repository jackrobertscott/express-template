var config = require('../../../config');
var Firebase = require('firebase');
var _ = require('lodash');

var ref = (new Firebase(config.firebase.url)).child(config.firebase.entities.pages);

module.exports = {
  find: find,
  findBySite: findBySite,
  findById: findById
};

function find(cb) {
  ref.once('value', function(snapshots) {
    var pages = [];
    snapshots.forEach(function(snapshot) {
      pages.push(snapshotToEntity(snapshot));
    });
    cb(null, pages);
  }, cb);
}

function findBySite(siteId, cb) {
  if (!siteId) return cb({
    message: 'No site id passed to findBySite function.'
  });

  ref.orderByChild('siteId')
    .equalTo(siteId)
    .once('value', function(snapshots) {
      var pages = [];
      snapshots.forEach(function(snapshot) {
        pages.push(snapshotToEntity(snapshot));
      });
      cb(null, pages);
    }, cb);
}

function findById(pageId, cb) {
  if (!pageId) return cb({
    message: 'No page id passed to findById function.'
  });

  ref.child(pageId)
    .once('value', function(snapshot) {
      cb(null, snapshotToEntity(snapshot));
    }, cb);
}

function snapshotToEntity(snapshot) {
  return _.assign({
    _id: snapshot.key()
  }, snapshot.val());
}
