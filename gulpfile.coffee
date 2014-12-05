"use strict"

gulp = require 'gulp'
$ = require('gulp-load-plugins')()
browserSync = require 'browser-sync'
pngcrush = require 'imagemin-pngcrush'
rimraf = require 'rimraf'
runSequence  = require 'run-sequence'
streamqueue  = require 'streamqueue'

# Sources
sources =
  url: 'brdr.local'
  themeDir: './www/wordpress/wordpress/wp-content/themes/'
  themeName: 'border-2014'

  css: '/dist/css'
  js: '/dist/js'
  img: '/dist/img'
  font: '/dist/font'

  cssDev: '/assets/css'
  jsDev: '/assets/js'
  imgDev: '/assets/img'
  fontDev: '/assets/font'

# Clean build directory
gulp.task 'clean', (cb) ->
  rimraf sources.themeDir + sources.themeName + '/dist', cb

# BrowserSync
gulp.task 'browserSync', ->
  browserSync.init null,
    proxy: sources.url + '/'
    notify: false
    open: false
    # server:
    #   baseDir: sources.themeDir + sources.themeName + '/'

gulp.task 'browserSyncReload', ->
  browserSync.reload()

# Sass
gulp.task 'sass', ->
  gulp
    .src sources.themeDir + sources.themeName + sources.cssDev + '/**/*.{sass,scss}'
    .pipe $.plumber()
    .pipe $.rubySass
      style: 'expanded'
      noCache: true
      bundleExec: true
    .pipe $.cssmin()
    .pipe $.autoprefixer 'last 2 versions', 'ie >= 9', 'iOS >= 7', 'Android >= 4'
    .pipe gulp.dest sources.themeDir + sources.themeName + sources.css
    .pipe browserSync.reload stream:true, once:true

# CoffeeScript
gulp.task 'coffee', ->
  gulp
    .src sources.themeDir + sources.themeName + sources.jsDev + '/*.coffee'
    .pipe $.plumber()
    .pipe $.coffee()
    .pipe $.uglify()
    .pipe gulp.dest sources.themeDir + sources.themeName + sources.js
    .pipe browserSync.reload stream:true, once:true

# JavaScript
gulp.task 'javaScript', ->
  streamqueue objectMode: true,
      gulp.src sources.themeDir + sources.themeName + sources.jsDev + '/core/jquery.min.js'
      gulp.src sources.themeDir + sources.themeName + sources.jsDev + '/lib/*.js'
    .pipe $.plumber()
    .pipe $.concat 'lib.js'
    .pipe gulp.dest sources.themeDir + sources.themeName + sources.js
    .pipe browserSync.reload stream:true, once:true

# Image Min
gulp.task 'imageMin', ->
  gulp
    .src sources.themeDir + sources.themeName + sources.imgDev + '/**/*'
    .pipe $.cache $.imagemin
      optimizationLevel: 4
      progressive: true
      interlaced: true
      svgoPlugins: [{removeViewBox: false}]
      use: [pngcrush()]
    .pipe gulp.dest sources.themeDir + sources.themeName + sources.img
    .pipe browserSync.reload stream:true, once:true

# Font
gulp.task 'font', ->
  gulp
    .src sources.themeDir + sources.themeName + sources.fontDev + '/**/*'
    .pipe gulp.dest sources.themeDir + sources.themeName + sources.font
    .pipe browserSync.reload stream:true, once:true


# Watch
gulp.task 'watch', ->
  gulp.watch sources.themeDir + sources.themeName + sources.cssDev + '/**/*.{sass,scss}', -> gulp.start 'sass'
  gulp.watch sources.themeDir + sources.themeName + sources.jsDev + '/*.coffee', -> gulp.start 'coffee'
  gulp.watch sources.themeDir + sources.themeName + sources.jsDev + '/lib/*.js', -> gulp.start 'javaScript'
  gulp.watch sources.themeDir + sources.themeName + sources.imgDev + '/**/*', -> gulp.start 'imageMin'
  gulp.watch sources.themeDir + sources.themeName + sources.fontDev + '/**/*', -> gulp.start 'font'
  gulp.watch sources.themeDir + sources.themeName + '/*.php', -> gulp.start 'browserSyncReload'

# Clear Cache
gulp.task 'clear', (done) ->
  $.cache.clearAll done

# Default Task
gulp.task 'default', ->
  runSequence 'clean', ['sass', 'coffee', 'javaScript', 'imageMin', 'font'], 'browserSync', 'watch'