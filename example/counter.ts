// All imports
import {SDPlugin} from "../src/decorators/classes/plugin.decorator";
import {SDInit} from "../src/decorators/methods/init.decorator";
import {CounterAction} from "./actions/counter.action";
import {SDOnEvent} from "../src/decorators/methods/on-event.decorator";
import {WillAppearEvent} from "../src/interfaces/events/appearance/will-appear.event";
import {KeyUpEvent} from "../src/interfaces/events/keys/key-up.event";
import {DidReceiveSettingsEvent} from "../src/interfaces/events/settings/did-receive-settings.event";
import {StreamDeckPlugin} from "../src/stream-deck-plugin";

// Automatically initializes the StreamDeckPlugin wrapper in the plugin context, so you just need to import one file.
@SDPlugin
class Counter {
	private plugin: StreamDeckPlugin;
	private counters: { action: CounterAction, id: string }[];

	// Calls method after initialization process is done and overhands the StreamDeckPlugin instance
	@SDInit()
	private initialize(plugin: StreamDeckPlugin) {
		this.plugin = plugin;
		this.counters = [];
	}

	// Gets only for the 'fun.shiro.counter.action' action called and only if the willAppear event is triggered
	// Like all other events, this will overhands the specific event data (Here: WillAppearEvent)
	@SDOnEvent('willAppear', 'fun.shiro.counter.action')
	private createCounter({context, payload: {settings}}: WillAppearEvent) {
		const found = this.counters.find(value => value.id === context);

		if (!found)
			this.counters.push({id: context, action: new CounterAction(settings.currentCount ?? settings.startCount)});
	}

	// Gets only for the 'fun.shiro.counter.action' action called and only if the keyUp event is triggered
	// Like all other events, this will overhands the specific event data (Here: KeyUpEvent)
	@SDOnEvent('keyUp', 'fun.shiro.counter.action')
	private pressCounter({context}: KeyUpEvent) {
		const found = this.counters.find(value => value.id === context);
		if (!found)
			return;

		found.action.countUp();
	}

	// Gets for all actions called but only if the didReceiveSettings event is triggered
	// Like all other events, this will overhands the specific event data (Here: DidReceiveSettingsEvent)
	@SDOnEvent('didReceiveSettings')
	private settingsReceived(settings: DidReceiveSettingsEvent) {
		const found = this.counters.find(value => value.id === settings.context);
		if (!found)
			return;

		found.action.setSettings(settings.payload.settings.count, settings.payload.settings.steps);
	}
}

// Start the plugin
new Counter();
