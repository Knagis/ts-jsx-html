import { jsx as _jsx, jsxs as _jsxs } from "./jsx-runtime.js";
import "./jsx-dom-lite.js"; // https://github.com/microsoft/TypeScript/issues/40501
function runTests() {
    let container = document.getElementById("test-container");
    let keys = Object.keys(JsxHtmlTests);
    for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        console.log("Running test", k);
        container.appendChild(_jsx("h2", { children: k }, void 0));
        container.appendChild(JsxHtmlTests[k]());
    }
}
function Table(props) {
    const cells = new Array(props.count);
    for (let i = 0; i < cells.length; i++) {
        cells[i] = i % 2 ? _jsx("td", { children: _jsx("strong", { children: i }, void 0) }, void 0) : _jsx("td", { children: _jsx("em", { children: i }, void 0) }, void 0);
    }
    return _jsx("table", { children: _jsx("tr", { children: cells }, void 0) }, void 0);
}
function Foo({ children }) {
    return _jsxs("div", Object.assign({ style: { border: "2px solid black" } }, { children: [children, _jsx(Table, { count: 11 }, void 0)] }), void 0);
}
const JsxHtmlTests = {
    simpleColoredDiv: () => {
        let a = _jsx("div", { children: "foo" }, void 0);
        a.style.color = "blue";
        return a;
    },
    inlineStyleAttributes: () => {
        return _jsx("div", Object.assign({ style: { color: "red" }, className: "cl1" }, { children: "foo" }), void 0);
    },
    imageSource: () => {
        let datauri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAgMTAwIj48ZyBmaWxsPSIjMjQ2QzQwIj48cGF0aCBkPSJNNzAgMjBoMjB2NjBINzB6TTEwIDgwbDU2IDE1VjVMMTAgMjB2NjB6bTE0LTUwaDguOWw1IDExLjFMNDMuMSAzMGg4LjdsLTkuMSAxNS45IDEwIDE4LjdoLTguOWwtNS45LTEzLjItNS44IDEzLjJoLTguN2w5LjctMTguNEwyNCAzMHoiLz48L2c+PC9zdmc+";
        return _jsx("img", { src: datauri, onload: () => console.log("image loaded"), width: 20 }, void 0);
    },
    nestedElements: () => {
        const width = _jsx("span", {}, void 0);
        let strong;
        const div = _jsxs("div", { children: ["This is ", strong = _jsx("strong", { children: "the width" }, void 0), ": ", width] }, void 0);
        div.style.background = "#eee";
        div.appendChild(_jsx("span", { children: "!" }, void 0));
        setTimeout(() => { width.textContent = strong.offsetWidth + "px"; });
        return div;
    },
    table6: () => {
        return _jsx(Table, { count: 6 }, void 0);
    },
    table9: () => {
        return _jsx(Table, { count: 9 }, void 0);
    },
    nestedComponent: () => {
        return _jsxs(Foo, { children: [_jsx(Table, { count: 6 }, void 0),
                _jsx(Table, { count: 9 }, void 0)] }, void 0);
    },
};
runTests();
