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
  app: path.join(baseDir, 'app'),
  public: path.join(baseDir, 'public'),
  bower_components: path.join(baseDir, 'bower_components'),
  node_modules: path.join(baseDir, 'node_modules'),

  // App modules
  modules: [
    path.join(baseDir, 'app', 'base'),
    path.join(baseDir, 'app', 'blog'),
    path.join(baseDir, 'app', 'page')
  ]
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
  views: {
    jade: config.paths.modules.map(function(folder) {
      return path.join(folder, 'views', '**/*.jade');
    })
  },
  scripts: { // client scripts
    js: config.paths.modules.map(function(folder) {
      return path.join(folder, 'scripts', '**/*.js');
    }),
    file: 'scripts.js',
    min: 'scripts.min.js'
  },
  styles: {
    css: config.paths.modules.map(function(folder) {
      return path.join(folder, 'styles', '**/*.css');
    }),
    sass: config.paths.modules.map(function(folder) {
      return path.join(folder, 'styles', '**/*.{sass,scss}');
    }),
    // less: config.paths.modules.map(function(folder) {
    //   return path.join(folder, 'styles', '**/*.less');
    // }),
    file: 'styles.css',
    min: 'styles.min.css'
  }
};

config.gulp.nodemon = {
  ext: 'js',
  ignore: [
    config.gulp.dist,
    config.paths.node_modules,
    config.paths.bower_components
  ].concat(config.paths.modules.map(function(folder) {
    return path.join(folder, 'scripts');
  }))
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
