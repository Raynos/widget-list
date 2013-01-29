/*global document*/
var WidgetList = require("../index")
var map = require("reducers/map")
var fold = require("reducers/fold")
var expand = require("reducers/expand")
var events = require("dom-reduce/event")
var console = require("console")

var input = [{
    id: "one"
    , value: "one"
    , eventType: "add"
}, {
    id: "two"
    , value: "two"
    , eventType: "add"
}, {
    id: "three"
    , value: "three"
    , eventType: "add"
}, {
    id: "three"
    , eventType: "remove"
}]

var values = WidgetList(input, function create(x) {

    var input = document.createElement("input")
    input.value = x.value
    document.body.appendChild(input)

    var widget = map(events(input, "keypress"), function (ev) {
        console.log("ev", ev)
        return { value: input.value }
    })

    widget.view = input

    return widget
}, function destroy(widget) {
    widget.view.parentNode.removeChild(widget.view)
})

fold(values, function (changes) {
    console.log("change", changes)
    // { value: textContentThing }
})
