var config = require('../../config');

module.exports = function IndexController(app) {

  app.get('/', function(req, res) {
    res.render('index', {
      title: 'Express'
    });
  });

};
