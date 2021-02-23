"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamDeckHandlerBase = void 0;
class StreamDeckHandlerBase {
    constructor() {
        this.debug = false;
        this.availableEvents = new Map();
        window.connectElgatoStreamDeckSocket = (port, uuid, registerEvent, info, actionInfo) => {
            this._port = port;
            this._uuid = uuid;
            this._registerEvent = registerEvent;
            this._info = JSON.parse(info);
            if (actionInfo)
                this.registerPi(actionInfo);
            this.connectElgatoStreamDeckSocket();
            this.docReady(() => {
                this.documentReady = true;
                if (this.documentReady && this.connectionReady)
                    this.onReady();
            });
        };
    }
    registerPi(actionInfo) {
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
        this.ws = new WebSocket('ws://127.0.0.1:' + this._port);
        this.ws.onopen = () => this.open();
        this.ws.onclose = () => this.onClose();
        this.ws.onmessage = ev => this.eventHandler(ev);
    }
    open() {
        this.send(this._registerEvent, { uuid: this._uuid });
        this.connectionReady = true;
        if (this.documentReady && this.connectionReady)
            this.onReady();
        this.onOpen();
    }
    onOpen() {
    }
    onClose() {
    }
    onReady() {
    }
    eventHandler(ev) {
        const eventData = JSON.parse(ev.data);
        const event = eventData.event;
        if (this.debug)
            console.log(`RECEIVE ${event}`, eventData, ev);
        if (this.availableEvents.has(event)) {
            for (let fnc of this.availableEvents.get(event))
                fnc(ev);
        }
    }
    setSettings(settings, context) {
        this.send('setSettings', {
            context: context,
            payload: settings
        });
    }
    requestSettings(context) {
        this.send('getSettings', {
            context: context
        });
    }
    setGlobalSettings(settings) {
        this.send('setGlobalSettings', {
            context: this._uuid,
            payload: settings
        });
    }
    requestGlobalSettings() {
        this.send('getGlobalSettings', {
            context: this._uuid
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
    send(event, data) {
        const eventToSend = Object.assign({ event }, data);
        if (this.debug)
            console.log(`SEND ${event}`, eventToSend, this.ws);
        if (this.ws)
            this.ws.send(JSON.stringify(eventToSend));
        else if (this.debug)
            console.error('COULD NOT SEND EVENT');
    }
    enableDebug() {
        this.debug = true;
    }
    addEventListener(event, fnc) {
        if (!this.availableEvents.has(event))
            this.availableEvents.set(event, []);
        this.availableEvents.get(event).push(fnc);
    }
    get ws() {
        return this._ws;
    }
    set ws(value) {
        this._ws = value;
    }
    get port() {
        return this._port;
    }
    get uuid() {
        return this._uuid;
    }
    get registerEvent() {
        return this._registerEvent;
    }
    get info() {
        return this._info;
    }
}
exports.StreamDeckHandlerBase = StreamDeckHandlerBase;
