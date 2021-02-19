"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const property_inspector_decorator_1 = require("../src/decorators/classes/property-inspector.decorator");
const on_event_decorator_1 = require("../src/decorators/methods/on-event.decorator");
const ready_decorator_1 = require("../src/decorators/methods/ready.decorator");
const init_decorator_1 = require("../src/decorators/methods/init.decorator");
let CounterPi = class CounterPi {
    initialize(plugin) {
        this.plugin = plugin;
    }
    ready() {
        this.count = document.getElementById('count');
        this.stepsCount = document.getElementById('steps');
        this.saveButton = document.getElementById('save');
        this.saveButton.onclick = () => {
            this.plugin.setSettings({ count: this.count.valueAsNumber, steps: this.stepsCount.valueAsNumber });
        };
        this.plugin.requestSettings();
    }
    settingsHandler({ payload: { settings } }) {
        var _a, _b;
        this.count.value = (_a = settings.count) !== null && _a !== void 0 ? _a : 0;
        this.stepsCount.value = (_b = settings.steps) !== null && _b !== void 0 ? _b : 1;
    }
};
__decorate([
    init_decorator_1.SDInit()
], CounterPi.prototype, "initialize", null);
__decorate([
    ready_decorator_1.SDReady()
], CounterPi.prototype, "ready", null);
__decorate([
    on_event_decorator_1.SDOnEvent('didReceiveSettings')
], CounterPi.prototype, "settingsHandler", null);
CounterPi = __decorate([
    property_inspector_decorator_1.SDPropertyInspector
], CounterPi);
new CounterPi();
