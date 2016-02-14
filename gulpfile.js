'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

gulp.task('concat', function () {
    return gulp.src([
            'resource/js/app.js',
            'resource/js/controllers/**/*.js',
            'resource/js/directives/**/*.js',
            'resource/js/services/**/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('application.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('minify', [
    'concat'
], function() {
    return gulp.src('assets/js/application.js')
        .pipe(uglify())
        .pipe(rename('application.min.js'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('sass', function () {
    return gulp.src('resource/scss/application.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('resource/scss/**/*.scss', ['sass']);
    gulp.watch('resource/js/**/*.js', ['minify']);
});

gulp.task('del', function() {
    del('assets');
});

gulp.task('build', [
    'del'
], function() {
    gulp.start(['minify', 'sass']);
    return gulp.src(['resource/img/**', 'resource/fonts/**'], {base: 'resource'})
        .pipe(gulp.dest('assets'));
});

gulp.task('default', [
    'build'
], function() {
    gulp.start(['watch']);
});