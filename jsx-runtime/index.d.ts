export declare function jsx<P, R extends HTMLElement>(type: ((props: P) => R), props: P, key?: string): R;
export declare function jsx<K extends keyof HTMLElementTagNameMap>(type: K, props: any, key?: string): HTMLElementTagNameMap[K];
export declare function jsx(type: string, props: any, key?: string): HTMLElement;
export declare const jsxs: typeof jsx;
export declare namespace JSX {
    export type Element = HTMLElement;
    type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
    type ReadonlyKeys<T> = {
        [P in keyof T]-?: IfEquals<{
            [Q in P]: T[P];
        }, {
            -readonly [Q in P]: T[P];
        }, never, P>;
    }[keyof T];
    type RemoveFunctions<T> = {
        [Key in keyof T]: T[Key] extends Function ? never : Key;
    }[keyof T];
    type IncludedAttributes = "style";
    type ExcludedAttributes = "outerHTML" | "outerText";
    type OptionalAttributes<T extends Element> = {
        [Key in IncludedAttributes | Exclude<Exclude<RemoveFunctions<T>, ExcludedAttributes>, ReadonlyKeys<T>>]?: Partial<T[Key]>;
    } & {
        ref?: (node: T) => void;
    };
    type IntrinsicElements1 = {
        [TagName in keyof HTMLElementTagNameMap]?: OptionalAttributes<HTMLElementTagNameMap[TagName]>;
    };
    type IntrinsicElements2 = {
        [P: string]: OptionalAttributes<HTMLElement>;
    };
    export type IntrinsicElements = IntrinsicElements1 & IntrinsicElements2;
    export {};
}
