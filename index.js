var merge = require("reducers/merge")
var expand = require("reducers/expand")

module.exports = WidgetList

/* Takes a stream of item addition / removal and converts them
    into widgets defined by creation function.

    When a removal event comes in `destruction(widget)` is called
        to destroy the widget. Most likely DOM removal
*/
function WidgetList(reducible, creation, destruction) {
    var hash = {}

    return expand(reducible, function (input) {
        var widget = hash[input.id]
        if (!widget && input.eventType === "add") {
            widget = creation.apply(this, arguments)
            hash[input.id] = widget
            return widget
        } else if (widget && input.eventType === "remove") {
            delete hash[input.id]
            destruction(widget, input)
        }
    })
}
