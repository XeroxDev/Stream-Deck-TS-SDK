"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDOnActionEvent = void 0;
function SDOnActionEvent(event) {
    return (target, propertyKey, descriptor) => {
        const addEventListener = (plugin, actionName, instance) => {
            plugin.addEventListener(event, function (ev) {
                const eventData = JSON.parse(ev.data);
                if (!eventData.action || eventData.action === actionName)
                    descriptor.value.apply(instance, [eventData]);
            });
        };
        if (!target._sd_events) {
            target._sd_events = [];
        }
        target._sd_events.push(addEventListener);
        return descriptor;
    };
}
exports.SDOnActionEvent = SDOnActionEvent;
