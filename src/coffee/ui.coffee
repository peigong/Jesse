define [
    'jquery'
    'ui/toggle'
], ($, components...) ->
    initialize = (component) ->
        component.boot($)

    $ () ->
        initialize component for component in components
