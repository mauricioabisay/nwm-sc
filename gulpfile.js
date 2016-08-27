'use strict';
(function() {
  var gulp    = require('gulp');
  var bs      = require('browser-sync').create();
  var plugins = require('gulp-load-plugins');
  var $       = plugins();

  gulp.task('jpg', function() {
    gulp.src('./src/img/**/*.jpg')
    .pipe($.imagemin({
      pogressive: true
    }))
    .pipe(gulp.dest('./dest/img'));
  });

  gulp.task('png', function() {
    gulp.src('./src/img/**/*.png')
    .pipe($.imagemin({
      optimizationLevel: 7
    }))
    .pipe(gulp.dest('./dest/img'));
  });

  gulp.task('gif', function() {
    gulp.src('./src/img/**/*.gif')
    .pipe($.imagemin({
      optimizationLevel: 3
    }))
    .pipe(gulp.dest('./dest/img'));
  });

  gulp.task('svg', function() {
    gulp.src('./src/img/**/*.svg')
    .pipe($.imagemin())
    .pipe(gulp.dest('./dest/img'));
  });

  gulp.task('js', function() {
    gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/parallax.js/parallax.min.js',
      'bower_components/slick-carousel/slick/slick.min.js',
      './src/scripts/**/*'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('script.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./dest'))
    .pipe(bs.stream());
  });

  gulp.task('sass', function() {
    gulp.src('./src/styles/**/*')
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: ['last 2 versions']}))
    .pipe($.cleanCss())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./dest'))
    .pipe(bs.stream());
  });

  gulp.task('pug', function() {
    gulp.src('./src/templates/**/*')
    .pipe($.pug())
    .pipe(gulp.dest('./dest'))
    .pipe(bs.stream());
  });

  gulp.task('watch', function() {
    gulp.watch('./src/templates/**/*').on('change', bs.reload);
    gulp.watch('./src/styles/**/*').on('change', bs.reload);
  });

  gulp.task('default', function() {
    bs.init({
      server: './dest'
    });
    gulp.watch('./src/templates/**/*', ['pug']).on('change', bs.reload);
    gulp.watch('./src/styles/**/*', ['sass']).on('change', bs.reload);
  });

})();
