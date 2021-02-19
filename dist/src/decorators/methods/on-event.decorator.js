"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDOnEvent = void 0;
const stream_deck_plugin_1 = require("../../stream-deck-plugin");
function SDOnEvent(event, actionName) {
    return function (target, propertyKey, descriptor) {
        const plugin = stream_deck_plugin_1.StreamDeckPlugin.getInstance();
        if (!plugin.availableEvents.has(event))
            plugin.availableEvents.set(event, []);
        const fnc = function (ev) {
            const eventData = JSON.parse(ev.data);
            if (!actionName || (eventData.action && eventData.action === actionName))
                descriptor.value.apply(target, [eventData]);
            else
                return;
        };
        plugin.availableEvents.get(event).push(fnc);
        return descriptor;
    };
}
exports.SDOnEvent = SDOnEvent;
