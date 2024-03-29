"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createServerModuleMap", {
    enumerable: true,
    get: function() {
        return createServerModuleMap;
    }
});
function createServerModuleMap({ serverActionsManifest, pageName }) {
    return new Proxy({}, {
        get: (_, id)=>{
            return {
                id: serverActionsManifest[process.env.NEXT_RUNTIME === "edge" ? "edge" : "node"][id].workers["app" + pageName],
                name: id,
                chunks: []
            };
        }
    });
}

//# sourceMappingURL=action-utils.js.map