"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterAction = void 0;
const stream_deck_plugin_1 = require("../../src/stream-deck-plugin");
class CounterAction {
    constructor(counter = 0) {
        this.counter = counter;
        this.step = 1;
        this.plugin = stream_deck_plugin_1.StreamDeckPlugin.getInstance();
        this.setTitle();
        this.plugin.requestSettings();
    }
    countUp() {
        this.counter += this.step;
        this.setTitle();
    }
    setSettings(count, step) {
        this.counter = count !== null && count !== void 0 ? count : this.counter;
        this.step = step !== null && step !== void 0 ? step : this.step;
        this.setTitle();
    }
    setTitle() {
        this.plugin.setTitle(`Count\n${this.counter}`);
    }
}
exports.CounterAction = CounterAction;
