import "jsx-dom-lite"; // https://github.com/microsoft/TypeScript/issues/40501

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
