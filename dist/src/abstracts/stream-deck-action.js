"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamDeckAction = void 0;
const stream_deck_plugin_handler_1 = require("./stream-deck-plugin-handler");
class StreamDeckAction {
    constructor(plugin, actionName) {
        if (!(plugin instanceof stream_deck_plugin_handler_1.StreamDeckPluginHandler))
            throw Error('"plugin" needs to be a child of StreamDeckPluginHandler');
        if (this._sd_events)
            for (let event of this._sd_events)
                event(plugin, actionName, this);
    }
}
exports.StreamDeckAction = StreamDeckAction;
