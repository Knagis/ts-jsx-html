import { jsx as _jsx } from "./jsx-runtime.js";
import "./jsx-dom-lite.js"; // https://github.com/microsoft/TypeScript/issues/40501
export function Counter(props) {
    let value = props.initial;
    const elem = _jsx("strong", { children: value }, void 0);
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
