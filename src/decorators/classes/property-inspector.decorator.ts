/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {StreamDeckPlugin} from "../../stream-deck-plugin";

/**
 * Automatically initializes the StreamDeckPlugin wrapper in the Property Inspector context, so you just need to
 * import one file.
 * @param constructor
 * @constructor
 */
export function SDPropertyInspector(constructor: any) {
	StreamDeckPlugin.getInstance();
	return constructor;
}
