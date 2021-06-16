/*
 * @author: XeroxDev <help@xeroxdev.de>
 * @copyright 2021.
 *
 */

import { StreamDeckPluginHandler } from '../abstracts/stream-deck-plugin-handler';
import { StreamDeckActionClass } from '../classes/stream-deck-action.class';

export class ActionManager {
    private _actions: Map<string, StreamDeckActionClass> = new Map<
        string,
        StreamDeckActionClass
    >();

    constructor(private _handler: StreamDeckPluginHandler) {}

    public getAction(context: string) {
        return this._actions.get(context);
    }

    public addOrGetAction(context: string, action: StreamDeckActionClass) {
        if (!this.getAction(context)) this._actions.set(context, action);

        return this.getAction(context);
    }
}
