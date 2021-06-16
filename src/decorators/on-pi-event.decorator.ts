/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import { PossibleEventsForPiToReceive } from '../interfaces/types';
import { EventManager } from '../manager/event.manager';

/**
 * This is the Event decorator for the property inspector context
 * @param {PossibleEventsForPiToReceive} event
 * @returns {any}
 * @constructor
 * @category Decorator
 */
export function SDOnPiEvent(event: PossibleEventsForPiToReceive): any {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ) => {
        return EventManager.DefaultDecoratorEventListener(
            event,
            target,
            propertyKey,
            descriptor
        );
    };
}
