# express-template

A template built with express for website development.

### App Structure

```
.
+-- gulpfile.js             (task running scripts)
+-- server.js               (server start point)
+-- app                     (store all app specific code)
|   +-- app.js              (configure express app)
|   +-- base                (global app resource module)
|   |   +-- scripts         (global client js code)
|   |   +-- styles          (global styles)
|   |   +-- views           (global views)
|   +-- page                (page module)
|   |   +-- controllers     (route handling)
|   |   +-- models          (data models)
|   |   +-- scripts
|   |   +-- styles
|   |   +-- views
|   +-- blog
|       +-- controllers
|       +-- models
|       +-- scripts
|       +-- styles
|       +-- views
+-- config
|   +-- config.js           (main configuration)
|   +-- firebase.js         (firebase configuration)
|   +-- gulp.js             (gulp configuration)
+-- public                  (files available to client)
    +-- img                 (images)
    +-- dist                (compiled js and style code from modules)
```

### Development

Run `gulp build` to build compile and minify js and style code from modules into dist folder.

Run `gulp serve` to start a auto-reloading web server.

Run `gulp` to build and serve together.

### Deploy

Make sure you run `gulp build` before deploying.
