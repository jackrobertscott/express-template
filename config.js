var path = require('path');

module.exports = {
  // Server
  // Don't set port to 3000 or the browserSync will fail
  port: process.env.PORT || 5000,
  main: './server.js',

  // Paths
  paths: {

    // App
    app: path.join(__dirname, 'app'),
    controllers: path.join(__dirname, 'app', 'controllers'),
    models: path.join(__dirname, 'app', 'models'),
    views: path.join(__dirname, 'app', 'views'),

    // Public
    public: path.join(__dirname, 'public'),
    tmp: path.join(__dirname, '.tmp'),
    img: path.join(__dirname, 'public', 'img'),
    js: path.join(__dirname, 'public', 'js'),
    min: path.join(__dirname, 'public', 'min'),

    // Set path of all/any of styling options to include them.
    css: path.join(__dirname, 'public', 'css'),
    sass: path.join(__dirname, 'public', 'sass'),
    //less: path.join(__dirname, 'public', 'less'),

    // Dependencies
    bower_components: path.join(__dirname, 'bower_components'),
  },

  firebase: {
    entities: {
      users: 'users',
      sites: 'sites',
      posts: 'posts',
      pages: 'pages'
    },
    url: 'https://angular-firebase-cms.firebaseio.com',
    siteId: '-Jvt4vs1lBrZQu--HWFG'
  }
};
