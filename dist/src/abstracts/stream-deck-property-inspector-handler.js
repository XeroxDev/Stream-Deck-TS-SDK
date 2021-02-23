"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamDeckPropertyInspectorHandler = void 0;
const stream_deck_handler_base_1 = require("./stream-deck-handler-base");
const on_pi_event_decorator_1 = require("../decorators/on-pi-event.decorator");
class StreamDeckPropertyInspectorHandler extends stream_deck_handler_base_1.StreamDeckHandlerBase {
    constructor() {
        super();
        this._settings = 'Not available yet';
        this._globalSettings = 'Not available yet';
        if (this._sd_events)
            for (let event of this._sd_events)
                event(this);
    }
    registerPi(actionInfo) {
        this._actionInfo = JSON.parse(actionInfo);
        this._settings = this.actionInfo.payload.settings;
        this.requestSettings();
        this.requestGlobalSettings();
    }
    onSettings({ payload: { settings } }) {
        this._settings = settings;
    }
    onGlobalSettings({ payload: { settings } }) {
        this._globalSettings = settings;
    }
    sendToPlugin(payload, action) {
        var _a;
        this.send('sendToPlugin', {
            context: this.uuid,
            action: action ? action : (_a = this._actionInfo) === null || _a === void 0 ? void 0 : _a.action,
            payload
        });
    }
    setSettings(settings) {
        super.setSettings(settings, this.uuid);
    }
    requestSettings() {
        super.requestSettings(this.uuid);
    }
    get actionInfo() {
        return this._actionInfo;
    }
    get settings() {
        return this._settings;
    }
    get globalSettings() {
        return this._globalSettings;
    }
}
__decorate([
    on_pi_event_decorator_1.SDOnPiEvent('didReceiveSettings')
], StreamDeckPropertyInspectorHandler.prototype, "onSettings", null);
__decorate([
    on_pi_event_decorator_1.SDOnPiEvent('didReceiveGlobalSettings')
], StreamDeckPropertyInspectorHandler.prototype, "onGlobalSettings", null);
exports.StreamDeckPropertyInspectorHandler = StreamDeckPropertyInspectorHandler;
