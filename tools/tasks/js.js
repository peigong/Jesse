var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var config = {
    tmp: './.tmp/js',
    coffee: './src/coffee/*.coffee',
    js: 'dist/jesse/scripts'
};

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
        out: 'app.js',
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

    gulp.src(config.coffee)
    .pipe($.coffee())
    .pipe(gulp.dest(config.tmp))
    .pipe($.requirejsOptimize(options))
    .pipe(gulp.dest(config.js));
});
