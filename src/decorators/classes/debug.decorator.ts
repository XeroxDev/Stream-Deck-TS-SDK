/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {StreamDeckPlugin} from "../../stream-deck-plugin";

/**
 * This enables the debug mode (console.log) for all events received and events send.
 * @param constructor
 * @constructor
 */
export function SDDebug(constructor: any) {
	StreamDeckPlugin.getInstance().debug = true;
	return constructor;
}
