requirejs.config({
    // 设置模块别名
    // RequireJS 2.0 中可以配置数组，顺序映射，当前面模块资源未成功加载时可顺序加载后续资源
    paths: {
        'jquery': './zepto',
        'md5': './md5',
        'underscore': './underscore',
        'way': './way'
    },
    shim: {
        jquery: {
            exports: 'Zepto'
        },
        md5: {
            exports: 'md5'
        },
        underscore: {
            exports: '_'
        },
        way: {
            exports: 'way'
        }
    }
});
