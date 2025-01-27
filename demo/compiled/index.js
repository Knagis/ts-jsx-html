import { jsx as _jsx, jsxs as _jsxs } from "./jsx-runtime.js";
/* @jsxImportSource jsx-dom-lite */
import { Counter } from "./Counter.js";
function runTests() {
    let container = document.getElementById("test-container");
    const counter = Counter({ initial: 1 });
    container.appendChild(counter.dom);
    setInterval(() => { counter.inc(); }, 1000);
    for (const k of Object.keys(JsxHtmlTests)) {
        console.log("Running test", k);
        container.appendChild(_jsx("h2", { children: k }));
        container.appendChild(JsxHtmlTests[k]());
    }
}
function Table(props) {
    const cells = new Array(props.count);
    for (let i = 0; i < cells.length; i++) {
        cells[i] = i % 2 ? _jsx("td", { children: _jsx("strong", { children: i }) }) : _jsx("td", { children: _jsx("em", { children: i }) });
    }
    return _jsx("table", { children: _jsx("tr", { children: cells }) });
}
function Foo({ children }) {
    return _jsxs("div", { style: { border: "2px solid black" }, children: [children, _jsx(Table, { count: 11 })] });
}
const JsxHtmlTests = {
    simpleColoredDiv: () => {
        let a = _jsx("div", { children: "foo" });
        a.style.color = "blue";
        return a;
    },
    inlineStyleAttributes: () => {
        return _jsx("div", { style: { color: "red" }, className: "cl1", children: "foo" });
    },
    imageSource: () => {
        let datauri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAgMTAwIj48ZyBmaWxsPSIjMjQ2QzQwIj48cGF0aCBkPSJNNzAgMjBoMjB2NjBINzB6TTEwIDgwbDU2IDE1VjVMMTAgMjB2NjB6bTE0LTUwaDguOWw1IDExLjFMNDMuMSAzMGg4LjdsLTkuMSAxNS45IDEwIDE4LjdoLTguOWwtNS45LTEzLjItNS44IDEzLjJoLTguN2w5LjctMTguNEwyNCAzMHoiLz48L2c+PC9zdmc+";
        return _jsx("img", { src: datauri, onload: () => console.log("image loaded"), width: 20 });
    },
    nestedElements: () => {
        const width = _jsx("span", {});
        let strong;
        const div = _jsxs("div", { children: ["This is ", strong = _jsx("strong", { children: "the width" }), ": ", width] });
        div.style.background = "#eee";
        div.appendChild(_jsx("span", { children: "!" }));
        setTimeout(() => { width.textContent = strong.offsetWidth + "px"; });
        return div;
    },
    table6: () => {
        return _jsx(Table, { count: 6 });
    },
    table9: () => {
        return _jsx(Table, { count: 9 });
    },
    nestedComponent: () => {
        return _jsxs(Foo, { children: [_jsx(Table, { count: 6 }), _jsx(Table, { count: 9 })] });
    },
};
runTests();
