import {StreamDeckPlugin} from "../../src/stream-deck-plugin";

export class CounterAction {
	private plugin: StreamDeckPlugin;
	private step = 1;

	constructor(private counter: number = 0) {
		this.plugin = StreamDeckPlugin.getInstance();
		this.setTitle();
		this.plugin.requestSettings();
	}

	public countUp() {
		this.counter += this.step;
		this.setTitle();
	}

	public setSettings(count: number, step: number) {
		this.counter = count ?? this.counter;
		this.step = step ?? this.step;
		this.setTitle();
	}

	private setTitle() {
		this.plugin.setTitle(`Count\n${this.counter}`);
	}
}
