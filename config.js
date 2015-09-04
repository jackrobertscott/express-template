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
  bower_components: path.join(baseDir, 'bower_components')
};

//////////
// GULP //
//////////

config.gulp = {
  dist: path.join(config.paths.public, 'dist'),
  lint: {
    js: [
      path.join(config.paths.app, '**/*.js')
    ]
  },
  nodemon: {
    ext: 'js'
  },
  views: {
    jade: [
      path.join(config.paths.app, '*/views/**/*.jade')
    ]
  },
  scripts: { // client scripts
    js: [
      path.join(config.paths.app, '*/scripts/**/*.js')
    ],
    file: 'scripts.js',
    min: 'scripts.min.js'
  },
  styles: {
    css: [
      path.join(config.paths.app, '*/styles/**/*.css')
    ],
    sass: [
      path.join(config.paths.app, '*/styles/**/*.{sass,scss}')
    ],
    // less: [
    //   path.join(config.paths.app, '*/styles/**/*.less')
    // ],
    file: 'styles.css',
    min: 'styles.min.css'
  }
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
