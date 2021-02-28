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
    - ``@SDOnPiEvent(event)`` - Listens for specified event in the property inspector context and if 
      triggered, calls method
        - Overhands EventData (\*NameOfEvent\*Event; Example: KeyDownEvent, KeyUpEvent, WillAppearEvent)
    - ``@SDOnActionEvent(event)`` - Listens for specified event in the action context and if triggered, calls method
        - Overhands EventData (\*NameOfEvent\*Event; Example: KeyDownEvent, KeyUpEvent, WillAppearEvent)

## Usage

You can see an example in the [example](https://github.com/XeroxDev/Stream-Deck-TS-SDK/tree/master/example) folder 
or look through the [Source docs](https://xeroxdev.github.io/Stream-Deck-TS-SDK/)

### Initializing Plugin
Elgato uses 2 different files. The Action file (which handels all actions), and the Property Inspector file (which is 
for settings)

#### counter.ts
```typescript
import {StreamDeckPluginHandler} from '../src';
import {CounterAction}           from './actions/counter.action';

export class Counter extends StreamDeckPluginHandler {
    constructor() {
        super();
        new CounterAction(this, 'fun.shiro.counter.action');
    }
}

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
import {DidReceiveSettingsEvent, SDOnPiEvent, StreamDeckPropertyInspectorHandler} from '../src';
import {SettingsInterface}                                                        from './interfaces/settings.interface';

class CounterPi extends StreamDeckPropertyInspectorHandler {
    private count: HTMLInputElement;
    private stepsCount: HTMLInputElement;

    constructor() {
        super();
    }

    @SDOnPiEvent('documentLoaded')
    onDocumentReady() {
        this.count = document.getElementById('count') as HTMLInputElement;
        this.count.addEventListener('keyup', () =>
            this.settingsManager.setContextSettingsAttributes(
                this.actionInfo.context, {count: this.count.valueAsNumber}, 500));
        this.stepsCount = document.getElementById('steps') as HTMLInputElement;
        this.stepsCount.addEventListener('keyup', () =>
            this.settingsManager.setContextSettingsAttributes(
                this.actionInfo.context, {steps: this.stepsCount.valueAsNumber}, 500));

        const settings = this.settingsManager.getContextSettings<SettingsInterface>(this.actionInfo.context);

        this.count.value = (settings?.count ?? 0).toString();
        this.stepsCount.value = (settings?.steps ?? 1).toString();
    }

    @SDOnPiEvent('didReceiveSettings')
    private onSettingsReceived({payload: {settings}}: DidReceiveSettingsEvent<SettingsInterface>) {
        if (Object.keys(settings).length <= 0)
            return;

        this.count.value = settings.count.toString() ?? 0;
        this.stepsCount.value = settings.steps.toString() ?? 1;
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
</div>
</body>
</html>
```
#### counter.action.ts
```typescript
import {
    DidReceiveSettingsEvent,
    KeyDownEvent,
    KeyUpEvent,
    SDOnActionEvent,
    StreamDeckAction,
    WillAppearEvent
}                          from '../../src';
import {Counter}           from '../counter';
import {SettingsInterface} from '../interfaces/settings.interface';

export class CounterAction extends StreamDeckAction<Counter, CounterAction> {
    private keyUpTimer: any;

    constructor(private plugin: Counter, private actionName: string) {
        super(plugin, actionName);
    }

    @SDOnActionEvent('willAppear')
    private onAppear({context, payload: {settings}}: WillAppearEvent<SettingsInterface>) {
        this.plugin.setTitle((settings.count ?? 0).toString(), context);
    }

    @SDOnActionEvent('keyUp')
    private onKeyUp({context, payload: {settings}}: KeyUpEvent<SettingsInterface>) {
        clearTimeout(this.keyUpTimer);
        const steps = settings.steps ?? 1;
        const count = (settings.count ?? 0) + steps;
        this.plugin.setTitle(count.toString(), context);
        this.plugin.setSettings<SettingsInterface>({steps, count}, context);
    }

    @SDOnActionEvent('keyDown')
    private onKeyDown({context, payload: {settings}}: KeyDownEvent<SettingsInterface>) {
        this.keyUpTimer = setTimeout(() => {
            const steps = settings.steps ?? 1;
            this.plugin.setSettings<SettingsInterface>(
                {
                    steps,
                    count: steps * -1
                }, context
            );
            this.plugin.setTitle('0', context);
        }, 2000);
    }

    @SDOnActionEvent('didReceiveSettings')
    private onSettings({context, payload: {settings}}: DidReceiveSettingsEvent<SettingsInterface>) {
        this.plugin.setTitle(settings.count.toString() ?? 0, context);
    }
}
```
#### settings.interface.ts
```typescript
export interface SettingsInterface {
    count: number,
    steps: number
}
```

## Building the Plugin
I would suggest you to do it like in the example with browserify, terser, tsify, typescript and for development watchify

See [**package.json**](https://github.com/XeroxDev/Stream-Deck-TS-SDK/blob/master/package.json) 
and [**tsconfig.json**](https://github.com/XeroxDev/Stream-Deck-TS-SDK/blob/master/tsconfig.json)

```json
{
    "scripts": {
        "build": "tsc -p tsconfig.json",
        "build-example": "browserify -p tsify example/counter-pi.ts | terser -cm --comments false -o dist/bundle-pi.js && browserify -p tsify example/counter.ts | terser -cm --comments false -o dist/bundle.js",
        "watch": "start watchify --debug -p tsify example/counter.ts -o dist/bundle.js && start watchify --debug -p tsify example/counter-pi.ts -o dist/bundle-pi.js",
        "documentation": "typedoc src/index.ts",
        "test": "echo \"Error: no test specified\" && exit 1"
    }
}
```
