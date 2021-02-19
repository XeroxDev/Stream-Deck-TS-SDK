"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamDeckPlugin = void 0;
const enums_1 = require("./interfaces/enums");
class StreamDeckPlugin {
    constructor() {
        this.connectionReady = false;
        this.documentReady = false;
        this.isPi = false;
        this.debug = false;
        this.availableEvents = new Map();
        this.availableCloseListener = { pi: [], plugin: [] };
        this.availableReadyListener = [];
        window.connectElgatoStreamDeckSocket = (port, uuid, registerEvent, info, actionInfo) => {
            if (actionInfo) {
                this.initEventData = {
                    port,
                    uuid,
                    registerEvent,
                    info: JSON.parse(info),
                    actionInfo: JSON.parse(actionInfo)
                };
                this.isPi = true;
                this.piContext = JSON.parse(actionInfo).context;
            }
            else
                this.initEventData = { port, uuid, registerEvent, info: JSON.parse(info), actionInfo: undefined };
            this.uuid = uuid;
            this.connectElgatoStreamDeckSocket();
            this.docReady(() => {
                this.documentReady = true;
                if (this.documentReady && this.connectionReady)
                    this.ready();
            });
        };
    }
    static getInstance() {
        if (!this._instance)
            this._instance = new StreamDeckPlugin();
        return this._instance;
    }
    docReady(fn) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(() => fn(), 1);
        }
        else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }
    connectElgatoStreamDeckSocket() {
        var _a;
        this.ws = new WebSocket('ws://127.0.0.1:' + ((_a = this.initEventData) === null || _a === void 0 ? void 0 : _a.port));
        this.ws.onopen = () => this.open();
        this.ws.onclose = () => this.close();
        this.ws.onmessage = ev => this.eventHandler(ev);
    }
    open() {
        var _a;
        if (!this.ws || !this.initEventData)
            return;
        this.send(this.initEventData.registerEvent, { uuid: (_a = this.initEventData) === null || _a === void 0 ? void 0 : _a.uuid });
        this.connectionReady = true;
        if (this.documentReady && this.connectionReady)
            this.ready();
    }
    close() {
        if (this.isPi)
            for (let fnc of this.availableCloseListener.pi)
                fnc();
        else
            for (let fnc of this.availableCloseListener.plugin)
                fnc();
    }
    ready() {
        for (let fnc of this.availableReadyListener)
            fnc();
    }
    eventHandler(ev) {
        const eventData = JSON.parse(ev.data);
        const event = eventData.event;
        this.pluginContext = eventData.context;
        if (this.debug)
            console.log(`RECEIVE ${event}`, eventData, ev);
        if (this.availableEvents.has(event)) {
            for (let fnc of this.availableEvents.get(event))
                fnc(ev);
        }
    }
    getContext() {
        return this.isPi ? this.piContext : this.pluginContext;
    }
    setSettings(settings) {
        this.send('setSettings', {
            context: this.isPi ? this.uuid : this.getContext(),
            payload: settings
        });
    }
    requestSettings() {
        this.send('getSettings', {
            context: this.isPi ? this.uuid : this.getContext()
        });
    }
    setGlobalSettings(settings) {
        this.send('setGlobalSettings', {
            context: this.uuid,
            payload: settings
        });
    }
    requestGlobalSettings() {
        this.send('getGlobalSettings', {
            context: this.uuid
        });
    }
    openUrl(url) {
        this.send('openUrl', {
            payload: { url }
        });
    }
    logMessage(message) {
        this.send('logMessage', {
            payload: { message }
        });
    }
    setTitle(title, target = enums_1.TargetType.BOTH, state) {
        if (state) {
            this.send('setTitle', {
                context: this.getContext(),
                payload: { title, target, state }
            });
        }
        else {
            this.send('setTitle', {
                context: this.getContext(),
                payload: { title, target }
            });
        }
    }
    setImage(image, target = enums_1.TargetType.BOTH, state) {
        if (state) {
            this.send('setImage', {
                context: this.getContext(),
                payload: { image, target, state }
            });
        }
        else {
            this.send('setImage', {
                context: this.getContext(),
                payload: { image, target }
            });
        }
    }
    showAlert() {
        this.send('showAlert', { context: this.getContext() });
    }
    showOk() {
        this.send('showOk', { context: this.getContext() });
    }
    setState(state) {
        this.send('showOk', {
            context: this.getContext(),
            payload: { state }
        });
    }
    switchToProfile(profile, device) {
        var _a, _b;
        this.send('switchToProfile', {
            context: this.uuid,
            device: device ? device : (_b = (_a = this.initEventData) === null || _a === void 0 ? void 0 : _a.actionInfo) === null || _b === void 0 ? void 0 : _b.device,
            payload: { profile }
        });
    }
    sendToPropertyInspector(payload, action) {
        var _a, _b;
        this.send('sendToPropertyInspector', {
            context: this.getContext(),
            action: action ? action : (_b = (_a = this.initEventData) === null || _a === void 0 ? void 0 : _a.actionInfo) === null || _b === void 0 ? void 0 : _b.action,
            payload
        });
    }
    sendToPlugin(payload, action) {
        var _a, _b;
        this.send('sendToPlugin', {
            context: this.isPi ? this.uuid : this.getContext(),
            action: action ? action : (_b = (_a = this.initEventData) === null || _a === void 0 ? void 0 : _a.actionInfo) === null || _b === void 0 ? void 0 : _b.action,
            payload
        });
    }
    send(event, data) {
        const eventToSend = Object.assign({ event }, data);
        if (this.debug)
            console.log(`SEND ${event}`, eventToSend, this.ws);
        if (this.ws)
            this.ws.send(JSON.stringify(eventToSend));
        else if (this.debug)
            console.error('COULD NOT SEND EVENT');
    }
    get ws() {
        return this._ws;
    }
    set ws(value) {
        this._ws = value;
    }
}
exports.StreamDeckPlugin = StreamDeckPlugin;
