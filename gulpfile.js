var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    rimraf = require('rimraf'),
    config = {
        app: './',
        dist: 'build',
        port: 9000,
        scripts: function () {
            return this.app + '/src/*.js';
        },
        styles: function () {
            return this.app + '/src/*.css';
        }
    };

config.scripts.apply(config);

gulp.task('clean', function(cb) {
    rimraf(config.dist, cb);
});

gulp.task('uglify', function () {
    var dir = config.scripts();

    return gulp.src(dir)
        .pipe($.plumber())
        .pipe($.uglify())
        .pipe($.rename({
            suffix: ".min",
        }))
        .pipe(gulp.dest(config.dist));
});

gulp.task('copy:scripts', function () {
    var dir = config.scripts();

    return gulp.src(dir)
        .pipe(gulp.dest(config.dist));
});

gulp.task('copy:css', function () {
    var dir = config.styles();

    return gulp.src(dir)
        .pipe(gulp.dest(config.dist));
});

gulp.task('minify-end', function(){
    return gulp.src(config.app)
        .pipe($.notify({
            message: 'Build task complete'
        }));
});

gulp.task('watch', function() {

    // Watch .js files
    gulp.watch(config.scripts() + '/**/*.js', ['lint']);

});

// Default
gulp.task('default', function() {
    gulp.start('watch');
});

gulp.task('build', ['clean'], function(){
    gulp.start('uglify', 'copy:css', 'copy:scripts', 'minify-end');
});
