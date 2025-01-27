import { jsx as _jsx } from "./jsx-runtime.js";
/* @jsxImportSource jsx-dom-lite */
export function Counter(props) {
    let value = props.initial;
    const elem = _jsx("strong", { children: value });
    return {
        dom: elem,
        inc: () => {
            elem.textContent = (++value).toFixed();
        },
        dec: () => {
            elem.textContent = (--value).toFixed();
        },
    };
}
