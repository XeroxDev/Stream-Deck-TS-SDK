/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {PossibleEventsForActionToReceive} from "../interfaces/types";
import {StreamDeckPluginHandler} from "../abstracts/stream-deck-plugin-handler";

export function SDOnActionEvent(event: PossibleEventsForActionToReceive): any {
	return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
		const addEventListener = <T>(plugin: StreamDeckPluginHandler, actionName: string, instance: T) => {
			plugin.addEventListener(event,
				function (ev: MessageEvent) {
					const eventData = JSON.parse(ev.data);

					if (!eventData.action || eventData.action === actionName)
						descriptor.value.apply(instance, [eventData]);
				}
			);
		}

		if (!target._sd_events) {
			target._sd_events = [];
		}

		target._sd_events.push(addEventListener);
		return descriptor;
	}
}
