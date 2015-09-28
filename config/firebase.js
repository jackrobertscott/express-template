/* jshint node:true */
'use strict';

var path = require('path');

module.exports = function(config) {
  config.firebase = {
    entities: {
      users: 'users',
      sites: 'sites',
      posts: 'posts',
      pages: 'pages',
    },
    url: 'https://angular-firebase-cms.firebaseio.com',
    siteId: '-Jvt4vs1lBrZQu--HWFG',
  };
};
