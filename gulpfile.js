'use strict';
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var del = require('del');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var WebpackDevServer = require('webpack-dev-server');

var APP_PATH = './app';
var BUILD_PATH = './build';

/**
 * This function adds different webpack config options
 * depending on whether or not the --produciton flag was
 * passed to gulp.
 */
var getWebpackConfig = function() {
  var config = webpackConfig;
  if (gulpUtil.env.production) {
    // Minify JavaScript for production
    config.plugins = config.plugins || [];
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
  } else {
    // Use source-maps for development
    config.devtool = 'source-map';
  }
  return config;
};

/**
 * Deletes the contents of the build directory.
 */
gulp.task('clean', function() {
  del(BUILD_PATH);
});

/**
 * Build the JS file (minified if the --production flag is present) and
 * copies it and the index.hml to either build or dist.
 */
gulp.task('build', function(callback) {
  gulp.src(`${APP_PATH}/index.html`)
    .pipe(gulp.dest(BUILD_PATH));
  webpack(getWebpackConfig(), function(err, stats) {
    callback(err);
  });
});

gulp.task('start', function() {
  var config = getWebpackConfig();
  config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080');
  var server = new WebpackDevServer(webpack(config), {
    contentBase: `${__dirname}/${APP_PATH}`,
    stats: {colors: true}
  });
  server.listen(8080);
});
