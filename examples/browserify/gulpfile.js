/* global require */

'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('js', function(){
	var b = browserify({
		entries: ['./index.js']
	});
	
	return b.bundle()
		.pipe(source('./bundle.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['js']);
