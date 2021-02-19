/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {StreamDeckPlugin} from "../../stream-deck-plugin";

/**
 * Calls method after connection and dom is ready
 * @constructor
 */
export function SDReady(): MethodDecorator {
	return function (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
		const plugin: StreamDeckPlugin = StreamDeckPlugin.getInstance();
		plugin.availableReadyListener.push(() => descriptor.value.apply(target));
		return descriptor;
	}
}
