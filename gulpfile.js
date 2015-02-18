var gulp = require('gulp');
var bump = require('gulp-bump');
var git = require('gulp-git');
 var exec = require('gulp-exec');

 
// Define the key for versioning off 
gulp.task('bump', function(){
  gulp.src('./package.json')
  .pipe(bump({key: "version"}))
  .pipe(gulp.dest('./'));
});
 



gulp.task('prepare', function(){
 /* gulp.src('./package.json')
  .pipe(bump({key: "version"}))
  .pipe(gulp.dest('./'));
*/

/*
  gulp.src('./*','!./node_modules/**')
  .pipe(git.commit("auto-commit"),{args: '-A'});
*/

exec('git.exe push --progress "origin" master');

 

});


gulp.task('tag', function () {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('./')
    .pipe(git.commit(message))
    .pipe(git.tag(v, message))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));
});
 