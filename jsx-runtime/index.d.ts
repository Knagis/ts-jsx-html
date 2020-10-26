export declare function jsx(type: string | ((props: any) => HTMLElement), props: any, key?: string): any;
export declare const jsxs: typeof jsx;
declare global {
    export namespace JSX {
        type Element = HTMLElement;
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
        type OptionalAttributes<T extends Element> = {
            [Key in "style" | Exclude<RemoveFunctions<T>, ReadonlyKeys<T>>]?: Partial<T[Key]>;
        };
        type IntrinsicElements1 = {
            [TagName in keyof HTMLElementTagNameMap]?: OptionalAttributes<HTMLElementTagNameMap[TagName]>;
        };
        type IntrinsicElements = IntrinsicElements1;
    }
}
