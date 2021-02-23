"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterAction = void 0;
const stream_deck_action_1 = require("../../src/abstracts/stream-deck-action");
const on_action_event_decorator_1 = require("../../src/decorators/on-action-event.decorator");
class CounterAction extends stream_deck_action_1.StreamDeckAction {
    constructor(plugin, actionName) {
        super(plugin, actionName);
        this.plugin = plugin;
        this.actionName = actionName;
    }
    onAppear({ context, payload: { settings } }) {
        var _a;
        if (!settings)
            return;
        this.plugin.setTitle(((_a = settings.count) !== null && _a !== void 0 ? _a : 0).toString(), context);
    }
    onKeyUp({ context, payload: { settings } }) {
        var _a, _b;
        clearTimeout(this.keyUpTimer);
        const steps = (_a = settings.steps) !== null && _a !== void 0 ? _a : 1;
        const count = (_b = settings.count + steps) !== null && _b !== void 0 ? _b : 0;
        this.plugin.setTitle(count.toString(), context);
        this.plugin.setSettings({ steps, count }, context);
    }
    onKeyDown({ context, payload: { settings } }) {
        this.keyUpTimer = setTimeout(() => {
            var _a;
            const steps = (_a = settings.steps) !== null && _a !== void 0 ? _a : 1;
            this.plugin.setSettings({
                steps,
                count: steps * -1
            }, context);
            this.plugin.setTitle('0', context);
        }, 2000);
    }
    onSettings({ context, payload: { settings } }) {
        var _a;
        this.plugin.setTitle((_a = settings.count.toString()) !== null && _a !== void 0 ? _a : 0, context);
    }
}
__decorate([
    on_action_event_decorator_1.SDOnActionEvent('willAppear')
], CounterAction.prototype, "onAppear", null);
__decorate([
    on_action_event_decorator_1.SDOnActionEvent('keyUp')
], CounterAction.prototype, "onKeyUp", null);
__decorate([
    on_action_event_decorator_1.SDOnActionEvent('keyDown')
], CounterAction.prototype, "onKeyDown", null);
__decorate([
    on_action_event_decorator_1.SDOnActionEvent('didReceiveSettings')
], CounterAction.prototype, "onSettings", null);
exports.CounterAction = CounterAction;
