/* jshint node:true */
'use strict';

var config = require('../../../config/config');
var Firebase = require('firebase');
var _ = require('lodash');

var ref = (new Firebase(config.firebase.url)).child(config.firebase.entities.posts);

module.exports = {
  find: find,
  findBySite: findBySite,
  findById: findById
};

function find(cb) {
  ref.once('value', function(snapshots) {
    var posts = [];
    snapshots.forEach(function(snapshot) {
      posts.push(snapshotToEntity(snapshot));
    });
    cb(null, posts);
  }, cb);
}

function findBySite(siteId, cb) {
  if (!siteId) return cb({
    message: 'No site id passed to findBySite function.'
  });

  ref.orderByChild('siteId')
    .equalTo(siteId)
    .once('value', function(snapshots) {
      var posts = [];
      snapshots.forEach(function(snapshot) {
        posts.push(snapshotToEntity(snapshot));
      });
      cb(null, posts);
    }, cb);
}

function findById(postId, cb) {
  if (!postId) return cb({
    message: 'No post id passed to findById function.'
  });

  ref.child(postId)
    .once('value', function(snapshot) {
      cb(null, snapshotToEntity(snapshot));
    }, cb);
}

function snapshotToEntity(snapshot) {
  return _.assign({
    _id: snapshot.key()
  }, snapshot.val());
}
