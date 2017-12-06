'use strict'

gulp = require 'gulp'
$ = require('gulp-load-plugins')()
browserSync = require 'browser-sync'
pngcrush = require 'imagemin-pngcrush'
rimraf = require 'rimraf'
runSequence  = require 'run-sequence'
streamqueue  = require 'streamqueue'

# Sources
sources =
  url: 'brdr-2014.dev'

  src: './src'
  dist: './dist'
  public: './public'

  css: './dist/assets/css'
  js: './dist/assets/js'
  img: './dist/assets/img'
  font: './dist/assets/font'

  cssDev: './src/assets/css'
  jsDev: './src/assets/js'
  imgDev: './src/assets/img'
  fontDev: './src/assets/font'

# BrowserSync
gulp.task 'browserSync', ->
  browserSync.init null,
    proxy: sources.url + '/'
    notify: false
    open: false
    reloadDelay: 300

gulp.task 'browserSync:reload', ->
  browserSync.reload()

# Clean build directory
gulp.task 'clean', (cb) ->
  rimraf './dist', cb

# Clear Cache
gulp.task 'clear', (done) ->
  $.cache.clearAll done

# Copy File
gulp.task 'copy:assets', ->
  files = [
    sources.fontDev + '/**/*'
  ]

  gulp
    .src files, base: sources.src
    .pipe gulp.dest sources.dist
    .pipe browserSync.reload stream:true, once:true

gulp.task 'copy:public', ->
  gulp
    .src sources.public + '/**/*', base: sources.public
    .pipe gulp.dest sources.dist
    .pipe browserSync.reload stream:true, once:true

# Sass
gulp.task 'sass', ->
  gulp
    .src sources.cssDev + '/**/*.{sass,scss}'
    .pipe $.plumber()
    .pipe $.sass
      outputStyle: 'expanded'
    .pipe $.cssmin()
    .pipe $.autoprefixer 'last 2 versions', 'ie >= 9', 'iOS >= 7', 'Android >= 4'
    .pipe gulp.dest sources.css
    .pipe browserSync.reload stream:true, once:true

# CoffeeScript
gulp.task 'js:coffee', ->
  gulp
    .src sources.jsDev + '/*.coffee'
    .pipe $.plumber()
    .pipe $.coffee()
    .pipe $.uglify()
    .pipe gulp.dest sources.js
    .pipe browserSync.reload stream:true, once:true

# JavaScript
gulp.task 'js:concat', ->
  streamqueue objectMode: true,
      gulp.src sources.jsDev + '/core/jquery.min.js'
      gulp.src sources.jsDev + '/lib/*.js'
    .pipe $.plumber()
    .pipe $.concat 'lib.js'
    .pipe gulp.dest sources.js
    .pipe browserSync.reload stream:true, once:true

# Image Min
gulp.task 'image:min', ->
  gulp
    .src sources.imgDev + '/**/*'
    .pipe $.cache $.imagemin
      optimizationLevel: 4
      progressive: true
      interlaced: true
      svgoPlugins: [{removeViewBox: false}]
      use: [pngcrush()]
    .pipe gulp.dest sources.img
    .pipe browserSync.reload stream:true, once:true

# Watch
gulp.task 'watch', ->
  gulp.watch sources.cssDev + '/**/*.{sass,scss}', -> gulp.start 'sass'
  gulp.watch sources.jsDev + '/*.coffee', -> gulp.start 'js:coffee'
  gulp.watch sources.jsDev + '/lib/*.js', -> gulp.start 'js:concat'
  gulp.watch sources.imgDev + '/**/*', -> gulp.start 'image:min'
  gulp.watch sources.fontDev + '/**/*', -> gulp.start 'copy:assets'
  gulp.watch sources.public + '/**/*', -> gulp.start 'copy:public'
  # gulp.watch sources.dist + '/*.php', -> gulp.start 'browserSync:reload'

# Default Task
gulp.task 'default', ->
  runSequence 'clean', ['copy:assets', 'copy:public'], ['sass', 'js:coffee', 'js:concat', 'image:min'], 'browserSync', 'watch'

gulp.task 'build', ->
  runSequence 'clean', ['copy:assets', 'copy:public'], ['sass', 'js:coffee', 'js:concat', 'image:min']
