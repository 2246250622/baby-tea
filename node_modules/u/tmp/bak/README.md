# u.js -- A JavaScript Micro-Basis

`u.js` is a minimialist JavaScript library. It smooths over the most common [non-DOM] activities, including:

 * Transforming collections
 * Copying/extending objects
 * Binding scope
 * Serializing and deserializing query-string KV pairs

`u.js` has no dependencies. `u.js` works in any browser.

Bugs/Requests --> david@clearspring.com


## Builds

There are two types of builds in `dist`: 
 * The base build (no special token)
 * A build including minor DOM conveniences (`-dom`)
 * A build omitting the module closure (`-global`), which will pollute the global scope

The builds come in three flavors of minification, identified by the extensions:

 * None (`.js`)
 * YUI Compressor (`.min.js`)
 * Google Closure Compiler (`.gcc.js`)

## Usage

Usage depends only on how your project builds, and whether you care to keep the DOM clean.

 * If your use-case allows you to pollute the DOM, you can simply load the files from `src` via a `<script>` tag, or the concatenated `-global` files from `dist`.
 * If your are building a JavaScript project that will not pollute the DOM, you can include the files from `src` in your build process, omitting the closure (`_header.js`, `_footer*.js`).
 * If your project has a module system similar to `/addthis/modules/trunk`--each module is a function with the signature `function (internal, external, env)`--you can use builds from `dist` that do not specify `-global`.

