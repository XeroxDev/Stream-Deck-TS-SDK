"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDDebug = void 0;
const stream_deck_plugin_1 = require("../../stream-deck-plugin");
function SDDebug(constructor) {
    stream_deck_plugin_1.StreamDeckPlugin.getInstance().debug = true;
    return constructor;
}
exports.SDDebug = SDDebug;
