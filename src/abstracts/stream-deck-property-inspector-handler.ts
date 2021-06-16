import { SDOnPiEvent } from '../decorators/on-pi-event.decorator';
import { DidReceiveSettingsEvent, InitPi } from '../interfaces/interfaces';
import { StreamDeckHandlerBase } from './stream-deck-handler-base';

/**
 * This will help you create the logic for the property inspector.
 * @author XeroxDev <help@xeroxdev.de>
 * @copyright 2021
 */
export abstract class StreamDeckPropertyInspectorHandler<
    Settings = any,
    GlobalSettings = any
> extends StreamDeckHandlerBase<GlobalSettings> {
    private _actionInfo: InitPi['actionInfo'];

    /**
     * Gets the action information
     * @returns {InitPi["actionInfo"]}
     * @protected
     */
    protected get actionInfo(): InitPi['actionInfo'] {
        return this._actionInfo;
    }

    /**
     * Send data to the action
     * @param {any} payload Data to send
     * @param {string} action [Optional] Action context. (Default: current context)
     */
    public sendToPlugin(payload: any, action?: string) {
        this.send('sendToPlugin', {
            context: this.uuid,
            action: action ? action : this._actionInfo?.action,
            payload,
        });
    }

    /**
     * @inheritDoc
     */
    requestSettings() {
        super.requestSettings(this.uuid);
    }

    /**
     * @inheritDoc
     * @param {Settings} settings
     */
    setSettings<Settings = any>(settings: Settings) {
        super.setSettings(settings, this.uuid);
    }

    /**
     *
     * @param {string} actionInfo
     * @protected
     * @internal
     * @private
     */
    @SDOnPiEvent('registerPi')
    protected onRegisterPi(actionInfo: string) {
        this._actionInfo = JSON.parse(actionInfo);
        this.requestSettings();
    }
}
