"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_deck_property_inspector_handler_1 = require("../src/abstracts/stream-deck-property-inspector-handler");
const on_pi_event_decorator_1 = require("../src/decorators/on-pi-event.decorator");
class CounterPi extends stream_deck_property_inspector_handler_1.StreamDeckPropertyInspectorHandler {
    onReady() {
        var _a, _b;
        this.count = document.getElementById('count');
        this.stepsCount = document.getElementById('steps');
        this.saveButton = document.getElementById('save');
        this.saveButton.onclick = () => {
            this.setSettings({ count: this.count.valueAsNumber, steps: this.stepsCount.valueAsNumber });
        };
        this.count.value = (_a = this.settings.count) !== null && _a !== void 0 ? _a : 0;
        this.stepsCount.value = (_b = this.settings.steps) !== null && _b !== void 0 ? _b : 1;
    }
    onSettingsReceived({ payload: { settings } }) {
        if (!settings)
            return;
        this.count.value = settings.count.toString();
        this.stepsCount.value = settings.steps.toString();
    }
}
__decorate([
    on_pi_event_decorator_1.SDOnPiEvent('didReceiveSettings')
], CounterPi.prototype, "onSettingsReceived", null);
new CounterPi();
