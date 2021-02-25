/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {SDOnPiEvent}                     from '../decorators/on-pi-event.decorator';
import {DidReceiveSettingsEvent, InitPi} from '../interfaces/interfaces';
import {StreamDeckHandlerBase}           from './stream-deck-handler-base';

export abstract class StreamDeckPropertyInspectorHandler<Settings = any, GlobalSettings = any> extends StreamDeckHandlerBase<GlobalSettings> {
    private _settings: Settings | {} = {};
    private _actionInfo: InitPi['actionInfo'];

    get settings(): Settings | any {
        return this._settings;
    }

    protected get actionInfo(): InitPi['actionInfo'] {
        return this._actionInfo;
    }

    /**
     * Send data to the action
     * @param {any} payload Data to send
     * @param {string} action [Optional] Action context. (Default: current context)
     */
    public sendToPlugin(payload: any, action?: string) {
        this.send('sendToPlugin', {
            context: this.uuid,
            action: action ? action : this._actionInfo?.action,
            payload
        });
    }

    requestSettings() {
        super.requestSettings(this.uuid);
    }

    setSettings<Settings = any>(settings: Settings) {
        super.setSettings(settings, this.uuid);
    }

    @SDOnPiEvent('registerPi')
    protected onRegisterPi(actionInfo: string) {
        this._actionInfo = JSON.parse(actionInfo);
        this._settings = this.actionInfo.payload.settings;
        this.requestSettings();
    }

    @SDOnPiEvent('didReceiveSettings')
    private onSettings({payload: {settings}}: DidReceiveSettingsEvent) {
        this._settings = settings;
    }
}
