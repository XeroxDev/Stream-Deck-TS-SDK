"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDPlugin = void 0;
const stream_deck_plugin_1 = require("../../stream-deck-plugin");
function SDPlugin(constructor) {
    stream_deck_plugin_1.StreamDeckPlugin.getInstance();
    return constructor;
}
exports.SDPlugin = SDPlugin;
