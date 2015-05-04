var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	connect = require('gulp-connect'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus');


// Path Variables

var src_path = 'src/',
	dist_path = 'dist/',
	
	need_compile_jade    = src_path + 'jade/*.jade',
	need_watch_jade      = src_path + 'jade/**/*.jade',
	compile_jade_to_path = dist_path,

	need_compile_stylus    = src_path + 'stylus/*.styl',
	need_watch_stylus      = src_path + 'stylus/**/*.styl',
	compile_stylus_to_path = dist_path + 'css/',
	
	need_reload_html = dist_path + '*.html';
	need_reload_css  = dist_path + 'css/*.css'


// Setup Development Server

gulp.task('server', ['watch'], function () {
	return connect.server({
		root: dist_path,
		port: 8000,
		livereload: true
	});
});



// Compile tasks

gulp.task('jade', function () {
	return gulp.src(need_compile_jade)
			.pipe(plumber({
				errorHandler: function (err) {
					notify.onError({
						title: 'Compile Jade',
						subtitle: 'Failure',
						message: '<%= error.message %>'
					})(err);

					this.emit('end');
				}
			}))
			.pipe(jade())
			.pipe(gulp.dest(compile_jade_to_path));
});


gulp.task('stylus', function () {
	return gulp.src(need_compile_stylus)
			.pipe(plumber({
				errorHandler: function (err) {
					notify.onError({
						title: 'Compile Stylus',
						subtitle: 'Failure',
						message: '<%= error.message %>'
					})(err);

					this.emit('end');
				}
			}))
			.pipe(stylus())
			.pipe(gulp.dest(compile_stylus_to_path));
});


gulp.task('compile_all', ['jade', 'stylus']);




// Reload tasks

gulp.task('reload_html', ['jade'], function () {
	return gulp.src(need_reload_html)
			.pipe(connect.reload());
});

gulp.task('reload_css', ['stylus'], function () {
	return gulp.src(need_reload_css)
			.pipe(connect.reload());
});



// Watch tasks

gulp.task('watch', ['compile_all'], function () {
	gulp.watch([need_watch_jade], ['reload_html']);
	gulp.watch([need_watch_stylus], ['reload_css']);
});






// Default task

gulp.task('default', ['server']);












