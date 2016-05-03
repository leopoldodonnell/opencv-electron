'use strict';

import gulp   from 'gulp';
import rename from 'gulp-rename';
import hamlc  from 'gulp-haml';
import newer  from 'gulp-newer';

const component_dir = "./bower_components";

gulp.task('components', () => {
    gulp.src('./src/**')
      .pipe(newer({dest: component_dir}))
      .pipe(gulp.dest(component_dir))
});

// Watch everthing in src and build the components
gulp.task('default', () => {
  gulp.watch('./src/**/*', ['components']);
});
  
