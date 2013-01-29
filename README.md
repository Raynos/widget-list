# widget-list

[![build status][1]][2]

[![browser support][3]][4]

Turn input into a list of widgets

## Example

```js
var WidgetList = require("widget-list")
var map = require("reducers/map")
var fold = require("reducers/fold")
var events = require("dom-reduce/event")

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

var widgets = WidgetList(input, function create(x) {
    var input = document.createElement("input")
    input.value = x

    var values = map(events(input, "keypress"), function (ev) {
        return { value: input.value }
    })
    values.view = input

    return values
}, function destroy(widget) {
    widget.view.parentNode.removeChild(widget.view)
})

var values = expand(widgets, function (widget) {
    document.body.appendChild(widget.view)
    return widget
})

fold(values, function (changes) {
    console.log("change", changes.value)
})
```

## Installation

`npm install widget-list`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Colingo/widget-list.png
  [2]: http://travis-ci.org/Colingo/widget-list
  [3]: http://ci.testling.com/Colingo/widget-list.png
  [4]: http://ci.testling.com/Colingo/widget-list
