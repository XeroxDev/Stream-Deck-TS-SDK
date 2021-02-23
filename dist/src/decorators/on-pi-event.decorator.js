"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDOnPiEvent = void 0;
function SDOnPiEvent(event, actionName) {
    return (target, propertyKey, descriptor) => {
        const addEventListener = (plugin) => {
            plugin.addEventListener(event, function (ev) {
                const eventData = JSON.parse(ev.data);
                if (!actionName || (!eventData.action || eventData.action === actionName))
                    descriptor.value.apply(plugin, [eventData]);
                else
                    return;
            });
        };
        if (!target._sd_events) {
            target._sd_events = [];
        }
        target._sd_events.push(addEventListener);
    };
}
exports.SDOnPiEvent = SDOnPiEvent;
