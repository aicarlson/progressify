var gulp 	= require('gulp');
var uglify 	= require('gulp-uglify');
var sass 	= require('gulp-sass');
var rename  = require('gulp-rename');

gulp.task('scripts', function() {
	return gulp.src('src/progressify.js')
		.pipe(uglify({preserveComments:'all'}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('styles', function() {
	return gulp.src('src/progressify.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('default', ['scripts', 'styles']);