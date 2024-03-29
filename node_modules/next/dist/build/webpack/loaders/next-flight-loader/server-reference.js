/* eslint-disable import/no-extraneous-dependencies */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return registerServerReference;
    }
});
const _serveredge = require("react-server-dom-webpack/server.edge");
const SERVER_REFERENCE_TAG = Symbol.for("react.server.reference");
function isServerReference(reference) {
    return reference && reference.$$typeof === SERVER_REFERENCE_TAG;
}
function registerServerReference(id, action) {
    // Avoid registering the same action twice
    if (isServerReference(action)) {
        return action;
    }
    return (0, _serveredge.registerServerReference)(action, id, null);
}

//# sourceMappingURL=server-reference.js.map