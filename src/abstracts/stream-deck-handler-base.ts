import {SDOnActionEvent} from '../decorators/decorators';
import {SDOnPiEvent}     from '../index';
import {
    DidReceiveGlobalSettingsEvent,
    InitBase,
    PossibleEventsToReceive,
    PossibleEventsToSend
}                        from '../interfaces/interfaces';
import {EventManager}    from '../manager/event.manager';
import {SettingsManager} from '../manager/settings.manager';

/**
 * This is the base class for all Stream Deck handlers
 * @author XeroxDev <help@xeroxdev.de>
 * @copyright 2021
 */
export abstract class StreamDeckHandlerBase<GlobalSettings = any> {
    /**
     * @private
     * @internal
     */
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
    private _ws: WebSocket;
    private _eventManager: EventManager;
    private readonly _settingsManager: SettingsManager;
    private _globalSettings: GlobalSettings | {} = {};

    protected constructor() {
        this._settingsManager = new SettingsManager(this);
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
                this._handleReadyState();
            });
        };
    }

    /**
     * The port for the Stream Deck Application
     * @returns {InitBase["port"]}
     */
    public get port(): InitBase['port'] {
        return this._port;
    }

    /**
     * @returns {InitBase["uuid"]} The UUID of the Plugin
     */
    public get uuid(): InitBase['uuid'] {
        return this._uuid;
    }

    /**
     * The Event sent from Elgato, which is needed for the registration procedure
     * @returns {InitBase["registerEvent"]}
     */
    public get registerEvent(): InitBase['registerEvent'] {
        return this._registerEvent;
    }

    /**
     * All the information send from Elgato
     * @returns {InitBase["info"]}
     */
    public get info(): InitBase['info'] {
        return this._info;
    }

    /**
     * Through this object you can get, set and edit all available settings (global settings and context settings)
     * @see {@link SettingsManager}
     * @returns {SettingsManager}
     */
    public get settingsManager(): SettingsManager {
        return this._settingsManager;
    }

    /**
     * @deprecated
     * @returns {any}
     */
    public get globalSettings(): any {
        return this._globalSettings;
    }

    /**
     * Sets settings for current context / action.
     * @param {Settings} settings
     * @param {string} context
     * @internal
     */
    public setSettings<Settings = any>(settings: Settings, context: string) {
        this.send('setSettings', {
            context: context,
            payload: settings
        });
    }

    /**
     * Requests settings for current context / action
     * @param {string} context
     */
    public requestSettings(context: string) {
        this.send('getSettings', {
            context: context
        });
    }

    /**
     * Sets global settings
     * @param {GlobalSettings} settings
     * @internal
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
     * @param {string} url
     */
    public openUrl(url: string) {
        this.send('openUrl', {
            payload: {url}
        });
    }

    /**
     * Logs a message to the elgato log file
     * @param {string} message
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

    /**
     * Enables debug mode so you can see incoming and outgoing events.
     */
    public enableDebug() {
        this._debug = true;
    }

    /**
     * @protected
     * @deprecated
     * use {@link SDOnPiEvent} instead
     *
     * @example
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
     * Gets called after connection is opened.
     * Please use {@link SDOnPiEvent} or {@link SDOnActionEvent} instead.
     *
     * @example
     * ```typescript
     * @SDOnActionEvent('connectionOpened')
     * private onConnectionReady() {
     *     // Do something
     * }
     * ```
     *
     * @protected
     * @deprecated
     */
    protected onOpen() {

    }

    /**
     * Gets called after connection closed
     *
     * Please use {@link SDOnPiEvent} or {@link SDOnActionEvent} instead.
     *
     * @example
     * ```typescript
     * @SDOnActionEvent('connectionOpened')
     * private onConnectionClosed() {
     *     // Do something
     * }
     * ```
     *
     * @protected
     * @deprecated
     */
    protected onClose() {

    }

    /**
     * Gets called after everything is ready
     *
     * Please use {@link SDOnPiEvent} or {@link SDOnActionEvent} instead.
     *
     * @example
     * ```typescript
     * @SDOnActionEvent('setupReady')
     * private onSetupReady() {
     *     // Do something
     * }
     * ```
     *
     * @protected
     * @deprecated
     */
    protected onReady() {
    }

    /**
     * Checks if dom ist ready
     * @param {() => void} fn
     * @private
     * @internal
     */
    private _docReady(fn: () => void) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(() => fn(), 1);
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    /**
     * Handels the socket connection
     * @private
     * @internal
     */
    private _connectElgatoStreamDeckSocket() {
        this._ws = new WebSocket('ws://127.0.0.1:' + this._port);

        this._ws.onopen = () => this._open();
        this._ws.onclose = () => {this.onClose(); this._eventManager.callEvents('connectionClosed')};
        this._ws.onmessage = ev => this._eventHandler(ev);
    }

    /**
     * Opens the connection
     * @private
     * @internal
     */
    private _open() {
        this.send(this._registerEvent, {uuid: this._uuid});

        this._connectionReady = true;
        this._handleReadyState();
        this.requestGlobalSettings();
    }

    /**
     * Handels the ready state
     * @private
     * @internal
     */
    private _handleReadyState() {
        if (this._connectionReady && !this._connectionReadyInvoked) {
            this._connectionReadyInvoked = true;
            this.onOpen();
            this._eventManager.callEvents('connectionOpened');
        }

        if (this._documentReady && !this._documentReadyInvoked) {
            this._documentReadyInvoked = true;
            this._eventManager.callEvents('documentLoaded');
        }

        if (this._globalSettingsReady && !this._globalSettingsInvoked) {
            this._globalSettingsInvoked = true;
            this._eventManager.callEvents('globalSettingsAvailable', '*', this.settingsManager);
        }

        if (this._globalSettingsInvoked && this._documentReadyInvoked && this._connectionReadyInvoked) {
            this.onReady();
            this._eventManager.callEvents('setupReady');
        }
    }

    /**
     * Handels all events
     * @param {MessageEvent} ev
     * @private
     * @internal
     */
    private _eventHandler(ev: MessageEvent) {
        const eventData = JSON.parse(ev.data);
        const event: PossibleEventsToReceive = eventData.event;

        if (this._debug)
            console.log(`RECEIVE ${event}`, eventData, ev);

        if (eventData.payload?.settings && eventData.context) {
            this.settingsManager.cacheContextSettings(eventData.context, eventData.payload.settings);
        }

        this._eventManager.callEvents(event, eventData.action ?? '*', eventData);
    }

    /**
     * Sets the global settings, after it gets available
     * @decorator `@SDOnActionEvent('didReceiveGlobalSettings')`
     * @param {any} settings
     * @private
     */
    @SDOnActionEvent('didReceiveGlobalSettings')
    private _onGlobalSettings({payload: {settings}}: DidReceiveGlobalSettingsEvent) {
        this.settingsManager.cacheGlobalSettings(settings);
        this._globalSettings = settings;
        this._globalSettingsReady = true;
        this._handleReadyState();
    }
}
