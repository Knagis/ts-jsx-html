import "jsx-dom-lite"; // https://github.com/microsoft/TypeScript/issues/40501

import { Counter } from "./Counter";

function runTests() {
    let container = document.getElementById("test-container")!;

    let keys = Object.keys(JsxHtmlTests);
    for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        console.log("Running test", k);

        container.appendChild(<h2>{k}</h2>);
        container.appendChild(JsxHtmlTests[k]());
    }
}

function Table(props: { count: number }) {
    const cells = new Array(props.count);
    for (let i = 0; i < cells.length; i++) {
        cells[i] = i % 2 ? <td><strong>{i}</strong></td> : <td><em>{i}</em></td>;
    }
    return <table><tr>{cells}</tr></table>
}

function Foo({ children }: { children?: JSX.Element[] }) {
    return <div style={{ border: "2px solid black" }}>
        {children}
        <Table count={11} />
    </div>
}

const JsxHtmlTests: { [name: string]: () => JSX.Element } = {
    simpleColoredDiv: () => {
        let a = <div>foo</div>;
        a.style.color = "blue";
        return a;
    },

    inlineStyleAttributes: () => {
        return <div style={{ color: "red" }} className="cl1">foo</div>
    },

    imageSource: () => {
        let datauri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAgMTAwIj48ZyBmaWxsPSIjMjQ2QzQwIj48cGF0aCBkPSJNNzAgMjBoMjB2NjBINzB6TTEwIDgwbDU2IDE1VjVMMTAgMjB2NjB6bTE0LTUwaDguOWw1IDExLjFMNDMuMSAzMGg4LjdsLTkuMSAxNS45IDEwIDE4LjdoLTguOWwtNS45LTEzLjItNS44IDEzLjJoLTguN2w5LjctMTguNEwyNCAzMHoiLz48L2c+PC9zdmc+";

        return <img src={datauri} onload={() => console.log("image loaded")} width={20} />
    },

    nestedElements: () => {
        const width: HTMLSpanElement = <span></span>;
        let strong: HTMLElement;
        const div = <div>This is {strong = <strong>the width</strong>}: {width}</div>;

        div.style.background = "#eee";
        div.appendChild(<span>!</span>);
        setTimeout(() => { width.textContent = strong.offsetWidth + "px"; });

        return div;
    },

    table6: () => {
        return <Table count={6}></Table>;
    },
    table9: () => {
        return <Table count={9}></Table>;
    },

    nestedComponent: () => {
        return <Foo>
            <Table count={6}></Table>
            <Table count={9}></Table>
        </Foo>
    },
}

runTests();