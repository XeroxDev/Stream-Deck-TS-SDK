/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {InitEvent} from "./interfaces/events/init.event";
import {PossibleEventsToReceive, PossibleEventsToSend} from "./interfaces/types";
import {StateType, TargetType} from "./interfaces/enums";

/**
 * The Stream Deck Plugin wrapper for easy creation of plugins.
 */
export class StreamDeckPlugin {
	private static _instance: StreamDeckPlugin;

	/**
	 * Get the StreamDeckPlugin instance
	 */
	public static getInstance(): StreamDeckPlugin {
		if (!this._instance)
			this._instance = new StreamDeckPlugin();
		return this._instance;
	}

	public _ws: WebSocket | undefined;
	public initEventData: InitEvent | undefined;
	public connectionReady = false;
	public documentReady = false;
	public isPi = false;
	public pluginContext: string;
	public piContext: string;
	public uuid: string;

	public debug: boolean = false;
	public availableEvents: Map<string, Function[]> = new Map<string, Function[]>();
	public availableCloseListener: { pi: Function[], plugin: Function[] } = {pi: [], plugin: []};
	public availableReadyListener: Function[] = [];

	private constructor() {
		(window as any).connectElgatoStreamDeckSocket = (
			port: InitEvent['port'],
			uuid: InitEvent['uuid'],
			registerEvent: InitEvent['registerEvent'],
			info: any,
			actionInfo?: any
		) => {
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
			} else
				this.initEventData = {port, uuid, registerEvent, info: JSON.parse(info), actionInfo: undefined};

			this.uuid = uuid;
			this.connectElgatoStreamDeckSocket()
			this.docReady(() => {
				this.documentReady = true;

				if (this.documentReady && this.connectionReady)
					this.ready();
			})
		};
	}

	private docReady(fn: () => void) {
		// see if DOM is already available
		if (document.readyState === "complete" || document.readyState === "interactive") {
			// call on next available tick
			setTimeout(() => fn(), 1);
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}

	private connectElgatoStreamDeckSocket() {
		this.ws = new WebSocket('ws://127.0.0.1:' + this.initEventData?.port);

		this.ws.onopen = () => this.open();
		this.ws.onclose = () => this.close();
		this.ws.onmessage = ev => this.eventHandler(ev)
	}

	private open() {
		if (!this.ws || !this.initEventData)
			return;

		this.send(this.initEventData.registerEvent, {uuid: this.initEventData?.uuid})

		this.connectionReady = true;
		if (this.documentReady && this.connectionReady)
			this.ready();
	}

	private close() {
		if (this.isPi)
			for (let fnc of this.availableCloseListener.pi)
				fnc();
		else
			for (let fnc of this.availableCloseListener.plugin)
				fnc();
	}

	private ready() {
		for (let fnc of this.availableReadyListener)
			fnc();
	}

	private eventHandler(ev: MessageEvent) {
		const eventData = JSON.parse(ev.data);
		const event: PossibleEventsToReceive = eventData.event;
		this.pluginContext = eventData.context;

		if (this.debug)
			console.log(`RECEIVE ${event}`, eventData, ev);

		if (this.availableEvents.has(event)) {
			// @ts-ignore
			for (let fnc of this.availableEvents.get(event))
				fnc(ev);
		}
	}

	/**
	 * Gets the current context
	 */
	public getContext() {
		return this.isPi ? this.piContext : this.pluginContext;
	}

	/**
	 * Sets settings for current context / action
	 * @param settings
	 */
	public setSettings(settings: any) {
		this.send('setSettings', {
			context: this.isPi ? this.uuid : this.getContext(),
			payload: settings
		})
	}

	/**
	 * Requests settings for current context / action
	 */
	public requestSettings() {
		this.send('getSettings', {
			context: this.isPi ? this.uuid : this.getContext()
		})
	}

	/**
	 * Sets global settings
	 * @param settings
	 */
	public setGlobalSettings(settings: any) {
		this.send('setGlobalSettings', {
			context: this.uuid,
			payload: settings
		})
	}

	/**
	 * Requests global settings
	 */
	public requestGlobalSettings() {
		this.send('getGlobalSettings', {
			context: this.uuid
		})
	}

	/**
	 * Opens a url
	 * @param url
	 */
	public openUrl(url: string) {
		this.send('openUrl', {
			payload: {url}
		})
	}

	/**
	 * Logs a message to the elgato log file
	 * @param message
	 */
	public logMessage(message: string) {
		this.send('logMessage', {
			payload: {message}
		})
	}

	/**
	 * Sets the action title
	 * @param {string} title The string the title should be
	 * @param {TargetType} target [Optional] Show title only on hardware, software or both (default: Both)
	 * @param {StateType} state [Optional] Show title only on ON state or OFF state (default: Both)
	 */
	public setTitle(title: string, target: TargetType = TargetType.BOTH, state?: StateType) {
		if (state) {
			this.send('setTitle', {
				context: this.getContext(),
				payload: {title, target, state}
			})
		} else {
			this.send('setTitle', {
				context: this.getContext(),
				payload: {title, target}
			})
		}
	}

	/**
	 * Sets the action image
	 * @param {string} image Image as string
	 * @param {TargetType} target [Optional] Show image only on hardware, software or both (default: Both)
	 * @param {StateType} state [Optional] Show image only on ON state or OFF state (default: Both)
	 */
	public setImage(image: string, target: TargetType = TargetType.BOTH, state?: StateType) {
		if (state) {
			this.send('setImage', {
				context: this.getContext(),
				payload: {image, target, state}
			})
		} else {
			this.send('setImage', {
				context: this.getContext(),
				payload: {image, target}
			})
		}
	}

	/**
	 * Shows a alert icon on action
	 */
	public showAlert() {
		this.send('showAlert', {context: this.getContext()});
	}

	/**
	 * Shows a okay icon on action
	 */
	public showOk() {
		this.send('showOk', {context: this.getContext()});
	}

	/**
	 * Sets the state of the action (ON / OFF)
	 * @param {StateType} state
	 */
	public setState(state: StateType) {
		this.send('setState', {
			context: this.getContext(),
			payload: {state}
		});
	}

	/**
	 * Switch to a profile
	 * @param {string} profile
	 * @param {string} device
	 */
	public switchToProfile(profile: string, device?: string) {
		this.send('switchToProfile', {
			context: this.uuid,
			device: device ? device : this.initEventData?.actionInfo?.device,
			payload: {profile}
		});
	}

	/**
	 * Send data to the property inspector
	 * @param {any} payload Data to send
	 * @param {string} action [Optional] Action context. (Default: current context)
	 */
	public sendToPropertyInspector(payload: any, action?: string) {
		this.send('sendToPropertyInspector', {
			context: this.getContext(),
			action: action ? action : this.initEventData?.actionInfo?.action,
			payload
		});
	}

	/**
	 * Send data to the action
	 * @param {any} payload Data to send
	 * @param {string} action [Optional] Action context. (Default: current context)
	 */
	public sendToPlugin(payload: any, action?: string) {
		this.send('sendToPlugin', {
			context: this.isPi ? this.uuid : this.getContext(),
			action: action ? action : this.initEventData?.actionInfo?.action,
			payload
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

		if (this.debug)
			console.log(`SEND ${event}`, eventToSend, this.ws)

		if (this.ws)
			this.ws.send(JSON.stringify(eventToSend));
		else if (this.debug)
			console.error('COULD NOT SEND EVENT')
	}


	private get ws(): WebSocket | undefined {
		return this._ws;
	}

	private set ws(value: WebSocket | undefined) {
		this._ws = value;
	}
}
