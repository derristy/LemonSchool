'use strict';

const dirs = {
    source: 'dev',
    build: 'docs',
};

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mqpacker');
const replace = require('gulp-replace');
const del = require('del');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cheerio = require('gulp-cheerio');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-cleancss');
const include = require('gulp-file-include');
const htmlbeautify = require('gulp-html-beautify');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');
const buffer = require('vinyl-buffer');

gulp.task('sass', function(){
    return gulp.src(dirs.source + '/style.scss')
    .pipe(include())
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(dirs.build + '/'))
    .pipe(browserSync.stream())
    .pipe(rename('style.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dirs.build + '/'));
});

gulp.task('html', function() {
    return gulp.src(dirs.source + '/*.html')
    .pipe(include())
    .pipe(htmlbeautify())
    .pipe(plumber({ errorHandler: onError }))
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(gulp.dest(dirs.build));
});

gulp.task('img', function () {
    return gulp.src([
        dirs.source + '/assets/img/*.{gif,png,jpg,jpeg,svg,ico}',
        dirs.source + '/assets/img/**/*.{gif,png,jpg,jpeg,svg,ico}',
    ],
        {since: gulp.lastRun('img')}
    )
    .pipe(plumber({ errorHandler: onError }))
    .pipe(newer(dirs.build + '/assets/img'))
    .pipe(gulp.dest(dirs.build + '/assets/img'));
});

gulp.task('images', function () {
    return gulp.src([
        dirs.source + '/assets/images/*.{gif,png,jpg,jpeg,svg,ico}',
        dirs.source + '/assets/images/**/*.{gif,png,jpg,jpeg,svg,ico}',
    ],
        {since: gulp.lastRun('img')}
    )
    .pipe(plumber({ errorHandler: onError }))
    .pipe(newer(dirs.build + '/assets/images'))
    .pipe(gulp.dest(dirs.build + '/assets/images'));
});

gulp.task('imguploads', function () {
    return gulp.src([
        dirs.source + '/uploads/*.{gif,png,jpg,jpeg,svg,ico}',
        dirs.source + '/uploads/**/*.{gif,png,jpg,jpeg,svg,ico}',
    ],
        {since: gulp.lastRun('img')}
    )
    .pipe(plumber({ errorHandler: onError }))
    .pipe(newer(dirs.build + '/uploads'))
    .pipe(gulp.dest(dirs.build + '/uploads'));
});

gulp.task('svgstore', function (callback) {
    var spritePath = dirs.source + '/assets/img/svg-sprite';
        if(fileExist(spritePath) !== false) {
        return gulp.src(spritePath + '/*.svg')
        // .pipe(plumber({ errorHandler: onError }))
        .pipe(svgmin(function (file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(rename('sprite-svg.svg'))
        .pipe(gulp.dest(dirs.source + '/assets/img'));
    }
    else {
        console.log('Not found files for build svg sprites');
        callback();
    }
});

gulp.task('svgstore', function (callback) {
    var spritePath = dirs.source + '/assets/images/svg-sprite';
        if(fileExist(spritePath) !== false) {
        return gulp.src(spritePath + '/*.svg')
        // .pipe(plumber({ errorHandler: onError }))
        .pipe(svgmin(function (file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(rename('sprite-svg.svg'))
        .pipe(gulp.dest(dirs.source + '/assets/images'));
    }
    else {
        console.log('Not found files for build svg sprites');
        callback();
    }
});

gulp.task('clean', function () {
    return del([
        dirs.build + '/**/*',
        '!' + dirs.build + '/CNAME'
    ]);
});

gulp.task('copyFonts', function() {
    return gulp.src(dirs.source + '/assets/fonts/**/*.{woff,woff2,ttf,otf,eot,svg}')
    .pipe(gulp.dest(dirs.build + '/assets/fonts'));
});

gulp.task('copyCSS', function() {
    return gulp.src(dirs.source + '/assets/css/**/*.{css,css.map}')
    .pipe(gulp.dest(dirs.build + '/assets/css'));
});

gulp.task('copyJS', function() {
    return gulp.src(dirs.source + '/assets/js/**/*.{js,js.map}')
    .pipe(gulp.dest(dirs.build + '/assets/js'));
});

gulp.task('php', function() {
    return gulp.src(dirs.source + '/**/**/**/*.php')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(gulp.dest(dirs.build));
});

gulp.task('build', gulp.series(
    'clean',
    'svgstore',
    gulp.parallel('sass', 'img', 'images', 'imguploads', 'copyFonts', 'copyCSS', 'copyJS'),
    'html',
    'php'
));

gulp.task('serve', gulp.series('build', function() {
    browserSync.init({
        server: dirs.build,
        port: 3000,
        startPath: 'index.html',
        // open: false
    });
    gulp.watch(
        [
            dirs.source + '/**/*.html',
        ],
        gulp.series('html', reloader)
    );
    gulp.watch(
        [
            dirs.source + '**/**/**/**/*.php',
            dirs.source + '/modules/*.php',
        ],
        gulp.series('php', reloader)
    );
    gulp.watch(
        [
            dirs.source + '/sass/**/*.scss',
            dirs.source + '/sass/*.scss',
            dirs.source + '/scss/**/*.scss',
            dirs.source + '/scss/*.scss',
            dirs.source + '/*.scss',
        ],
        gulp.series('sass', reloader)
    );
    gulp.watch(
        dirs.source + '/assets/img/svg-sprite/*.svg',
        gulp.series('svgstore', 'html', reloader)
    );
    gulp.watch(
        dirs.source + '/assets/img/*.{gif,png,jpg,jpeg,svg}',
        gulp.series('img', reloader)
    );
    
    gulp.watch(
        dirs.source + '/assets/images/svg-sprite/*.svg',
        gulp.series('svgstore', 'html', reloader)
    );
    gulp.watch(
        dirs.source + '/assets/images/*.{gif,png,jpg,jpeg,svg}',
        gulp.series('img', reloader)
    );
    
    gulp.watch(
        [
            dirs.source + '/uploads/**/*.{gif,png,jpg,jpeg,svg}',
            dirs.source + '/uploads/*.{gif,png,jpg,jpeg,svg}',
        ],
        gulp.series('imguploads', reloader)
    );
    gulp.watch(
        dirs.source + '/assets/js/*.js',
        gulp.series('copyJS', reloader)
    );
}));

gulp.task('deploy', function() {
    return gulp.src(dirs.build + '/**/*')
    .pipe(ghPages());
});

gulp.task('default', gulp.series('serve'));

function reloader(done) {
    browserSync.reload();
    done();
}

function fileExist(path) {
    const fs = require('fs');
    try {
        fs.statSync(path);
    } catch(err) {
        return !(err && err.code === 'ENOENT');
    }
}
var onError = function(err) {
    notify.onError({
        title: 'Error in ' + err.plugin,
    })(err);
    this.emit('end');
};