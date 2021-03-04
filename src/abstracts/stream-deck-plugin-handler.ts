import {StreamDeckActionClass}   from '../classes/stream-deck-action.class';
import {StateType, TargetType}   from '../interfaces/enums';
import {PossibleEventsToReceive} from '../interfaces/types';
import {ActionManager}           from '../manager/action.manager';
import {StreamDeckHandlerBase}   from './stream-deck-handler-base';

/**
 * This will help you create the stream deck action handler
 * @author XeroxDev <help@xeroxdev.de>
 * @copyright 2021
 */
export abstract class StreamDeckPluginHandler<GlobalSettings = any> extends StreamDeckHandlerBase<GlobalSettings> {
    private readonly _actionManager: ActionManager;

    protected constructor() {
        super();
        this._actionManager = new ActionManager(this);
    }

    public get actionManager(): ActionManager {
        return this._actionManager;
    }

    /**
     * Sets the action title
     * @param {string} title The string the title should be
     * @param {string} context The context which called it
     * @param {TargetType} target [Optional] Show title only on hardware, software or both (default: Both)
     * @param {StateType} state [Optional] Show title only on ON state or OFF state (default: Both)
     */
    public setTitle(title: string, context: string, target: TargetType = TargetType.BOTH, state?: StateType) {
        if (state) {
            this.send('setTitle', {
                context,
                payload: {title, target, state}
            });
        } else {
            this.send('setTitle', {
                context,
                payload: {title, target}
            });
        }
    }

    /**
     * Sets the action image
     * @param {string} image Image as string
     * @param {string} context The context which called it
     * @param {TargetType} target [Optional] Show image only on hardware, software or both (default: Both)
     * @param {StateType} state [Optional] Show image only on ON state or OFF state (default: Both)
     */
    public setImage(image: string, context: string, target: TargetType = TargetType.BOTH, state?: StateType) {
        if (state) {
            this.send('setImage', {
                context,
                payload: {image, target, state}
            });
        } else {
            this.send('setImage', {
                context,
                payload: {image, target}
            });
        }
    }

    /**
     * Sets the action image but instead from file, from URL
     * @param {string} url
     * @param {string} context
     * @param {TargetType} target
     * @param {StateType} state
     * @returns {Promise<string>}
     */
    public setImageFromUrl(url: string, context: string, target: TargetType = TargetType.BOTH, state?: StateType): Promise<string> {
        return new Promise((resolve, reject) => {
            let image = new Image();

            image.onload = () => {
                let canvas = document.createElement('canvas');
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;

                let ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('image failed to load'));
                    return;
                }

                ctx.drawImage(image, 0, 0);

                image.onload = null;
                image.onerror = null;
                (image as any) = null;

                const dataUrl = canvas.toDataURL('image/png');

                this.setImage(dataUrl, context, target, state);
                resolve(dataUrl);
            };
            image.onerror = () => {

                image.onload = null;
                image.onerror = null;
                (image as any) = null;

                reject(new Error('image failed to load'));
            };
            image.src = url;
        });
    }

    /**
     * Shows a alert icon on action
     * @param {string} context
     */
    public showAlert(context: string) {
        this.send('showAlert', {context});
    }

    /**
     * Shows a okay icon on action
     * @param {string} context
     */
    public showOk(context: string) {
        this.send('showOk', {context});
    }

    /**
     * Sets the state of the action (ON / OFF)
     * @param {StateType} state
     * @param {string} context The context which called it
     */
    public setState(state: StateType, context: string) {
        this.send('setState', {
            context: context,
            payload: {state}
        });
    }

    /**
     * Switch to a profile
     * @param {string} profile
     * @param {string} device
     */
    public switchToProfile(profile: string, device?: string) {
        this.send('switchToProfile', {
            context: this.uuid,
            device: device ? device : this.info.devices[0].id,
            payload: {profile}
        });
    }

    /**
     * Send data to the property inspector
     * @param {any} payload Data to send
     * @param {string} action [Optional] Action context.
     * @param {string} context The context which called it
     */
    public sendToPropertyInspector(payload: any, action: string, context: string) {
        this.send('sendToPropertyInspector', {
            context,
            action: action,
            payload
        });
    }

    protected _eventHandler(ev: MessageEvent): void {
        const eventData = JSON.parse(ev.data);
        const event: PossibleEventsToReceive = eventData.event;

        if (event !== 'didReceiveGlobalSettings' && eventData.context && eventData.payload?.settings)
            this.settingsManager.cacheContextSettings(eventData.context, eventData.payload.settings);

        let settings, column, isInMultiAction, row, state, userDesiredState, action, context, device;
        action = eventData?.action;
        context = eventData?.context;
        device = eventData?.device;
        const payload = eventData?.payload;
        settings = payload?.settings;
        state = payload?.state;
        userDesiredState = payload?.userDesiredState;
        isInMultiAction = payload?.isInMultiAction;
        column = payload?.coordinates?.column;
        row = payload?.coordinates?.row;

        const actionClass = this._actionManager.addOrGetAction(context, new StreamDeckActionClass(this));

        if (actionClass) {
            if (action !== undefined)
                actionClass.action = action;
            if (context !== undefined)
                actionClass.context = context;
            if (device !== undefined)
                actionClass.device = device;
            if (settings !== undefined)
                actionClass.settings = settings;
            if (column !== undefined)
                actionClass.column = column;
            if (row !== undefined)
                actionClass.row = row;
            if (state !== undefined)
                actionClass.state = state;
            if (userDesiredState !== undefined)
                actionClass.userDesiredState = userDesiredState;
            if (isInMultiAction !== undefined)
                actionClass.isInMultiAction = isInMultiAction;
        }

        super._eventHandler(ev);
    }
}
