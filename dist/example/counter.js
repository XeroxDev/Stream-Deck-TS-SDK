"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_decorator_1 = require("../src/decorators/classes/plugin.decorator");
const init_decorator_1 = require("../src/decorators/methods/init.decorator");
const counter_action_1 = require("./actions/counter.action");
const on_event_decorator_1 = require("../src/decorators/methods/on-event.decorator");
let Counter = class Counter {
    initialize(plugin) {
        this.plugin = plugin;
        this.counters = [];
    }
    createCounter({ context, payload: { settings } }) {
        var _a;
        const found = this.counters.find(value => value.id === context);
        if (!found)
            this.counters.push({ id: context, action: new counter_action_1.CounterAction((_a = settings.currentCount) !== null && _a !== void 0 ? _a : settings.startCount) });
    }
    pressCounter({ context }) {
        const found = this.counters.find(value => value.id === context);
        if (!found)
            return;
        found.action.countUp();
    }
    settingsReceived(settings) {
        const found = this.counters.find(value => value.id === settings.context);
        if (!found)
            return;
        found.action.setSettings(settings.payload.settings.count, settings.payload.settings.steps);
    }
};
__decorate([
    init_decorator_1.SDInit()
], Counter.prototype, "initialize", null);
__decorate([
    on_event_decorator_1.SDOnEvent('willAppear', 'fun.shiro.counter.action')
], Counter.prototype, "createCounter", null);
__decorate([
    on_event_decorator_1.SDOnEvent('keyUp', 'fun.shiro.counter.action')
], Counter.prototype, "pressCounter", null);
__decorate([
    on_event_decorator_1.SDOnEvent('didReceiveSettings')
], Counter.prototype, "settingsReceived", null);
Counter = __decorate([
    plugin_decorator_1.SDPlugin
], Counter);
new Counter();
