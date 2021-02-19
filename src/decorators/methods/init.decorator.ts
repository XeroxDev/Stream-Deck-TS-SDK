import {StreamDeckPlugin} from "../../stream-deck-plugin";

/**
 * Calls method after initialization process is done.
 * @constructor
 */
export function SDInit(): MethodDecorator {
	return function (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
		const plugin: StreamDeckPlugin = StreamDeckPlugin.getInstance();
		descriptor.value.apply(target, [plugin]);
		return descriptor;
	}
}
