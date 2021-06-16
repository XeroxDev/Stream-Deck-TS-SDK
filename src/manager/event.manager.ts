/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {IllegalArgumentError}    from '../errors/illegal-argument.error';
import {PossibleEventsToReceive} from '../interfaces/types';

/**
 * Singleton class for EventManager
 * @internal
 */
export class EventManager {
    private static _INSTANCE: EventManager;
    private registeredEvents: Map<string, Function[]> = new Map<string, Function[]>();

    private constructor() {
    }

    /**
     * Returns EventManager instance
     * @returns {EventManager}
     * @internal
     * @constructor
     */
    public static get INSTANCE(): EventManager {
        if (!this._INSTANCE)
            this._INSTANCE = new EventManager();
        return this._INSTANCE;
    }

    /**
     * Helper for decorators
     * @internal
     * @param {string} event
     * @param target
     * @param {string | symbol} propertyKey
     * @param {TypedPropertyDescriptor<any>} descriptor
     * @returns {TypedPropertyDescriptor<any>}
     * @constructor
     */
    public static DefaultDecoratorEventListener(event: string, target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
        const eventListener = <T>(actionName: string, instance: T) => {
            if (typeof actionName !== 'string') {
                throw new IllegalArgumentError(`actionName needs to be of type string but ${typeof actionName} given.`);
            }
            EventManager.INSTANCE.registerEvent(event, <T>(eventActionName: string | false, ...params: any[]) => {
                if (!eventActionName || actionName === '*' || eventActionName === '*' || actionName === eventActionName)
                    descriptor.value.apply(instance, params);
            });
        };

        if (!target._sd_events) {
            target._sd_events = [];
        }

        target._sd_events.push(eventListener);

        return descriptor;
    }

    /**
     * Registers event
     * @internal
     * @param {string} eventName
     * @param {Function} callback
     */
    public registerEvent(eventName: string, callback: Function) {
        if (!this.registeredEvents.has(eventName))
            this.registeredEvents.set(eventName, []);
        this.registeredEvents.get(eventName)?.push(callback);
    }

    /**
     * Calls event
     * @internal
     * @param {PossibleEventsToReceive} eventName
     * @param {string} actionName
     * @param params
     */
    public callEvents(eventName: PossibleEventsToReceive, actionName: string = '*', ...params: any[]) {
        this.registeredEvents.get(eventName)?.forEach(val => val(actionName, ...params));
    }
}
