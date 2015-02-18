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
  gulp.src('./package.json')
  .pipe(bump({key: "version"}))
  .pipe(gulp.dest('./'));

  gulp.src('./*')
  .pipe(git.commit("auto-commit"));

});
 