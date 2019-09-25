(function () {
    function updateStyle(style: CSSStyleDeclaration, props: Partial<CSSStyleDeclaration>) {
        for (let key of Object.keys(props)) {
            style.setProperty(key, props[key as keyof CSSStyleDeclaration]);
        }
    }

    function appendChild(container: HTMLElement, child: any) {
        if (Array.isArray(child)) {
            for (const nested of child) {
                appendChild(container, nested);
            }
        } else if (!(child instanceof Node)) {
            container.appendChild(document.createTextNode(child));
        } else {
            container.appendChild(child);
        }
    }

    (window as any).JsxHtml = {
        createElement(
            component: string | ((props: any, children: any[]) => HTMLElement),
            attributes?: Partial<HTMLElement>,
            ...children: any[]
        ): HTMLElement {
            if (typeof component === "function") {
                return component(attributes, children);
            }

            let element = document.createElement(component);

            if (attributes) {
                for (let attrName of Object.keys(attributes)) {
                    let value = attributes[attrName as keyof typeof attributes];
                    if (attrName === "style") {
                        updateStyle(element.style, value as any);
                    } else if (value instanceof Function) {
                        (element as any)[attrName] = value;
                    } else {
                        element.setAttribute(attrName, value as any);
                    }
                }
            }

            for (const child of children) {
                appendChild(element, child);
            }

            return element;
        },
    };
})();