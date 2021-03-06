var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del'),
    svg2png = require('gulp-svg2png');

var config = {
    shape: {
        spacing: {
            padding: 1
        }
    },
    mode: {
        css: { // Activate the «css» mode, files are created in a 'css' subfolder
            variables: {
                replaceSvgWithPng: function () {
                    return function (sprite, render) {
                        return render(sprite).split('.svg').join('.png');
                    }
                }
            },
            sprite: "sprite.svg", // Sprite path and name
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

gulp.task('beginClean', function () {
    return del(['./src/temp/sprite', './src/assets/images/sprites']);
});

gulp.task('createSprite', function () {
    return gulp.src('./src/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./src/temp/sprite/'));
});

gulp.task('createPngCopy', function () {
    return gulp.src('.src/temp/sprite/css/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('./src/temp/sprite/css'));
});

gulp.task('copySpriteGraphic', function () {
    return gulp.src('./src/temp/sprite/css/**/*.{svg, png}')
        .pipe(gulp.dest('./src/assets/images/sprites'));
});

gulp.task('copySpriteCSS', function () {
    return gulp.src('./src/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./src/assets/styles/modules'));
});

gulp.task('endClean', function () {
    return del('./src/temp/sprite');
});

//gulp.series: dependencies that are executed sequentially
//gulp.parallel: dependencies that are executed in parallel
//dependencies are always executed before the main task ('icons')
gulp.task('icons', gulp.series('beginClean', 'createSprite', gulp.parallel(gulp.series('createPngCopy', 'copySpriteGraphic'), 'copySpriteCSS'), 'endClean'));