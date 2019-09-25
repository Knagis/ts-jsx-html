declare namespace JSX {
    // change the alias to use the different versions
    type IntrinsicElements = IntrinsicElements4;

    // works
    type IntrinsicElements1 = {
        a: Partial<HTMLAnchorElement>;
    }

    // works
    type IntrinsicElements2 = {
        [P: string]: Partial<HTMLElement>;
    }

    // works
    type IntrinsicElements3 = {
        a: Partial<HTMLAnchorElement>;
        [P: string]: Partial<HTMLElement>;
    }

    // does not work
    type IntrinsicElements4 = IntrinsicElements1 & IntrinsicElements2;

}
