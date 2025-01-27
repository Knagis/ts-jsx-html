/* @jsxImportSource jsx-dom-lite */

export function Counter(props: { initial: number; }) {
    let value = props.initial;
    const elem = <strong>{value}</strong>;
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
