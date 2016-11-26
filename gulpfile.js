(function () {

    'use strict';

    var gulp = require('gulp'),
        watch = require('gulp-watch'),
        prefixer = require('gulp-autoprefixer'),
        uglify = require('gulp-uglify'),
        cssmin = require('gulp-cssmin'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        rigger = require('gulp-rigger'),
        imagemin = require('gulp-imagemin'),
        pngquant = require('imagemin-pngquant'),
        rimraf = require('rimraf'),
        connect = require('gulp-connect'),
        ghPages = require('gulp-gh-pages'),
        opn = require('opn');

    var path = {
        build: {
            html: 'dist/',
            js: 'dist/assets/scripts/',
            css: 'dist/assets/styles/',
            img: 'dist/assets/images/',
            fonts: 'dist/assets/fonts/'
        },
        src: {
            html: ['src/**.html', 'src/app/*/**.html', 'src/app/*/*/**.html'],
            js: 'src/app/script.js',
            style: 'src/assets/styles/style.scss',
            img: 'src/assets/images/**/*.*',
            fonts: 'src/assets/fonts/**/*.*'
        },
        watch: {
            html: 'src/**.html',
            js: 'src/**.js',
            style: 'src/assets/styles/**/*.scss',
            img: 'src/assets/images/**/*.*',
            fonts: 'src/assets/fonts/**/*.*'
        },
        clean: './dist'
    };

    var server = {
        host: 'localhost',
        port: '9000'
    };

    gulp.task('clean', function (cb) {
        rimraf(path.clean, cb);
    });

    gulp.task('webserver', function () {
        connect.server({
            root: 'dist',
            host: server.host,
            port: server.port,
            livereload: true
        });
    });

    gulp.task('openbrowser', function () {
        opn('http://' + server.host + ':' + server.port);
    });

    gulp.task('html:build', function () {
        gulp.src(path.src.html)
            .pipe(rigger())
            .pipe(gulp.dest(path.build.html))
            .pipe(connect.reload());
    });

    gulp.task('js:build', function () {
        gulp.src(path.src.js)
            .pipe(rigger())
            .pipe(sourcemaps.init())
            .pipe(uglify({mangle: false}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(path.build.js))
            .pipe(connect.reload());
    });

    gulp.task('style:build', function () {
        gulp.src(path.src.style)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(prefixer())
            .pipe(cssmin())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(path.build.css))
            .pipe(connect.reload());
    });

    gulp.task('image:build', function () {
        gulp.src(path.src.img)
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()],
                interlaced: true
            }))
            .pipe(gulp.dest(path.build.img))
            .pipe(connect.reload());
    });

    gulp.task('fonts:build', function () {
        gulp.src(path.src.fonts)
            .pipe(gulp.dest(path.build.fonts))
    });

    gulp.task('deploy', function() {
        return gulp.src('./dist/**/*')
            .pipe(ghPages());
    });

    gulp.task('build', [
        'html:build',
        'js:build',
        'style:build',
        'fonts:build',
        'image:build',
        //'deploy'
    ]);

    gulp.task('watch', function(){
        watch([path.watch.html], function(event, cb) {
            gulp.start('html:build');
        });
        watch([path.watch.style], function(event, cb) {
            gulp.start('style:build');
        });
        watch([path.watch.js], function(event, cb) {
            gulp.start('js:build');
        });
        watch([path.watch.img], function(event, cb) {
            gulp.start('image:build');
        });
        watch([path.watch.fonts], function(event, cb) {
            gulp.start('fonts:build');
        });
    });

    gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);

})();