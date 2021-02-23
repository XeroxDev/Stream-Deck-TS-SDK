/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {PossibleEventsForPiToReceive} from "../interfaces/types";
import {StreamDeckPropertyInspectorHandler} from "../abstracts/stream-deck-property-inspector-handler";

export function SDOnPiEvent(event: PossibleEventsForPiToReceive, actionName?: string): any {
	return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
		const addEventListener = <T>(plugin: StreamDeckPropertyInspectorHandler) => {
			plugin.addEventListener(event,
				function (ev: MessageEvent) {
					const eventData = JSON.parse(ev.data);

					if (!actionName || (!eventData.action || eventData.action === actionName))
						descriptor.value.apply(plugin, [eventData]);
					else
						return;
				}
			);
		}

		if (!target._sd_events) {
			target._sd_events = [];
		}

		target._sd_events.push(addEventListener);
	}
}
