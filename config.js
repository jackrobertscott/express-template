var path = require('path');
var fs = require('fs');
// set this to root directory
var baseDir = __dirname;

//////////
// MAIN //
//////////

var config = module.exports = {
  // Don't set port to 3000 or the browserSync will fail
  port: process.env.PORT || 5000,
  main: path.join(baseDir, 'server.js')
};

///////////
// BUILD //
///////////

config.build = {
  css: true,
  sass: true,
  less: true
};

///////////
// PATHS //
///////////

config.paths = {
  // App
  app: path.join(baseDir, 'app'),
  modules: [
    path.join(baseDir, 'app', 'base'),
    path.join(baseDir, 'app', 'blog'),
    path.join(baseDir, 'app', 'page')
  ],

  // Public
  public: path.join(baseDir, 'public'),
  dist: path.join(baseDir, 'public', 'dist'),
  bower_components: path.join(baseDir, 'bower_components')
};

//////////////
// FIREBASE //
//////////////

config.firebase = {
  entities: {
    users: 'users',
    sites: 'sites',
    posts: 'posts',
    pages: 'pages'
  },
  url: 'https://angular-firebase-cms.firebaseio.com',
  siteId: '-Jvt4vs1lBrZQu--HWFG'
};
