/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {PossibleEventsForActionToReceive} from '../interfaces/types';
import {EventManager}                     from '../manager/event.manager';

/**
 * This is the Event decorator for the action context
 * @param {PossibleEventsForActionToReceive} event
 * @returns {any}
 * @constructor
 * @category Decorator
 */
export function SDOnActionEvent(event: PossibleEventsForActionToReceive): any {
    return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        return EventManager.DefaultDecoratorEventListener(event, target, propertyKey, descriptor);
    };
}
