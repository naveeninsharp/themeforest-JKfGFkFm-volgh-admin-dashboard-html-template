var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
postcss = require("gulp-postcss");
autoprefixer = require("autoprefixer");
var sourcemaps = require('gulp-sourcemaps'); 
var browserSync = require('browser-sync').create();

//_______ task for scss folder to css main style 
gulp.task('watch', function() {
	console.log('Command executed successfully compiling SCSS in assets.');
	 return gulp.src('Volgh/assets/scss/**/*.scss') 
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write(''))   
		.pipe(gulp.dest('Volgh/assets/css'))
		.pipe(browserSync.reload({
		  stream: true
	}))
})