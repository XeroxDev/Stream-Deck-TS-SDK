"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDPropertyInspector = void 0;
const stream_deck_plugin_1 = require("../../stream-deck-plugin");
function SDPropertyInspector(constructor) {
    stream_deck_plugin_1.StreamDeckPlugin.getInstance();
    return constructor;
}
exports.SDPropertyInspector = SDPropertyInspector;
