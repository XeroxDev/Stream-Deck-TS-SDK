/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

export abstract class StreamDeckAction<Plugin, Instance> {
    protected _sd_events: Function[];

    protected constructor(plugin: Plugin, actionName: string) {
        if (this._sd_events)
            for (let event of this._sd_events)
                event(actionName, this);
    }
}
