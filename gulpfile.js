var gulp = require('gulp');
var bump = require('gulp-bump');
var git = require('gulp-git');

 
// Define the key for versioning off 
gulp.task('bump', function(){
  gulp.src('./package.json')
  .pipe(bump({key: "version"}))
  .pipe(gulp.dest('./'));
});
 

gulp.task('commit', function(){
  return gulp.src('./')
  .pipe(git.commit('auto-commit'));
});
 


gulp.task('npm', function (done) {
  require('child_process').spawn('npm', ['publish'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('push', function(){
  git.push('origin', 'master', {args: " -f"})
  .end();
});