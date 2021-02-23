/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {StreamDeckPluginHandler} from "./stream-deck-plugin-handler";

export abstract class StreamDeckAction<Plugin, Instance> {
	protected _sd_events: Function[];

	protected constructor(plugin: Plugin, actionName: string) {
		if (!(plugin instanceof StreamDeckPluginHandler))
			throw Error('"plugin" needs to be a child of StreamDeckPluginHandler');
		if (this._sd_events)
			for (let event of this._sd_events)
				event(plugin, actionName, this);
	}
}
