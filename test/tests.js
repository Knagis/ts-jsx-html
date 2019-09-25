"use strict";
/// <reference path="../lib/ts-jsx-html.d.ts" />
function runTests() {
    var keys = Object.keys(JsxHtmlTests);
    var container = document.getElementById("test-container");
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        console.log("Running test", k);
        container.appendChild(JsxHtml.createElement("h2", null, k));
        container.appendChild(JsxHtmlTests[k]());
    }
}
function Table(props) {
    var cells = new Array(props.count);
    for (var i = 0; i < cells.length; i++) {
        cells[i] = i % 2 ? JsxHtml.createElement("td", null,
            JsxHtml.createElement("strong", null, i)) : JsxHtml.createElement("td", null,
            JsxHtml.createElement("em", null, i));
    }
    return JsxHtml.createElement("table", null,
        JsxHtml.createElement("tr", null, cells));
}
function Foo(props, children) {
    return JsxHtml.createElement("div", { style: { border: "2px solid black" } },
        children,
        JsxHtml.createElement(Table, { count: 11 }));
}
var JsxHtmlTests = {
    directCallWithoutJsx: function () {
        return JsxHtml.createElement("div", {}, "foo");
    },
    simpleColoredDiv: function () {
        var a = JsxHtml.createElement("div", null, "foo");
        a.style.color = "blue";
        return a;
    },
    inlineStyleAttributes: function () {
        return JsxHtml.createElement("div", { style: { color: "red" } }, "foo");
    },
    imageSource: function () {
        var datauri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAgMTAwIj48ZyBmaWxsPSIjMjQ2QzQwIj48cGF0aCBkPSJNNzAgMjBoMjB2NjBINzB6TTEwIDgwbDU2IDE1VjVMMTAgMjB2NjB6bTE0LTUwaDguOWw1IDExLjFMNDMuMSAzMGg4LjdsLTkuMSAxNS45IDEwIDE4LjdoLTguOWwtNS45LTEzLjItNS44IDEzLjJoLTguN2w5LjctMTguNEwyNCAzMHoiLz48L2c+PC9zdmc+";
        return JsxHtml.createElement("img", { src: datauri, onload: function () { return console.log("image loaded"); }, width: 20 });
    },
    nestedElements: function () {
        var width = JsxHtml.createElement("span", null);
        var div = JsxHtml.createElement("div", null,
            "This is ",
            JsxHtml.createElement("strong", null, "the width"),
            ": ",
            width);
        div.style.background = "#eee";
        div.appendChild(JsxHtml.createElement("span", null, "!"));
        setTimeout(function () { width.textContent = div.clientWidth + "px"; });
        return div;
    },
    table6: function () {
        return JsxHtml.createElement(Table, { count: 6 });
    },
    table9: function () {
        return JsxHtml.createElement(Table, { count: 6 });
    },
    nestedComponent: function () {
        return JsxHtml.createElement(Foo, null,
            JsxHtml.createElement(Table, { count: 6 }),
            JsxHtml.createElement(Table, { count: 9 }));
    }
};
runTests();
