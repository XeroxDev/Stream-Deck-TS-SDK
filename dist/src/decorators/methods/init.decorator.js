"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDInit = void 0;
const stream_deck_plugin_1 = require("../../stream-deck-plugin");
function SDInit() {
    return function (target, propertyKey, descriptor) {
        const plugin = stream_deck_plugin_1.StreamDeckPlugin.getInstance();
        descriptor.value.apply(target, [plugin]);
        return descriptor;
    };
}
exports.SDInit = SDInit;
