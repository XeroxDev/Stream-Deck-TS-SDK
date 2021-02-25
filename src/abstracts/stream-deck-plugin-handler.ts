/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {StateType, TargetType} from '../interfaces/enums';
import {StreamDeckHandlerBase} from './stream-deck-handler-base';

export abstract class StreamDeckPluginHandler<GlobalSettings = any> extends StreamDeckHandlerBase<GlobalSettings> {
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
     * Shows a alert icon on action
     */
    public showAlert(context: string) {
        this.send('showAlert', {context});
    }

    /**
     * Shows a okay icon on action
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
}
