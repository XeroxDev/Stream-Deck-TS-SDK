import {SDPropertyInspector} from "../src/decorators/classes/property-inspector.decorator";
import {SDOnEvent} from "../src/decorators/methods/on-event.decorator";
import {SDReady} from "../src/decorators/methods/ready.decorator";
import {SDInit} from "../src/decorators/methods/init.decorator";
import {StreamDeckPlugin} from "../src/stream-deck-plugin";
import {DidReceiveSettingsEvent} from "../src/interfaces/events/settings/did-receive-settings.event";

// Automatically initializes the StreamDeckPlugin wrapper in the PI context, so you just need to import one file.
@SDPropertyInspector
class CounterPi {
	private plugin: StreamDeckPlugin;
	private count: HTMLInputElement;
	private stepsCount: HTMLInputElement;
	private saveButton: HTMLButtonElement;

	// Calls method after initialization process is done and overhands the StreamDeckPlugin instance
	@SDInit()
	private initialize(plugin: StreamDeckPlugin) {
		this.plugin = plugin;
	}

	// Calls method after connection and dom is ready
	@SDReady()
	private ready() {
		this.count = document.getElementById('count') as HTMLInputElement
		this.stepsCount = document.getElementById('steps') as HTMLInputElement;
		this.saveButton = document.getElementById('save') as HTMLButtonElement;
		this.saveButton.onclick = () => {
			this.plugin.setSettings({count: this.count.valueAsNumber, steps: this.stepsCount.valueAsNumber});
		}
		this.plugin.requestSettings();
	}

	// Gets for all actions called but only if the didReceiveSettings event is triggered
	// Like all other events, this will overhands the specific event data (Here: DidReceiveSettingsEvent)
	@SDOnEvent('didReceiveSettings')
	private settingsHandler({payload: {settings}}: DidReceiveSettingsEvent) {
		this.count.value = settings.count ?? 0;
		this.stepsCount.value = settings.steps ?? 1;
	}
}

// Starts the property inspector class
new CounterPi();
