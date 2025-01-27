export function jsx(type, props, key) {
    if (typeof type === "function") {
        return type(props, key);
    }
    const element = document.createElement(type);
    let ref;
    for (const attrName of Object.keys(props)) {
        const value = props[attrName];
        if (attrName === "ref") {
            ref = value;
        }
        else if (attrName === "children") {
            appendChild(element, value);
        }
        else if (attrName === "className") {
            element.className = value;
        }
        else if (attrName === "style") {
            updateStyle(element.style, value);
        }
        else if (typeof value === "function") {
            element[attrName] = value;
        }
        else {
            element.setAttribute(attrName, value);
        }
    }
    ref === null || ref === void 0 ? void 0 : ref(element);
    return element;
}
export const jsxs = jsx;
function updateStyle(style, props) {
    for (const key of Object.keys(props)) {
        style.setProperty(key, props[key]);
    }
}
function appendChild(container, child) {
    if (child instanceof Node) {
        container.appendChild(child);
    }
    else if (Array.isArray(child)) {
        for (const nested of child) {
            appendChild(container, nested);
        }
    }
    else {
        container.appendChild(document.createTextNode(child));
    }
}
