define [
], () ->
    class Toggle
        constructor: (@element) ->
            @controls = $ @element.attr 'aria-controls'
            $ '[role=close]', @controls
            .bind 'click', (event) =>
                @hide()
            @element.bind 'click', (event) =>
                @toggle()
        toggle: () ->
            @controls.toggle()
        hide: () ->
            @controls.hide()

    exports =
        boot: ($) ->
            $ '[role=toggle]'
            .each (idx) ->
                new Toggle $ this
