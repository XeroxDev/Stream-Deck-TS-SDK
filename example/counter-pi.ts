import {SDPropertyInspector} from "../src/decorators/classes/property-inspector.decorator";
import {SDOnEvent} from "../src/decorators/methods/on-event.decorator";
import {SDReady} from "../src/decorators/methods/ready.decorator";
import {SDInit} from "../src/decorators/methods/init.decorator";
import {StreamDeckPlugin} from "../src/stream-deck-plugin";
import {DidReceiveSettingsEvent} from "../src/interfaces/events/settings/did-receive-settings.event";

@SDPropertyInspector
class CounterPi {
	private plugin: StreamDeckPlugin;
	private count: HTMLInputElement;
	private stepsCount: HTMLInputElement;
	private saveButton: HTMLButtonElement;

	@SDInit()
	private initialize(plugin: StreamDeckPlugin) {
		this.plugin = plugin;
	}

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

	@SDOnEvent('didReceiveSettings')
	private settingsHandler({payload: {settings}}: DidReceiveSettingsEvent) {
		this.count.value = settings.count ?? 0;
		this.stepsCount.value = settings.steps ?? 1;
	}
}

new CounterPi();
