/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {StreamDeckHandlerBase} from "./stream-deck-handler-base";
import {InitPi} from "../interfaces/events/init.event";
import {SDOnPiEvent} from "../decorators/on-pi-event.decorator";
import {DidReceiveSettingsEvent} from "../interfaces/events/settings/did-receive-settings.event";
import {DidReceiveGlobalSettingsEvent} from "../interfaces/events/settings/did-receive-global-settings.event";

export abstract class StreamDeckPropertyInspectorHandler<Settings = any, GlobalSettings  = any> extends StreamDeckHandlerBase {
	private _actionInfo: InitPi['actionInfo'];
	private _settings: Settings|any = 'Not available yet';
	private _globalSettings: GlobalSettings|any = 'Not available yet';

	_sd_events: Function[];

	constructor() {
		super();
		if (this._sd_events)
			for (let event of this._sd_events)
				event(this);
	}


	protected registerPi(actionInfo: string) {
		this._actionInfo = JSON.parse(actionInfo);
		this._settings = this.actionInfo.payload.settings;
		this.requestSettings();
		this.requestGlobalSettings();
	}

	@SDOnPiEvent('didReceiveSettings')
	private onSettings({payload: {settings}}: DidReceiveSettingsEvent) {
		this._settings = settings;
	}

	@SDOnPiEvent('didReceiveGlobalSettings')
	private onGlobalSettings({payload: {settings}}: DidReceiveGlobalSettingsEvent) {
		this._globalSettings = settings;
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

	setSettings<Settings = any>(settings: Settings) {
		super.setSettings(settings, this.uuid);
	}

	requestSettings() {
		super.requestSettings(this.uuid);
	}


	protected get actionInfo(): InitPi["actionInfo"] {
		return this._actionInfo;
	}


	get settings(): Settings|any {
		return this._settings;
	}

	get globalSettings(): GlobalSettings|any {
		return this._globalSettings;
	}
}
