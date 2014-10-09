gulp = require 'gulp'
$ = require('gulp-load-plugins')()
browserSync = require 'browser-sync'
pngcrush = require 'imagemin-pngcrush'
rimraf = require 'rimraf'
streamqueue  = require 'streamqueue'

# Clean build directory
gulp.task 'clean', (cb) ->
  rimraf './build/', cb

# BrowserSync
gulp.task 'browserSync', ->
  browserSync.init null,
    open: false
    notify: false
    server:
      baseDir: './build/'

# Sass
gulp.task 'sass', ->
  gulp
    .src './source/assets/css/*.{sass,scss}'
    .pipe $.plumber()
    .pipe $.rubySass
      style: 'compressed'
      # sourcemap: true
      # sourcemapPath: '../source/assets/css/'
      noCache: true
      bundleExec: true
    .pipe $.autoprefixer 'last 2 version', 'ie 8', 'ie 9'
    .pipe gulp.dest './build/assets/css/'
    .pipe $.filter '**/*.css'
    .pipe browserSync.reload stream:true

# CoffeeScript
gulp.task 'coffee', ->
  gulp
    .src './source/assets/js/*.coffee'
    .pipe $.plumber()
    .pipe $.coffee()
    .pipe $.uglify()
    .pipe gulp.dest './build/assets/js/'
    .pipe browserSync.reload stream:true, once:true

# Java Script
gulp.task 'javascript', ->
  streamqueue objectMode: true,
      gulp.src './source/assets/js/core/jquery.min.js'
      gulp.src './source/assets/js/lib/*.js'
    .pipe $.plumber()
    .pipe $.concat 'lib.js'
    # .pipe $.uglify()
    .pipe gulp.dest './build/assets/js/'
    .pipe browserSync.reload stream:true, once:true

# Image Min
gulp.task 'imagemin', ->
  gulp
    .src './source/assets/img/**/*.{png,jpg,gif,svg}'
    .pipe $.plumber()
    .pipe $.cache $.imagemin
      optimizationLevel: 4
      progressive: true
      interlaced: true
      svgoPlugins: [{removeViewBox: false}]
      use: [pngcrush()]
    .pipe gulp.dest './build/assets/img/'
    .pipe browserSync.reload stream:true, once:true

# Copy Html
gulp.task 'htmlcopy', ->
  gulp
    .src './source/**/*.{html,php}'
    .pipe $.cache gulp.dest './build/'
    .pipe browserSync.reload stream:true, once:true

gulp.task 'htmlcopy_initial', ->
  gulp
    .src './source/**/*.{html,php}'
    .pipe gulp.dest './build/'
    .pipe browserSync.reload stream:true, once:true

# Copy Image
gulp.task 'imagecopy', ->
  gulp
    .src './source/assets/img/**/*.{ico}'
    .pipe $.cache gulp.dest './build/assets/img/'
    .pipe browserSync.reload stream:true, once:true

gulp.task 'imagecopy_initial', ->
  gulp
    .src './source/assets/img/**/*.{ico}'
    .pipe gulp.dest './build/assets/img/'
    .pipe browserSync.reload stream:true, once:true

# Copy Font
gulp.task 'fontcopy', ->
  gulp
    .src './source/assets/font/**/*'
    .pipe $.cache gulp.dest './build/assets/font/'
    .pipe browserSync.reload stream:true, once:true

gulp.task 'fontcopy_initial', ->
  gulp
    .src './source/assets/font/**/*'
    .pipe gulp.dest './build/assets/font/'
    .pipe browserSync.reload stream:true, once:true

# watch
gulp.task 'watch', ->
  $.watch 'source/**/*.{html,php}', -> gulp.start 'htmlcopy'
  $.watch 'source/assets/css/**/*.{sass,scss}', -> gulp.start 'sass'
  $.watch 'source/assets/js/**/*.coffee', -> gulp.start 'coffee'
  $.watch 'source/assets/img/**/*.{png,jpg,gif,svg}', -> gulp.start 'imagemin'
  $.watch 'source/assets/img/**/*.{ico}', -> gulp.start 'imagecopy'
  $.watch 'source/assets/font/**/*', -> gulp.start 'fontcopy'

# Watch
gulp.task 'default', ->
  $.runSequence 'clean', ['sass', 'coffee', 'javascript', 'imagemin'], ['htmlcopy_initial', 'imagecopy_initial', 'fontcopy_initial'], 'browserSync', 'watch'