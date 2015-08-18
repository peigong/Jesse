var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var del = require('del'),
    runSequence = require('run-sequence');

var config = {
        path: {
          less: './src/less/*.less',
          coffee: './src/coffee/*.coffee',
          jade: './src/*.jade'
        },
        dist: {
          css: './dist/jesse/styles',
          js: './dist/jesse/scripts',
          jade: './dist/jesse'
        }
    },
    bower_components = [
        'bower_components/requirejs/require.js',
        'bower_components/underscore/underscore.js',
        'bower_components/JavaScript-MD5/js/md5.js',
        'bower_components/way.js/way.js',
        'bower_components/zeptojs/src/zepto.js',
        'bower_components/zeptojs/src/event.js',
        'bower_components/zeptojs/src/ajax.js',
        'bower_components/zeptojs/src/ie.js',
        'bower_components/zeptojs/src/detect.js',
        'bower_components/zeptojs/src/fx.js',
        'bower_components/zeptojs/src/deferred.js',
        'bower_components/zeptojs/src/callbacks.js',
        'bower_components/zeptojs/src/touch.js',
        'bower_components/zeptojs/src/gesture.js'
    ];

gulp.task('build:clean', function(cb) {
    del(['./dist'], cb);
});

gulp.task('archive', function(cb) {
  runSequence([
      'archive:copy:favicon',
      'archive:copy:css'
    ], cb);
});

gulp.task('archive:copy:favicon', function() {
    return gulp.src('./src/favicon.ico', { base: './src' })
    .pipe(gulp.dest('./dist/jesse/'));
});

gulp.task('archive:copy:css', function() {
    return gulp.src('./src/css/*.css', { base: './src/css' })
    .pipe(gulp.dest(config.dist.css));
});

gulp.task('build:less', function() {
    gulp.src(config.path.less)
    .pipe($.less())
    .pipe(gulp.dest(config.dist.css));
});

gulp.task('build:js', function() {
    // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
    var options = {
        // JS 文件优化方式，目前支持以下几种：
        //   uglify: （默认） 使用 UglifyJS 来压缩代码
        //   closure: 使用 Google's Closure Compiler 的简单优化模式
        //   closure.keepLines: 使用 closure，但保持换行
        //   none: 不压缩代码
        optimize: 'none',
        // 模块根目录。默认情况下所有模块资源都相对此目录。
        // 若该值未指定，模块则相对build文件所在目录。
        // 若appDir值已指定，模块根目录baseUrl则相对appDir。
        mainConfigFile: 'src/requirejs.conf.js',
        // 指定输出目录，若值未指定，则相对 build 文件所在目录
        //dir: 'dist/scripts/app',
        // 仅优化单个模块及其依赖项
        name: 'app',
        out: [config.dist.js, 'app.js'].join('/'),
        // 在 RequireJS 2.0.2 中，输出目录的所有资源会在 build 前被删除
        // 值为 true 时 rebuild 更快，但某些特殊情景下可能会出现无法预料的异常
        keepBuildDir: true,
        // 处理所有的文本资源依赖项，从而避免为加载资源而产生的大量单独xhr请求
        inlineText: true,
        stubModules: ['text'],
        // TODO: Figure out how to make sourcemaps work with grunt-usemin
        // https://github.com/yeoman/grunt-usemin/issues/30
        //generateSourceMaps: true,
        // required to support SourceMaps
        // http://requirejs.org/docs/errors.html#sourcemapcomments
        preserveLicenseComments: false
        //uglify2: {} // https://github.com/mishoo/UglifyJS2
    };

    gulp.src(config.path.coffee)
    .pipe($.coffee())
    .pipe(gulp.dest(config.dist.js))
    .pipe($.requirejsOptimize(options))
    .pipe(gulp.dest(config.dist.js));
});

gulp.task('build:html', function() {
    gulp.src(config.path.jade)
    .pipe($.jade({
        pretty: true
    }))
    .pipe($.inject(gulp.src(bower_components, { read: false })))
    .pipe($.usemin({
        assetsDir: '.',
        js: [$.uglify()]
    }))
    .pipe(gulp.dest(config.dist.jade));
});

gulp.task('build', function(cb) {
    runSequence(
        'build:clean',
        ['archive', 'build:less', 'build:js', 'build:html'],
    cb);
});

gulp.task('watch', function() {
    gulp.watch(config.path.less, ['build:less']);
    gulp.watch(config.path.jade, ['build:html']);
});

gulp.task('default', ['build']);
