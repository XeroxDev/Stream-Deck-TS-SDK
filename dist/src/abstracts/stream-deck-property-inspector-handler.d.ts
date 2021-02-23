import { StreamDeckHandlerBase } from "./stream-deck-handler-base";
import { InitPi } from "../interfaces/events/init.event";
export declare abstract class StreamDeckPropertyInspectorHandler<Settings = any, GlobalSettings = any> extends StreamDeckHandlerBase {
    private _actionInfo;
    private _settings;
    private _globalSettings;
    _sd_events: Function[];
    constructor();
    protected registerPi(actionInfo: string): void;
    private onSettings;
    private onGlobalSettings;
    sendToPlugin(payload: any, action?: string): void;
    setSettings<Settings = any>(settings: Settings): void;
    requestSettings(): void;
    protected get actionInfo(): InitPi["actionInfo"];
    get settings(): Settings | any;
    get globalSettings(): GlobalSettings | any;
}
