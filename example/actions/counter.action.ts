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
