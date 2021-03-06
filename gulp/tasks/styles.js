var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssimport = require('postcss-import'),
    mixins = require('postcss-mixins'),
    hexrgba = require('postcss-hexrgba');

gulp.task('styles', function () {
    return gulp.src('./src/assets/styles/styles.css')
        .pipe(postcss([cssimport, mixins, cssvars, nested, hexrgba, autoprefixer]))
        .on('error', function (errorInfo) { //If a CSS error occurs, tell this task to print the error message and go ahead normally to the end
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./src/temp/styles'));
});