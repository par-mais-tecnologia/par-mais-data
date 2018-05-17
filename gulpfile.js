var path = require('path')
var nsp = require('gulp-nsp')
var gulp = require('gulp')
var excludeGitignore = require('gulp-exclude-gitignore')
var eslint = require('gulp-eslint')
var del = require('del')
var babel = require('gulp-babel')

// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-core/register')

gulp.task('static', function () {
  return gulp.src('lib/**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('nsp', function (cb) {
  nsp({ package: path.resolve('package.json') }, cb)
})

gulp.task('clean', function () {
  return del('dist')
})

gulp.task('babel', ['clean'], function () {
  return gulp.src('lib/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('prepublish', ['nsp', 'babel'])
gulp.task('default', ['static'])
