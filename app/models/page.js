var config = require('../../config');
var Firebase = require('firebase');

var ref = (new Firebase(config.firebase.url)).child('pages');

module.exports = {
  find: find,
  findById: findById,
  findBySite: findBySite
};

function find() {
  return ref.once('value', function(snapshot) {
    return snapshot;
  }, errorHandler);
}

function findById(pageId) {
  if (!pageId) return;

  return ref.child(pageId)
    .once('value', function(snapshot) {
      return snapshot;
    }, errorHandler);
}

function findBySite(siteId) {
  if (!siteId) return;

  return ref.orderByChild('siteId')
    .equalTo(siteId)
    .once('value', function(snapshot) {
      return snapshot;
    }, errorHandler);
}

function errorHandler(error) {
  console.log('The read failed: ' + error.code);
}
