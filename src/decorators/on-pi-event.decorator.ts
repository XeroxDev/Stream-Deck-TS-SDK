/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

import {PossibleEventsForPiToReceive} from '../interfaces/types';
import {EventManager}                 from '../manager/event.manager';

export function SDOnPiEvent(event: PossibleEventsForPiToReceive): any {
    return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        return EventManager.DefaultDecoratorEventListener(event, target, propertyKey, descriptor);
    };
}
