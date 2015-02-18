var gulp = require('gulp');
var bump = require('gulp-bump');
var git = require('gulp-git');
 

 
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

  git.setRemote('origin', 'https://github.com/bakunin95/relex', function (err) {
    if (err) throw err;

     git.push('origin', 'master', function (err) {
	    if (err) throw err;
	  });

  });

 

});
 