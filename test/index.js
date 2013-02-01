var test = require("tape")
var into = require("reducers/into")

var WidgetList = require("../index")
var widgets = require("../widgets")

test("WidgetList is a function", function (assert) {
    assert.equal(typeof WidgetList, "function")
    assert.end()
})

test("creates a widget when item is added", function (assert) {
    var list = into(WidgetList([
        { id: "1", eventType: "add" }
    ], function () { return 42 }))

    assert.deepEqual(list, [42])
    assert.end()
})

test("creates multiple widgets", function (assert) {
    var list = into(WidgetList([
        { id: "1", eventType: "add" }
        , { id: "2", eventType: "add" }
        , { id: "3", eventType: "add" }
    ], function (x) { return x.id }))

    assert.deepEqual(list, ["1", "2", "3"])
    assert.end()
})

test("doesn't create the same widget multiple times", function (assert) {
    var list = into(WidgetList([
        { id: "1", eventType: "add" }
        , { id: "1", eventType: "add" }
        , { id: "1", eventType: "add" }
    ], function (x) { return x.id }))

    assert.deepEqual(list, ["1"])
    assert.end()
})

test("removal works", function (assert) {
    var list = into(WidgetList([
        { id: "1", eventType: "add" }
        , { id: "1", eventType: "remove" }
    ], function create(x) {
        return { alive: true }
    }, function destroy(item) {
        item.alive = false
    }))

    assert.deepEqual(list, [{ alive: false }])
    assert.end()
})

test("order makes sense", function (assert) {
    var list = into(WidgetList([
        { id: 1, eventType: "add" }
        , { id: 2, eventType: "add" }
        , { id: 1, eventType: "add" }
        , { id: 3, eventType: "add" }
        , { id: 4, eventType: "add" }
        , { id: 2, eventType: "remove" }
        , { id: 1, eventType: "remove" }
        , { id: 2, eventType: "remove" }
        , { id: 1, eventType: "add" }
    ], function create(x) {
        return { alive: true }
    }, function destroy(x) {
        x.alive = false
    }))

    var alive = list.filter(function (x) {
        return x.alive
    })

    assert.equal(alive.length, 3)
    assert.end()
})

test("widgets", function (assert) {
    var list = WidgetList([
        { id: 1, eventType: "add" }
        , { id: 2, eventType: "add" }
        , { id: 3, eventType: "add" }
    ], function create(x) {
        return { id: x.id, thing: true }
    })

    into(list)

    assert.deepEqual(widgets(list), [
        [{ id: 1, thing: true }, "1"]
        , [{ id: 2, thing: true }, "2"]
        , [{ id: 3, thing: true }, "3"]
    ])
    assert.end()
})
