/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {InitBase} from "../interfaces/events/init.event";
import {PossibleEventsForAllToReceive, PossibleEventsToSend} from "../interfaces/types";

export abstract class StreamDeckHandlerBase {
	private _ws: WebSocket;
	private documentReady: boolean;
	private connectionReady: boolean;
	private debug: boolean = false;
	private _port: InitBase['port'];
	private _uuid: InitBase['uuid'];
	private _registerEvent: InitBase['registerEvent'];
	private _info: InitBase['info'];
	private availableEvents: Map<string, Function[]> = new Map<string, Function[]>();

	constructor() {
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
			if (actionInfo)
				this.registerPi(actionInfo);

			this.connectElgatoStreamDeckSocket()
			this.docReady(() => {
				this.documentReady = true;

				if (this.documentReady && this.connectionReady)
					this.onReady();
			})
		};
	}

	protected registerPi(actionInfo: string) {
	}

	private docReady(fn: () => void) {
		if (document.readyState === "complete" || document.readyState === "interactive") {
			setTimeout(() => fn(), 1);
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}

	private connectElgatoStreamDeckSocket() {
		this.ws = new WebSocket('ws://127.0.0.1:' + this._port);

		this.ws.onopen = () => this.open();
		this.ws.onclose = () => this.onClose();
		this.ws.onmessage = ev => this.eventHandler(ev)
	}

	private open() {
		this.send(this._registerEvent, {uuid: this._uuid})

		this.connectionReady = true;
		if (this.documentReady && this.connectionReady)
			this.onReady();
		this.onOpen();
	}

	protected onOpen() {

	}

	protected onClose() {

	}

	protected onReady() {
	}

	private eventHandler(ev: MessageEvent) {
		const eventData = JSON.parse(ev.data);
		const event: PossibleEventsForAllToReceive = eventData.event;

		if (this.debug)
			console.log(`RECEIVE ${event}`, eventData, ev);

		if (this.availableEvents.has(event)) {
			// @ts-ignore
			for (let fnc of this.availableEvents.get(event))
				fnc(ev);
		}
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
		})
	}

	/**
	 * Requests settings for current context / action
	 */
	public requestSettings(context: string) {
		this.send('getSettings', {
			context: context
		})
	}

	/**
	 * Sets global settings
	 * @param settings
	 */
	public setGlobalSettings<GlobalSettings = any>(settings: GlobalSettings) {
		this.send('setGlobalSettings', {
			context: this._uuid,
			payload: settings
		})
	}

	/**
	 * Requests global settings
	 */
	public requestGlobalSettings() {
		this.send('getGlobalSettings', {
			context: this._uuid
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

	public enableDebug() {
		this.debug = true;
	}

	public addEventListener(event: string, fnc: Function) {
		if (!this.availableEvents.has(event))
			this.availableEvents.set(event, []);

		(this.availableEvents.get(event) as Function[]).push(fnc);
	}

	private get ws(): WebSocket {
		return this._ws;
	}

	private set ws(value: WebSocket) {
		this._ws = value;
	}

	get port(): InitBase["port"] {
		return this._port;
	}

	get uuid(): InitBase["uuid"] {
		return this._uuid;
	}

	get registerEvent(): InitBase["registerEvent"] {
		return this._registerEvent;
	}

	get info(): InitBase["info"] {
		return this._info;
	}
}
