/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {SDOnActionEvent} from '../decorators/decorators';
import {SDOnPiEvent}     from '../index';
import {
    DidReceiveGlobalSettingsEvent,
    InitBase,
    PossibleEventsToReceive,
    PossibleEventsToSend
}                        from '../interfaces/interfaces';
import {EventManager}    from '../manager/event.manager';

export abstract class StreamDeckHandlerBase<GlobalSettings = any> {
    /** @private */
    protected _sd_events: Function[];
    private _documentReady: boolean = false;
    private _connectionReady: boolean = false;
    private _globalSettingsReady: boolean = false;
    private _documentReadyInvoked: boolean = false;
    private _connectionReadyInvoked: boolean = false;
    private _globalSettingsInvoked: boolean = false;
    private _debug: boolean = false;
    private _port: InitBase['port'];
    private _uuid: InitBase['uuid'];
    private _registerEvent: InitBase['registerEvent'];
    private _info: InitBase['info'];
    private _globalSettings: GlobalSettings | {} = {};
    private _ws: WebSocket;
    private _eventManager: EventManager;

    protected constructor() {
        this._eventManager = EventManager.INSTANCE;

        if (this._sd_events)
            for (let event of this._sd_events)
                event('*', this);

        (window as any).connectElgatoStreamDeckSocket = (
            port: string,
            uuid: string,
            registerEvent: string,
            info: string,
            actionInfo?: string
        ) => {
            this._port = port;
            this._uuid = uuid;
            this._registerEvent = registerEvent;
            this._info = JSON.parse(info);
            if (actionInfo) {
                this.registerPi(actionInfo);
                this._eventManager.callEvents('registerPi', '*', actionInfo);
            }

            this._connectElgatoStreamDeckSocket();
            this._docReady(() => {
                this._documentReady = true;

                if (this._documentReady && this._connectionReady)
                    this._handleReadyState();
            });
        };
    }

    get port(): InitBase['port'] {
        return this._port;
    }

    get uuid(): InitBase['uuid'] {
        return this._uuid;
    }

    get registerEvent(): InitBase['registerEvent'] {
        return this._registerEvent;
    }

    get info(): InitBase['info'] {
        return this._info;
    }

    get globalSettings(): any {
        return this._globalSettings;
    }

    /**
     * Sets settings for current context / action
     * @param settings
     * @param context
     */
    public setSettings<Settings = any>(settings: Settings, context: string) {
        this.send('setSettings', {
            context: context,
            payload: settings
        });
    }

    /**
     * Requests settings for current context / action
     */
    public requestSettings(context: string) {
        this.send('getSettings', {
            context: context
        });
    }

    /**
     * Sets global settings
     * @param settings
     */
    public setGlobalSettings<GlobalSettings = any>(settings: GlobalSettings) {
        this.send('setGlobalSettings', {
            context: this._uuid,
            payload: settings
        });
    }

    /**
     * Requests global settings
     */
    public requestGlobalSettings() {
        this.send('getGlobalSettings', {
            context: this._uuid
        });
    }

    /**
     * Opens a url
     * @param url
     */
    public openUrl(url: string) {
        this.send('openUrl', {
            payload: {url}
        });
    }

    /**
     * Logs a message to the elgato log file
     * @param message
     */
    public logMessage(message: string) {
        this.send('logMessage', {
            payload: {message}
        });
    }

    /**
     * Sends custom socket events to the stream deck software
     * @param {PossibleEventsToSend} event
     * @param {any} data
     */
    public send(event: PossibleEventsToSend, data: any) {
        const eventToSend = {
            event,
            ...data
        };

        if (this._debug)
            console.log(`SEND ${event}`, eventToSend, this._ws);

        if (this._ws)
            this._ws.send(JSON.stringify(eventToSend));
        else if (this._debug)
            console.error('COULD NOT SEND EVENT');
    }

    public enableDebug() {
        this._debug = true;
    }

    /**
     * @protected
     * @deprecated
     * use {@link SDOnPiEvent} instead
     * Example
     * ```typescript
     * @SDOnActionEvent('registerPi')
     * private onRegisterPi(actionInfo: string) {
     *     // Do something
     * }
     * ```
     */
    protected registerPi(actionInfo: string) {
    }

    /**
     * @protected
     * @deprecated
     */
    protected onOpen() {

    }

    /**
     * @protected
     * @deprecated
     */
    protected onClose() {

    }

    /**
     * @protected
     * @deprecated
     */
    protected onReady() {
    }

    private _docReady(fn: () => void) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(() => fn(), 1);
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    private _connectElgatoStreamDeckSocket() {
        this._ws = new WebSocket('ws://127.0.0.1:' + this._port);

        this._ws.onopen = () => this._open();
        this._ws.onclose = () => this.onClose();
        this._ws.onmessage = ev => this._eventHandler(ev);
    }

    private _open() {
        this.send(this._registerEvent, {uuid: this._uuid});

        this._connectionReady = true;
        if (this._documentReady && this._connectionReady)
            this._handleReadyState();
        this.onOpen();
    }

    private _handleReadyState() {
        if (this._connectionReady && !this._connectionReadyInvoked) {
            this._connectionReadyInvoked = true;
            this._eventManager.callEvents('connectionReady');
        }

        if (this._documentReady && !this._documentReadyInvoked) {
            this._documentReadyInvoked = true;
            this._eventManager.callEvents('documentReady');
        }

        if (this._globalSettingsReady && !this._globalSettingsInvoked) {
            this._globalSettingsInvoked = true;
            this._eventManager.callEvents('globalSettingsReady', '*', this.globalSettings);
        }

        if (this._globalSettingsInvoked && this._documentReadyInvoked && this._connectionReadyInvoked) {
            this.onReady();
            this._eventManager.callEvents('ready');
        }
    }

    private _eventHandler(ev: MessageEvent) {
        const eventData = JSON.parse(ev.data);
        const event: PossibleEventsToReceive = eventData.event;

        if (this._debug)
            console.log(`RECEIVE ${event}`, eventData, ev);

        this._eventManager.callEvents(event, eventData.action ?? '*', eventData);
    }

    @SDOnActionEvent('didReceiveGlobalSettings')
    private _onGlobalSettings({payload: {settings}}: DidReceiveGlobalSettingsEvent) {
        this._globalSettings = settings;
    }
}
