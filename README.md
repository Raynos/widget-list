# widget-list

[![build status][1]][2]

[![browser support][3]][4]

Turn input into a list of widgets

## Example

WidgetList takes a stream of additions and removals of values
as input and returns the expansion of all the widgets

```js
/*global document*/
var WidgetList = require("widget-list")
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

/* Widget in this case just creates an input and appends it
    to the body.

It sets the initial value to the value given and returns a stream
    of changes to that value

*/
var values = WidgetList(input, function create(x) {
    var input = document.createElement("input")
    input.value = x.value
    document.body.appendChild(input)

    var widget = map(events(input, "keypress"), function (ev) {
        console.log("ev", ev)
        return { value: input.value, id: x.id }
    })

    widget.view = input

    return widget
}, function destroy(widget) {
    widget.view.parentNode.removeChild(widget.view)
})

/* When we consume the values we are consuming a flat stream
    of all the changes to all the inputs
*/
fold(values, function (changes) {
    console.log("change", changes)
    // { value: textContentThing }
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
