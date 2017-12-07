var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var prefix      = require('gulp-autoprefixer');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync');

// Gulp Browser-sync Task
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

// Gulp Sass Task 
gulp.task('sass', function() {
  gulp.src('./dev/scss/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(prefix('last 25 versions'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

// Gulp JS Task
gulp.task('js', function () {
    return gulp.src('./dev/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

// Gulp html Task
gulp.task('html', function () {
    gulp.src('./dev/*.html')
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({stream: true}));
});

// Watch
gulp.task('watch', ['sass', 'js', 'html', 'browser-sync'], function () {
	gulp.watch('./dev/scss/{,*/}*.{scss,sass}', ['sass']);
  	gulp.watch('./dev/js/*.js', ['js']);
  	gulp.watch('./dev/index.html', ['html']);
});


gulp.task('default', ['sass', 'html', 'js', 'watch']);

