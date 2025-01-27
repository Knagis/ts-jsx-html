Attempt to make the lightest possible useful runtime that creates DOM elements directly from JSX syntax.

```
document.appendChild(<table><tr><th>jsx-dom-lite</th></tr></table>);
```

To make this properly useful, https://github.com/microsoft/TypeScript/issues/14729 would be nice, otherwise one needs to do `<div>foo</div> as HTMLDivElement` to get the proper type outside of the JSX syntax.
