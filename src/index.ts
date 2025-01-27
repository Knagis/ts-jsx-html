export function jsx<P, R extends HTMLElement>(type: ((props: P) => R), props: P, key?: string): R;
export function jsx<K extends keyof HTMLElementTagNameMap>(type: K, props: any, key?: string): HTMLElementTagNameMap[K];
export function jsx(type: string, props: any, key?: string): HTMLElement;
export function jsx(type: string | ((props: any) => HTMLElement), props: any, key?: string) {
    if (typeof type === "function") {
        return (type as any)(props, key);
    }

    const element = document.createElement(type);
    let ref: undefined | ((node: any) => void);
    for (const attrName of Object.keys(props)) {
        const value = props[attrName as keyof typeof props];
        if (attrName === "children") {
            appendChild(element, value);
        } else if (attrName === "className") {
            element.className = value;
        } else if (attrName === "style") {
            updateStyle(element.style, value as Partial<CSSStyleDeclaration>);
        } else if (typeof value === "function") {
            (element as any)[attrName] = value;
        } else {
            element.setAttribute(attrName, value as any);
        }
    }

    return element;
}

export const jsxs = jsx;

function updateStyle(style: CSSStyleDeclaration, props: Partial<CSSStyleDeclaration>) {
    for (const key of Object.keys(props)) {
        style.setProperty(key, props[key as keyof CSSStyleDeclaration] as string | null);
    }
}

function appendChild(container: HTMLElement, child: any) {
    if (child instanceof Node) {
        container.appendChild(child);
    } else if (Array.isArray(child)) {
        for (const nested of child) {
            appendChild(container, nested);
        }
    } else {
        container.appendChild(document.createTextNode(child));
    }
}

export namespace JSX {
    export type Element = HTMLElement;

    type IfEquals<X, Y, A = X, B = never> =
        (<T>() => T extends X ? 1 : 2) extends
        (<T>() => T extends Y ? 1 : 2) ? A : B;

    type ReadonlyKeys<T> = {
        [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>
    }[keyof T];

    type RemoveFunctions<T> = {
        [Key in keyof T]: T[Key] extends Function ? never : Key
    }[keyof T];

    type IncludedAttributes = "style";

    type ExcludedAttributes = "outerHTML" | "outerText";

    type OptionalAttributes<T extends Element> = {
        [Key in IncludedAttributes | Exclude<Exclude<RemoveFunctions<T>, ExcludedAttributes>, ReadonlyKeys<T>>]?: Partial<T[Key]>;
    };

    type IntrinsicElements1 = {
        [TagName in keyof HTMLElementTagNameMap]?: OptionalAttributes<HTMLElementTagNameMap[TagName]>;
    }

    type IntrinsicElements2 = {
        [P: string]: OptionalAttributes<HTMLElement>;
    }
    
    export type IntrinsicElements = IntrinsicElements1 & IntrinsicElements2;
}
