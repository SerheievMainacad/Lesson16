const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css'); 
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');// не нужно отдельной установки
const imagemin = require('gulp-imagemin');
const server = require('gulp-server-livereload'); 
const sass = require('gulp-sass');
const pug = require('gulp-pug');
 


 //>>>>>>>>>DEVELOPING TASKS 
gulp.task('pug', function buildHTML() {
  return gulp.src('app/index.pug')
  .pipe(pug({
    doctype: 'html',
    pretty: true
  }))
  .pipe(gulp.dest('app/'))
}); 

gulp.task('pugDist', function buildHTML() {
  return gulp.src('app/index.pug')
  .pipe(pug({
    doctype: 'html',
    pretty: false
  }))
  .pipe(gulp.dest('dist/'))
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


gulp.task('concatcss', ['sass'], function () {
  return gulp.src('app/css/*.css')
    .pipe(concatCss("styles.css"))
    .pipe(gulp.dest('dist/css/'));
});


gulp.task('autoprefixer', ['concatcss'], () =>
    gulp.src('dist/css/styles.css')
        .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css/'))
);

gulp.task('cssmin', ['autoprefixer'], function () {
    gulp.src('dist/css/styles.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css/'));
});


gulp.task('concatVendorCss', function () {
  return gulp.src([
  'app/libs/font-awesome/web-fonts-with-css/css/fontawesome-all.min.css',
  'app/libs/bootstrap/dist/css/bootstrap.min.css',
  'app/libs/owl.carousel/dist/assets/owl.carousel.min.css',
  'app/libs/owl.carousel/dist/assets/owl.theme.default.min.css'])
    .pipe(concatCss("vendor.css", {rebaseUrls: false}))
    .pipe(gulp.dest('dist/css/'));

});

gulp.task('minVendorCss', ['concatVendorCss'], function(){
  gulp.src('dist/css/vendor.css')
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/css/'));
})

// _-_-_-BUILDING TASKS _-_-_-
gulp.task('buildCSS', ['cssmin'], function(){
  console.log('CSS was built')
})
gulp.task('buildVendorCSS', ['minVendorCss'], function(){
  console.log('Vendor CSS was built')
})


gulp.task('default', ['imagemin', 'buildCSS', 'buildVendorCSS', 'pugDist']);



