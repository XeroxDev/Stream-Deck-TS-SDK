/**
 * This will help you creating actions.
 * @author XeroxDev <help@xeroxdev.de>
 * @copyright 2021
 */
export abstract class StreamDeckAction<Plugin, Instance> {
    /**
     * @type {Function[]}
     * @private
     * @internal
     */
    protected _sd_events: Function[];

    protected constructor(plugin: Plugin, actionName: string) {
        if (this._sd_events)
            for (let event of this._sd_events) event(actionName, this);
    }
}
