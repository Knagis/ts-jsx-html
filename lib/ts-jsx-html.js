"use strict";
(function () {
    function updateStyle(style, props) {
        for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
            var key = _a[_i];
            style.setProperty(key, props[key]);
        }
    }
    function appendChild(container, child) {
        if (Array.isArray(child)) {
            for (var _i = 0, child_1 = child; _i < child_1.length; _i++) {
                var nested = child_1[_i];
                appendChild(container, nested);
            }
        }
        else if (!(child instanceof Node)) {
            container.appendChild(document.createTextNode(child));
        }
        else {
            container.appendChild(child);
        }
    }
    window.JsxHtml = {
        createElement: function (component, attributes) {
            var children = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                children[_i - 2] = arguments[_i];
            }
            if (typeof component === "function") {
                return component(attributes, children);
            }
            var element = document.createElement(component);
            if (attributes) {
                for (var _a = 0, _b = Object.keys(attributes); _a < _b.length; _a++) {
                    var attrName = _b[_a];
                    var value = attributes[attrName];
                    if (attrName === "style") {
                        updateStyle(element.style, value);
                    }
                    else if (value instanceof Function) {
                        element[attrName] = value;
                    }
                    else {
                        element.setAttribute(attrName, value);
                    }
                }
            }
            for (var _c = 0, children_1 = children; _c < children_1.length; _c++) {
                var child = children_1[_c];
                appendChild(element, child);
            }
            return element;
        }
    };
})();
