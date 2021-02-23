[![Forks](https://img.shields.io/github/forks/XeroxDev/Stream-Deck-TS-SDK?color=blue&style=for-the-badge)](https://github.com/XeroxDev/Stream-Deck-TS-SDK/network/members)
[![Stars](https://img.shields.io/github/stars/XeroxDev/Stream-Deck-TS-SDK?color=yellow&style=for-the-badge)](https://github.com/XeroxDev/Stream-Deck-TS-SDK/stargazers)
[![Watchers](https://img.shields.io/github/watchers/XeroxDev/Stream-Deck-TS-SDK?color=lightgray&style=for-the-badge)](https://github.com/XeroxDev/Stream-Deck-TS-SDK/watchers)
[![Contributors](https://img.shields.io/github/contributors/XeroxDev/Stream-Deck-TS-SDK?color=green&style=for-the-badge)](https://github.com/XeroxDev/Stream-Deck-TS-SDK/graphs/contributors)

[![Issues](https://img.shields.io/github/issues/XeroxDev/Stream-Deck-TS-SDK?color=yellow&style=for-the-badge)](https://github.com/XeroxDev/Stream-Deck-TS-SDK/issues)
[![Issues closed](https://img.shields.io/github/issues-closed/XeroxDev/Stream-Deck-TS-SDK?color=yellow&style=for-the-badge)](https://github.com/XeroxDev/Stream-Deck-TS-SDK/issues?q=is%3Aissue+is%3Aclosed)

[![Issues-pr](https://img.shields.io/github/issues-pr/XeroxDev/Stream-Deck-TS-SDK?color=yellow&style=for-the-badge)](https://github.com/XeroxDev/Stream-Deck-TS-SDK/pulls)
[![Issues-pr closed](https://img.shields.io/github/issues-pr-closed/XeroxDev/Stream-Deck-TS-SDK?color=yellow&style=for-the-badge)](https://github.com/XeroxDev/Stream-Deck-TS-SDK/pulls?q=is%3Apr+is%3Aclosed)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](https://github.com/XeroxDev/Stream-Deck-TS-SDK/compare)

![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/XeroxDev_Stream-Deck-TS-SDK?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge)
![npm](https://img.shields.io/npm/dt/streamdeck-typescript?style=for-the-badge&logo=npm)

[![GitHub license](https://img.shields.io/github/license/XeroxDev/Stream-Deck-TS-SDK?style=for-the-badge)](https://github.com/XeroxDev/Stream-Deck-TS-SDK/blob/master/LICENSE)
[![Awesome Badges](https://img.shields.io/badge/badges-awesome-green?style=for-the-badge)](https://shields.io)

# Stream Deck TS-SDK

A library that helps you develop plugins for Elgato's Stream Deck.

## Installation

- Install via [`npm`](https://www.npmjs.com/):

```bash
npm install --save streamdeck-typescript
```

## Decorators

This Plugin adds a few decorators for classes and methods.

### Available decorators

- methods
    - ``@SDInit()`` - Calls method after initialization process is done
        - Overhands StreamDeckPlugin instance as parameter
    - ``@SDOnPiEvent(event, actionName?)`` - Listens for specified event in the property inspector context and if 
      triggered, calls method
        - Overhands EventData (\*NameOfEvent\*Event; Example: KeyDownEvent, KeyUpEvent, WillAppearEvent)
    - ``@SDOnActionEvent(event)`` - Listens for specified event in the action context and if triggered, calls method
        - Overhands EventData (\*NameOfEvent\*Event; Example: KeyDownEvent, KeyUpEvent, WillAppearEvent)

## Usage

You can see an example in the [example](https://github.com/XeroxDev/Stream-Deck-TS-SDK/tree/master/example) folder 
or look through the [repository wiki](https://github.com/XeroxDev/Stream-Deck-TS-SDK/wiki)

### Initializing Plugin
Elgato uses 2 different files. The Action file (which handels all actions), and the Property Inspector file (which is 
for settings)

#### counter.ts
```typescript
import {StreamDeckPluginHandler} from "../src/abstracts/stream-deck-plugin-handler";
import {CounterAction} from "./actions/counter.action";

// Extends StreamDeckPluginHandler for easier use of theElgato Api
export class Counter extends StreamDeckPluginHandler {
	constructor() {
		super();
		// Create counter action
		new CounterAction(this, 'fun.shiro.counter.action');
	}
}

// Initialize Plugin
new Counter();
```

#### plugin.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Test Plugin</title>
	<meta charset="utf-8">
	<script src="dist/bundle.js"></script>
</head>
<body>
</body>
</html>
```
Here you can see. After the build you have only one file (bundle.js in this case) and this gets loaded.

#### counter-pi.ts
```typescript
import {StreamDeckPropertyInspectorHandler} from "../src/abstracts/stream-deck-property-inspector-handler";
import {SettingsInterface} from "./interfaces/settings.interface";
import {DidReceiveSettingsEvent} from "../src/interfaces/events/settings/did-receive-settings.event";
import {SDOnPiEvent} from "../src/decorators/on-pi-event.decorator";

// Extends StreamDeckPropertyInspectorHandler for easier communication with the elgato pi api
class CounterPi extends StreamDeckPropertyInspectorHandler {
	private count: HTMLInputElement;
	private stepsCount: HTMLInputElement;
	private saveButton: HTMLButtonElement;

	// Gets called after connection is established and DOM ready loaded
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

	// Listens to the didReceiveSettings Event
	@SDOnPiEvent('didReceiveSettings')
	private onSettingsReceived({payload: {settings}}: DidReceiveSettingsEvent<SettingsInterface>) {
		if (!settings)
			return;

		this.count.value = settings.count.toString();
		this.stepsCount.value = settings.steps.toString();
	}
}

new CounterPi();
```

#### property-inspector.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Test Plugin Inspector</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="sdpi.css">
	<script src="dist/bundle-pi.js"></script>
</head>
<body>
<div class="sdpi-wrapper" id="mainSettings">
	<div class="sdpi-item">
		<div class="sdpi-item-label">Count</div>
		<input class="sdpi-item-value" type="number" id="count" value="0">
	</div>
	<div class="sdpi-item">
		<div class="sdpi-item-label">Steps</div>
		<input class="sdpi-item-value" type="number" id="steps" value="1">
	</div>
	<div class="sdpi-item">
		<button class="sdpi-item-value" id="save">Save</button>
	</div>
</div>
</body>
</html>
```

```typescript
import {StreamDeckAction} from "../../src/abstracts/stream-deck-action";
import {Counter} from "../counter";
import {SDOnActionEvent} from "../../src/decorators/on-action-event.decorator";
import {WillAppearEvent} from "../../src/interfaces/events/appearance/will-appear.event";
import {SettingsInterface} from "../interfaces/settings.interface";
import {KeyUpEvent} from "../../src/interfaces/events/keys/key-up.event";
import {DidReceiveSettingsEvent} from "../../src/interfaces/events/settings/did-receive-settings.event";
import {KeyDownEvent} from "../../src/interfaces/events/keys/key-down.event";

// extends StreamDeckAction for easier use with the context handling
export class CounterAction extends StreamDeckAction<Counter, CounterAction> {
	private keyUpTimer: any;

	// Plugin and action name are default parameters for the constructor
	constructor(private plugin: Counter, private actionName: string) {
		super(plugin, actionName);
	}

	// Listens to the willAppear event
	@SDOnActionEvent('willAppear')
	private onAppear({context, payload: {settings}}: WillAppearEvent<SettingsInterface>) {
		if (!settings)
			return
		this.plugin.setTitle((settings.count ?? 0).toString(), context);
	}

	// Listens to the keyUp event
	@SDOnActionEvent('keyUp')
	private onKeyUp({context, payload: {settings}}: KeyUpEvent<SettingsInterface>) {
		clearTimeout(this.keyUpTimer);
		const steps = settings.steps ?? 1
		const count = settings.count + steps ?? 0;
		this.plugin.setTitle(count.toString(), context);
		this.plugin.setSettings<SettingsInterface>({steps, count}, context);
	}

	// Listens to the keyDown event
	@SDOnActionEvent('keyDown')
	private onKeyDown({context, payload: {settings}}: KeyDownEvent<SettingsInterface>) {
		this.keyUpTimer = setTimeout(() => {
			const steps = settings.steps ?? 1;
			this.plugin.setSettings<SettingsInterface>({
				steps,
				count: steps * -1
			}, context);
			this.plugin.setTitle('0', context);
		}, 2000);
	}

	// Listens to the didReceiveSettings event
	@SDOnActionEvent('didReceiveSettings')
	private onSettings({context, payload: {settings}}: DidReceiveSettingsEvent<SettingsInterface>) {
		this.plugin.setTitle(settings.count.toString() ?? 0, context);
	}
}
```

## Building the Plugin
I would suggest you to do it like in the example with tsc and browserify. 
See [**package.json**](https://github.com/XeroxDev/Stream-Deck-TS-SDK/blob/master/package.json) 
and [**tsconfig.json**](https://github.com/XeroxDev/Stream-Deck-TS-SDK/blob/master/tsconfig.json)

```json
...
"scripts": {
  "watch": "tsc -p tsconfig.json -w",
  "browserify": "browserify dist/example/counter.js > dist/bundle.js && browserify dist/example/counter-pi.js > dist/bundle-pi.js"
}
...
```
