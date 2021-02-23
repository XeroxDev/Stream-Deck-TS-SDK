import {StreamDeckPropertyInspectorHandler} from "../src/abstracts/stream-deck-property-inspector-handler";
import {SettingsInterface} from "./interfaces/settings.interface";
import {DidReceiveSettingsEvent} from "../src/interfaces/events/settings/did-receive-settings.event";
import {SDOnPiEvent} from "../src/decorators/on-pi-event.decorator";

class CounterPi extends StreamDeckPropertyInspectorHandler {
	private count: HTMLInputElement;
	private stepsCount: HTMLInputElement;
	private saveButton: HTMLButtonElement;

	protected onReady() {
		this.count = document.getElementById('count') as HTMLInputElement
		this.stepsCount = document.getElementById('steps') as HTMLInputElement;
		this.saveButton = document.getElementById('save') as HTMLButtonElement;
		this.saveButton.onclick = () => {
			this.setSettings<SettingsInterface>({count: this.count.valueAsNumber, steps: this.stepsCount.valueAsNumber});
		}

		this.count.value = this.settings.count ?? 0;
		this.stepsCount.value = this.settings.steps ?? 1;
	}

	@SDOnPiEvent('didReceiveSettings')
	private onSettingsReceived({payload: {settings}}: DidReceiveSettingsEvent<SettingsInterface>) {
		if (!settings)
			return;

		this.count.value = settings.count.toString();
		this.stepsCount.value = settings.steps.toString();
	}
}

new CounterPi();
