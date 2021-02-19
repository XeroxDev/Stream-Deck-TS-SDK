"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDReady = void 0;
const stream_deck_plugin_1 = require("../../stream-deck-plugin");
function SDReady() {
    return function (target, propertyKey, descriptor) {
        const plugin = stream_deck_plugin_1.StreamDeckPlugin.getInstance();
        plugin.availableReadyListener.push(() => descriptor.value.apply(target));
        return descriptor;
    };
}
exports.SDReady = SDReady;
