const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css'); 
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');// не нужно отдельной установки
const imagemin = require('gulp-imagemin');
const server = require('gulp-server-livereload'); 
const sass = require('gulp-sass');
const pug = require('gulp-pug');
 
gulp.task('pug', function buildHTML() {
  return gulp.src('app/index.pug')
  .pipe(pug({
    doctype: 'html',
    pretty: true
  }))
  .pipe(gulp.dest('app/'))
}); 

// gulp.task('pug:watch', function () {
//   gulp.watch('blocks/index.pug', ['pug']);
// });
gulp.task('sass', function () {
  return gulp.src('app/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});
 
gulp.task('watch', function () {
  gulp.watch('app/sass/*.sass', ['sass']);
  gulp.watch('app/index.pug', ['pug']);
});

gulp.task('server', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

 
gulp.task('imagemin', () =>
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('cssmin', function () {
    gulp.src('app/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css/'));
});


gulp.task('concatcss', function () {
  return gulp.src('app/css/*.css')
    .pipe(concatCss("concat.css"))
    .pipe(gulp.dest('dist/css/'));
});
 


gulp.task('autoprefixer', () =>
    gulp.src('app/main.css')
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css/'))
);

gulp.task('default', ['server']);



