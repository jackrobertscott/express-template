var path = require('path');

module.exports = {
  // Server
  port: process.env.PORT || 3000,

  // Paths
  paths: {

    // App
    app: path.join(__dirname, 'app'),
    controllers: path.join(__dirname, 'app/controllers'),
    models: path.join(__dirname, 'app/models'),
    views: path.join(__dirname, 'app/views'),

    // Public
    public: path.join(__dirname, 'public'),
    images: path.join(__dirname, 'public/images'),
    javascripts: path.join(__dirname, 'public/javascripts'),
    stylesheets: path.join(__dirname, 'public/stylesheets'),

    // Dependencies
    bower_components: path.join(__dirname, 'bower_components'),
  },

  firebase: {
    url: 'https://angular-firebase-cms.firebaseio.com',
    siteId: '-Jvt4vs1lBrZQu--HWFG'
  }
};
