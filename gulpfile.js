var srcjs = [
    "./app/shared/**/*.js",
	"./app/components/**/*module*.js",
	"./app/components/**/*controller*.js",
	"./app/components/**/*routes*.js",
    "./app/*.js"   
];

var vendorjs = [
	"./app/assets/js/jquery/jquery.min.js",
	"./app/assets/js/bootstrap/bootstrap.min.js",
	"./app/assets/js/angular/angular.min.js",
	"./app/assets/js/angular_route/angular-route.min.js"
]

var gulp = require('gulp'),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify");


gulp.task('js', function() {
	gulp.src(srcjs)
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./app/assets/js/'));
});

gulp.task('vendorjs', function(){
	gulp.src(vendorjs)
	.pipe(concat('vendor.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./app/assets/js/'));
});

gulp.task('default', ['vendorjs', 'js']);
