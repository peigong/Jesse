
module.exports =
    tmp: './.tmp'
    less: './src/less/**/*.less'
    coffee: './src/coffee/**/*.coffee'
    jade: './src/**/*.jade'
    dist: './dist/jesse'
    styles: './dist/jesse/styles'
    scripts: './dist/jesse/scripts'
    errorHandler: (err) ->
        console.log "#{err.plugin} -> #{err.message}"
