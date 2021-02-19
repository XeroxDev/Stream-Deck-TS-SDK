/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {PossibleEventsToReceive} from "../../interfaces/types";
import {StreamDeckPlugin} from "../../stream-deck-plugin";

/**
 * Listens for specified event and if triggered, calls method.
 * @param {PossibleEventsToReceive} event The event to listen on
 * @param {string | undefined} actionName [Optional] filters for specific action name (eg. com.elgato.counter.action)
 * @constructor
 */
export function SDOnEvent(event: PossibleEventsToReceive, actionName?: string): MethodDecorator {
	return function (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
		const plugin: StreamDeckPlugin = StreamDeckPlugin.getInstance();

		if (!plugin.availableEvents.has(event))
			plugin.availableEvents.set(event, []);

		const fnc = function <T>(ev: MessageEvent) {
			const eventData = JSON.parse(ev.data);


			if (!actionName || (eventData.action && eventData.action === actionName))
				descriptor.value.apply(target, [eventData]);
			else
				return;
		}

		// @ts-ignore
		plugin.availableEvents.get(event).push(fnc);

		return descriptor;
	}
}
