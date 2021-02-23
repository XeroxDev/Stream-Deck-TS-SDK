"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamDeckPluginHandler = void 0;
const enums_1 = require("../interfaces/enums");
const stream_deck_handler_base_1 = require("./stream-deck-handler-base");
const on_action_event_decorator_1 = require("../decorators/on-action-event.decorator");
class StreamDeckPluginHandler extends stream_deck_handler_base_1.StreamDeckHandlerBase {
    constructor() {
        super(...arguments);
        this._globalSettings = 'Not available yet';
    }
    setTitle(title, context, target = enums_1.TargetType.BOTH, state) {
        if (state) {
            this.send('setTitle', {
                context,
                payload: { title, target, state }
            });
        }
        else {
            this.send('setTitle', {
                context,
                payload: { title, target }
            });
        }
    }
    setImage(image, context, target = enums_1.TargetType.BOTH, state) {
        if (state) {
            this.send('setImage', {
                context,
                payload: { image, target, state }
            });
        }
        else {
            this.send('setImage', {
                context,
                payload: { image, target }
            });
        }
    }
    showAlert(context) {
        this.send('showAlert', { context });
    }
    showOk(context) {
        this.send('showOk', { context });
    }
    setState(state, context) {
        this.send('setState', {
            context: context,
            payload: { state }
        });
    }
    switchToProfile(profile, device) {
        this.send('switchToProfile', {
            context: this.uuid,
            device: device ? device : this.info.devices[0].id,
            payload: { profile }
        });
    }
    sendToPropertyInspector(payload, action, context) {
        this.send('sendToPropertyInspector', {
            context,
            action: action,
            payload
        });
    }
    onGlobalSettings({ payload: { settings } }) {
        this._globalSettings = settings;
    }
    get globalSettings() {
        return this._globalSettings;
    }
}
__decorate([
    on_action_event_decorator_1.SDOnActionEvent('didReceiveGlobalSettings')
], StreamDeckPluginHandler.prototype, "onGlobalSettings", null);
exports.StreamDeckPluginHandler = StreamDeckPluginHandler;
