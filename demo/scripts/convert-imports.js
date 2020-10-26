// To avoid requiring full bundler for tests, apply simple conversion for ES6 imports that
// can work directly in browsers.

const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "../compiled");
const files = fs.readdirSync(root);

linkSafe(
    path.resolve(__dirname, "../node_modules/jsx-dom-lite/jsx-runtime/index.js"),
    path.resolve(root, "jsx-runtime.js"),
);

linkSafe(
    path.resolve(__dirname, "../node_modules/jsx-dom-lite/index.js"),
    path.resolve(root, "jsx-dom-lite.js"),
);

for (const fileName of files) {
    if (!fileName.endsWith(".js")) {
        continue;
    }
    const filePath = path.join(root, fileName);

    let src = fs.readFileSync(filePath, "utf-8");

    src = src.replace(/(import([^"';]+?from)?\s+["'])(.+?)(["'])/gs, (_, m1, m2, imp, m3) => m1 + resolve(imp) + m3);

    fs.writeFileSync(filePath, src);
}

function linkSafe(src, target) {
    if (fs.existsSync(target)) {
        fs.unlinkSync(target);
    }
    fs.linkSync(src, target);
}

function resolve(imp) {
    if (imp.endsWith(".js")) {
        return imp;
    }

    if (imp === "jsx-dom-lite") {
        return "./jsx-dom-lite.js";
    }

    if (imp === "jsx-dom-lite/jsx-runtime") {
        return "./jsx-runtime.js";
    }

    return imp + ".js";
}
