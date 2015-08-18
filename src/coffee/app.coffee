requirejs.config
    baseUrl: 'scripts/app'
    shim:
        jquery:
            exports: '$'

require [
], () ->
    console.log 'ok'
