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

- classes
    - ``@SDDebug`` - Enabled debug mode. This will enabled console.log for events sent and received
    - ``@SDPlugin`` - Automatically initializes the StreamDeckPlugin wrapper in the plugin context, so you just need to
      import one file.
    - ``@SDPropertyInspector`` - Automatically initializes the StreamDeckPlugin wrapper in the Property Inspector
      context, so you just need to import one file.
- methods
    - ``@SDInit()`` - Calls method after initialization process is done
        - Overhands StreamDeckPlugin instance as parameter
    - ``@SDOnEvent(event, actionName?)`` - Listens for specified event and if triggered, calls method
        - Overhands EventData (\*NameOfEvent\*Event; Example: KeyDownEvent, KeyUpEvent, WillAppearEvent)
    - ``@SDReady()`` - Calls method after connection and dom is ready

## Usage

You can see an example in the ``example`` folder

### Initializing Plugin
Elgato uses 2 different files. The Action file (which handels all actions), and the Property Inspector file (which is 
for settings)

#### counter.ts
```typescript
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

	// Calls the initialize method after initialization process is done and overhands the StreamDeckPlugin instance
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

## Building the Plugin
I would suggest you to do it like in the example with tsc and browserify. See **package.json** and **tsconfig.json**
```json
...
"scripts": {
  "watch": "tsc -p tsconfig.json -w",
  "browserify": "browserify dist/example/counter.js > dist/bundle.js && browserify dist/example/counter-pi.js > dist/bundle-pi.js"
}
...
```
