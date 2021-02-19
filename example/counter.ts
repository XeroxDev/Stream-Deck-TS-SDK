import {SDPlugin} from "../src/decorators/classes/plugin.decorator";
import {SDInit} from "../src/decorators/methods/init.decorator";
import {CounterAction} from "./actions/counter.action";
import {SDOnEvent} from "../src/decorators/methods/on-event.decorator";
import {WillAppearEvent} from "../src/interfaces/events/appearance/will-appear.event";
import {KeyUpEvent} from "../src/interfaces/events/keys/key-up.event";
import {DidReceiveSettingsEvent} from "../src/interfaces/events/settings/did-receive-settings.event";
import {StreamDeckPlugin} from "../src/stream-deck-plugin";

@SDPlugin
class Counter {
	private plugin: StreamDeckPlugin;
	private counters: { action: CounterAction, id: string }[];

	@SDInit()
	private initialize(plugin: StreamDeckPlugin) {
		this.plugin = plugin;
		this.counters = [];
	}

	@SDOnEvent('willAppear', 'fun.shiro.counter.action')
	private createCounter({context, payload: {settings}}: WillAppearEvent) {
		const found = this.counters.find(value => value.id === context);

		if (!found)
			this.counters.push({id: context, action: new CounterAction(settings.currentCount ?? settings.startCount)});
	}

	@SDOnEvent('keyUp', 'fun.shiro.counter.action')
	private pressCounter({context}: KeyUpEvent) {
		const found = this.counters.find(value => value.id === context);
		if (!found)
			return;

		found.action.countUp();
	}

	@SDOnEvent('didReceiveSettings')
	private settingsReceived(settings: DidReceiveSettingsEvent) {
		const found = this.counters.find(value => value.id === settings.context);
		if (!found)
			return;

		found.action.setSettings(settings.payload.settings.count, settings.payload.settings.steps);
	}
}

new Counter();
