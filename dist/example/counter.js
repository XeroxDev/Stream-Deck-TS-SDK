"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
const stream_deck_plugin_handler_1 = require("../src/abstracts/stream-deck-plugin-handler");
const counter_action_1 = require("./actions/counter.action");
class Counter extends stream_deck_plugin_handler_1.StreamDeckPluginHandler {
    constructor() {
        super();
        new counter_action_1.CounterAction(this, 'fun.shiro.counter.action');
    }
}
exports.Counter = Counter;
new Counter();
