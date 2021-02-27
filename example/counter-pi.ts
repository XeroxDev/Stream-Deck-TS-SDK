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
