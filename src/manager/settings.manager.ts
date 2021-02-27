/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {StreamDeckHandlerBase} from '../abstracts/stream-deck-handler-base';

export class SettingsManager {
    private _settings: Map<string, any> = new Map<string, any>();
    private _globalSettings: any = {};
    private _autoSave = true;
    private timeoutId: any;

    constructor(private _handler: StreamDeckHandlerBase) {
    }

    /**
     * Disables automatic save
     */
    public disableAutosave() {
        this._autoSave = false;
    }

    /**
     * Gets global settings
     * @template GlobalSettings your settings interface for autocomplete
     * @returns {{} | GlobalSettings}
     */
    public getGlobalSettings<GlobalSettings>(): GlobalSettings | {} {
        return this._globalSettings;
    }

    /**
     * Sets global settings
     * @template GlobalSettings your settings interface for autocomplete
     * @param {GlobalSettings} settings
     * @param {number} ms for the debounce
     */
    public setGlobalSettings<GlobalSettings>(settings: GlobalSettings, ms: number = 0) {
        this._globalSettings = settings;

        if (this._autoSave)
            this.saveGlobalSettings(ms);
    }

    /**
     * Sets single or multiple attributes of the settings
     * @param {{}} attributes single or multiple attributes
     * @param {number} ms for the debounce
     */
    public setGlobalSettingsAttributes(attributes: {}, ms: number = 0) {
        this.setGlobalSettings({...this.getGlobalSettings<{}>(), ...attributes});
    }

    /**
     * Gets context settings
     * @template Settings your settings interface for autocomplete
     * @param {string} context the context of the action
     * @returns {Settings | undefined}
     */
    public getContextSettings<Settings>(context: string): Settings | undefined {
        return this._settings.get(context);
    }

    /**
     * Gets **all** context settings
     * @template Settings your settings interface for autocomplete
     * @returns {Map<string, Settings>}
     */
    public getAllContextSettings<Settings>(): Map<string, Settings> {
        return this._settings;
    }

    /**
     * Set context settings
     * @param {string} context
     * @param {{}} settings
     * @param {number} ms for the debounce
     */
    public setContextSettings(context: string, settings: {}, ms: number = 0) {
        this._settings.set(context, settings);

        if (this._autoSave)
            this.saveContextSettings(context, ms);
    }

    /**
     * Set single or multiple attributes for settings
     * @param {string} context Single or multiple attributes
     * @param {{}} attributes
     * @param {number} ms for the debounce
     */
    public setContextSettingsAttributes(context: string, attributes: {}, ms: number = 0) {
        const oldSettings = this.getContextSettings<{}>(context);
        if (oldSettings)
            this.setContextSettings(context, {...oldSettings, ...attributes}, ms);
        else
            this.setContextSettings(context, {...attributes}, ms);
    }

    /**
     * Save global settings
     * @param {number} ms for the debounce
     */
    public saveGlobalSettings(ms: number) {
        this.debounce(() => {
            this._handler.setGlobalSettings(this._globalSettings);
        }, ms);
    }

    /**
     * Save context settings
     * @param {string | "ALL"} context string for specific action or 'ALL' for all events
     * @param {number} ms for the debounce
     */
    public saveContextSettings(context: string | 'ALL', ms: number) {
        this.debounce(() => {
            if (context === 'ALL') {
                for (let [context, setting] of this._settings) {
                    this._handler.setSettings(setting, context);
                }
            } else if (this._settings.get(context)) {
                this._handler.setSettings(this._settings.get(context), context);
            }
        }, ms);

    }

    /**
     * Sets global settings without saving it
     * @param {{}} settings
     */
    public cacheGlobalSettings(settings: {}) {
        this._globalSettings = settings;
    }

    /**
     * Sets settings without saving it
     * @param {string} context
     * @param {{}} settings
     */
    public cacheContextSettings(context: string, settings: {}) {
        this._settings.set(context, settings);
    }

    private debounce(fn: Function, ms: number) {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => fn(), ms);
    }
}
