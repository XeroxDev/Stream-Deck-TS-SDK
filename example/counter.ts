import {StreamDeckPluginHandler} from "../src/abstracts/stream-deck-plugin-handler";
import {CounterAction} from "./actions/counter.action";

export class Counter extends StreamDeckPluginHandler {
	constructor() {
		super();
		new CounterAction(this, 'fun.shiro.counter.action');
	}
}

new Counter();
